import professores from "../data/professores.json";
import disciplinas from "../data/disciplinas.json";
import ProfessorInfo from "./ProfessorInfo";
import QuestoesFixacao from "./QuestoesFixacao";
import ApoioWikipedia from "./ApoioWikipedia";

export default function ConteudoRoteiro({ roteiro, emRevisao = false }) {
  const Titulo = emRevisao ? "h2" : "h1";
  const professor = professores.find((item) => item.id === roteiro.professorId);
  const disciplina = disciplinas.find((item) => item.id === roteiro.disciplinaId);

  return (
    <>
      <section className="detalhe-cabecalho">
        <p className="etiqueta">{disciplina ? disciplina.nome : "Disciplina"}</p>
        <Titulo>{roteiro.titulo}</Titulo>
        <p className="tema">Tema: {roteiro.tema}</p>
        <div className="detalhe-etiquetas">
          <span>{roteiro.ano}º ano</span>
          <span>{roteiro.tempoMinutos} minutos de estudo</span>
          <span>Material gerado por IA</span>
        </div>
      </section>

      <section className="painel">
        <h2>Sobre este roteiro</h2>
        <p>{roteiro.resumo}</p>
        <p className="aviso-ia">
          Este material foi gerado com apoio de inteligência artificial e deve
          ser utilizado como material de estudo complementar.
        </p>
      </section>

      {professor && <ProfessorInfo professor={professor} disciplina={disciplina} />}
      <QuestoesFixacao questoes={roteiro.questoes} />
      <ApoioWikipedia key={roteiro.id} titulo={roteiro.artigoWikipedia} />

      <section className="painel">
        <h2>Referências para consulta</h2>
        <ul className="referencias">
          {roteiro.referencias.map((referencia) => (
            <li key={referencia.url}>
              <a href={referencia.url} target="_blank" rel="noreferrer">{referencia.titulo}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
