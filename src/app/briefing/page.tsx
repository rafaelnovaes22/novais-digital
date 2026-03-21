import { Metadata } from "next";
import BriefingWizard from "@/components/briefing/BriefingWizard";

export const metadata: Metadata = {
  title: "Começar Projeto | Novais Digital",
  description:
    "Inicie seu projeto de assistente IA em 3 passos simples. Nossa IA analisa seus materiais automaticamente.",
};

export default function BriefingPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Comece seu projeto em{" "}
          <span className="text-accent">3 passos</span>
        </h1>
        <p className="text-muted max-w-lg mx-auto">
          Envie seus dados e links — nossa IA faz o trabalho pesado de analisar
          sua empresa. Na reunião de alinhamento, você só valida o que montamos.
        </p>
      </div>

      <BriefingWizard />
    </main>
  );
}
