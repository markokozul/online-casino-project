import { ReactNode } from 'react';

export default function Section(props: any) {
  return <div className={props.styling}>{props.children}</div>;
}
