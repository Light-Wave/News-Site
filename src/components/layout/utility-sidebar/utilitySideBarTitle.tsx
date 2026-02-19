import type { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export function UtilitySideBarTitle({ title, children }: Props) {
  return (
    <>
      <h2 className="metal-plate relative z-10 -mx-[1.5px] -mt-[1px] w-[calc(100%+3px)] rounded-t-none rounded-b-lg border-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_20px_rgba(0,0,0,0.5)] py-2 px-1 font-bold text-center text-2xl uppercase leading-tight">
        <span className="text-forged-iron sidebar-title-glint" data-title={title}>
          {title}
        </span>
      </h2>
      {children}
    </>
  );
}
