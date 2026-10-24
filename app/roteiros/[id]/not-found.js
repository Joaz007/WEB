import PaginaMensagem from "../../../components/PaginaMensagem";

export default function RoteiroNaoEncontrado() {
  return (
    <PaginaMensagem
      titulo="Roteiro não encontrado"
      mensagem="Esse roteiro não existe ou não está disponível."
    />
  );
}
