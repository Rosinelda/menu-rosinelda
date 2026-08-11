# Menú digital Rosinelda

Versión estática del menú de Heladería Rosinelda, pensada principalmente para abrirse desde un código QR. No necesita instalar programas ni ejecutar comandos: está hecha con HTML, CSS y JavaScript puro, por lo que puede publicarse directamente en GitHub Pages.

## Estructura

```text
Rosinelda_Github/
├── index.html                 Contenido del menú y estructura de la página
├── css/
│   └── styles.css             Colores, diseño responsive y accesibilidad visual
├── js/
│   └── app.js                 Categorías, búsqueda, filtros, modal e imágenes
├── assets/
│   ├── logo/
│   │   └── Rosinelda-original.png
│   └── products/
│       ├── helados/
│       ├── especiales/
│       ├── fruteria/
│       ├── cafeteria/
│       ├── granizados/
│       ├── sandwiches/
│       ├── panaderia/
│       └── extras/
└── README.md
```

## Cambiar un producto

Abre `index.html` y busca el nombre del producto. Cada producto mantiene esta estructura sencilla:

```html
<div class="card">
  <div class="card-icon">🍨</div>
  <div class="card-body">
    <p class="card-name">Copa Simple</p>
    <p class="card-desc">Deliciosa copa con un sabor de helado artesanal</p>
  </div>
  <span class="card-price">$1.00</span>
</div>
```

- Cambia el precio dentro de `card-price`.
- Cambia la descripción dentro de `card-desc`.
- Si un producto tiene una etiqueta como `Firma`, `Popular` o `Top`, está en `card-badge`. Esa etiqueta también aparece en el filtro **Destacados**.
- Para agregar un producto, copia una tarjeta completa, pégala en la categoría correcta y cambia sus textos. No hay que modificar JavaScript.

## Agregar fotografías

Coloca cada fotografía en la carpeta de su categoría. El sitio intenta encontrar automáticamente una imagen JPG usando el nombre del producto en minúsculas, sin tildes y con guiones.

Ejemplos:

```text
assets/products/helados/copa-simple.jpg
assets/products/helados/copa-doble.jpg
assets/products/especiales/copa-rosinelda.jpg
assets/products/cafeteria/cappuccino.jpg
```

Si la fotografía no existe, el menú muestra el icono del producto en un placeholder; no se verán imágenes rotas. Cuando exista, aparecerá en la tarjeta y en el modal de detalle.

Para usar una foto con un nombre o extensión diferente, añade `data-image` a la tarjeta:

```html
<div class="card" data-image="assets/products/helados/copa-simple.webp">
```

La primera imagen del menú puede tardar apenas un momento en cargarse; las demás se cargan al abrir su categoría para mantener la página rápida.

## Agregar el logo oficial

El archivo base recibido solo referenciaba el logo, pero no incluía la imagen. Copia el logo oficial con este nombre y ruta exactos:

```text
assets/logo/Rosinelda-original.png
```

Hasta que se agregue, la cabecera muestra una "R" como reemplazo visual, sin iconos de imagen rota.

## Agregar una categoría

1. Agrega un enlace como los existentes dentro de `nav-scroll` en `index.html`.
2. Crea una sección con un `id` único y `data-category` con el mismo valor.
3. Añade ese valor tanto a `categories` como a `imageFolders` en `js/app.js`.
4. Añade el color de la categoría en los selectores de `css/styles.css`.
5. Crea la carpeta correspondiente en `assets/products/` si tendrá imágenes.

## Publicar con GitHub Pages

1. Sube el contenido de esta carpeta a la raíz de tu repositorio de GitHub.
2. En el repositorio, entra en **Settings > Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama que contiene el menú (normalmente `main`) y la carpeta `/(root)`.
5. Guarda los cambios y espera a que GitHub muestre la URL pública.

Las rutas son relativas, así que no debes cambiar nada para GitHub Pages.

## Datos pendientes de confirmar

Se conservaron los textos tal como estaban en el archivo original. Conviene revisar estos dos productos, porque sus descripciones parecen no coincidir con sus nombres:

- `Chocobanana`
- `Frappe Oreo`

No se modificaron esas descripciones para no inventar información comercial.
