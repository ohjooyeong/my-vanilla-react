import { VDOM, VNode } from "./type";

type Component = (props?: Record<string, any>) => VDOM;

// Virtual DOM으로 만들기
export const h = (
  component: string | Component,
  props: Record<string, any> | null,
  ...children: VNode[]
) => {
  if (typeof component === "function") {
    return component({ ...props, children });
  }

  return {
    type: component,
    props,
    children: children.flat(),
  };
};
