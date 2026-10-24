export default function PaginaConteudo({ etiqueta, titulo, descricao, children }) {
  return (
    <main className="conteudo">
      <section className="introducao">
        <p className="etiqueta">{etiqueta}</p>
        <h1>{titulo}</h1>
        <p>{descricao}</p>
      </section>
      {children}
    </main>
  );
}
