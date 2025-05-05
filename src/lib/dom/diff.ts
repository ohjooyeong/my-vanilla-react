import { VNode } from "../jsx/jsx-runtime/type";
import { createElement } from "./client";

// 두 가상 DOM 노드(Virtual DOM nodes) 사이의 텍스트 내용을 비교하는 함수
// - true 를 반환하면 DOM 업데이트가 필요하다는 의미
// - false 를 반환하면 DOM 업데이트가 불필요하다는 의미
const diffTextDom = (newVDOM: VNode, currentVDOM: VNode) => {
  if (typeof newVDOM === "number" && typeof currentVDOM === "string") {
    return true;
  }

  if (typeof newVDOM === "string" && typeof currentVDOM === "number") {
    return true;
  }

  if (typeof newVDOM === "number" && typeof currentVDOM === "number") {
    return true;
  }

  if (typeof newVDOM === "string" && typeof currentVDOM === "string") {
    return true;
  }
  if (newVDOM === currentVDOM) return false;

  return false;
};

export const updateElement = (
  parent: Element,
  newVDOM?: VNode | null,
  currentVDOM?: VNode | null,
  index: number = 0
) => {
  let removeIndex: undefined | number = undefined;

  const hasOnlyCurrentVDOM =
    newVDOM === null ||
    (newVDOM === undefined &&
      currentVDOM !== null &&
      currentVDOM !== undefined);

  const hasOnlyNewVDOM =
    newVDOM !== null &&
    newVDOM !== undefined &&
    (currentVDOM === null || currentVDOM === undefined);

  // childNodes가 존재하고, currentVDOM만 존재하는 경우 currentVDOM에 대한 node를 DOM에서 제거합니다다
  if (parent.childNodes) {
    if (hasOnlyCurrentVDOM) {
      parent.removeChild(parent.childNodes[index]);
      return index;
    }
  }

  // newVDOM만 존재하는 경우 newVDOM을 createElement를 통해 DOM으로 변경 후 parent에 추가합니다다
  if (hasOnlyNewVDOM) {
    parent.appendChild(createElement(newVDOM));
    return;
  }

  // diffTextVDOM을 통해 newVDOM이나 currentVDOM이 단순히 텍스트 노드로
  // 변환될 Virtual DOM인지를 비교해서 currentVDOM을 newVDOM으로 변경합니다다
  if (diffTextDom(newVDOM, currentVDOM)) {
    parent.replaceChild(createElement(newVDOM), parent.childNodes[index]);
    return;
  }

  if (typeof newVDOM === "number" || typeof newVDOM === "string") return;
  if (typeof currentVDOM === "number" || typeof currentVDOM === "string")
    return;
  if (!newVDOM || !currentVDOM) return;

  // newVDOM과 currentVDOM의 tag type이 다를 경우에도 newVDOM으로 변경합니다다
  if (newVDOM.type !== currentVDOM.type) {
    parent.replaceChild(createElement(newVDOM), parent.childNodes[index]);
    return;
  }

  updateAttributes(
    parent.childNodes[index] as Element,
    newVDOM.props ?? {},
    currentVDOM.props ?? {}
  );

  const maxLength = Math.max(
    newVDOM.children.length,
    currentVDOM.children.length
  );

  // newVDOM과 currentVDOM에 존재하는 자식들도 비교후 DOM에 올리기 위해 updateElement를 재귀적으로 호출합니다
  // removeIndex를 통해 currentVDOM에 존재하는 자식들 중 newVDOM에 존재하지 않는 자식들을 DOM에서 제거합니다
  for (let i = 0; i < maxLength; i++) {
    const _removeIndex = updateElement(
      parent.childNodes[index] as Element,
      newVDOM.children[i],
      currentVDOM.children[i],
      removeIndex ?? i
    );
    removeIndex = _removeIndex;
  }
};

// newVDOM과 currentVDOM의 props를 비교하여 변경된 부분만 반영하고
// updateAttributes는 변경될 newProps를 순회하면서 oldProps와 다른 부분이 있을 경우 oldProps를 newProps로 변경합니다
function updateAttributes(
  target: Element,
  newProps: Record<string, any>,
  oldProps: Record<string, any>
) {
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    (target as any)[attr] = value;
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    if (attr.startsWith("on")) {
      (target as any)[attr] = null;
    } else if (attr.startsWith("class")) {
      target.removeAttribute("class");
    } else {
      target.removeAttribute(attr);
    }
  }
}
