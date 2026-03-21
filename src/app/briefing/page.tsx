import { Metadata } from "next";
import BriefingWizard from "@/components/briefing/BriefingWizard";

export const metadata: Metadata = {
  title: "Briefing | Novais Digital",
  description:
    "Preencha o formulário de briefing para configurarmos seu assistente IA personalizado.",
};

export default function BriefingPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Briefing do <span className="text-accent">Assistente IA</span>
        </h1>
        <p className="text-muted max-w-lg mx-auto">
          Responda as perguntas abaixo para que possamos configurar seu assistente
          com precisão. O formulário salva automaticamente — você pode continuar
          de onde parou.
        </p>
      </div>

      <BriefingWizard />
    </main>
  );
}
