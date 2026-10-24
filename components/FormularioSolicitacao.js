"use client";

import { useEffect, useRef, useState } from "react";
import CampoFormulario from "./CampoFormulario";

const ANOS_ESCOLARES = [6, 7, 8, 9];

const CAMPOS_INICIAIS = {
  nome: "", email: "", disciplinaId: "", ano: "", tema: "", quantidadeQuestoes: "3", dataUso: ""
};

function hojeNoBrasil(agora = new Date()) {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(agora);
  const valores = Object.fromEntries(partes.map(({ type, value }) => [type, value]));
  return `${valores.year}-${valores.month}-${valores.day}`;
}

function somarDias(dataISO, dias) {
  const data = new Date(`${dataISO}T12:00:00Z`);
  data.setUTCDate(data.getUTCDate() + dias);
  return data.toISOString().slice(0, 10);
}

function dataValida(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const data = new Date(`${valor}T12:00:00Z`);
  return !Number.isNaN(data.getTime()) && data.toISOString().slice(0, 10) === valor;
}

function validarSolicitacao(valores, disciplinas, hoje = hojeNoBrasil()) {
  const erros = {};
  if (!valores.nome.trim()) erros.nome = "Informe o nome do professor.";
  if (!/^[^\s@]+@escola\.educa\.gov\.br$/i.test(valores.email.trim())) {
    erros.email = "Use um e-mail institucional terminado em @escola.educa.gov.br.";
  }
  if (!disciplinas.some((disciplina) => String(disciplina.id) === valores.disciplinaId)) {
    erros.disciplinaId = "Selecione uma disciplina da lista.";
  }
  if (!ANOS_ESCOLARES.some((ano) => String(ano) === valores.ano)) {
    erros.ano = "Selecione um ano do 6º ao 9º.";
  }
  if (!valores.tema.trim()) erros.tema = "Informe o tema do roteiro.";

  const quantidade = Number(valores.quantidadeQuestoes);
  if (!valores.quantidadeQuestoes.trim() || !Number.isInteger(quantidade) || quantidade < 3 || quantidade > 10) {
    erros.quantidadeQuestoes = "Escolha uma quantidade inteira entre 3 e 10 questões.";
  }
  if (!dataValida(valores.dataUso)) {
    erros.dataUso = "Informe uma data válida para usar o material.";
  } else if (valores.dataUso < somarDias(hoje, 7)) {
    erros.dataUso = "Escolha uma data com pelo menos 7 dias de antecedência.";
  }
  return erros;
}

function normalizarSolicitacao(valores) {
  return {
    ...valores,
    nome: valores.nome.trim(),
    email: valores.email.trim().toLowerCase(),
    tema: valores.tema.trim(),
    disciplinaId: Number(valores.disciplinaId),
    ano: Number(valores.ano),
    quantidadeQuestoes: Number(valores.quantidadeQuestoes)
  };
}

