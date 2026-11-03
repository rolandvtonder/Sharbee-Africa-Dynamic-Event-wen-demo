import {useEffect} from 'react';
import {brand} from '../content';

/** Sets the tab title per page so history and bookmarks read clearly. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${brand.name}` : `${brand.name} — ${brand.tagline}`;
  }, [title]);
}
