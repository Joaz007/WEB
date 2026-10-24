import Link from "next/link";

export default function NavegacaoProfessor({ pagina }) {
  return (
    <nav className="abas-professor" aria-label="Opções do professor">
      <Link href="/solicitar" aria-current={pagina === "solicitar" ? "page" : undefined}>Pedir novo roteiro</Link>
      <Link href="/revisar" aria-current={pagina === "revisar" ? "page" : undefined}>Revisar materiais</Link>
    </nav>
  );
}
