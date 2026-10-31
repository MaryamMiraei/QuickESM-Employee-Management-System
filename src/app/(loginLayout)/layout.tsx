import Redirect from "@/components/Redirect";
import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Redirect />
      <main className="auth-container">{children}</main>
    </>
  );
};

export default LoginLayout;
