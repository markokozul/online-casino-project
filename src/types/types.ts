export interface SliderItemProps {
  title: string;
  img: string;
  id: number;
  refs?: (node: HTMLDivElement) => void;
}

export interface ButtonProps {
  title: string;
  styling: string;
  type?: string;
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
  name?: string;
  img?: string;
  id: string | undefined;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface PaymentOptionsShowcaseProps {
  position?: string;
}

export interface FormFields {
  username?: string;
  email: string;
  password: string;
}

export interface FormComponentProps {
  fields: FormFields;
  submit: (e: React.FormEvent<EventTarget>, data: RegisterFormData) => void;
  displayError: string;
}

export interface MobileSidebarProps {
  sidebarIsOpen: boolean;
  handleSidebar: () => void;
  logout: () => void;
}

export interface APIDataItem {
  id: number;
  img: string;
  title: string;
  theme: string;
}
export interface APIData {
  games: APIDataItem[];
}

export interface SectionProps {
  children: React.ReactNode;
  styling: string;
}

export interface useFetchResults {
  data: APIData | undefined;
  loading: boolean;
  error: string | undefined;
}

export type APIDataType = APIDataItem & APIData; // fetch can return data of type APIDataItem or APIData
