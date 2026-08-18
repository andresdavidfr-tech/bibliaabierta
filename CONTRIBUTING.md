# Guía de Contribución

¡Gracias por tu interés en contribuir a *La Biblia Abierta*!

## Cómo Contribuir

### Reportar un Bug

1. Abre un [nuevo Issue](https://github.com/TU_USUARIO/la-biblia-abierta/issues)
2. Describe el problema claramente
3. Incluye pasos para reproducirlo
4. Especifica tu navegador y sistema operativo

### Sugerir una Mejora

1. Abre un [nuevo Issue](https://github.com/TU_USUARIO/la-biblia-abierta/issues)
2. Describe tu idea detalladamente
3. Explica por qué beneficiaría al proyecto
4. Discute la implementación

### Enviar un Pull Request

1. **Fork** el repositorio
2. **Crea una rama** con un nombre descriptivo:
   ```bash
   git checkout -b feature/nueva-seccion
   git checkout -b fix/corregir-responsive
   ```
3. **Realiza tus cambios** respetando el estilo del código
4. **Haz commits claros** y descriptivos:
   ```bash
   git commit -m "Add new study section for beginners"
   ```
5. **Push** a tu fork:
   ```bash
   git push origin feature/nueva-seccion
   ```
6. **Abre un Pull Request** con descripción clara de los cambios

---

## Estándares de Código

### HTML
- Indentación: 2 espacios
- Elementos semánticos cuando sea posible
- Atributos alt en imágenes
- Estructura clara y legible

### CSS
- Indentación: 2 espacios
- Variables CSS para colores y espaciado
- Comentarios para secciones principales
- Mobile-first approach

### Variables CSS
```css
:root {
  --white: #ffffff;
  --cream: #fafaf6;
  --navy: #1a3a52;
  --slate: #5a6c7d;
  --sage: #6b8e71;
}
```

---

## Principios de Diseño

Al contribuir, por favor mantén estos principios:

1. **Minimalismo** — Cada elemento debe servir un propósito
2. **Claridad** — El usuario debe entender sin confusión
3. **Accesibilidad** — Funciona para todos
4. **Velocidad** — HTML + CSS puro, sin bloat
5. **Encuentro con Cristo** — El foco siempre en lo espiritual

---

## Estructura de Archivos

```
la-biblia-abierta/
├── index.html              # Landing page principal
├── pages/
│   ├── explorar.html       # Para inconversos
│   ├── nutrir.html         # Para nuevos creyentes
│   └── profundizar.html    # Para creyentes avanzados
├── css/
│   ├── styles.css          # Estilos principales
│   └── variables.css       # Variables CSS compartidas
├── js/
│   └── main.js             # JavaScript (si es necesario)
├── assets/
│   ├── images/
│   └── icons/
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

---

## Checklist para Pull Requests

- [ ] He testeado en desktop y móvil
- [ ] El código sigue los estándares establecidos
- [ ] No hay warnings en la consola del navegador
- [ ] Respeté el paleta de colores y tipografía
- [ ] Agregué comentarios si el código es complejo
- [ ] Los cambios respetan los principios de diseño

---

## Comunidad

- Sé respetuoso y constructivo
- Aceptamos crítica constructiva
- Todos los aportes son valorados
- Enfoque en lo vivo, no en lo técnico

---

**¡Gracias por ayudar a que La Biblia Abierta sea una realidad!**

✦
