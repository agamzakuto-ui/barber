"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { services, whatsappNumber } from "@/lib/site";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-stone/60 transition-colors duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const labelClass = "text-sm font-medium text-ink";

/** Israeli mobile numbers are exactly 10 digits (e.g. 0501234567). */
function isValidPhone(value: string) {
  return /^\d{10}$/.test(value.replace(/\D/g, ""));
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const nameId = useId();
  const phoneId = useId();
  const phoneErrorId = useId();
  const serviceId = useId();
  const messageId = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidPhone(phone)) {
      setPhoneError("יש להזין מספר טלפון תקין בן 10 ספרות.");
      return;
    }
    setPhoneError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim() || "—";
    const service = (data.get("service") as string)?.trim() || "—";
    const note = (data.get("message") as string)?.trim();

    // Build a clear WhatsApp message and open the chat with our studio.
    const lines = [
      "שלום! אשמח לקבוע תור 💇",
      `שם: ${name}`,
      `טלפון: ${phone}`,
      `שירות: ${service}`,
    ];
    if (note) lines.push(`הערה: ${note}`);

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitted(true);
  }

  return (
    <div className="relative rounded-3xl border border-ink/10 bg-white/60 p-6 shadow-xl shadow-ink/5 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[20rem] flex-col items-center justify-center gap-3 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">
              ✓
            </span>
            <h3 className="font-serif text-2xl font-semibold text-ink">
              הבקשה התקבלה
            </h3>
            <p className="max-w-sm text-sm text-stone">
              תודה — נפתחה עבורכם שיחת וואטסאפ עם ההודעה. שלחו אותה ונחזור אליכם
              תוך יום עסקים אחד.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-2 text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              שליחת בקשה נוספת
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={nameId} className={labelClass}>
                  שם מלא
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="מאיה לוי"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={phoneId} className={labelClass}>
                  טלפון
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel"
                  dir="ltr"
                  maxLength={10}
                  placeholder="0501234567"
                  aria-invalid={phoneError ? "true" : undefined}
                  aria-describedby={phoneError ? phoneErrorId : undefined}
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value.replace(/\D/g, ""));
                    if (phoneError) setPhoneError(null);
                  }}
                  className={`${fieldClass} text-right ${
                    phoneError ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
                  }`}
                />
                {phoneError ? (
                  <p id={phoneErrorId} className="text-xs text-red-600">
                    {phoneError}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={serviceId} className={labelClass}>
                שירות
              </label>
              <select
                id={serviceId}
                name="service"
                defaultValue=""
                required
                className={fieldClass}
              >
                <option value="" disabled>
                  בחרו שירות
                </option>
                {services.map((service) => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={messageId} className={labelClass}>
                משהו שכדאי שנדע?
              </label>
              <textarea
                id={messageId}
                name="message"
                rows={4}
                placeholder="אורך שיער, מטרות, ימים מועדפים…"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-gold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              <WhatsAppIcon className="h-4 w-4" />
              שליחת בקשה בוואטסאפ
              <ArrowRightIcon className="h-4 w-4 -scale-x-100 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
