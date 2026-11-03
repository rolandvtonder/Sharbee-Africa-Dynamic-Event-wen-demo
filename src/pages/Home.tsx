import {useState, type CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {StageHero} from '../components/StageHero';
import {Panels} from '../components/Panels';
import {CtaBand} from '../components/CtaBand';
import {experiences, home, ideas, services} from '../content';
import {media} from '../lib/math';
import {useReveals} from '../hooks/useReveals';
import {usePageTitle} from '../hooks/usePageTitle';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function Home({reduced}: {reduced: boolean}) {
  const ref = useReveals<HTMLDivElement>();
  usePageTitle();
  // The idea whose photograph fills the sticky frame; ideas without one keep the last.
  const [active, setActive] = useState(0);
  let shown = active;
  while (shown > 0 && !ideas[shown].img) shown--;
  const learners = services[3];

  return (
    <div ref={ref}>
      <StageHero tall video="hero.mp4" image="hero-poster.webp" alt={home.heroAlt} lines={home.lines} body={home.body} reduced={reduced} eyebrow="Dynamic Events & Destination Management" />

      <Panels reduced={reduced} />

      {/* Statement */}
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 py-24 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] md:px-14 md:py-36">
          <img src={media('logo.webp')} alt="Sharbee Africa logo: a woman in patterned dress and a leopard within the map of Africa" loading="lazy" className="mx-auto w-[min(70vw,360px)]" data-reveal />
          <div>
            <p className="caps text-ochre" data-reveal>
              Who we are
            </p>
            <p className="mt-6 font-serif text-[clamp(28px,3.1vw,52px)] leading-[1.12]" data-reveal style={d(0.1)}>
              {home.statement}
            </p>
            <p className="display it mt-8 text-[clamp(36px,3.6vw,60px)] text-terracotta" data-reveal style={d(0.2)}>
              {home.signoff}
            </p>
            <Link to="/about" className="caps mt-10 inline-flex min-h-11 items-center border-b border-ink pb-1 hover:border-terracotta hover:text-terracotta" data-reveal style={d(0.3)}>
              Our story →
            </Link>
          </div>
        </div>
      </section>

      {/* Ideas */}
      <section className="bg-ink text-white" aria-labelledby="ideas">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div className="max-w-[900px]">
            <p className="caps text-marigold" data-reveal>
              Inspiration
            </p>
            <h2 id="ideas" className="display mt-5 text-[clamp(46px,6vw,104px)]" data-reveal style={d(0.1)}>
              <span className="block">A few tantalising</span>
              <span className="it block text-marigold">ideas.</span>
            </h2>
            <p className="prose-s mt-6 max-w-[520px] text-white/80" data-reveal style={d(0.2)}>
              {home.ideasIntro}
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <ol>
              {ideas.map((idea, i) => (
                <li key={idea.t} className="border-t border-white/15 last:border-b" data-reveal style={d(i * 0.04)}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`flex w-full cursor-pointer items-baseline gap-5 py-5 text-left transition-colors duration-300 ${active === i ? 'text-marigold' : 'text-white hover:text-marigold'}`}
                  >
                    <span className="caps w-8 shrink-0 text-white/50">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`font-serif text-[clamp(22px,2vw,32px)] leading-tight ${active === i ? 'italic' : ''}`}>{idea.t}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="relative max-md:hidden">
              <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ochre">
                {ideas.map(
                  (idea, i) =>
                    idea.img && (
                      <img
                        key={idea.t}
                        src={media(idea.img)}
                        alt={i === shown ? idea.alt : ''}
                        aria-hidden={i !== shown}
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-silk ${i === shown ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                      />
                    ),
                )}
              </div>
            </div>
          </div>
          <p className="prose-s mt-12 max-w-[640px] text-white/80" data-reveal>
            {home.ideasOutro}
          </p>
        </div>
      </section>

      {/* Learner tours */}
      <section className="relative overflow-hidden text-white" style={{background: learners.tint}} aria-labelledby="learners">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-14 md:py-32">
          <div>
            <p className="caps text-marigold" data-reveal>
              For schools & families
            </p>
            <h2 id="learners" className="display mt-5 text-[clamp(46px,5.6vw,96px)]" data-reveal style={d(0.1)}>
              <span className="block">{learners.name[0]}</span>
              <span className="it block">{learners.name[1]}</span>
            </h2>
            <p className="prose-s mt-6 max-w-[520px] text-white/90" data-reveal style={d(0.2)}>
              {learners.intro}
            </p>
            <p className="display it mt-6 text-[clamp(24px,2.2vw,34px)] text-marigold" data-reveal style={d(0.25)}>
              Exciting interactive cultural — or thrilling wildlife — experiences.
            </p>
            <Link
              to={`/services/${learners.slug}`}
              className="caps mt-10 inline-flex min-h-12 items-center bg-paper px-8 py-4 text-ink transition-colors hover:bg-marigold"
              data-reveal
              style={d(0.3)}
            >
              About learner tours →
            </Link>
          </div>
          <img
            src={media('photos/learners.webp')}
            alt="Children playing a game together outdoors on a sunny lawn"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
            data-reveal
            style={d(0.15)}
          />
        </div>
      </section>

      {/* Weekly series */}
      <section className="bg-paper text-ink" aria-labelledby="weekly">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 id="weekly" className="display text-[clamp(46px,5.6vw,96px)]" data-reveal>
              <span className="block">Every week,</span>
              <span className="it block text-terracotta">a taste of home.</span>
            </h2>
            <Link to="/experiences" className="caps inline-flex min-h-11 items-center border-b border-ink pb-1 hover:border-terracotta hover:text-terracotta" data-reveal>
              Explore South Africa →
            </Link>
          </div>
          <div className="mt-14 grid gap-[3px] bg-ink/10 md:grid-cols-3">
            {experiences.series.map((s, i) => (
              <Link key={s.t} to="/experiences" className="group bg-paper p-8 transition-colors hover:bg-sand md:p-10" data-reveal style={d(i * 0.1)}>
                <p className="caps text-ochre">{s.day}</p>
                <h3 className="display mt-4 text-[clamp(30px,2.6vw,44px)] group-hover:italic">{s.t}</h3>
                <p className="prose-s mt-4 text-ink/75">{s.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
