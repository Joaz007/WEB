import Link from "next/link";

export default function PaginaMensagem({ titulo, mensagem }) {
  return (
    <main className="conteudo">
      <section className="painel">
        <h1>{titulo}</h1>
        <p>{mensagem}</p>
        <Link className="botao-link" href="/">Voltar ao catálogo</Link>
      </section>
    </main>
  );
}
