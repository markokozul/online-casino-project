import { SectionProps } from '../../types/types';

export default function Section({ children, styling }: SectionProps) {
  return <div className={styling}>{children}</div>;
}
