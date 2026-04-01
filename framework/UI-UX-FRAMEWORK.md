# UI/UX Design Intelligence Framework
> Guía maestra para el desarrollo de interfaces en el proyecto RS y futuros proyectos.
> Metodología: UI/UX Pro Max — 67+ estilos, 95+ paletas, patrones probados.

---

## Las 5 Dimensiones Core

Antes de escribir una sola línea de código, definir estas 5 dimensiones:

| # | Dimensión | Pregunta clave |
|---|---|---|
| 1 | PATTERN & LAYOUT | ¿Qué tipo de producto es y cómo se estructura? |
| 2 | STYLE & AESTHETIC | ¿Cuál es el lenguaje visual? |
| 3 | COLOR & THEME | ¿Qué emoción transmite? |
| 4 | TYPOGRAPHY | ¿Cuál es la voz de la marca? |
| 5 | ANIMATIONS & INTERACTIONS | ¿Cómo se siente al usarlo? |

---

## DIMENSIÓN 1: Pattern & Layout (El Esqueleto)

### Patrones por tipo de producto

#### SaaS General
```
Pattern: Hero + Features + Social Proof + CTA
Focus: Value proposition primero, features segundo
Layout: Full-width hero, 3 columnas features, testimonial carousel, sticky CTA
```

#### Micro SaaS
```
Pattern: Minimal & Direct + Live Demo
Focus: Ir directo a la utilidad del producto
Layout: Hero centrado con demo embebido, navegación mínima, CTA único
```

#### E-commerce Luxury
```
Pattern: Feature-Rich Showcase + Immersive Gallery
Focus: Imágenes grandes, feel premium, storytelling
Layout: Hero full-screen, galería en grid, detalles con zoom
```

#### Fintech / Crypto ← APLICA A RS
```
Pattern: Conversion-Optimized + Trust Signals
Focus: Visualización de datos clara, badges de seguridad, precios transparentes
Layout: Hero dividido (visual + form), dashboard con stats en vivo, indicadores de confianza
```

#### Analytics Dashboard
```
Pattern: Bento Grid + Actionable Insights
Focus: Densidad de datos con claridad, métricas escaneables
Layout: Sistema de cards modulares, información jerárquica, filtros rápidos
```

#### Portfolio / Agency
```
Pattern: Storytelling + Case Studies
Focus: Impacto visual, showcases de proyectos, personalidad
Layout: Secciones full-screen, galerías horizontal scroll, transiciones inmersivas
```

---

## DIMENSIÓN 2: Style & Aesthetic (La Piel)

### Glassmorphism ← ESTILO ACTUAL RS
```
Keywords: Vidrio esmerilado, capas transparentes, fondo desenfocado, profundidad
CSS: backdrop-filter: blur(10px), rgba backgrounds, cards en capas
Usar cuando: Apps modernas, dashboards, overlays, modales
Evitar: Fondos de bajo contraste, problemas de accesibilidad
```

### Aurora UI
```
Keywords: Gradientes vibrantes, blend suave, efecto Northern Lights, luminoso
CSS: Gradientes multi-stop, rotación de hue animada, efectos glow
Usar cuando: Landing pages, hero sections, portfolios creativos
Evitar: Interfaces con mucho texto, contextos corporativos
```

### Linear / Vercel Aesthetic ← REFERENCIA PARA RS
```
Keywords: Dark mode, bordes sutiles (1px), alto contraste, minimalista
CSS: #0A0A0A background, #1A1A1A cards, #333 borders, texto blanco
Usar cuando: Herramientas dev, SaaS platforms, productos técnicos
Evitar: Consumer-facing, marcas playful
```

### Bento Grid ← YA IMPLEMENTADO EN RS
```
Keywords: Modular, limpio, organizado, denso en info, estructurado
CSS: CSS Grid, cards de tamaños variables, gaps consistentes (16-24px)
Usar cuando: Dashboards, feature showcases, páginas con mucho contenido
Evitar: Páginas simples de un solo propósito
```

