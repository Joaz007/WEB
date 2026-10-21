import disciplinas from "../data/disciplinas.json";

export default function RoteiroCard({ roteiro }) {
  const disciplina = disciplinas.find(
    (item) => item.id === roteiro.disciplinaId
  );

  return (
    <a className="cartao-roteiro" href={`/roteiros/${roteiro.id}`}>
      <div className="cartao-topo">
        <span className="tag">{disciplina ? disciplina.nome : "Disciplina"}</span>
        <span className="ano">{roteiro.ano}º ano</span>
      </div>
      <h3>{roteiro.titulo}</h3>
      <p className="tema">{roteiro.tema}</p>
      <p>{roteiro.resumo}</p>
      <div className="cartao-rodape">
        <span>{roteiro.tempoMinutos} min de estudo</span>
        <strong>Abrir roteiro →</strong>
      </div>
    </a>
  );
}
