"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, Phone } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { useLanguage } from "@/contexts/LanguageContext";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!data.name.trim()) errors.name = t.contact.errorName;
    if (!data.email.trim()) {
      errors.email = t.contact.errorEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = t.contact.errorEmailInvalid;
    }
    if (!data.message.trim()) errors.message = t.contact.errorMessage;
    else if (data.message.trim().length < 10) errors.message = t.contact.errorMessageShort;
    return errors;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setFormState("loading");
    setServerError("");

    try {
      const body = new URLSearchParams({
        "form-name": "kontakt",
        ...formData,
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
      setServerError(t.contact.errorServer);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    background: "var(--bg-elevated)",
    border: `1px solid ${hasError ? "#ef4444" : "var(--border-subtle)"}`,
    borderRadius: "var(--radius-input)",
    padding: "12px 16px",
    fontSize: "var(--font-body-sm)",
    color: "var(--text-primary)",
    width: "100%",
    outline: "none",
    transition: "border-color 200ms, box-shadow 200ms",
  });

  return (
    <section
      id="kontakt"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/baggrund7.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.27,
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Venstre — tekst */}
          <AnimateIn>
            <p className="eyebrow mb-4">{t.contact.eyebrow}</p>
            <h2
              className="mb-6"
              style={{
                fontSize: "var(--font-h1)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist-sans)",
                color: "var(--text-primary)",
              }}
            >
              {t.contact.headline}
            </h2>
            <p
              className="mb-10"
              style={{ fontSize: "var(--font-body)", color: "var(--text-secondary)", lineHeight: 1.7 }}
            >
              {t.contact.sub}
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:martin@dietzcc.dk"
                className="inline-flex items-center gap-3 group"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <Mail size={16} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
                </div>
                <span
                  className="text-sm font-medium transition-colors group-hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  martin@dietzcc.dk
                </span>
              </a>
              <a
                href="tel:+4522750051"
                className="inline-flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <Phone size={16} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
                </div>
                <span
                  className="text-sm font-medium transition-colors group-hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  +45 22 75 00 51
                </span>
              </a>
            </div>
          </AnimateIn>

          {/* Højre — formular */}
          <AnimateIn delay={0.15}>
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center p-12 rounded-[16px] border h-full"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "rgba(6,182,212,0.3)",
                    minHeight: "400px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                    className="mb-6 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.1)" }}
                  >
                    <CheckCircle size={32} style={{ color: "var(--success)" }} strokeWidth={1.5} />
                  </motion.div>
                  <h3
                    className="mb-3 font-semibold"
                    style={{
                      fontSize: "var(--font-h3)",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    {t.contact.successTitle}
                  </h3>
                  <p style={{ fontSize: "var(--font-body-sm)", color: "var(--text-secondary)" }}>
                    {t.contact.successBody}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  name="kontakt"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-8 rounded-[16px] border"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "var(--border-subtle)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <input type="hidden" name="form-name" value="kontakt" />
                  <div className="flex flex-col gap-5">
                    {/* Navn */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t.contact.labelName}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contact.placeholderName}
                        style={inputStyle(!!errors.name)}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--accent)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.name ? "#ef4444" : "var(--border-subtle)";
                          e.target.style.boxShadow = "none";
                        }}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs" style={{ color: "#ef4444" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* E-mail */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t.contact.labelEmail}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contact.placeholderEmail}
                        style={inputStyle(!!errors.email)}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--accent)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.email ? "#ef4444" : "var(--border-subtle)";
                          e.target.style.boxShadow = "none";
                        }}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs" style={{ color: "#ef4444" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Virksomhed */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t.contact.labelCompany}{" "}
                        <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>{t.contact.labelCompanyOpt}</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t.contact.placeholderCompany}
                        style={inputStyle(false)}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--accent)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border-subtle)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Besked */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t.contact.labelMessage}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.contact.placeholderMessage}
                        style={{
                          ...inputStyle(!!errors.message),
                          resize: "vertical",
                          minHeight: "120px",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--accent)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.message ? "#ef4444" : "var(--border-subtle)";
                          e.target.style.boxShadow = "none";
                        }}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-xs" style={{ color: "#ef4444" }}>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Server error */}
                    {serverError && formState === "error" && (
                      <p className="text-sm p-3 rounded-lg" style={{ color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca" }}>
                        {serverError}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full py-3.5 rounded-[10px] text-sm font-medium text-white transition-all duration-200 relative overflow-hidden"
                      style={{
                        background: formState === "loading" ? "var(--accent-hover)" : "var(--accent)",
                        cursor: formState === "loading" ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (formState !== "loading") {
                          (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-glow-cyan)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = formState === "loading" ? "var(--accent-hover)" : "var(--accent)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {formState === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <span
                            className="w-4 h-0.5 rounded-full"
                            style={{
                              background: "rgba(255,255,255,0.6)",
                              animation: "loading-bar 1.5s ease-in-out infinite",
                            }}
                          />
                          {t.contact.sending}
                        </span>
                      ) : (
                        t.contact.submit
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