### Otros Estilos de Alto Impacto
- **Brutalism**: Raw, bold, no convencional, alto contraste, geométrico
- **Y2K Revival**: Metálico, efectos chrome, colores bold, retro-futurista
- **Claymorphism**: 3D inflado, sombras suaves, playful, táctil
- **Gradient Mesh**: Gradientes multi-color complejos, flujo orgánico
- **Minimalist Luxury**: Máximo whitespace, tipografía serif, acentos dorados
- **Cyberpunk**: Colores neón, efectos glitch, tech-noir, alta energía

---

## DIMENSIÓN 3: Color & Theme (La Paleta)

### Regla Base: 60-30-10
- **60%** Color dominante (fondo, áreas grandes)
- **30%** Color secundario (elementos de soporte)
- **10%** Color acento (CTAs, highlights, elementos interactivos)

### Paletas por Emoción

#### Dark Mode Excellence ← PALETA ACTUAL RS
```css
--background: #0A0A0A;      /* True Black */
--surface: #1A1A1A;         /* Card Background */
--border: #333333;          /* Subtle Borders */
--text: #FFFFFF;            /* Pure White */
--text-secondary: #A3A3A3;  /* Grey */
--accent: #3B82F6;          /* Blue */
/* Asegurar ratio de contraste 15:1 para texto */
```

#### Confianza & Profesionalismo (Fintech, Healthcare, Enterprise)
```css
--primary: #0F172A;   /* Navy */
--cta: #0369A1;       /* Blue */
--background: #F8FAFC; /* Light Grey */
--text: #1E293B;      /* Slate */
--accent: #3B82F6;    /* Bright Blue */
/* Mood: Confiable, seguro, establecido */
```

#### Vibrante & Moderno (Tech Startups, Herramientas Creativas)
```css
--primary: #6366F1;   /* Indigo */
--cta: #10B981;       /* Emerald */
--background: #FFFFFF; /* Pure White */
--text: #1E293B;      /* Slate */
--accent: #F59E0B;    /* Amber */
/* Mood: Innovador, enérgico, forward-thinking */
```

#### Lujo & Premium (Productos High-End, Moda)
```css
--primary: #1C1917;   /* Stone Dark */
--cta: #CA8A04;       /* Gold */
--background: #FAFAF9; /* Cream */
--text: #292524;      /* Warm Black */
--accent: #78716C;    /* Taupe */
/* Mood: Sofisticado, exclusivo, atemporal */
```

#### Creativo / Playful (Consumer Apps, Entertainment)
```css
--primary: #EC4899;   /* Pink */
--cta: #8B5CF6;       /* Purple */
--background: #FEF3C7; /* Warm Cream */
--text: #1F2937;      /* Charcoal */
--accent: #F59E0B;    /* Orange */
/* Mood: Divertido, accesible, enérgico */
```

### Reglas del Sistema de Color
```
✅ HACER:
- Usar regla 60-30-10
- Asegurar WCAG AA (4.5:1 para texto)
- Crear tokens semánticos (--color-success, --color-error)
- Probar en light y dark mode

❌ NO HACER:
- Más de 3 colores primarios
- Negro puro (#000) sobre blanco puro (#FFF) — demasiado harsh
- Depender solo del color para dar información (accesibilidad)
- Texto gris de bajo contraste (#CCC sobre #FFF)
```

---

## DIMENSIÓN 4: Typography (La Voz)

### Parejas Estratégicas de Fuentes

#### Modern / Tech ← ACTUAL RS (Inter + Manrope)
```
Headings: Manrope (800 weight)
Body: Inter (400, 500)
Mono: JetBrains Mono (para código)
Personalidad: Limpio, escalable, profesional
Weights: 400 / 600 / 700 / 800
```

