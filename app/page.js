"use client";

import { useState } from "react";
import roteiros from "../data/roteiros.json";
import disciplinas from "../data/disciplinas.json";
import FiltroRoteiros from "../components/FiltroRoteiros";
import RoteiroCard from "../components/RoteiroCard";

export default function PaginaInicial() {
  const [anoSelecionado, setAnoSelecionado] = useState("todos");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("todas");

  const roteirosFiltrados = roteiros.filter((roteiro) => {
    const anoCombina =
      anoSelecionado === "todos" || roteiro.ano === Number(anoSelecionado);

    const disciplinaCombina =
      disciplinaSelecionada === "todas" ||
      roteiro.disciplinaId === Number(disciplinaSelecionada);

    return anoCombina && disciplinaCombina;
  });

  return (
    <main className="conteudo">
      <section className="introducao">
        <p className="etiqueta">ESTUDE NO SEU RITMO</p>
        <h1>Encontre seu roteiro de estudo</h1>
        <p>
          Escolha seu ano e sua disciplina para encontrar materiais de apoio.
        </p>
      </section>

      <FiltroRoteiros
        anoSelecionado={anoSelecionado}
        disciplinaSelecionada={disciplinaSelecionada}
        disciplinas={disciplinas}
        aoMudarAno={setAnoSelecionado}
        aoMudarDisciplina={setDisciplinaSelecionada}
      />

      <section>
        <div className="titulo-lista">
          <h2>Roteiros disponíveis</h2>
          <span>{roteirosFiltrados.length} materiais</span>
        </div>

        {roteirosFiltrados.length === 0 ? (
          <p className="mensagem">Nenhum roteiro encontrado com esses filtros.</p>
        ) : (
          <div className="grade-roteiros">
            {roteirosFiltrados.map((roteiro) => (
              <RoteiroCard key={roteiro.id} roteiro={roteiro} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
