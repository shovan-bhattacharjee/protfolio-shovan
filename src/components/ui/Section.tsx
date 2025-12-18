import { ReactNode } from "react";

export const Section = ({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`relative min-h-screen w-full px-6 py-20 flex flex-col justify-center overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto w-full z-10">{children}</div>
  </section>
);