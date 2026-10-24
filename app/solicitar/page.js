import disciplinas from "../../data/disciplinas.json";
import FormularioSolicitacao from "../../components/FormularioSolicitacao";
import NavegacaoProfessor from "../../components/NavegacaoProfessor";
import PaginaConteudo from "../../components/PaginaConteudo";

export default function SolicitarPage() {
  return (
    <PaginaConteudo
      etiqueta="ÁREA DO PROFESSOR"
      titulo="Peça um novo roteiro de estudo"
      descricao="Conte o que sua turma precisa estudar e quando pretende usar o material."
    >
      <NavegacaoProfessor pagina="solicitar" />
      <FormularioSolicitacao disciplinas={disciplinas} />
    </PaginaConteudo>
  );
}
