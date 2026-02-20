import type { ReactNode } from "react";

type UtilitySideBarProps = {
  children: ReactNode;
};

export default function UtilitySideBar({ children }: UtilitySideBarProps) {
  return (
    <section className="group">
      <div className="parchment-card shadow border-t-0 border-r-0 overflow-visible">
        {children}
      </div>
    </section>
  );
}
