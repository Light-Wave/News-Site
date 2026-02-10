import { ReactNode } from "react";

type UtilitySideBarProps = {
  children: ReactNode;
};

export default function UtilitySideBar({ children }: UtilitySideBarProps) {
  return (
    <section>
      <div className="parchment-card shadow border-t-0 border-r-0">
        {children}
      </div>
    </section>
  );
}
