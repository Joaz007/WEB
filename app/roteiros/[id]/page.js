import { notFound } from "next/navigation";
import roteiros from "../../../data/roteiros.json";
import RoteiroPublicado from "../../../components/RoteiroPublicado";

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

  return <RoteiroPublicado id={id} />;
}
