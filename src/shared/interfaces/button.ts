export interface Button {
  icon: string;
  color?: string;
  size?: Size;
  action: () => void;
}

export enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}