export default function FormularioSolicitacao({ disciplinas }) {
  const [valores, setValores] = useState(CAMPOS_INICIAIS);
  const [erros, setErros] = useState({});
  const [resultado, setResultado] = useState(null);
  const [dataMinima, setDataMinima] = useState("");
  const avisoResultado = useRef(null);

  useEffect(() => setDataMinima(somarDias(hojeNoBrasil(), 7)), []);
  useEffect(() => {
    if (resultado) avisoResultado.current?.focus();
  }, [resultado]);

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setValores((atuais) => ({ ...atuais, [name]: value }));
    setErros((atuais) => {
      const atualizados = { ...atuais };
      delete atualizados[name];
      return atualizados;
    });
    setResultado(null);
  }

  function atributosCampo(nome, temAjuda = false) {
    return {
      id: nome, name: nome, value: valores[nome], onChange: alterarCampo, required: true,
      "aria-invalid": Boolean(erros[nome]),
      "aria-describedby": [temAjuda && `${nome}-ajuda`, erros[nome] && `${nome}-erro`].filter(Boolean).join(" ") || undefined
    };
  }

  function enviar(evento) {
    evento.preventDefault();
    const hoje = hojeNoBrasil();
    setDataMinima(somarDias(hoje, 7));
    const novosErros = validarSolicitacao(valores, disciplinas, hoje);
    setErros(novosErros);
    setResultado(Object.keys(novosErros).length
      ? { tipo: "erro" }
      : { tipo: "sucesso", pedido: normalizarSolicitacao(valores) });
  }

  const pedido = resultado?.pedido;
  const disciplina = pedido && disciplinas.find((item) => item.id === pedido.disciplinaId);

  return (
    <>
      <form className="painel formulario-solicitacao" onSubmit={enviar} noValidate>
        <h2>Dados da solicitação</h2>
        <p>Todos os campos são obrigatórios. A revisão do material leva pelo menos uma semana.</p>
        {resultado?.tipo === "erro" && (
          <div className="resumo-erros" role="alert" tabIndex={-1} ref={avisoResultado}>
            <strong>Revise os campos antes de continuar.</strong>
            <ul>{Object.entries(erros).map(([campo, erro]) => <li key={campo}><a href={`#${campo}`}>{erro}</a></li>)}</ul>
          </div>
        )}

        <div className="grade-formulario">
          <CampoFormulario id="nome" rotulo="Nome do professor" erro={erros.nome}>
            <input {...atributosCampo("nome")} type="text" autoComplete="name" />
          </CampoFormulario>
          <CampoFormulario id="email" rotulo="E-mail institucional" ajuda="Deve terminar em @escola.educa.gov.br." erro={erros.email}>
            <input {...atributosCampo("email", true)} type="email" autoComplete="email" placeholder="nome@escola.educa.gov.br" />
          </CampoFormulario>
          <CampoFormulario id="disciplinaId" rotulo="Disciplina" erro={erros.disciplinaId}>
            <select {...atributosCampo("disciplinaId")}>
              <option value="">Selecione a disciplina</option>
              {disciplinas.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
            </select>
          </CampoFormulario>
          <CampoFormulario id="ano" rotulo="Ano escolar" erro={erros.ano}>
            <select {...atributosCampo("ano")}>
              <option value="">Selecione o ano</option>
              {ANOS_ESCOLARES.map((ano) => <option key={ano} value={ano}>{ano}º ano</option>)}
            </select>
          </CampoFormulario>
          <CampoFormulario id="tema" rotulo="Tema do roteiro" erro={erros.tema} larguraTotal>
            <textarea {...atributosCampo("tema")} rows={3} placeholder="Descreva o assunto que os alunos vão estudar." />
          </CampoFormulario>
          <CampoFormulario id="quantidadeQuestoes" rotulo="Quantidade de questões" ajuda="Informe um número inteiro de 3 a 10." erro={erros.quantidadeQuestoes}>
            <input {...atributosCampo("quantidadeQuestoes", true)} type="number" min="3" max="10" step="1" inputMode="numeric" />
          </CampoFormulario>
          <CampoFormulario id="dataUso" rotulo="Data de uso do material" ajuda="Escolha uma data com pelo menos 7 dias de antecedência." erro={erros.dataUso}>
            <input {...atributosCampo("dataUso", true)} type="date" min={dataMinima || undefined} />
          </CampoFormulario>
        </div>
        <div className="rodape-formulario">
          <p className="ajuda-campo">Nesta demonstração, o pedido fica apenas na tela e não é enviado.</p>
          <button className="botao-link" type="submit">Validar solicitação</button>
        </div>
      </form>

      {pedido && (
        <section className="painel pedido-confirmado" role="status" tabIndex={-1} ref={avisoResultado} aria-labelledby="titulo-confirmacao">
          <p className="etiqueta">DADOS CONFERIDOS</p>
          <h2 id="titulo-confirmacao">Pedido validado com sucesso</h2>
          <p>Confira o resumo abaixo. Nenhum dado foi enviado a um servidor.</p>
          <dl className="resumo-pedido">
            <div><dt>Professor</dt><dd>{pedido.nome}</dd></div>
            <div><dt>E-mail institucional</dt><dd>{pedido.email}</dd></div>
            <div><dt>Disciplina</dt><dd>{disciplina.nome}</dd></div>
            <div><dt>Ano escolar</dt><dd>{pedido.ano}º ano</dd></div>
            <div><dt>Tema</dt><dd>{pedido.tema}</dd></div>
            <div><dt>Questões</dt><dd>{pedido.quantidadeQuestoes}</dd></div>
            <div><dt>Data de uso</dt><dd>{pedido.dataUso.split("-").reverse().join("/")}</dd></div>
          </dl>
        </section>
      )}
    </>
  );
}
