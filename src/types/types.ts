export interface GameData {
  games: { id: number; title: string; img: string }[];
}

export interface NavigateButtonProps {
  title: string;
  navigate: string;
}

export interface ButtonProps {
  title: string;
  action?: () => void;
}
