"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

import { briefingSchema } from "@/lib/briefing/schema";
import { BriefingFormData } from "@/lib/briefing/types";
import { saveDraft, loadDraft, clearDraft, formatLastSaved } from "@/lib/briefing/storage";
import { TOTAL_STEPS } from "@/lib/briefing/constants";

import ProgressBar from "./ProgressBar";
import StepNavigation from "./StepNavigation";

import Step01Contact from "./steps/Step01Contact";
import Step02Goal from "./steps/Step02Goal";
import Step03Materials from "./steps/Step03Materials";
import StepConfirmation from "./steps/StepConfirmation";

const STEP_COMPONENTS = [Step01Contact, Step02Goal, Step03Materials];

export default function BriefingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const methods = useForm<BriefingFormData>({
    resolver: zodResolver(briefingSchema),
    mode: "onBlur",
  });

  // Carregar rascunho ao montar
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      methods.reset(draft.data as BriefingFormData);
      setCurrentStep(draft.currentStep);
      setLastSaved(formatLastSaved(draft.lastSaved));
    }
  }, []);

  const saveDraftNow = useCallback(() => {
    const data = methods.getValues();
    saveDraft({ data, currentStep });
    setLastSaved(formatLastSaved(new Date().toISOString()));
  }, [methods, currentStep]);

  // Auto-save a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(saveDraftNow, 30000);
    return () => clearInterval(interval);
  }, [saveDraftNow]);

  const goNext = async () => {
    setDirection("next");
    if (currentStep < TOTAL_STEPS) {
      saveDraftNow();
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const goPrev = () => {
    setDirection("prev");
    setCurrentStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = methods.getValues();
      // TODO: Enviar para API ou e-mail
      await new Promise((res) => setTimeout(res, 2000));
      clearDraft();
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao enviar briefing:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <StepConfirmation />;
  }

  const StepComponent = STEP_COMPONENTS[currentStep - 1];

  const variants = {
    enter: (dir: "next" | "prev") => ({
      x: dir === "next" ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "next" | "prev") => ({
      x: dir === "next" ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress */}
        <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-card-border p-6">
          <ProgressBar currentStep={currentStep} />
        </div>

        {/* Step card */}
        <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-card-border p-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>

          <StepNavigation
            currentStep={currentStep}
            onPrev={goPrev}
            onNext={goNext}
            onSaveDraft={saveDraftNow}
            isSubmitting={isSubmitting}
            lastSaved={lastSaved}
          />
        </div>
      </div>
    </FormProvider>
  );
}
