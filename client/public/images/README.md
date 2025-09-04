# Imágenes del Sitio

Esta carpeta contiene las imágenes utilizadas en el sitio web.

## Imagen para SEO

Para las metaetiquetas SEO, se recomienda tener una imagen de 1200x630 píxeles en formato PNG o JPG.
Nombre recomendado: `seo-image.png`

## Uso

Las imágenes se referencian desde el componente SEO.jsx:
```jsx
import SEO from '../components/SEO';

<SEO 
  title="Título de la página"
  description="Descripción de la página"
  image="/images/seo-image.png"
/>
```