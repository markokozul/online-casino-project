export interface SliderItemProps {
  title: string;
  img: string;
  id: number;
  refs?: (node: HTMLDivElement) => void;
}

export interface NavigateButtonProps {
  title: string;
  navigate: string;
}

export interface ButtonProps {
  title: string;
  action?: () => void;
}

export interface GameShowcaseProps {
  title: string;
}

export interface DetailsProps {
  name: string;
  img: string;
}
