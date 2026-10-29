import { useEffect } from 'react';
import { BRAND } from '../../config/constants';

export default function SEOHead({ title, description, image }) {
  useEffect(() => {
    const defaultTitle = `${BRAND.name} — ${BRAND.tagline}`;
    document.title = title ? `${title} | ${BRAND.name}` : defaultTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || BRAND.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title ? `${title} | ${BRAND.name}` : defaultTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description || BRAND.description);
    }

    if (image) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', image);
    }
  }, [title, description, image]);

  return null;
}
