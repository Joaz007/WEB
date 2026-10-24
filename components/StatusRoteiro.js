export default function StatusRoteiro({ status, detalhado = false }) {
  const texto = status === "publicado"
    ? (detalhado ? "Publicado para os alunos" : "Publicado")
    : (detalhado ? "Aguardando revisão do professor" : "Aguardando revisão");

  return <span className={`status-roteiro status-${status}`}>{texto}</span>;
}
