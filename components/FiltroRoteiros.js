const ANOS_ESCOLARES = [6, 7, 8, 9];

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
          {ANOS_ESCOLARES.map((ano) => <option key={ano} value={ano}>{ano}º ano</option>)}
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
