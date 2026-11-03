import type {CSSProperties} from 'react';
import {Link, useParams} from 'react-router-dom';
import {StageHero} from '../components/StageHero';
import {CtaBand} from '../components/CtaBand';
import {enquiryTypes, services} from '../content';
import {media} from '../lib/math';
import {useReveals} from '../hooks/useReveals';
import {usePageTitle} from '../hooks/usePageTitle';
import {NotFound} from './NotFound';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function ServiceDetail({reduced}: {reduced: boolean}) {
  const {slug} = useParams();
  const ref = useReveals<HTMLDivElement>();
  const index = services.findIndex((s) => s.slug === slug);
  const s = services[index];
  usePageTitle(s ? `${s.name[0]} ${s.name[1]}` : 'Not found');
  if (!s) return <NotFound />;

  const next = services[(index + 1) % services.length];

  return (
    <div ref={ref}>
      <StageHero eyebrow={`Service 0${index + 1}`} lines={[{t: s.name[0]}, {t: s.name[1], i: true}]} body={s.short} image={s.hero} alt={s.heroAlt} reduced={reduced} />

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:px-14 md:py-32">
          <p className="font-serif text-[clamp(26px,2.6vw,44px)] leading-[1.18]" data-reveal>
            {s.intro}
          </p>
          <div data-reveal style={d(0.1)}>
            <h2 className="caps text-ochre">What we take care of</h2>
            <ul className="mt-5 border-t border-ink/15">
              {s.includes.map((x) => (
                <li key={x} className="display flex items-center gap-4 border-b border-ink/15 py-3.5 text-[clamp(22px,1.8vw,28px)]">
                  <span aria-hidden className="size-2 shrink-0 rotate-45" style={{background: s.tint}} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="text-white" style={{background: s.tint}} aria-labelledby="highlights">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <h2 id="highlights" className="display text-[clamp(44px,5vw,88px)]" data-reveal>
            <span className="block">Experiences</span>
            <span className="it block">to consider.</span>
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {s.highlights.map((h, i) => (
              <article key={h.t} data-reveal style={d(i * 0.1)}>
                <div className="aspect-[4/5] overflow-hidden bg-ink/20">
                  <img src={media(s.photos[i].src)} alt={s.photos[i].alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <h3 className="display mt-6 text-[clamp(28px,2.2vw,38px)]">{h.t}</h3>
                <p className="prose-s mt-2 text-white/90">{h.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <Link to={`/services/${next.slug}`} className="group mx-auto flex max-w-[1680px] flex-col gap-4 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-14">
          <div>
            <p className="caps text-white/55">Next service</p>
            <p className="display mt-3 text-[clamp(40px,5vw,88px)] transition-colors group-hover:text-marigold">
              {next.name[0]} <span className="it">{next.name[1]}</span>
            </p>
          </div>
          <span className="caps text-marigold">
            Continue <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
          </span>
        </Link>
      </section>

      <CtaBand title={['Let us plan', 'yours.']} service={enquiryTypes[index]} />
    </div>
  );
}
