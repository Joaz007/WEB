"use client";

import { createContext, useContext, useEffect, useState } from "react";
import roteirosIniciais from "../data/roteiros.json";

const CHAVE_ARMAZENAMENTO = "roteiros-estudo:publicacao:v1";
const RoteirosContext = createContext(null);

function carregarPublicacoes(valorSalvo) {
  const publicacoes = valorSalvo ? JSON.parse(valorSalvo) : {};

  if (!publicacoes || typeof publicacoes !== "object" || Array.isArray(publicacoes)) {
    throw new Error("Publicações salvas em formato inválido.");
  }

  return roteirosIniciais.map((roteiro) => {
    const statusSalvo = publicacoes[roteiro.id];
    const statusValido = statusSalvo === "publicado" || statusSalvo === "pendente";
    return { ...roteiro, status: statusValido ? statusSalvo : roteiro.status };
  });
}

export default function RoteirosProvider({ children }) {
  const [roteiros, setRoteiros] = useState(roteirosIniciais);
  const [carregado, setCarregado] = useState(false);
  const [avisoPersistencia, setAvisoPersistencia] = useState("");

  useEffect(() => {
    function recuperarPublicacoes(valorSalvo) {
      try {
        setRoteiros(carregarPublicacoes(valorSalvo));
        setAvisoPersistencia("");
      } catch {
        setRoteiros(roteirosIniciais);
        setAvisoPersistencia(
          "Não foi possível recuperar as publicações salvas. Os materiais de exemplo foram carregados."
        );
      }
    }

    try {
      recuperarPublicacoes(window.localStorage.getItem(CHAVE_ARMAZENAMENTO));
    } catch {
      setAvisoPersistencia(
        "O armazenamento deste navegador está indisponível. As alterações serão mantidas somente enquanto esta página estiver aberta."
      );
    }

    setCarregado(true);

    function sincronizarPublicacoes(evento) {
      if (evento.key === CHAVE_ARMAZENAMENTO || evento.key === null) {
        recuperarPublicacoes(evento.newValue);
      }
    }

    window.addEventListener("storage", sincronizarPublicacoes);
    return () => window.removeEventListener("storage", sincronizarPublicacoes);
  }, []);

  function definirStatus(id, status) {
    if (
      !carregado ||
      !roteiros.some((roteiro) => roteiro.id === id) ||
      !["publicado", "pendente"].includes(status)
    ) {
      return false;
    }

    const atualizados = roteiros.map((roteiro) =>
      roteiro.id === id ? { ...roteiro, status } : roteiro
    );
    setRoteiros(atualizados);

    try {
      const publicacoes = Object.fromEntries(
        atualizados.map((roteiro) => [roteiro.id, roteiro.status])
      );
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(publicacoes));
      setAvisoPersistencia("");
    } catch {
      setAvisoPersistencia(
        "Não foi possível salvar a alteração neste navegador. Ela será mantida somente enquanto esta página estiver aberta."
      );
    }

    return true;
  }

  return (
    <RoteirosContext.Provider value={{ roteiros, carregado, definirStatus, avisoPersistencia }}>
      {children}
    </RoteirosContext.Provider>
  );
}

export function useRoteiros() {
  const contexto = useContext(RoteirosContext);
  if (!contexto) throw new Error("useRoteiros deve ser usado dentro de RoteirosProvider.");
  return contexto;
}
