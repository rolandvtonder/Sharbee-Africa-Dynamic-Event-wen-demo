import {useEffect, useRef, type ReactNode} from 'react';
import type {Line} from '../content';
import {clamp, media} from '../lib/math';
import {onFrame} from '../lib/scroll';

type Props = {
  lines: Line[];
  body?: string;
  eyebrow?: string;
  /** A looping film; falls back to `image` as its poster. */
  video?: string;
  image: string;
  alt: string;
  /** Full-screen on the home page; a little shorter on inner pages. */
  tall?: boolean;
  reduced: boolean;
  children?: ReactNode;
};

/**
 * The hero every page opens with: a film or photograph under a large
 * condensed headline that mixes upright and italic lines. As you scroll on,
 * the stage blurs, dims and shrinks back — a camera pulling away, not a fade.
 */
export function StageHero({lines, body, eyebrow, video, image, alt, tall, reduced, children}: Props) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const h = window.innerHeight;
        const p = clamp(-r.top / h);
        const v = film.current;
        if (v && !reduced) {
          if (p < 0.98 && v.paused) void v.play().catch(() => {});
          if (p >= 0.98 && !v.paused) v.pause();
        }
        if (stage.current && !reduced) {
          stage.current.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
          stage.current.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
        }
      }),
    [reduced],
  );

  return (
    <section ref={root} className={`relative overflow-hidden bg-ink ${tall ? 'h-svh min-h-[620px]' : 'h-[88svh] min-h-[560px]'}`}>
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {video ? (
          <video
            ref={film}
            className="h-full w-full object-cover"
            src={media(video)}
            poster={media(image)}
            muted
            loop
            playsInline
            autoPlay={!reduced}
            preload="auto"
            aria-label={alt}
          />
        ) : (
          <img src={media(image)} alt={alt} className="h-full w-full object-cover" fetchPriority="high" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(23_17_12/0.62),rgb(23_17_12/0.15)_60%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgb(23_17_12/0.55),transparent)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(110px,15vh,170px)] md:px-14">
          {eyebrow && <p className="caps mb-6 text-marigold">{eyebrow}</p>}
          <h1 className="display text-[clamp(50px,7.6vw,138px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            {lines.map((l, i) => (
              <span key={l.t} className={`block ${l.i ? 'it' : ''} ${i === 0 ? 'pl-[1.2em] max-sm:pl-0' : ''}`}>
                {l.t}
              </span>
            ))}
          </h1>
          {body && <p className="prose-s mt-8 ml-[clamp(0px,19vw,330px)] max-w-[420px] text-white/90 max-md:ml-0">{body}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
