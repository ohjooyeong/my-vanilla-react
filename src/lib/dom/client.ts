import { VNode } from "@/lib/jsx/jsx-runtime/type";

// Virtual DOM을 DOM에 올리기(Vitual DOM -> DOM)
const createElement = (node: VNode) => {
  //node가 null 또는 undefined인 경우 빈 DocumentFragment를 반환합니다.
  if (node === null || node === undefined) {
    return document.createDocumentFragment();
  }
  // node가 문자열 또는 숫자일 경우 텍스트 노드를 만들어 반환합니다.
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
  }

  const isFragment = node.type === "fragment";
  if (isFragment) {
    return document.createDocumentFragment();
  }

  // 타입에 맞는 실제 돔을 생성
  const element = document.createElement(node.type);

  // props를 실제 돔에 반영
  Object.entries(node.props || {}).forEach(([attr, value]) => {
    if (attr.startsWith("data-")) {
      element.dataset[attr.slice(5)] = value;
    } else {
      (element as any)[attr] = value;
    }
  });

  // 자식 노드들을 재귀적으로 createElement 함수로 처리하여 생성된 요소에 추가합니다.
  node.children.forEach((child) => element.appendChild(createElement(child)));

  return element;
};

export { createElement };
