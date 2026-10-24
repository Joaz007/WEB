import RoteiroCard from "./RoteiroCard";

export default function ListaRoteiros({ idTitulo, titulo, roteiros, carregado, aoRevisar }) {
  return (
    <section aria-labelledby={idTitulo}>
      <div className="titulo-lista">
        <h2 id={idTitulo}>{titulo}</h2>
        {carregado && <span>{roteiros.length} {roteiros.length === 1 ? "material" : "materiais"}</span>}
      </div>
      {!carregado ? (
        <p className="mensagem" role="status">Carregando roteiros...</p>
      ) : roteiros.length === 0 ? (
        <p className="mensagem">Nenhum roteiro encontrado com esses filtros.</p>
      ) : (
        <div className="grade-roteiros">
          {roteiros.map((roteiro) => (
            <RoteiroCard key={roteiro.id} roteiro={roteiro} aoRevisar={aoRevisar} />
          ))}
        </div>
      )}
    </section>
  );
}
