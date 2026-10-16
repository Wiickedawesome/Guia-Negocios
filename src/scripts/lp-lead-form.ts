/**
 * Landing-page lead capture.
 *
 * Landing pages are stored as raw HTML — built in the admin builder or
 * generated from src/utils/landing-page-templates.ts — and rendered with
 * set:html (es/en/lp/[slug].astro) or innerHTML (es/en/lp/view.astro). The
 * forms inside that stored HTML shipped with onsubmit="event.preventDefault()"
 * plus an alert(), and nothing else, so every submission was discarded while
 * the visitor was told it had succeeded.
 *
 * Two consequences shape this module:
 *
 *  1. The stored markup is already in Firestore, so it cannot be relied on to
 *     have name/id attributes on its inputs. Fields are therefore matched by
 *     their visible label text first (the templates all use <label> inside the
 *     same wrapper div as its input), falling back to input type. name
 *     attributes are preferred when a future template provides them.
 *
 *  2. The handler is registered once, on document, in the CAPTURE phase. That
 *     is what lets it suppress the old inline onsubmit: stopping propagation
 *     during capture means the event never reaches the form, so the alert()
 *     cannot fire. Capture also covers forms injected after load, which the
 *     /lp/view shell does with innerHTML.
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { escapeHtml } from '../utils/escape-html';

const FIELD_LIMITS = {
  name: 200,
  email: 320,
  phone: 40,
  subject: 200,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Root containers that hold landing-page content, across all four renderers. */
const LP_CONTENT_SELECTOR = '.landing-page-content, #lp-content-body, #lp-live-container';

interface RawFields {
  name: string;
  email: string;
  phone: string;
  message: string;
  business: string;
  schedule: string;
}

const LABEL_PATTERNS: Array<[keyof RawFields, RegExp]> = [
  ['email', /correo|e-?mail/],
  ['phone', /tel[eé]fono|whatsapp|celular|phone/],
  ['name', /nombre|name/],
  ['business', /negocio|industria|empresa|rubro|business/],
  ['schedule', /horario|preferid|schedule/],
];

function limit(value: string, field: keyof typeof FIELD_LIMITS): string {
  return value.trim().slice(0, FIELD_LIMITS[field]);
}

/** Label text associated with a field, supporting both for/id and wrapper markup. */
function labelTextFor(form: HTMLFormElement, field: Element): string {
  const id = field.getAttribute('id');
  if (id) {
    const explicit = form.querySelector(`label[for="${CSS.escape(id)}"]`);
    if (explicit) return (explicit.textContent ?? '').toLowerCase();
  }
  // The generated templates wrap each label and its input in the same div.
  const wrapper = field.closest('div') ?? form;
  const labels = wrapper.querySelectorAll('label');
  return labels.length ? (labels[labels.length - 1].textContent ?? '').toLowerCase() : '';
}

function matchByLabel(label: string): keyof RawFields | null {
  if (!label) return null;
  for (const [field, pattern] of LABEL_PATTERNS) {
    if (pattern.test(label)) return field;
  }
  return null;
}

function matchByType(el: Element): keyof RawFields | null {
  if (el.tagName === 'TEXTAREA') return 'message';
  if (el.tagName === 'SELECT') return 'schedule';
  const type = (el.getAttribute('type') ?? 'text').toLowerCase();
  if (type === 'email') return 'email';
  if (type === 'tel') return 'phone';
  return null;
}

function readFields(form: HTMLFormElement): RawFields {
  const fields: RawFields = {
    name: '',
    email: '',
    phone: '',
    message: '',
    business: '',
    schedule: '',
  };

  const controls = form.querySelectorAll('input, select, textarea');

  controls.forEach((el) => {
    const control = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value = control.value?.trim() ?? '';
    if (!value) return;

    // An explicit name attribute always wins.
    const named = (control.getAttribute('name') ?? '') as keyof RawFields;
    if (named && named in fields) {
      if (!fields[named]) fields[named] = value;
      return;
    }

    const key = matchByLabel(labelTextFor(form, control)) ?? matchByType(control);
    if (!key) return;

    // The first non-empty value wins; extra values of the same kind (a second
    // text box, for example) are appended to 'business' so nothing is lost.
    if (!fields[key]) fields[key] = value;
    else fields.business = fields.business ? `${fields.business} | ${value}` : value;
  });

  return fields;
}

