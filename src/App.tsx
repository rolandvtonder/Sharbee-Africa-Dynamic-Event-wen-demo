import {useCallback, useEffect, useRef, useState} from 'react';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import {lockScroll, resetScroll, startScroll} from './lib/scroll';
import {media} from './lib/math';
import {useReducedMotion} from './hooks/useReducedMotion';
import {Menu} from './components/Menu';
import {Footer} from './components/Footer';
import {brand} from './content';
import {Home} from './pages/Home';
import {About} from './pages/About';
import {Services} from './pages/Services';
import {ServiceDetail} from './pages/ServiceDetail';
import {Experiences} from './pages/Experiences';
import {Gallery} from './pages/Gallery';
import {Contact} from './pages/Contact';
import {NotFound} from './pages/NotFound';

export default function App() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const {pathname} = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const firstRoute = useRef(true);

  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => lockScroll(open), [open]);

  // New page: close the menu, start at the top, and move focus to the content
  // so screen-reader users land on the new page rather than the old link.
  useEffect(() => {
    setOpen(false);
    resetScroll();
    if (firstRoute.current) firstRoute.current = false;
    else mainRef.current?.focus({preventScroll: true});
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  const onContact = pathname === '/contact';

  return (
    <>
      <a href="#main" className="caps fixed top-3 left-3 z-[70] -translate-y-20 bg-marigold px-4 py-2 text-ink focus:translate-y-0">
        Skip to content
      </a>

      <Link to="/" className="fixed top-4 left-4 z-[55] block md:top-5 md:left-10" aria-label={`${brand.name} — home`}>
        <img src={media('logo.webp')} alt="" width={44} height={56} className="h-12 w-auto drop-shadow-[0_2px_10px_rgb(0_0_0/0.35)] md:h-14" />
      </Link>
      <Link
        to="/"
        tabIndex={-1}
        aria-hidden
        className="display fixed top-7 left-[68px] z-[55] text-[18px] tracking-[0.2em] text-white mix-blend-difference max-sm:hidden md:top-9 md:left-[100px] md:text-[20px]"
      >
        {brand.name}
      </Link>

      <button
        ref={menuButton}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-4 right-4 z-[55] flex min-h-11 cursor-pointer items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-6 md:right-8 ${
          open ? 'bg-ink text-white' : 'bg-ink/55 text-white hover:bg-ink/80'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      {!onContact && (
        <Link
          to="/contact"
          className="caps fixed right-4 bottom-4 z-[55] flex min-h-11 items-center bg-marigold px-7 py-3.5 text-ink shadow-[0_8px_30px_rgb(0_0_0/0.25)] transition-colors duration-300 hover:bg-paper md:right-8 md:bottom-7"
        >
          Plan your <em className="ml-1.5 normal-case">journey</em>
        </Link>
      )}

      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        {/* Keyed by path so every page mounts fresh, reveals and all. */}
        <Routes key={pathname}>
          <Route path="/" element={<Home reduced={reduced} />} />
          <Route path="/about" element={<About reduced={reduced} />} />
          <Route path="/services" element={<Services reduced={reduced} />} />
          <Route path="/services/:slug" element={<ServiceDetail reduced={reduced} />} />
          <Route path="/experiences" element={<Experiences reduced={reduced} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      <Menu open={open} onClose={close} />
      <div className="grain" aria-hidden />
    </>
  );
}
