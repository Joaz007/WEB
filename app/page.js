"use client";

import { useState } from "react";
import disciplinas from "../data/disciplinas.json";
import { useRoteiros } from "../components/RoteirosProvider";
import FiltroRoteiros from "../components/FiltroRoteiros";
import ListaRoteiros from "../components/ListaRoteiros";
import PaginaConteudo from "../components/PaginaConteudo";

export default function PaginaInicial() {
  const { roteiros, carregado } = useRoteiros();
  const [anoSelecionado, setAnoSelecionado] = useState("todos");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("todas");

  const roteirosFiltrados = roteiros.filter((roteiro) => {
    const anoCombina = anoSelecionado === "todos" || roteiro.ano === Number(anoSelecionado);
    const disciplinaCombina = disciplinaSelecionada === "todas" || roteiro.disciplinaId === Number(disciplinaSelecionada);
    return roteiro.status === "publicado" && anoCombina && disciplinaCombina;
  });

  return (
    <PaginaConteudo
      etiqueta="ESTUDE NO SEU RITMO"
      titulo="Encontre seu roteiro de estudo"
      descricao="Escolha seu ano e sua disciplina para encontrar materiais de apoio."
    >
      <FiltroRoteiros
        anoSelecionado={anoSelecionado}
        disciplinaSelecionada={disciplinaSelecionada}
        disciplinas={disciplinas}
        aoMudarAno={setAnoSelecionado}
        aoMudarDisciplina={setDisciplinaSelecionada}
      />

      <ListaRoteiros
        idTitulo="titulo-roteiros"
        titulo="Roteiros disponíveis"
        roteiros={roteirosFiltrados}
        carregado={carregado}
      />
    </PaginaConteudo>
  );
}
