import { VDOM } from "../jsx/jsx-runtime/type";
import { updateElement } from "./diff";
import type { Component } from "./types";

interface IRenderInfo {
  $root: HTMLElement | null;
  component: null | Component;
  currentVDOM: VDOM | null;
}

// 클로저 함수
// 렌더링 상태를 유지하고 실제 렌더링을 수행하는 내부 함수를 반환합니다.
// 이 함수는 외부에서 render 함수를 호출하여 렌더링을 수행할 수 있습니다.
const domRenderer = () => {
  // 렌더링 상태를 저장하는 객체
  const renderInfo: IRenderInfo = {
    $root: null,
    component: null,
    currentVDOM: null,
  };

  // 실제 렌더링을 수행하는 내부 함수
  const _render = () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root || !component) return;

    const newVDOM = component();
    updateElement($root, newVDOM, currentVDOM);
    renderInfo.currentVDOM = newVDOM;
  };

  // 외부에서 호출될 수 있는 렌더링 함수
  const render = (root: HTMLElement, component: Component) => {
    renderInfo.$root = root;
    renderInfo.component = component;
    _render();
  };

  return { render };
};

export const { render } = domRenderer();
