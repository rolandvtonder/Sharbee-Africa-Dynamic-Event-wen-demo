import {useRef, useState, type CSSProperties, type FormEvent, type ReactNode} from 'react';
import {useSearchParams} from 'react-router-dom';
import {contact, enquiryTypes} from '../content';
import {media} from '../lib/math';
import {useReveals} from '../hooks/useReveals';
import {usePageTitle} from '../hooks/usePageTitle';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

type Field = 'name' | 'email' | 'phone' | 'service' | 'date' | 'guests' | 'message';
type Values = Record<Field, string>;

const labels: Record<Field, string> = {
  name: 'Your name',
  email: 'Email address',
  phone: 'Phone number',
  service: 'What are you planning?',
  date: 'Preferred date',
  guests: 'Number of guests',
  message: 'Tell us about it',
};

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.name.trim()) e.name = 'Please tell us your name.';
  if (!v.email.trim()) e.email = 'Please add your email so we can reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'That email address looks incomplete — check for an @ and a domain, like name@example.com.';
  if (v.phone.trim() && v.phone.replace(/\D/g, '').length < 9) e.phone = 'Phone numbers need at least 9 digits.';
  if (!v.message.trim()) e.message = 'Please share a few details so we can start planning.';
  return e;
}

function compose(v: Values) {
  const details = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    v.date && `Preferred date: ${v.date}`,
    v.guests && `Guests: ${v.guests}`,
  ];
  return [`Hello Sharbee Africa, I'd like to enquire about: ${v.service}.`, details.filter(Boolean).join('\n'), v.message.trim()].join('\n\n');
}

/**
 * Enquiries go straight to Bernice: the form composes a WhatsApp message or an
 * email with every detail filled in, so no server or form service is needed.
 */
