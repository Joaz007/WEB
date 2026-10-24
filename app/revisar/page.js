"use client";

import { useEffect, useRef, useState } from "react";
import disciplinas from "../../data/disciplinas.json";
import { useRoteiros } from "../../components/RoteirosProvider";
import FiltroRoteiros from "../../components/FiltroRoteiros";
import ListaRoteiros from "../../components/ListaRoteiros";
import ConteudoRoteiro from "../../components/ConteudoRoteiro";
import NavegacaoProfessor from "../../components/NavegacaoProfessor";
import PaginaConteudo from "../../components/PaginaConteudo";
import StatusRoteiro from "../../components/StatusRoteiro";

export default function RevisarPage() {
  const { roteiros, carregado, definirStatus, avisoPersistencia } = useRoteiros();
  const [anoSelecionado, setAnoSelecionado] = useState("todos");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("todas");
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const [idSelecionado, setIdSelecionado] = useState(null);
  const [revisaoConfirmada, setRevisaoConfirmada] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const tituloRevisao = useRef(null);

  const publicados = roteiros.filter((roteiro) => roteiro.status === "publicado").length;
  const selecionado = roteiros.find((roteiro) => roteiro.id === idSelecionado);
  const filtrados = roteiros.filter((roteiro) => {
    const anoCombina = anoSelecionado === "todos" || roteiro.ano === Number(anoSelecionado);
    const disciplinaCombina = disciplinaSelecionada === "todas" || roteiro.disciplinaId === Number(disciplinaSelecionada);
    const statusCombina = statusSelecionado === "todos" || roteiro.status === statusSelecionado;
    return anoCombina && disciplinaCombina && statusCombina;
  });

  useEffect(() => {
    if (idSelecionado) tituloRevisao.current?.focus();
  }, [idSelecionado]);

  function abrirRevisao(id) {
    setIdSelecionado(id);
    setRevisaoConfirmada(false);
    setMensagem("");
  }

  function publicar(evento) {
    evento.preventDefault();
    if (!revisaoConfirmada || !selecionado || selecionado.status !== "pendente") return;

    if (definirStatus(selecionado.id, "publicado")) {
      setMensagem(`“${selecionado.titulo}” foi publicado e está disponível na área do aluno.`);
      setRevisaoConfirmada(false);
    }
  }

  function retirarPublicacao() {
    if (definirStatus(selecionado.id, "pendente")) {
      setMensagem(`“${selecionado.titulo}” voltou para revisão e foi retirado da área do aluno.`);
      setRevisaoConfirmada(false);
    }
  }

  return (
    <PaginaConteudo
      etiqueta="ÁREA DO PROFESSOR"
      titulo="Revise e publique os roteiros"
      descricao="Confira o conteúdo e as referências antes de disponibilizar o material aos alunos."
    >
      <NavegacaoProfessor pagina="revisar" />

      {!carregado ? (
        <p className="mensagem" role="status">Carregando roteiros...</p>
      ) : (
        <>
          <div className="resumo-publicacao" aria-label="Resumo dos materiais">
            <p><strong>{roteiros.length}</strong><span>Roteiros no total</span></p>
            <p><strong>{roteiros.length - publicados}</strong><span>Aguardando revisão</span></p>
            <p><strong>{publicados}</strong><span>Publicados para os alunos</span></p>
          </div>

          <FiltroRoteiros
            anoSelecionado={anoSelecionado}
            disciplinaSelecionada={disciplinaSelecionada}
            disciplinas={disciplinas}
            aoMudarAno={setAnoSelecionado}
            aoMudarDisciplina={setDisciplinaSelecionada}
          />

          <label className="filtro-status">
            Situação do material
            <select value={statusSelecionado} onChange={(evento) => setStatusSelecionado(evento.target.value)}>
              <option value="todos">Todas as situações</option>
              <option value="pendente">Aguardando revisão</option>
              <option value="publicado">Publicados</option>
            </select>
          </label>

          <ListaRoteiros
            idTitulo="titulo-materiais"
            titulo="Materiais para acompanhamento"
            roteiros={filtrados}
            carregado={carregado}
            aoRevisar={abrirRevisao}
          />

          {avisoPersistencia && <p className="mensagem aviso-persistencia" role="status">{avisoPersistencia}</p>}

          {selecionado && (
            <section className="revisao-roteiro" aria-labelledby="titulo-revisao">
              <div className="titulo-lista">
                <h2 id="titulo-revisao" tabIndex={-1} ref={tituloRevisao}>Revisão do material</h2>
                <button className="botao-secundario" type="button" onClick={() => setIdSelecionado(null)}>
                  Fechar revisão
                </button>
              </div>
              <StatusRoteiro status={selecionado.status} detalhado />

              <ConteudoRoteiro roteiro={selecionado} emRevisao />

              <div className="painel acoes-revisao">
                <h2>Publicação do roteiro</h2>
                {selecionado.status === "pendente" ? (
                  <form onSubmit={publicar}>
                    <label className="confirmacao-revisao">
                      <input type="checkbox" required checked={revisaoConfirmada}
                        onChange={(evento) => setRevisaoConfirmada(evento.target.checked)} />
                      <span>Conferi o conteúdo e as referências deste roteiro e autorizo sua publicação.</span>
                    </label>
                    <button className="botao-link" type="submit" disabled={!revisaoConfirmada}>
                      Aprovar e publicar
                    </button>
                  </form>
                ) : (
                  <>
                    <p>Este roteiro já está disponível no catálogo do aluno.</p>
                    <button className="botao-secundario" type="button" onClick={retirarPublicacao}>
                      Retirar de publicação
                    </button>
                  </>
                )}
                {mensagem && <p className="feedback-publicacao" role="status">{mensagem}</p>}
              </div>
            </section>
          )}
        </>
      )}
    </PaginaConteudo>
  );
}
