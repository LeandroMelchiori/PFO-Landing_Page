# Espacio Gamer · General Lagos — Landing Page

Landing page profesional, moderna y responsive para el **Espacio Gamer de General Lagos** (Santa Fe),
un taller educativo donde niñas, niños y adolescentes aprenden informática a través de videojuegos
y desafíos guiados con propósito.

## ✨ Características

- **Diseño 100% responsive** (mobile-first): se adapta a celular, tablet y escritorio.
- **Estética gamer/tecnológica** con paleta neón (violeta + cian + magenta) derivada del logo oficial.
- **Accesible**: HTML semántico, navegación por teclado, `aria-*`, textos alternativos, foco visible,
  enlace "saltar al contenido" y soporte para `prefers-reduced-motion`.
- **Orientada a conversión**: CTAs repetidos en puntos estratégicos.
- **Sin dependencias ni backend**: HTML, CSS y JavaScript puro. Solo carga fuentes de Google Fonts.

## 🧩 Secciones

1. **Header** sticky con logo, navegación y CTA (con menú móvil).
2. **Hero** con título, subtítulo, CTAs, estadísticas y emblema animado.
3. **Sobre nosotros** — qué es el Espacio Gamer y su finalidad educativa.
4. **Beneficios** — 9 tarjetas de habilidades con iconos.
5. **¿Cómo son los talleres?** — dinámica en 6 pasos.
6. **Testimonios** — 4 reseñas de familias y participantes.
7. **Preguntas frecuentes** — acordeón con 6 preguntas.
8. **CTA final** + **Formulario de contacto** (con validación visual, sin backend).
9. **Footer** con navegación, redes sociales, ubicación y copyright.

## 📁 Estructura del proyecto

```
espacio-gamer-landing/
├── index.html          # Estructura y contenido
├── css/
│   └── styles.css      # Estilos (tokens, layout, responsive, animaciones)
├── js/
│   └── main.js         # Menú móvil, scroll reveal, FAQ, validación de formulario
├── assets/
│   ├── logo.png        # Logo oficial del Espacio Gamer
│   └── favicon.png     # Ícono del sitio
└── README.md
```

## 🚀 Cómo verlo

No requiere instalación ni compilación. Opciones:

- **Doble clic** en `index.html` para abrirlo en el navegador, **o**
- Servirlo localmente (recomendado para que las rutas funcionen siempre igual):

  ```bash
  # Con Python
  python -m http.server 8000
  # luego abrir http://localhost:8000
  ```

## 🎨 Paleta de marca

| Color    | Hex       | Uso                          |
|----------|-----------|------------------------------|
| Violeta  | `#8b5cf6` | Color principal / gradientes |
| Cian     | `#22d3ee` | Acentos y detalles           |
| Magenta  | `#e879f9` | Acento secundario            |
| Índigo   | `#0a0a1f` | Fondo                        |

## 📝 Notas

- El formulario es **visual**: al enviarlo muestra un mensaje de confirmación, pero no envía datos
  a ningún servidor. Para conectarlo, reemplazar la lógica de `submit` en `js/main.js` por una
  llamada `fetch` a tu endpoint, o usar un servicio como Formspree/Getform.
- Los testimonios, el teléfono y el email son **ficticios** (placeholders) y deben reemplazarse por
  los datos reales del taller.
