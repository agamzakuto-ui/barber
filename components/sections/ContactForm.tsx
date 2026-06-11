"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { services, whatsappNumber } from "@/lib/site";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@/components/icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accessible custom dropdown so we fully control the arrow + open styling. */
function ServiceSelect({
  value,
  onChange,
  id,
  invalid,
  describedBy,
}: {
  value: string;
  onChange: (value: string) => void;
  id: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid ? "true" : undefined}
        aria-describedby={describedBy}
        className={`flex w-full items-center justify-between gap-3 border border-ink/15 bg-cream px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 ${
          open
            ? "rounded-2xl border-gold ring-2 ring-gold/30"
            : "rounded-xl focus-visible:border-gold"
        } ${invalid ? "border-red-500" : ""}`}
      >
        <span className={value ? "text-ink" : "text-stone/60"}>
          {value || "בחרו שירות"}
        </span>
        <ChevronDownIcon
          className={`me-1 h-4 w-4 shrink-0 text-stone transition-transform duration-200 ${
            open ? "rotate-180 text-gold" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-ink/10 bg-cream p-1.5 shadow-xl shadow-ink/10"
          >
            {services.map((service) => {
              const active = value === service.title;
              return (
                <li key={service.title}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(service.title);
                      setOpen(false);
                    }}
                    className={`w-full rounded-xl px-3 py-2.5 text-right text-sm transition-colors duration-150 ${
                      active
                        ? "bg-ink text-cream"
                        : "text-ink hover:bg-gold/10 hover:text-ink"
                    }`}
                  >
                    {service.title}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      <input type="hidden" name="service" value={value} />
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-stone/60 transition-colors duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const labelClass = "text-sm font-medium text-ink";

/**
 * Days the studio takes bookings: Sunday + Tuesday–Friday.
 * (JS getDay: 0 = Sunday … 6 = Saturday — Monday and Saturday are closed.)
 */
const BOOKING_DAYS = new Set([0, 2, 3, 4, 5]);

/** Israeli mobile numbers are exactly 10 digits (e.g. 0501234567). */
function isValidPhone(value: string) {
  return /^\d{10}$/.test(value.replace(/\D/g, ""));
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

/** Parse a "YYYY-MM-DD" string as a local date (avoids UTC off-by-one). */
function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isBookingDay(value: string) {
  if (!value) return false;
  return BOOKING_DAYS.has(parseLocalDate(value).getDay());
}

/** Slots every half hour from 08:00, with the last appointment at 16:30. */
function buildTimeSlots() {
  const slots: string[] = [];
  for (let hour = 8; hour < 17; hour += 1) {
    slots.push(`${pad(hour)}:00`);
    slots.push(`${pad(hour)}:30`);
  }
  return slots;
}

function formatDateLabel(value: string) {
  return parseLocalDate(value).toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const nameId = useId();
  const phoneId = useId();
  const phoneErrorId = useId();
  const serviceId = useId();
  const serviceErrorId = useId();
  const dateId = useId();
  const dateErrorId = useId();
  const messageId = useId();

  const timeSlots = useMemo(buildTimeSlots, []);
  const minDate = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }, []);

  const selectionConfirmed =
    Boolean(date) && !dateError && Boolean(time) && !editing;
  const slotsVisible = Boolean(date) && !dateError && (!time || editing);
  const dateFieldVisible = !selectionConfirmed;

  function handleDateChange(value: string) {
    setDate(value);
    setTime("");
    setTimeError(null);
    if (value && !isBookingDay(value)) {
      setDateError("אנחנו פתוחים לתורים בימים ראשון ושלישי–שישי בלבד.");
    } else {
      setDateError(null);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidPhone(phone)) {
      setPhoneError("יש להזין מספר טלפון תקין בן 10 ספרות.");
      return;
    }
    setPhoneError(null);

    if (!service) {
      setServiceError("בחרו שירות מהרשימה.");
      return;
    }
    setServiceError(null);

    if (!date || !isBookingDay(date)) {
      setDateError("בחרו תאריך פנוי (ראשון, שלישי–שישי).");
      return;
    }
    setDateError(null);

    if (!time) {
      setTimeError("בחרו שעה לתור.");
      return;
    }
    setTimeError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim() || "—";
    const note = (data.get("message") as string)?.trim();

    // Build a clear WhatsApp message and open the chat with our studio.
    const lines = [
      "שלום! אשמח לקבוע תור 💇",
      `שם: ${name}`,
      `טלפון: ${phone}`,
      `שירות: ${service}`,
      `תאריך: ${formatDateLabel(date)}`,
      `שעה: ${time}`,
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
                  pattern="[0-9]*"
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
              <ServiceSelect
                id={serviceId}
                value={service}
                onChange={(value) => {
                  setService(value);
                  if (serviceError) setServiceError(null);
                }}
                invalid={Boolean(serviceError)}
                describedBy={serviceError ? serviceErrorId : undefined}
              />
              {serviceError ? (
                <p id={serviceErrorId} className="text-xs text-red-600">
                  {serviceError}
                </p>
              ) : null}
            </div>

            <AnimatePresence initial={false}>
              {dateFieldVisible ? (
                <motion.div
                  key="date-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor={dateId} className={labelClass}>
                      תאריך מועדף
                    </label>
                    <input
                      id={dateId}
                      name="date"
                      type="date"
                      required
                      min={minDate}
                      value={date}
                      onChange={(event) => handleDateChange(event.target.value)}
                      aria-invalid={dateError ? "true" : undefined}
                      aria-describedby={dateError ? dateErrorId : undefined}
                      className={`${fieldClass} [color-scheme:light] ${
                        dateError
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : ""
                      }`}
                    />
                    {dateError ? (
                      <p id={dateErrorId} className="text-xs text-red-600">
                        {dateError}
                      </p>
                    ) : (
                      <p className="text-xs text-stone/70">
                        זמינות לתורים: ימים א׳, ג׳–ו׳, בין 08:00 ל-17:00.
                      </p>
                    )}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {slotsVisible ? (
                <motion.div
                  key="slots"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2 pt-1">
                    <span className={`${labelClass} flex items-center gap-2`}>
                      <ClockIcon className="h-4 w-4 text-gold" />
                      בחרו שעה
                    </span>
                    <div
                      role="radiogroup"
                      aria-label="שעת התור"
                      className="grid grid-cols-3 gap-2 sm:grid-cols-4"
                    >
                      {timeSlots.map((slot) => {
                        const active = time === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            dir="ltr"
                            onClick={() => {
                              setTime(slot);
                              setTimeError(null);
                              setEditing(false);
                            }}
                            className={`rounded-xl border px-2 py-2.5 text-sm font-medium tabular-nums transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
                              active
                                ? "border-ink bg-ink text-cream shadow-sm shadow-ink/20"
                                : "border-ink/15 bg-cream text-ink hover:border-gold hover:text-gold"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {timeError ? (
                      <p className="text-xs text-red-600">{timeError}</p>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {selectionConfirmed ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-ink">
                      <ClockIcon className="h-4 w-4 shrink-0 text-gold" />
                      <span>
                        {formatDateLabel(date)} · בשעה{" "}
                        <span className="font-semibold tabular-nums" dir="ltr">
                          {time}
                        </span>
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(true);
                        setTimeError(null);
                      }}
                      className="shrink-0 text-sm font-medium text-gold underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                    >
                      שינוי תאריך ושעה
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

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
              <CalendarIcon className="h-4 w-4" />
              קביעת תור
              <ArrowRightIcon className="h-4 w-4 -scale-x-100 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