#### Elegant / Luxury
```
Headings: Playfair Display
Body: Montserrat
Accents: Cormorant Garamond
Personalidad: Sofisticado, alto contraste, editorial
Weights: 300 / 400 / 700
```

#### Friendly / Consumer
```
Headings: Poppins
Body: Open Sans
Alternativa: Nunito + Lato
Personalidad: Accesible, balanceado, cálido
Weights: 400 / 600 / 800
```

#### Brutalist / Bold
```
Headings: Space Grotesk
Body: JetBrains Mono o IBM Plex Sans
Personalidad: Raw, técnico, no convencional
Weights: 400 / 700
```

#### Editorial / Mucho Contenido
```
Headings: Merriweather
Body: Source Sans Pro
Personalidad: Legible, confiable, clásico
Weights: 300 / 400 / 700 / 900
```

### Escala Tipográfica (8px Grid)
```
xs:   12px
sm:   14px
base: 16px
lg:   18px
xl:   20px
2xl:  24px
3xl:  30px
4xl:  36px
5xl:  48px
6xl:  60px
7xl:  72px
```

---

## DIMENSIÓN 5: Animations & Interactions (El Alma)

### Micro-Interacciones

#### Botones
```css
/* Hover */
transform: scale(1.02);                    /* Scale up */
transform: translateY(-2px);               /* Lift */
box-shadow: 0 0 20px rgba(59,130,246,0.4); /* Glow */

/* Timing */
duration: 150-300ms
easing: cubic-bezier(0.4, 0, 0.2, 1)
```

