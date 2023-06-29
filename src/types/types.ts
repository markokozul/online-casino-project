export interface GameData {
  games: { id: number; title: string; img: string }[];
}

export interface SliderItemProps {
  title: string;
  img: string;
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
