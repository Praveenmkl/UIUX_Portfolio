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
    recipientEmail: "kalansooriya615@gmail.com",
  },
};

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
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

function buildMailtoHref(recipient, inquiry) {
  const subject = inquiry.subject || `Portfolio Inquiry from ${inquiry.name}`;
  const body = `Hi Praveen,\n\n${inquiry.message}\n\nBest,\n${inquiry.name} (${inquiry.email})`;
  return `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Dedicated Contact route pairing direct details and social links with an accessible message form.
 */
export default function Contact() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  function handleFieldChange(field, value) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmittedInquiry({
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      subject: formValues.subject.trim(),
      message: formValues.message.trim(),
    });
    setFormValues(INITIAL_FORM);
    setErrors({});
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

          {submittedInquiry ? (
            <div className="contact-confirmation" role="status">
              <p className="contact-confirmation-title">
                Thanks, {submittedInquiry.name}. Your message is ready to send.
              </p>
              <p className="contact-confirmation-copy">
                Click below to send this directly via your email app, or start a
                new message.
              </p>
              <div className="contact-confirmation-actions">
                <a
                  href={buildMailtoHref(
                    CONTACT_CONTENT.form.recipientEmail,
                    submittedInquiry
                  )}
                  className="btn-pill contact-submit"
                >
                  Open in Email App
                  <span className="contact-submit-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
                <button
                  type="button"
                  className="contact-reset-btn"
                  onClick={() => setSubmittedInquiry(null)}
                >
                  New Message
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-field-grid">
                <div className="contact-field">
                  <label htmlFor="contact-name" className="sr-only">
                    Your Name (required)
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
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
                    required
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
                  required
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

              <div>
                <button type="submit" className="btn-pill contact-submit">
                  {CONTACT_CONTENT.form.submitLabel}
                  <span className="contact-submit-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
