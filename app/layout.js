import "./globals.css";

export const metadata = {
  title: "Roteiros de Estudo",
  description: "Catálogo de roteiros de estudo para alunos."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="cabecalho">
          <a className="marca" href="/">ESCOLA</a>
          <nav>
            <a href="/">Catálogo</a>
            <a href="/solicitar">Área do professor</a>
          </nav>
        </header>
        {children}
        <footer className="rodape">
          Projeto acadêmico — materiais de exemplo gerados para demonstração.
        </footer>
      </body>
    </html>
  );
}
