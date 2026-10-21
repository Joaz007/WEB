export default function FiltroRoteiros({
  anoSelecionado,
  disciplinaSelecionada,
  disciplinas,
  aoMudarAno,
  aoMudarDisciplina
}) {
  return (
    <section className="filtros">
      <label>
        Ano escolar
        <select
          value={anoSelecionado}
          onChange={(evento) => aoMudarAno(evento.target.value)}
        >
          <option value="todos">Todos os anos</option>
          <option value="6">6º ano</option>
          <option value="7">7º ano</option>
          <option value="8">8º ano</option>
          <option value="9">9º ano</option>
        </select>
      </label>

      <label>
        Disciplina
        <select
          value={disciplinaSelecionada}
          onChange={(evento) => aoMudarDisciplina(evento.target.value)}
        >
          <option value="todas">Todas as disciplinas</option>
          {disciplinas.map((disciplina) => (
            <option key={disciplina.id} value={disciplina.id}>
              {disciplina.nome}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
