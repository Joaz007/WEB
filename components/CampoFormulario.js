export default function CampoFormulario({ id, rotulo, ajuda, erro, children, larguraTotal = false }) {
  return (
    <div className={`campo-formulario${larguraTotal ? " campo-inteiro" : ""}`}>
      <label htmlFor={id}>{rotulo}</label>
      {children}
      {ajuda && <p className="ajuda-campo" id={`${id}-ajuda`}>{ajuda}</p>}
      {erro && <p className="erro-campo" id={`${id}-erro`}>{erro}</p>}
    </div>
  );
}
