import disciplinas from "../data/disciplinas.json";
import Link from "next/link";
import StatusRoteiro from "./StatusRoteiro";

export default function RoteiroCard({ roteiro, aoRevisar }) {
  const disciplina = disciplinas.find(
    (item) => item.id === roteiro.disciplinaId
  );

  const conteudo = (
    <>
      <div className="cartao-topo">
        <span className="tag">{disciplina ? disciplina.nome : "Disciplina"}</span>
        <span className="ano">{roteiro.ano}º ano</span>
      </div>
      {aoRevisar && <StatusRoteiro status={roteiro.status} />}
      <h3>{roteiro.titulo}</h3>
      <p className="tema">{roteiro.tema}</p>
      <p>{roteiro.resumo}</p>
      <div className="cartao-rodape">
        <span>{roteiro.tempoMinutos} min de estudo</span>
        {aoRevisar ? (
          <button className="botao-link" type="button" onClick={() => aoRevisar(roteiro.id)}>
            Revisar roteiro
          </button>
        ) : (
          <strong>Abrir roteiro →</strong>
        )}
      </div>
    </>
  );

  return aoRevisar ? (
    <article className="cartao-roteiro">{conteudo}</article>
  ) : (
    <Link className="cartao-roteiro" href={`/roteiros/${roteiro.id}`}>
      {conteudo}
    </Link>
  );
}
