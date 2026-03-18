export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-card-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-foreground font-medium">Novais Digital</span>.
          Todos os direitos reservados.
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <a href="#sobre" className="hover:text-foreground transition-colors">
            Sobre
          </a>
          <a
            href="#servicos"
            className="hover:text-foreground transition-colors"
          >
            Serviços
          </a>
          <a
            href="#portfolio"
            className="hover:text-foreground transition-colors"
          >
            Portfólio
          </a>
          <a
            href="#contato"
            className="hover:text-foreground transition-colors"
          >
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}
