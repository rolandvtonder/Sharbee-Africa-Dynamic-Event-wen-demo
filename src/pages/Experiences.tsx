import type {CSSProperties} from 'react';
import {StageHero} from '../components/StageHero';
import {CtaBand} from '../components/CtaBand';
import {experiences as x} from '../content';
import {media} from '../lib/math';
import {useReveals} from '../hooks/useReveals';
import {usePageTitle} from '../hooks/usePageTitle';
import {scrollToEl} from '../lib/scroll';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

const chapters = [
  {id: 'spotlight', t: 'Spotlight'},
  {id: 'facts', t: 'Fun facts'},
  {id: 'cuisine', t: 'Cultural cuisine'},
  {id: 'baobab', t: 'The baobab'},
  {id: 'tips', t: 'Travel tips'},
];

const places = [
  {t: 'Mountain peaks', img: 'photos/cape-town.webp', alt: 'Table Mountain rising above Cape Town under a blue sky'},
  {t: 'Wildlife', img: 'photos/safari-jeep.webp', alt: 'A safari vehicle in golden morning mist between acacia trees'},
  {t: 'Winelands', img: 'photos/winelands.webp', alt: 'Vineyards beneath mountain peaks in the Cape Winelands'},
  {t: 'Vibrant cultures', img: 'photos/drummers.webp', alt: 'Performers in traditional dress drumming and dancing'},
];

export function Experiences({reduced}: {reduced: boolean}) {
  const ref = useReveals<HTMLDivElement>();
  usePageTitle('Experiences');

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollToEl(el);
  };

  return (
    <div ref={ref}>
      <StageHero eyebrow="Experiences" lines={x.lines} body={x.intro} image="photos/cape-town.webp" alt="Table Mountain rising above Cape Town under a blue sky" reduced={reduced} />

      <nav aria-label="On this page" className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 text-ink backdrop-blur-md">
        <ul className="mx-auto flex max-w-[1680px] gap-6 overflow-x-auto py-3 pr-36 pl-[76px] md:pr-56 md:pl-[300px]">
          {chapters.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  jump(c.id);
                }}
                className="caps flex min-h-11 items-center hover:text-terracotta"
              >
                {c.t}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Spotlight */}
      <section id="spotlight" className="scroll-mt-16 bg-paper text-ink">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <p className="caps text-ochre" data-reveal>
            Spotlight Wednesday
          </p>
          <h2 className="display mt-5 max-w-[1100px] text-[clamp(44px,5.4vw,96px)]" data-reveal style={d(0.1)}>
            <span className="block">From mountain peaks</span>
            <span className="it block text-terracotta">to white sand beaches.</span>
          </h2>
          <p className="prose-s mt-6 max-w-[640px] text-ink/80" data-reveal style={d(0.15)}>
            South Africa is known for its vibrant cultures and unforgettable experiences — wildlife and winelands, mountains and coastline. It is host to a vast array of activities and adventures, with something for everyone from the corporate client to family and friends.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-[3px] lg:grid-cols-4">
            {places.map((p, i) => (
              <figure key={p.t} className="group relative aspect-[3/4] overflow-hidden bg-sand" data-reveal style={d(i * 0.08)}>
                <img src={media(p.img)} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105" />
                <figcaption className="display absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(23_17_12/0.75),transparent)] p-5 pt-16 text-[clamp(24px,2vw,34px)] text-white">{p.t}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Fun facts */}
      <section id="facts" className="scroll-mt-16 bg-indigo text-white">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <p className="caps text-marigold" data-reveal>
            Fun Facts Friday
          </p>
          <h2 className="display mt-5 text-[clamp(44px,5.4vw,96px)]" data-reveal style={d(0.1)}>
            <span className="block">Did you</span>
            <span className="it block text-marigold">know?</span>
          </h2>
          <ol className="mt-14 grid gap-x-14 md:grid-cols-2">
            {x.facts.map((f, i) => (
              <li key={i} className="flex gap-6 border-t border-white/20 py-8" data-reveal style={d(i * 0.06)}>
                <span className="display it text-[56px] leading-none text-marigold">{i + 1}</span>
                <p className="prose-s text-white/90">{f}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cuisine */}
      <section id="cuisine" className="scroll-mt-16 bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:px-14 md:py-32">
          <div>
            <p className="caps text-ochre" data-reveal>
              Cultural Cuisine Thursday
            </p>
            <h2 className="display mt-5 text-[clamp(44px,5vw,88px)]" data-reveal style={d(0.1)}>
              <span className="block">A taste of</span>
              <span className="it block text-terracotta">Zulu tradition.</span>
            </h2>
            <p className="prose-s mt-6 max-w-[520px] text-ink/80" data-reveal style={d(0.15)}>
              {x.cuisineIntro}
            </p>
            <img src={media('posts/588456821.webp')} alt="Bowls of uphuthu, amadumbe and isijingi on a wooden table" loading="lazy" className="mt-10 w-full" data-reveal style={d(0.2)} />
          </div>
          <dl className="self-center">
            {x.cuisine.map((c, i) => (
              <div key={c.t} className="grid gap-2 border-t border-ink/15 py-7 last:border-b sm:grid-cols-[180px_1fr] sm:gap-8" data-reveal style={d(i * 0.06)}>
                <dt className="display it text-[clamp(30px,2.4vw,40px)] text-terracotta">{c.t}</dt>
                <dd className="prose-s text-ink/85">{c.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Baobab */}
      <section id="baobab" className="scroll-mt-16 bg-marigold text-ink">
        <div className="mx-auto grid max-w-[1680px] items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-14 md:py-32">
          <div>
            <p className="caps text-ink/70" data-reveal>
              The Tree of Life
            </p>
            <h2 className="display mt-5 text-[clamp(44px,5vw,88px)]" data-reveal style={d(0.1)}>
              <span className="block">Facts about the</span>
              <span className="it block">baobab tree.</span>
            </h2>
            <ul className="mt-10">
              {x.baobab.map((b, i) => (
                <li key={b} className="display flex gap-5 border-t border-ink/25 py-4 text-[clamp(22px,1.9vw,30px)]" data-reveal style={d(i * 0.05)}>
                  <span className="caps w-6 shrink-0 pt-2 text-ink/60">{String(i + 1).padStart(2, '0')}</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <img src={media('posts/589359137.webp')} alt="Illustrated poster of a baobab tree in a golden savanna" loading="lazy" className="mx-auto w-full max-w-[520px] shadow-[0_30px_60px_rgb(0_0_0/0.25)]" data-reveal style={d(0.15)} />
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="scroll-mt-16 bg-ink text-white">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <p className="caps text-marigold" data-reveal>
            Travel tips
          </p>
          <h2 className="display mt-5 text-[clamp(44px,5.4vw,96px)]" data-reveal style={d(0.1)}>
            <span className="block">Travel</span>
            <span className="it block text-marigold">well.</span>
          </h2>
          <div className="mt-14 grid gap-[3px] bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {x.tips.map((t, i) => (
              <article key={t.t} className="bg-ink p-7" data-reveal style={d(i * 0.06)}>
                <span className="caps text-white/50">Tip 0{i + 1}</span>
                <h3 className="display mt-4 text-[clamp(26px,2vw,32px)]">{t.t}</h3>
                <p className="prose-s mt-3 text-[16px] text-white/80">{t.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={['Come and see', 'for yourself.']} />
    </div>
  );
}
