import Signup from "../../components/Signup";

import "./styles.scss";

function Home() {
  return (
    <div className="homeContainer">
      <header>
        <h1>Seja bem vindo!</h1>
        <p>Preencha seus dados para se cadastrar...</p>
      </header>

      <main>
        <Signup />
      </main>
    </div>
  );
}

export default Home;
