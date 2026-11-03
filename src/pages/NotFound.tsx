import {Link} from 'react-router-dom';
import {usePageTitle} from '../hooks/usePageTitle';

export function NotFound() {
  usePageTitle('Page not found');
  return (
    <section className="flex min-h-svh flex-col justify-center bg-ink px-5 py-32 text-white md:px-14">
      <p className="caps text-marigold">404</p>
      <h1 className="display mt-5 text-[clamp(52px,7.6vw,138px)]">
        <span className="block">Off the</span>
        <span className="it block text-marigold">beaten track.</span>
      </h1>
      <p className="prose-s mt-6 max-w-[480px] text-white/80">This page doesn&rsquo;t exist — but there is plenty more to explore.</p>
      <Link to="/" className="caps mt-10 inline-flex min-h-12 w-fit items-center bg-marigold px-8 py-4 text-ink hover:bg-paper">
        Back to home
      </Link>
    </section>
  );
}