#### Cards ← APLICAR A hcards DE RS
```css
/* Premium hover */
transform: translateY(-4px);  /* Lift */
box-shadow: aumentar;         /* Shadow */
/* Tilt 3D sutil: 2-3deg máximo */
/* Glow border en hover */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Focus States (Accesibilidad)
```css
outline: 2-4px solid brandColor at 50% opacity;
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
/* Siempre visible, mínimo 3px, ratio 3:1 */
```

### Scroll Animations

#### Reveal on Scroll
```css
/* Entrada escalonada */
opacity: 0 → 1
transform: translateY(20px) → translateY(0)
stagger: 100ms entre elementos
trigger: 20% del elemento en viewport
duration: 600ms
easing: ease-out
```

#### Parallax
```css
/* Profundidad en capas */
hero background: scroll speed 0.5x
foreground: scroll speed 1.2x
máximo: 20-30px de movimiento
usar transform, NO position
```

### Estados de Carga

#### Skeleton Loaders
```css
background: linear-gradient(90deg, #E5E7EB, #F9FAFB, #E5E7EB);
background-size: 200% 100%;
animation: shimmer 1.5s infinite ease-in-out;
```

### Efectos Avanzados

#### Border Beams (Estilo Linear/Vercel)
```css
background: linear-gradient(90deg, transparent, #3B82F6, transparent);
animation: beam 2s infinite;
/* Usar en: CTAs, cards destacadas, elementos premium */
```

#### Glassmorphism
```css
backdrop-filter: blur(10px) saturate(180%);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Reglas de Performance en Animaciones
```
✅ HACER:
- Animar transform y opacity (aceleración GPU)
- will-change para elementos animados
- requestAnimationFrame para JS animations
- Debounce en eventos de scroll
- CSS animations > JS animations siempre que sea posible

❌ NO HACER:
- Animar width, height, o position (costoso)
- Interacciones > 300ms (bloquea al usuario)
- Animar durante input del usuario
- Demasiadas animaciones simultáneas
- Olvidar prefers-reduced-motion
```

#### Accesibilidad — OBLIGATORIO
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🚫 Anti-Patterns — Lo que NUNCA hacer

### Diseño
```
❌ Flash Over Function
- No animaciones que bloqueen acciones del usuario
- No transiciones > 300ms en interacciones
- No videos autoplay con sonido
- No infinite scroll sin opción de paginación

❌ Crímenes de Bajo Contraste
- No gris claro (#CCC) sobre fondos blancos
- No texto blanco puro sobre negro puro (demasiado harsh)
- Mínimo WCAG AA (4.5:1 para texto)
- Probar con simuladores de daltonismo

❌ Caos Visual
- No más de 3 colores primarios
- No más de 2 familias tipográficas
- No más de 5 tamaños de fuente en una vista
- Espaciado consistente (sistema de 8px grid)

❌ Navegación Confusa
- Íconos siempre con labels o tooltips
- No hamburger menus en desktop
- No navegación "clever" que confunda
```

### UX
```
❌ Formularios Frustrantes
- No labels dentro de inputs (problema de accesibilidad)
- No "clear all" sin confirmación
- No validación solo en submit
- No botones submit deshabilitados (mostrar errores en su lugar)

❌ Contenido Problemático
- No paredes de texto sin jerarquía
- No carouseles autoplay (usuarios se pierden contenido)
- No links "haz click aquí" (no descriptivos)
- No Lorem Ipsum en producción

❌ Fallas de Accesibilidad
- No trampas de teclado
- No imágenes sin alt text
- No información solo por color
- No auto-focus al cargar página (excepto búsqueda)
```

### Mobile
```
❌ Hostilidad al Móvil
- Tap targets mínimo 44x44px
- No scroll horizontal no intencionado
- No interacciones que dependan de hover en touch
- No elementos fixed que cubran contenido
```

### Performance
```
❌ Pecados de Performance
- No imágenes sin optimizar (usar WebP, lazy loading)
- No recursos que bloqueen render
- No layout shifts (CLS > 0.1)
- No animaciones pesadas al cargar la página
```

---

## Checklist de Calidad — Antes de hacer deploy

### Visual
- [ ] Contraste de texto WCAG AA (4.5:1 mínimo)
- [ ] Consistencia en espaciado (múltiplos de 8px)
- [ ] Máximo 3 colores primarios usados
- [ ] Máximo 2 familias tipográficas
- [ ] Estados hover visibles en todos los elementos interactivos

### Funcional
- [ ] Todos los formularios con labels visibles
- [ ] Imágenes con alt text descriptivo
- [ ] Navegación funciona con teclado
- [ ] Links descriptivos (no "click aquí")
- [ ] Focus states visibles en todos los elementos

### Performance
- [ ] Imágenes en WebP con lazy loading
- [ ] Animaciones usando solo transform/opacity
- [ ] prefers-reduced-motion implementado
- [ ] Sin layout shifts al cargar
- [ ] Video de fondo con muted + playsinline

### Responsive
- [ ] Mobile (320px+): sin scroll horizontal
- [ ] Tablet (768px): layout adaptado
- [ ] Desktop (1200px+): aprovecha el espacio
- [ ] Tap targets mínimo 44x44px en móvil

---

## Aplicación al Proyecto RS

### Perfil de Diseño Actual
```
Estilo:      Dark Mode + Glassmorphism
Patrón:      Fintech / Conversion-Optimized
Paleta:      Dark Mode Excellence (#0A0A0A base)
Tipografía:  Modern/Tech (Inter + Manrope)
Stack:       HTML + CSS + JS vanilla
```

### Datos disponibles en design-resources/
- Paletas de color → `design-resources/cli/assets/data/colors.csv`
- Estilos UI → `design-resources/cli/assets/data/styles.csv`
- Tipografías → `design-resources/cli/assets/data/typography.csv`
- Directrices UX → `design-resources/cli/assets/data/ux-guidelines.csv`
- Componentes landing → `design-resources/cli/assets/data/landing.csv`
- Componentes de app → `design-resources/cli/assets/data/app-interface.csv`

### Siguiente paso identificado
Agregar `prefers-reduced-motion` al CSS del proyecto (video de fondo + animaciones activas).
