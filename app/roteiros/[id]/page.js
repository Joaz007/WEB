import { notFound } from "next/navigation";
import roteiros from "../../../data/roteiros.json";
import professores from "../../../data/professores.json";
import disciplinas from "../../../data/disciplinas.json";
import ProfessorInfo from "../../../components/ProfessorInfo";
import QuestoesFixacao from "../../../components/QuestoesFixacao";
import ApoioWikipedia from "../../../components/ApoioWikipedia";

export function generateStaticParams() {
  return roteiros.map((roteiro) => ({
    id: roteiro.id
  }));
}

export default async function PaginaRoteiro({ params }) {
  const { id } = await params;
  const roteiro = roteiros.find((item) => item.id === id);

  if (!roteiro) {
    notFound();
  }

  const professor = professores.find(
    (item) => item.id === roteiro.professorId
  );

  const disciplina = disciplinas.find(
    (item) => item.id === roteiro.disciplinaId
  );

  return (
    <main className="conteudo pagina-detalhe">
      <a className="voltar" href="/">← Voltar para os roteiros</a>

      <section className="detalhe-cabecalho">
        <p className="etiqueta">{disciplina ? disciplina.nome : "Disciplina"}</p>
        <h1>{roteiro.titulo}</h1>
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

      {professor && (
        <ProfessorInfo professor={professor} disciplina={disciplina} />
      )}

      <QuestoesFixacao questoes={roteiro.questoes} />

      <ApoioWikipedia titulo={roteiro.artigoWikipedia} />
    </main>
  );
}
