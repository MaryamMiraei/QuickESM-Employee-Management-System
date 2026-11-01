import Menu from "@/components/Menu";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>
        <div>
          <Menu />
        </div>
        <div className="lg:ml-74 bg-slate-50 min-h-screen">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