/** Replaces the form with an inline confirmation or error, matching site styling. */
function showStatus(form: HTMLFormElement, ok: boolean, text: string): void {
  let box = form.parentElement?.querySelector<HTMLElement>('.lp-lead-status') ?? null;
  if (!box) {
    box = document.createElement('div');
    box.className = 'lp-lead-status';
    form.insertAdjacentElement('afterend', box);
  }
  box.setAttribute('role', 'status');
  box.textContent = text;
  box.style.cssText = [
    'margin-top:1rem',
    'padding:1rem 1.25rem',
    'border-radius:0.75rem',
    'font-size:0.9rem',
    'font-weight:600',
    'line-height:1.5',
    `border:1px solid ${ok ? '#a7f3d0' : '#fecaca'}`,
    `background:${ok ? '#ecfdf5' : '#fef2f2'}`,
    `color:${ok ? '#065f46' : '#991b1b'}`,
  ].join(';');
}

async function submitLead(form: HTMLFormElement, isEnglish: boolean): Promise<void> {
  const raw = readFields(form);

  const name = limit(raw.name, 'name');
  const email = limit(raw.email, 'email');
  const phone = limit(raw.phone, 'phone');

  // The three templates collect different subsets: the booking form has no
  // email field at all, so a phone number satisfies the "reachable" check.
  const details = [raw.business, raw.schedule].filter(Boolean).join(' | ');
  const message =
    limit([raw.message, details].filter(Boolean).join('\n'), 'message') || (isEnglish ? '(no message)' : '(sin mensaje)');

  if (!name || (!email && !phone)) {
    showStatus(form, false, isEnglish ? 'Please enter your name and either an email address or a phone number.' : 'Indique su nombre y un correo electrónico o un teléfono.');
    return;
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    showStatus(form, false, isEnglish ? 'Please enter a valid email address.' : 'Ingrese un correo electrónico válido.');
    return;
  }

  const subject = isEnglish ? 'Landing Page Lead (EN)' : 'Consulta desde Landing Page';
  const page = window.location.pathname;

  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const originalLabel = button?.textContent ?? '';
  if (button) {
    button.disabled = true;
    button.textContent = isEnglish ? 'Sending…' : 'Enviando…';
  }

  try {
    // Same three-document contract as the contact page, so the admin
    // dashboard, the notifications bell and the e-mail extension all fire.
    // firestore.rules requires the name/email/message keys to be present, so
    // they are always written even when the form does not collect them.
    await addDoc(collection(db, 'contacts'), {
      name,
      email,
      phone,
      subject,
      message,
      source: 'landing-page',
      page,
      createdAt: serverTimestamp(),
    });

    await addDoc(collection(db, 'notifications'), {
      title: isEnglish ? 'New Landing Page Lead' : 'Nuevo Prospecto de Landing Page',
      message: `${name}${email ? ` (${email})` : ''}${phone ? ` — ${phone}` : ''}`,
      type: 'contact',
      read: false,
      link: '/admin/dashboard',
      createdAt: serverTimestamp(),
    });

    await addDoc(collection(db, 'mail'), {
      to: 'info@guianegocios.net',
      message: {
        subject: `${subject}: ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email || '—'}`,
          `Phone: ${phone || '—'}`,
          `Page: ${page}`,
          '',
          'Message:',
          message,
        ].join('\n'),
        html: [
          `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
          `<p><strong>Email:</strong> ${escapeHtml(email || '—')}</p>`,
          `<p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>`,
          `<p><strong>Page:</strong> ${escapeHtml(page)}</p>`,
          `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
        ].join(''),
      },
      createdAt: serverTimestamp(),
    });

    form.style.display = 'none';
    showStatus(
      form,
      true,
      isEnglish
        ? 'Thank you! We received your information and will contact you shortly.'
        : '¡Gracias! Recibimos su información y le contactaremos en breve.'
    );
  } catch (error) {
    console.error('[lp-lead-form] submission failed:', error);
    if (button) {
      button.disabled = false;
      button.textContent = originalLabel;
    }
    showStatus(
      form,
      false,
      isEnglish
        ? 'There was an error sending your message. Please try again or contact us on WhatsApp.'
        : 'Hubo un error al enviar su mensaje. Inténtelo de nuevo o escríbanos por WhatsApp.'
    );
  }
}

/**
 * Attaches lead capture to every form inside landing-page content.
 * Safe to call once per page.
 */
export function initLandingPageLeadForms(): void {
  document.addEventListener(
    'submit',
    (event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form || form.tagName !== 'FORM') return;
      if (!form.closest(LP_CONTENT_SELECTOR)) return;

      // Suppress the inline onsubmit (and its alert) and the native submit.
      event.preventDefault();
      event.stopPropagation();

      const isEnglish = window.location.pathname.startsWith('/en');
      void submitLead(form, isEnglish);
    },
    true
  );
}
