"use client";

import { useEffect, useState } from "react";

export default function ApoioWikipedia({ titulo }) {
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controle = new AbortController();
    let ativo = true;
    const limite = setTimeout(() => controle.abort(), 8000);

    async function buscarResumo() {
      setCarregando(true);
      setErro(false);

      try {
        const resposta = await fetch(
          `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`,
          { signal: controle.signal }
        );
        if (!resposta.ok) throw new Error("Não foi possível consultar a Wikipédia.");
        const dados = await resposta.json();
        if (typeof dados.extract !== "string" || !dados.extract.trim()) {
          throw new Error("O artigo não tem um resumo disponível.");
        }
        if (ativo) {
          setTexto(dados.extract);
          setLink(dados.content_urls?.desktop?.page || "");
        }
      } catch {
        if (ativo) setErro(true);
      } finally {
        clearTimeout(limite);
        if (ativo) setCarregando(false);
      }
    }

    buscarResumo();
    return () => {
      ativo = false;
      clearTimeout(limite);
      controle.abort();
    };
  }, [titulo, tentativa]);

  return (
    <section className="painel">
      <h2>Texto complementar da Wikipédia</h2>

      {carregando && <p role="status">Carregando texto complementar...</p>}

      {!carregando && erro && (
        <div>
          <p role="status">
            Não foi possível carregar o texto complementar agora. Você ainda pode
            consultar o roteiro normalmente.
          </p>
          <button className="botao-secundario" type="button" onClick={() => setTentativa((atual) => atual + 1)}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && (
        <>
          <p>{texto}</p>
          {link && (
            <p>
              <a href={link} target="_blank" rel="noreferrer">
                Ler artigo completo na Wikipédia
              </a>
            </p>
          )}
        </>
      )}
    </section>
  );
}
