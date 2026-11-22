// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Refugio | Vestir para habitar(nos)',
  description = 'Refugio es una declaración viva, un espacio nómade donde arte, cuerpo y tiempo se entrelazan. Vestir para habitar(nos).',
  canonical = 'https://refugiolab.com',
  ogImage = '/images/hero-bg.webp',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  url = canonical,
}) => {
  const ogUrl = url;
  const ogTitle = title;
  const ogDescription = description;
  const ogImageUrl = ogImage;
  const twitterTitle = title;
  const twitterDescription = description;
  const twitterImage = ogImage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />
    </Helmet>
  );
};

export default SEO;