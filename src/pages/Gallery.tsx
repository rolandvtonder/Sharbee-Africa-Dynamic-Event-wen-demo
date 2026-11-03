import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {contact, posts} from '../content';
import {media} from '../lib/math';
import {lockScroll} from '../lib/scroll';
import {useReveals} from '../hooks/useReveals';
import {usePageTitle} from '../hooks/usePageTitle';
import {CtaBand} from '../components/CtaBand';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

/** Sharbee Africa's own posts, in a masonry wall with an accessible lightbox. */
export function Gallery() {
  const ref = useReveals<HTMLDivElement>();
  usePageTitle('Gallery');
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((by: number) => setOpen((o) => (o === null ? o : (o + by + posts.length) % posts.length)), []);

  useEffect(() => {
    if (open === null) return;
    lockScroll(true);
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      // Keep focus inside the dialog.
      if (e.key === 'Tab') {
        const dialog = document.getElementById('lightbox');
        const items = dialog?.querySelectorAll<HTMLElement>('button:not([tabindex="-1"])');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [open === null, close, step]);

  const current = open === null ? null : posts[open];

  return (
    <div ref={ref} className="bg-ink text-white">
      <header className="mx-auto max-w-[1680px] px-5 pt-[clamp(130px,18vh,200px)] pb-14 md:px-14">
        <p className="caps text-marigold" data-reveal>
          Gallery
        </p>
        <h1 className="display mt-5 text-[clamp(52px,7.6vw,138px)]" data-reveal style={d(0.1)}>
          <span className="block">Moments,</span>
          <span className="it block text-marigold">shared.</span>
        </h1>
        <p className="prose-s mt-6 max-w-[520px] text-white/80" data-reveal style={d(0.15)}>
          Highlights, tips and tours from our Facebook page.{' '}
          <a href={contact.socials[0].href} target="_blank" rel="noreferrer" className="text-marigold underline underline-offset-4 hover:text-white">
            Follow Sharbee Africa
          </a>{' '}
          for more every week.
        </p>
      </header>

      <ul className="mx-auto max-w-[1680px] columns-1 gap-[6px] px-5 pb-28 sm:columns-2 lg:columns-3 md:px-14">
        {posts.map((p, i) => (
          <li key={p.id} className="mb-[6px] break-inside-avoid" data-reveal style={d((i % 3) * 0.08)}>
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-white/5"
              aria-label={`View larger: ${p.alt}`}
            >
              <img
                src={media(`posts/${p.id}.webp`)}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading="lazy"
                className="h-auto w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      {current && open !== null && (
        <div id="lightbox" role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[58] flex items-center justify-center bg-ink/95 p-4 md:p-16">
          <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 cursor-zoom-out" tabIndex={-1} />
          <img src={media(`posts/${current.id}.webp`)} alt={current.alt} className="relative max-h-full max-w-full object-contain shadow-2xl" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 md:p-8">
            <button type="button" onClick={() => step(-1)} className="caps min-h-11 cursor-pointer bg-paper px-5 py-3 text-ink hover:bg-marigold">
              ← Prev
            </button>
            <p className="caps text-white/70" aria-live="polite">
              {open + 1} / {posts.length}
            </p>
            <button type="button" onClick={() => step(1)} className="caps min-h-11 cursor-pointer bg-paper px-5 py-3 text-ink hover:bg-marigold">
              Next →
            </button>
          </div>
          <button ref={closeBtn} type="button" onClick={close} className="caps absolute top-4 right-4 min-h-11 cursor-pointer bg-marigold px-6 py-3 text-ink md:top-6 md:right-8">
            Close ×
          </button>
        </div>
      )}

      <CtaBand />
    </div>
  );
}
