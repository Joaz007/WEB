import "./globals.css";
import Link from "next/link";
import RoteirosProvider from "../components/RoteirosProvider";

export const metadata = {
  title: "Roteiros de Estudo",
  description: "Catálogo de roteiros de estudo para alunos."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <RoteirosProvider>
          <header className="cabecalho">
            <Link className="marca" href="/">ESCOLA</Link>
            <nav aria-label="Áreas da plataforma">
              <Link href="/">Área do aluno</Link>
              <Link href="/solicitar">Área do professor</Link>
            </nav>
          </header>
          {children}
          <footer className="rodape">
            Projeto acadêmico — materiais de exemplo gerados para demonstração.
          </footer>
        </RoteirosProvider>
      </body>
    </html>
  );
}
