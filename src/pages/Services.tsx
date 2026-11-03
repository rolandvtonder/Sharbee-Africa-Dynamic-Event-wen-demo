import type {CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {StageHero} from '../components/StageHero';
import {CtaBand} from '../components/CtaBand';
import {services} from '../content';
import {media} from '../lib/math';
import {useReveals} from '../hooks/useReveals';
import {usePageTitle} from '../hooks/usePageTitle';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function Services({reduced}: {reduced: boolean}) {
  const ref = useReveals<HTMLDivElement>();
  usePageTitle('Services');

  return (
    <div ref={ref}>
      <StageHero
        eyebrow="Our services"
        lines={[{t: 'Designed'}, {t: 'around', i: true}, {t: 'you.'}]}
        body="Travel, events, incentives and learner tours — every one meticulously designed and customised to your unique individual needs."
        image="photos/gala.webp"
        alt="An elegantly set banquet hall lit for a gala evening"
        reduced={reduced}
      />

      <section className="bg-paper text-ink" aria-label="All services">
        <ul className="mx-auto max-w-[1680px] px-5 py-20 md:px-14 md:py-28">
          {services.map((s, i) => (
            <li key={s.slug} className="border-t border-ink/15 last:border-b" data-reveal style={d(i * 0.06)}>
              <Link to={`/services/${s.slug}`} className="group grid items-center gap-6 py-10 md:grid-cols-[80px_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)] md:gap-10">
                <span className="caps text-ink/50">0{i + 1}</span>
                <h2 className="display text-[clamp(40px,4.4vw,80px)] transition-colors duration-300 group-hover:text-terracotta">
                  <span className="block">{s.name[0]}</span>
                  <span className="it block">{s.name[1]}</span>
                </h2>
                <div>
                  <p className="prose-s text-ink/80">{s.short}</p>
                  <p className="caps mt-4 text-terracotta">
                    Explore <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
                  </p>
                </div>
                <div className="aspect-[4/3] overflow-hidden" style={{background: s.tint}}>
                  <img
                    src={media(s.hero)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title={['Not sure where', 'to begin?']} />
    </div>
  );
}
