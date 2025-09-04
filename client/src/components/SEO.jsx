import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  author = "Herrería Universal",
  image,
  url,
  type = "website"
}) => {
  const defaultTitle = "Herrería Universal - Arte en Hierro Forjado";
  const defaultDescription = "Creando piezas únicas de herrería artesanal con más de 20 años de experiencia. Especialistas en fabricación, restauración y diseño personalizado de hierro forjado.";
  const defaultImage = image || "/images/seo-image.png"; // Ruta a la imagen por defecto
  const defaultUrl = url || window.location.href;
  
  return (
    <Helmet>
      {/* Título */}
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      
      {/* Metaetiquetas básicas */}
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || "herrería, hierro forjado, fabricación, restauración, diseño personalizado, puertas, rejas, muebles"} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:site_name" content="Herrería Universal" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Canonical */}
      <link rel="canonical" href={url || defaultUrl} />
    </Helmet>
  );
};

export default SEO;