"use client";

import { useEffect, useState } from "react";

export default function ApoioWikipedia({ titulo }) {
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarResumo() {
      setCarregando(true);
      setErro(false);

      try {
        const tituloCodificado = encodeURIComponent(titulo);
        const resposta = await fetch(
          `https://pt.wikipedia.org/api/rest_v1/page/summary/${tituloCodificado}`
        );

        if (!resposta.ok) {
          throw new Error("Não foi possível consultar a Wikipédia.");
        }

        const dados = await resposta.json();

        if (!dados.extract) {
          throw new Error("O artigo não tem um resumo disponível.");
        }

        setTexto(dados.extract);
        setLink(dados.content_urls?.desktop?.page || "");
      } catch (erroConsulta) {
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    buscarResumo();
  }, [titulo]);

  return (
    <section className="painel">
      <h2>Texto complementar da Wikipédia</h2>

      {carregando && <p>Carregando texto complementar...</p>}

      {!carregando && erro && (
        <p>
          Não foi possível carregar o texto complementar agora. Você ainda pode
          consultar o roteiro normalmente.
        </p>
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
