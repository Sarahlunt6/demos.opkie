"use client";

import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site.config";

const fieldClass =
  "mt-2 w-full border border-ink-line bg-enamel px-4 py-3 text-graphite transition-colors duration-200 placeholder:text-smoke/60 focus:border-champagne";

/**
 * Contact form (PRD 4.4) — name, phone, email, preferred time, message, with
 * custom champagne focus states. This template form is not wired to a backend;
 * on submit it confirms inline. Swap the handler for a GHL/scheduling POST at
 * client handoff. Fully labelled and keyboard-operable.
 */
export function ContactForm() {
  const id = useId();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder behavior — no network request in the template.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="border border-ink-line bg-enamel p-8 text-body-lg text-graphite"
      >
        {siteConfig.contact.successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${id}-name`} className="eyebrow">
          Name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-phone`} className="eyebrow">
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="eyebrow">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-time`} className="eyebrow">
          Preferred time
        </label>
        <select
          id={`${id}-time`}
          name="preferredTime"
          defaultValue=""
          className={fieldClass}
        >
          <option value="" disabled>
            Select a time
          </option>
          {siteConfig.contact.preferredTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="eyebrow">
          What would you like to change?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-[44px] items-center justify-center border border-graphite bg-graphite px-6 py-3 text-sm font-medium text-porcelain transition-colors duration-200 hover:bg-graphite/90"
      >
        Send message
      </button>

      <p className="text-sm text-smoke">{siteConfig.contact.formNote}</p>
    </form>
  );
}