export function Contact() {
  const ref = useReveals<HTMLDivElement>();
  usePageTitle('Contact');
  const [params] = useSearchParams();
  const preset = enquiryTypes.find((t) => t === params.get('service')) ?? enquiryTypes[0];
  const [v, setV] = useState<Values>({name: '', email: '', phone: '', service: preset, date: '', guests: '', message: ''});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState<null | 'whatsapp' | 'email'>(null);
  const summary = useRef<HTMLDivElement>(null);

  const errors = validate(v);
  const show = (f: Field) => (touched[f] || submitted) && errors[f];
  const set = (f: Field) => (e: {target: {value: string}}) => setV((s) => ({...s, [f]: e.target.value}));
  const blur = (f: Field) => () => setTouched((t) => ({...t, [f]: true}));

  const send = (via: 'whatsapp' | 'email') => (e?: FormEvent) => {
    e?.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      window.setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    const text = compose(v);
    if (via === 'whatsapp') {
      window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${v.service}`)}&body=${encodeURIComponent(text)}`;
    }
    setSent(via);
  };

  const input = 'prose-s mt-2 block min-h-12 w-full border-b-2 border-ink/25 bg-transparent px-0 py-2 text-[17px] text-ink outline-none transition-colors focus:border-terracotta focus-visible:outline-none';
  const field = (f: Field, required: boolean, el: ReactNode) => (
    <div className={f === 'message' ? 'sm:col-span-2' : ''}>
      <label htmlFor={f} className="caps text-ink/70">
        {labels[f]}
        {required && (
          <span className="text-terracotta" aria-hidden>
            {' '}
            *
          </span>
        )}
      </label>
      {el}
      {show(f) && (
        <p id={`${f}-error`} className="prose-s mt-2 text-[15px] text-terracotta">
          {errors[f]}
        </p>
      )}
    </div>
  );
  const aria = (f: Field) => ({
    id: f,
    name: f,
    'aria-invalid': show(f) ? true : undefined,
    'aria-describedby': show(f) ? `${f}-error` : undefined,
  });

  const errorList = Object.entries(errors) as [Field, string][];

  return (
    <div ref={ref}>
      <section className="relative overflow-hidden bg-ink text-white">
        <img src={media('photos/fire-dinner.webp')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(23_17_12/0.85),rgb(23_17_12/0.3))]" />
        <div className="relative mx-auto max-w-[1680px] px-5 pt-[clamp(130px,18vh,200px)] pb-20 md:px-14 md:pb-28">
          <p className="caps text-marigold" data-reveal>
            Contact
          </p>
          <h1 className="display mt-5 text-[clamp(52px,7.6vw,138px)]" data-reveal style={d(0.1)}>
            <span className="block">Let&rsquo;s start</span>
            <span className="it block text-marigold">planning.</span>
          </h1>
          <p className="prose-s mt-6 max-w-[520px] text-white/85" data-reveal style={d(0.15)}>
            Tell us what you have in mind — a getaway, a conference, a team day or a school tour. {contact.person} will personally get back to you.
          </p>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-5 py-20 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:px-14 md:py-28">
          <form noValidate onSubmit={send('whatsapp')} aria-labelledby="form-title">
            <h2 id="form-title" className="display text-[clamp(40px,4vw,68px)]">
              Send an <span className="it text-terracotta">enquiry</span>
            </h2>
            <p className="prose-s mt-3 text-ink/70">
              Fields marked <span className="text-terracotta">*</span> are required. Your message opens in WhatsApp or your email app, ready to send.
            </p>

            {submitted && errorList.length > 0 && (
              <div ref={summary} tabIndex={-1} role="alert" className="mt-8 border-l-4 border-terracotta bg-terracotta/10 p-5 outline-none">
                <p className="display text-[24px]">Please check {errorList.length === 1 ? 'one thing' : `${errorList.length} things`}:</p>
                <ul className="mt-2 space-y-1">
                  {errorList.map(([f, msg]) => (
                    <li key={f}>
                      <a href={`#${f}`} onClick={(e) => (e.preventDefault(), document.getElementById(f)?.focus())} className="prose-s text-[15px] text-terracotta underline underline-offset-4">
                        {labels[f]}: {msg}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sent && errorList.length === 0 && (
              <p role="status" className="prose-s mt-8 border-l-4 border-olive bg-olive/10 p-5">
                {sent === 'whatsapp'
                  ? 'WhatsApp should have opened with your message ready — just press send. If it didn’t, message us on '
                  : 'Your email app should have opened with your message ready — just press send. If it didn’t, email us at '}
                <strong>{sent === 'whatsapp' ? contact.whatsapp : contact.email}</strong>.
              </p>
            )}

            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {field('name', true, <input {...aria('name')} type="text" autoComplete="name" required value={v.name} onChange={set('name')} onBlur={blur('name')} className={input} />)}
              {field('email', true, <input {...aria('email')} type="email" autoComplete="email" inputMode="email" required value={v.email} onChange={set('email')} onBlur={blur('email')} className={input} />)}
              {field('phone', false, <input {...aria('phone')} type="tel" autoComplete="tel" inputMode="tel" value={v.phone} onChange={set('phone')} onBlur={blur('phone')} className={input} />)}
              {field(
                'service',
                false,
                <select {...aria('service')} value={v.service} onChange={set('service')} className={`${input} cursor-pointer`}>
                  {enquiryTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>,
              )}
              {field('date', false, <input {...aria('date')} type="date" value={v.date} onChange={set('date')} className={input} />)}
              {field('guests', false, <input {...aria('guests')} type="number" min={1} inputMode="numeric" value={v.guests} onChange={set('guests')} className={input} />)}
              {field('message', true, <textarea {...aria('message')} rows={5} required value={v.message} onChange={set('message')} onBlur={blur('message')} className={`${input} resize-y`} />)}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button type="submit" className="caps flex min-h-12 cursor-pointer items-center bg-ink px-8 py-4 text-white transition-colors hover:bg-terracotta">
                Send via WhatsApp
              </button>
              <button type="button" onClick={send('email')} className="caps flex min-h-12 cursor-pointer items-center border border-ink px-8 py-4 transition-colors hover:bg-ink hover:text-white">
                Send via email
              </button>
            </div>
          </form>

          <aside className="space-y-10" aria-label="Contact details">
            <div className="bg-ink p-8 text-white" data-reveal>
              <p className="caps text-marigold">Speak to {contact.person}</p>
              <a href={contact.phoneHref} className="display mt-4 block text-[clamp(34px,3vw,48px)] hover:text-marigold">
                {contact.phone}
              </a>
              <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noreferrer" className="caps mt-2 inline-flex min-h-11 items-center text-white/85 hover:text-marigold">
                WhatsApp {contact.whatsapp} →
              </a>
              <a href={`mailto:${contact.email}`} className="prose-s mt-2 block break-all text-white/85 hover:text-marigold">
                {contact.email}
              </a>
              <p className="caps mt-4 text-white/55">{contact.hours}</p>
            </div>
            <div data-reveal style={d(0.1)}>
              <p className="caps text-ochre">Find us</p>
              <address className="display mt-3 text-[clamp(26px,2.2vw,34px)] not-italic">
                {contact.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={contact.mapHref} target="_blank" rel="noreferrer" className="caps mt-4 inline-flex min-h-11 items-center border-b border-ink hover:border-terracotta hover:text-terracotta">
                Open in Google Maps →
              </a>
            </div>
            <div data-reveal style={d(0.15)}>
              <p className="caps text-ochre">Follow us</p>
              <ul className="mt-3 space-y-1">
                {contact.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="display inline-flex min-h-11 items-center text-[24px] hover:text-terracotta">
                      {s.label}&nbsp;<span className="it normal-case">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
