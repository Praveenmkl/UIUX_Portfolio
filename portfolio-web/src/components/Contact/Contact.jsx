import { useState } from "react";
import ContactIcon from "./ContactIcons.jsx";
import "./Contact.css";

const CONTACT_CONTENT = {
  heading: "Let’s Work Together",
  description:
    "Have a project, idea, or collaboration in mind? I’d love to hear from you.",
  details: [
    {
      id: "phone",
      label: "Phone",
      value: "+94 77 814 1109",
      href: "tel:+94778141109",
    },
    {
      id: "email",
      label: "Email",
      value: "kalansooriya615@gmail.com",
      href: "mailto:kalansooriya615@gmail.com",
    },
    {
      id: "location",
      label: "Location",
      value: "Galle, Sri Lanka",
      href: null,
    },
  ],
  socialsLabel: "Find me on",
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com",
    },
    {
      id: "medium",
      label: "Medium",
      href: "https://medium.com",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com",
    },
  ],
  form: {
    heading: "Send a Message",
    submitLabel: "Send Message",
    sendingLabel: "Sending...",
    recipientEmail: "kalansooriya615@gmail.com",
    endpoint: "/api/contact",
  },
};

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

function validateForm(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a short message.";
  }

  return errors;
}

function buildMailtoHref(recipient, values) {
  const cleanName = values.name.trim();
  const cleanEmail = values.email.trim();
  const cleanSubject = values.subject.trim();
  const cleanMessage = values.message.trim();
  const subject =
    cleanSubject ||
    (cleanName ? `Portfolio Inquiry from ${cleanName}` : "Portfolio Inquiry");
  const body = `Hi Praveen,\n\n${cleanMessage}${
    cleanName ? `\n\nBest,\n${cleanName} (${cleanEmail})` : ""
  }`;
  return `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Dedicated Contact route delivering messages securely through the Vercel /api/contact endpoint.
 */
export default function Contact() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleFieldChange(field, value) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      subject: formValues.subject.trim(),
      message: formValues.message.trim(),
      honeypot: formValues.honeypot,
    };

    try {
      const response = await fetch(CONTACT_CONTENT.form.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.error ||
            "Unable to deliver your message right now. Please try again."
        );
      }

      setIsSubmitted(true);
      setFormValues(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      setSubmitError(
        error?.message ||
          "Unable to deliver your message right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="shell page-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="page-divider" aria-hidden="true" />

      <div className="contact-layout">
        <div className="contact-info">
          <header className="contact-header">
            <h1 className="contact-heading" id="contact-heading">
              {CONTACT_CONTENT.heading}
            </h1>
            <p className="contact-lead">{CONTACT_CONTENT.description}</p>
          </header>

          <ul className="contact-details-list">
            {CONTACT_CONTENT.details.map((item) => (
              <li key={item.id} className="contact-detail-item">
                <span className="contact-detail-icon">
                  <ContactIcon id={item.id} />
                </span>
                <div className="contact-detail-body">
                  <span className="contact-detail-label">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="contact-detail-link">
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-detail-value">{item.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="contact-socials-block">
            <p className="contact-socials-label">
              {CONTACT_CONTENT.socialsLabel}
            </p>
            <ul className="contact-socials-list">
              {CONTACT_CONTENT.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <ContactIcon id={social.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-form-card">
          <h2 className="contact-form-heading">
            {CONTACT_CONTENT.form.heading}
          </h2>

          {isSubmitted ? (
            <div className="contact-confirmation" role="status">
              <p className="contact-confirmation-title">
                Message sent! Thank you.
              </p>
              <p className="contact-confirmation-copy">
                Your note has been delivered directly to{" "}
                {CONTACT_CONTENT.form.recipientEmail}. I’ll get back to you
                soon.
              </p>
              <div className="contact-confirmation-actions">
                <button
                  type="button"
                  className="contact-reset-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Off-screen honeypot using opaque name and password-manager ignores so autofill leaves it untouched. */}
              <input
                type="text"
                name="honeypot_trap"
                tabIndex={-1}
                autoComplete="new-password"
                aria-hidden="true"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                className="contact-honeypot"
                value={formValues.honeypot}
                onChange={(event) =>
                  handleFieldChange("honeypot", event.target.value)
                }
              />

              <div className="contact-field-grid">
                <div className="contact-field">
                  <label htmlFor="contact-name" className="sr-only">
                    Your Name (required)
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    required
                    disabled={isSubmitting}
                    value={formValues.name}
                    onChange={(event) =>
                      handleFieldChange("name", event.target.value)
                    }
                    placeholder="Your Name *"
                    aria-invalid={Boolean(errors.name)}
                    className={`contact-input${
                      errors.name ? " is-invalid" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="contact-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email" className="sr-only">
                    Your Email (required)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={isSubmitting}
                    value={formValues.email}
                    onChange={(event) =>
                      handleFieldChange("email", event.target.value)
                    }
                    placeholder="Your Email *"
                    aria-invalid={Boolean(errors.email)}
                    className={`contact-input${
                      errors.email ? " is-invalid" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="contact-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  maxLength={200}
                  disabled={isSubmitting}
                  value={formValues.subject}
                  onChange={(event) =>
                    handleFieldChange("subject", event.target.value)
                  }
                  placeholder="Subject"
                  className="contact-input"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message" className="sr-only">
                  Your Message (required)
                </label>
                <textarea
                  id="contact-message"
                  rows="5"
                  maxLength={5000}
                  required
                  disabled={isSubmitting}
                  value={formValues.message}
                  onChange={(event) =>
                    handleFieldChange("message", event.target.value)
                  }
                  placeholder="Your Message *"
                  aria-invalid={Boolean(errors.message)}
                  className={`contact-input contact-textarea${
                    errors.message ? " is-invalid" : ""
                  }`}
                />
                {errors.message && (
                  <span className="contact-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {submitError && (
                <div className="contact-submit-error" role="alert">
                  <span>{submitError}</span>{" "}
                  <a
                    href={buildMailtoHref(
                      CONTACT_CONTENT.form.recipientEmail,
                      formValues
                    )}
                    className="contact-fallback-link"
                  >
                    Email directly &rarr;
                  </a>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="btn-pill contact-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? CONTACT_CONTENT.form.sendingLabel
                    : CONTACT_CONTENT.form.submitLabel}
                  {!isSubmitting && (
                    <span className="contact-submit-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
