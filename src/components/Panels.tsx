import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {panels} from '../content';
import {media} from '../lib/math';

/**
 * Three tall panels slide in from the right one after another, each a third
 * of ONE aerial film of zebra and wildebeest grazing (so the three panels cost
 * one download). Each panel shows its own slice of the same video; the second
 * and third are kept in sync with the first so the picture never tears.
 */
export function Panels({reduced}: {reduced: boolean}) {
  const root = useRef<HTMLElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true);
        if (reduced) return;
        const list = vids.current.filter(Boolean) as HTMLVideoElement[];
        list.forEach((v) => (e.isIntersecting ? void v.play().catch(() => {}) : v.pause()));
      },
      {threshold: 0.2},
    );
    io.observe(el);

    // Keep the three slices locked to the first.
    const sync = window.setInterval(() => {
      const [lead, ...rest] = vids.current;
      if (!lead) return;
      rest.forEach((v) => {
        if (v && Math.abs(v.currentTime - lead.currentTime) > 0.06) v.currentTime = lead.currentTime;
      });
    }, 500);
    return () => {
      io.disconnect();
      window.clearInterval(sync);
    };
  }, [reduced]);

  return (
    <section ref={root} aria-labelledby="what-we-do" className="relative bg-ink">
      <h2 id="what-we-do" className="sr-only">
        What we do
      </h2>
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {panels.map((s, i) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[78svh] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: s.tint}}
          >
            {/* One slice of the shared film: the video is three panels wide, shifted per panel. */}
            <video
              ref={(v) => {
                vids.current[i] = v;
              }}
              className="absolute top-0 h-full max-w-none object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
              style={{width: '300%', left: `${-100 * i}%`}}
              src={media('herd.mp4')}
              poster={media('herd-poster.webp')}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
            <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-80" style={{background: `linear-gradient(180deg, ${s.tint}e6, ${s.tint}55 45%, transparent 70%)`}} />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgb(23_17_12/0.7),transparent)]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-24 md:p-9 md:pt-28">
              <div>
                <p className="caps text-white/80">0{i + 1} — What we do</p>
                <h3 className="display mt-4 text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{s.name[0]}</span>
                  <span className="it block">{s.name[1]}</span>
                </h3>
                <p className={`prose-s mt-5 max-w-[340px] text-white/90 transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>{s.short}</p>
              </div>
              <ul className={`space-y-1 transition-opacity delay-[1600ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                {s.includes.slice(0, 3).map((x) => (
                  <li key={x} className="caps text-[13px] text-white">
                    {x}
                  </li>
                ))}
                <li className="caps pt-4 text-marigold">
                  Explore <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
                </li>
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
