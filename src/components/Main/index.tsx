import React from "react";

import "./styles.scss";

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<MainProps> = ({ className, children, ...props }) => {
  return (
    <div className={`mainContainer ${className || ""}`} {...props}>
      <header>
        <h1>Seja bem vindo!</h1>
        <p>Preencha seus dados para se cadastrar...</p>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Main;
