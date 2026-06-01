"use client";

import { Check, Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import contactData from "@/data/contact.json";
import { cn } from "@/lib/utils";

type Toast = {
  type: "success" | "error";
  message: string;
} | null;

type ContactResponse = {
  success?: boolean;
  error?: string;
};

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const isSuccess = toast?.type === "success";

  function updateForm<Key extends keyof typeof form>(
    key: Key,
    value: (typeof form)[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    if (toast) {
      setToast(null);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setToast({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (form.message.trim().length < 20) {
      setToast({ type: "error", message: contactData.messageHelp });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const responseText = await response.text();
      const payload = parseContactResponse(responseText);

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error ||
            "Message could not be sent right now. Please use the direct email link below.",
        );
      }

      setForm(initialForm);
      setToast({ type: "success", message: contactData.success });
    } catch (error) {
      setToast({
        type: "error",
        message:
          error instanceof Error ? error.message : "Unable to send message.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative overflow-hidden rounded-card border border-white/[0.08] bg-surface/70 p-6 md:p-8"
    >
      <div
        className="absolute right-0 top-0 h-48 w-48 bg-accent/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(event) => updateForm("website", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="relative grid gap-5">
        <FloatingInput
          id="name"
          label={contactData.fields.name}
          value={form.name}
          onChange={(value) => updateForm("name", value)}
          type="text"
          autoComplete="name"
        />
        <FloatingInput
          id="email"
          label={contactData.fields.email}
          value={form.email}
          onChange={(value) => updateForm("email", value)}
          type="email"
          autoComplete="email"
        />
        <FloatingInput
          id="subject"
          label={contactData.fields.subject}
          value={form.subject}
          onChange={(value) => updateForm("subject", value)}
          type="text"
          autoComplete="off"
        />
        <FloatingTextarea
          id="message"
          label={contactData.fields.message}
          value={form.message}
          onChange={(value) => updateForm("message", value)}
        />
      </div>

      <button
        type="submit"
        className={cn(
          "relative mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-button border px-5 font-mono text-[11px] uppercase tracking-[0.16em] transition active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
          isSuccess
            ? "border-success/45 bg-success/10 text-success"
            : "border-accent/45 bg-accent/10 text-accent hover:bg-accent hover:text-background",
        )}
        disabled={loading}
      >
        <span className="shimmer-line absolute inset-x-0 top-0 h-px" />
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : isSuccess ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {loading
          ? contactData.loading
          : isSuccess
            ? "message sent"
            : contactData.button}
      </button>

      {toast ? (
        <p
          className={cn(
            "mt-5 rounded-card border p-4 text-sm",
            toast.type === "success"
              ? "border-success/40 bg-success/10 text-success"
              : "border-red-500/40 bg-red-500/10 text-red-300",
          )}
          role="status"
        >
          {toast.message}
        </p>
      ) : null}
    </form>
  );
}

function parseContactResponse(responseText: string): ContactResponse {
  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText) as ContactResponse;
  } catch {
    return {};
  }
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  type,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "text" | "email";
  autoComplete: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        {label}
      </span>
      <span className="focus-trace relative block rounded-card">
        <input
          id={id}
          required
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-card bg-transparent px-4 text-sm text-white outline-none"
          type={type}
          autoComplete={autoComplete}
        />
      </span>
    </label>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        {label}
      </span>
      <span className="focus-trace relative block rounded-card">
        <textarea
          id={id}
          required
          minLength={20}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-44 w-full resize-y rounded-card bg-transparent px-4 py-3 text-sm leading-[1.8] text-white outline-none"
        />
      </span>
    </label>
  );
}
