import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { BsCheckCircle } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";

import "./styles.scss";

interface Params {
  timestamps: string;
}

function Success() {
  const { goBack } = useHistory();
  const { timestamps } = useParams() as Params;

  const [username, setUsername] = useState("");

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const user = localStorage.getItem(`user-${timestamps}`);

    if (!user) {
      goBack();

      return;
    }

    setUsername(JSON.parse(user).name.split(" ")[0]);

    setTimeout(() => {
      if (mainRef?.current) mainRef.current.style.opacity = "1";
    }, 200);
  }, [timestamps, goBack]);

  return (
    <div className="successContainer">
      <header>
        <button>
          <MdArrowBack onClick={goBack} />
        </button>
      </header>

      <main ref={mainRef}>
        <BsCheckCircle />

        <h1>Olá {username}, seu usuário foi cadastrado com successo!</h1>

        <button onClick={goBack}>Voltar</button>
      </main>
    </div>
  );
}

export default Success;
