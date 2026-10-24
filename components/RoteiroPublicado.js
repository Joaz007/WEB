"use client";

import Link from "next/link";
import { useRoteiros } from "./RoteirosProvider";
import ConteudoRoteiro from "./ConteudoRoteiro";
import PaginaMensagem from "./PaginaMensagem";

export default function RoteiroPublicado({ id }) {
  const { roteiros, carregado } = useRoteiros();
  const roteiro = roteiros.find((item) => item.id === id);

  if (!carregado) {
    return <main className="conteudo"><p role="status">Carregando roteiro...</p></main>;
  }

  if (!roteiro || roteiro.status !== "publicado") {
    return (
      <PaginaMensagem
        titulo="Roteiro ainda não publicado"
        mensagem="Este material está aguardando revisão e publicação pelo professor."
      />
    );
  }

  return (
    <main className="conteudo pagina-detalhe">
      <Link className="voltar" href="/">← Voltar para os roteiros</Link>
      <ConteudoRoteiro roteiro={roteiro} />
    </main>
  );
}
