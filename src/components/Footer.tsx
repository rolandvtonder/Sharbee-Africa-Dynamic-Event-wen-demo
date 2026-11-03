import {Link} from 'react-router-dom';
import {brand, contact, footer, nav} from '../content';
import {media} from '../lib/math';

export function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <div className="kente" aria-hidden />
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 pt-16 pb-28 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-14 md:pb-16">
        <div>
          <img src={media('logo.webp')} alt="" width={90} height={115} loading="lazy" className="h-28 w-auto" />
          <p className="display mt-6 text-[30px]">{brand.name}</p>
          <p className="caps mt-1 text-white/60">{brand.tagline}</p>
          <p className="display it mt-6 text-[22px] text-marigold">Curated with creativity.</p>
        </div>

        <div>
          <h2 className="caps text-white/50">Explore</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="display text-[22px] hover:text-marigold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="caps text-white/50">Contact {contact.person}</h2>
          <ul className="prose-s mt-4 space-y-2 text-[16px] text-white/85">
            <li>
              <a href={contact.phoneHref} className="hover:text-marigold">
                Phone {contact.phone}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-marigold">
                WhatsApp {contact.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-marigold">
                {contact.email}
              </a>
            </li>
            <li className="text-white/60">{contact.hours}</li>
          </ul>
        </div>

        <div>
          <h2 className="caps text-white/50">Find us</h2>
          <address className="prose-s mt-4 text-[16px] text-white/85 not-italic">
            {contact.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <ul className="mt-5 space-y-1">
            {contact.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className="caps text-white/85 hover:text-marigold">
                  {s.label} <span className="normal-case">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="caps border-t border-white/10 px-5 py-6 text-white/45 md:px-14">
        © {new Date().getFullYear()} {brand.long} · {footer.credit}
      </p>
    </footer>
  );
}
