import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function UtilitySideBarTitle({ title, children }: Props) {
  return (
    <>
      <h2 className="metal-plate rounded-t-none font-bold gap-0 text-center text-2xl uppercase">
        <span className="text-magic-glint">{title}</span>
      </h2>
      {children}
    </>
  );
}
