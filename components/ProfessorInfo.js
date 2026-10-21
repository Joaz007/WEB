export default function ProfessorInfo({ professor, disciplina }) {
  return (
    <section className="painel">
      <h2>Professor responsável pela revisão</h2>
      <p><strong>Nome:</strong> {professor.nome}</p>
      <p><strong>Disciplina:</strong> {disciplina ? disciplina.nome : "Não informada"}</p>
      <p><strong>Escola:</strong> {professor.escola}</p>
    </section>
  );
}
