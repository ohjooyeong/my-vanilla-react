export type VNode = string | number | VDOM | null | undefined;
export type VDOM = {
  type: string;
  props: Record<string, any> | null;
  children: VNode[];
};
