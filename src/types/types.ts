import { type } from 'os';

export interface SliderItemProps {
  title: string;
  img: string;
  id: number;
  refs?: (node: HTMLDivElement) => void;
}

export interface ButtonProps {
  title: string;
  type: string;
  navigate?: string;
  action?: (e: any) => void;
}

export interface GameShowcaseProps {
  title: string;
  theme?: string;
}
export interface GameSliderProps {
  theme?: string;
}

export interface DetailsProps {
  name: string;
  img: string;
  id: string | undefined;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
}

export interface PaymentOptionsShowcaseProps {
  position?: string;
}

export interface FormFields {
  email: string;
  password: string;
}

export interface FormProps {
  fields: FormFields;
  submit: (e: any, data: LoginFormData) => void;
}

export interface MobileSidebarProps {
  sidebarIsOpen: boolean;
  handleSidebar: () => void;
  logout: () => void;
}
