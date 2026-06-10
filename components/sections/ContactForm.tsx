"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { services } from "@/lib/site";
import { ArrowRightIcon } from "@/components/icons";

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-stone/60 transition-colors duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const labelClass = "text-sm font-medium text-ink";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const serviceId = useId();
  const messageId = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend wired up — surface an optimistic confirmation.
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
              תודה — נאשר את התור שלכם תוך יום עסקים אחד. שווה לעקוב אחרי תיבת
              המייל.
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
                <label htmlFor={emailId} className={labelClass}>
                  אימייל
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  className={fieldClass}
                />
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
              שליחת בקשה לתור
              <ArrowRightIcon className="h-4 w-4 -scale-x-100 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
