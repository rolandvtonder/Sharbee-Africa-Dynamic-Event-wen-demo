import type {CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {contact} from '../content';

/** The closing call to action at the foot of each page. */
export function CtaBand({title = ['Let us design', 'your journey.'], service}: {title?: [string, string]; service?: string}) {
  const to = service ? `/contact?service=${encodeURIComponent(service)}` : '/contact';
  return (
    <section className="bg-marigold text-ink">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-10 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-14 md:py-32">
        <h2 className="display text-[clamp(46px,6.4vw,112px)]" data-reveal>
          <span className="block">{title[0]}</span>
          <span className="it block">{title[1]}</span>
        </h2>
        <div className="flex flex-col gap-3 md:items-end" data-reveal style={{'--d': '0.15s'} as CSSProperties}>
          <Link to={to} className="caps flex min-h-12 items-center justify-center bg-ink px-9 py-4 text-white transition-colors hover:bg-terracotta">
            Send an enquiry
          </Link>
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="caps flex min-h-12 items-center justify-center border border-ink px-9 py-4 transition-colors hover:bg-ink hover:text-white"
          >
            WhatsApp {contact.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
