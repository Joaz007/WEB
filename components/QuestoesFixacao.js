export default function QuestoesFixacao({ questoes }) {
  return (
    <section className="painel">
      <h2>Questões de fixação</h2>
      {questoes.map((questao, indice) => (
        <div className="questao" key={indice}>
          <p><strong>{indice + 1}. {questao.pergunta}</strong></p>
          <p className="resposta">Resposta: {questao.resposta}</p>
        </div>
      ))}
    </section>
  );
}
