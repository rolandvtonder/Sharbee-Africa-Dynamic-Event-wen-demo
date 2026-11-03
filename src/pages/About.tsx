import type {CSSProperties} from 'react';
import {StageHero} from '../components/StageHero';
import {CtaBand} from '../components/CtaBand';
import {about, contact} from '../content';
import {media} from '../lib/math';
import {useReveals} from '../hooks/useReveals';
import {usePageTitle} from '../hooks/usePageTitle';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;
const tints = ['bg-terracotta', 'bg-marigold text-ink', 'bg-indigo', 'bg-olive'];

export function About({reduced}: {reduced: boolean}) {
  const ref = useReveals<HTMLDivElement>();
  usePageTitle('About us');

  return (
    <div ref={ref}>
      <StageHero
        eyebrow="About Sharbee Africa"
        lines={about.lines}
        body={about.intro}
        image="photos/zulu-dancers.webp"
        alt="Women in beaded traditional Zulu dress singing together"
        reduced={reduced}
      />

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:grid-cols-2 md:px-14 md:py-36">
          <div>
            <p className="caps text-ochre" data-reveal>
              Our story
            </p>
            <h2 className="display mt-5 text-[clamp(44px,5vw,88px)]" data-reveal style={d(0.1)}>
              <span className="block">Something for</span>
              <span className="it block text-terracotta">everyone.</span>
            </h2>
            {about.story.map((p, i) => (
              <p key={i} className="prose-s mt-6 max-w-[560px] text-ink/80" data-reveal style={d(0.15 + i * 0.05)}>
                {p}
              </p>
            ))}
          </div>
          <figure className="relative" data-reveal style={d(0.1)}>
            <img src={media('photos/cape-town.webp')} alt="Table Mountain rising above Cape Town under a blue sky" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <img
              src={media('logo.webp')}
              alt=""
              loading="lazy"
              className="absolute -bottom-10 -left-6 w-[38%] drop-shadow-[0_20px_40px_rgb(0_0_0/0.3)] md:-left-14"
            />
          </figure>
        </div>
      </section>

      <section className="bg-ink text-white" aria-labelledby="values">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <h2 id="values" className="display text-[clamp(44px,5vw,88px)]" data-reveal>
            <span className="block">What you can</span>
            <span className="it block text-marigold">count on.</span>
          </h2>
          <div className="mt-14 grid gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <div key={v.t} className={`${tints[i]} flex min-h-[300px] flex-col justify-between p-8`} data-reveal style={d(i * 0.1)}>
                <span className="caps opacity-70">0{i + 1}</span>
                <div>
                  <h3 className="display text-[clamp(30px,2.4vw,42px)]">{v.t}</h3>
                  <p className="prose-s mt-3 text-[16px] opacity-90">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand text-ink">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 py-24 md:grid-cols-[1fr_1.2fr] md:px-14 md:py-32">
          <img src={media('photos/johannesburg.webp')} alt="The Johannesburg skyline at dusk" loading="lazy" className="aspect-[4/3] w-full object-cover" data-reveal />
          <div>
            <p className="caps text-ochre" data-reveal>
              Based in Gauteng
            </p>
            <h2 className="display mt-5 text-[clamp(40px,4.4vw,76px)]" data-reveal style={d(0.1)}>
              <span className="block">Speak to</span>
              <span className="it block">{contact.person}.</span>
            </h2>
            <p className="prose-s mt-6 max-w-[520px] text-ink/80" data-reveal style={d(0.15)}>
              We are based in Tarlton, near Krugersdorp — and we plan journeys, events and experiences right across South Africa. Every enquiry is answered personally.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal style={d(0.2)}>
              <a href={contact.phoneHref} className="caps flex min-h-12 items-center bg-ink px-7 py-4 text-white hover:bg-terracotta">
                Call {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="caps flex min-h-12 items-center border border-ink px-7 py-4 hover:bg-ink hover:text-white">
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
