import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navegar = useNavigate();

  function voltarHome() {
    navegar(-1);
  }

  return (
    <div>
      <h1>Infelizmente, essa página não foi encontrada :C</h1>
      <button onClick={voltarHome}>Voltar para a tela inicial</button>
    </div>
  );
}