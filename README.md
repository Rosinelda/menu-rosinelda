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
│   │   └── Rosinelda-original.svg
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

Guarda las fotografías en formato PNG con **exactamente** estas rutas y nombres. El menú las detecta automáticamente; si no encuentra una, muestra el icono del producto como respaldo.

> Importante: respeta minúsculas, guiones y la extensión `\.png`. GitHub Pages distingue entre mayúsculas y minúsculas.

### Heladería

```text
assets/products/helados/copa-simple\.png
assets/products/helados/copa-doble\.png
assets/products/helados/copa-triple\.png
assets/products/helados/tulipan-simple\.png
assets/products/helados/tulipan-doble\.png
assets/products/helados/tulipan-triple\.png
assets/products/helados/cono-simple\.png
assets/products/helados/cono-doble\.png
assets/products/helados/cono-triple\.png
```

### Especiales

```text
assets/products/especiales/copa-rosinelda\.png
assets/products/especiales/copa-amor\.png
assets/products/especiales/copa-tropical\.png
assets/products/especiales/chocobanana\.png
assets/products/especiales/megabanana\.png
assets/products/especiales/tulipan-fiesta\.png
assets/products/especiales/payaso-galleta\.png
assets/products/especiales/frozen-de-chocolate\.png
assets/products/especiales/frappe-oreo\.png
assets/products/especiales/waffle\.png
```

### Frutería

```text
assets/products/fruteria/ensalada-de-frutas\.png
assets/products/fruteria/banana-split\.png
assets/products/fruteria/duraznos-con-crema\.png
assets/products/fruteria/frutillas-con-crema\.png
assets/products/fruteria/copa-frisky\.png
```

### Cafetería

```text
assets/products/cafeteria/expreso\.png
assets/products/cafeteria/expreso-doble\.png
assets/products/cafeteria/expreso-cortado\.png
assets/products/cafeteria/cafe-con-leche\.png
assets/products/cafeteria/cafe-bombon\.png
assets/products/cafeteria/cappuccino\.png
assets/products/cafeteria/cappuccino-vienes\.png
assets/products/cafeteria/macchiato\.png
assets/products/cafeteria/mochaccino\.png
assets/products/cafeteria/expreso-frio\.png
assets/products/cafeteria/frozen-de-chocolate\.png
assets/products/cafeteria/frozen-de-vainilla\.png
assets/products/cafeteria/hollywood-shake\.png
assets/products/cafeteria/te-verde-y-de-frutas\.png
assets/products/cafeteria/aromaticas\.png
```

`expreso\.png` corresponde al Expreso clásico y `expreso-frio\.png` al Expreso servido con hielo y leche fría.

### Granizados

```text
assets/products/granizados/granizado-de-sabores\.png
assets/products/granizados/granizado-de-frutas-naturales\.png
assets/products/granizados/granizado-de-yogurt\.png
```

### Sándwiches

```text
assets/products/sandwiches/sandwich-de-pollo\.png
assets/products/sandwiches/sandwich-de-pavo\.png
assets/products/sandwiches/sandwich-atun\.png
assets/products/sandwiches/sandwich-texano\.png
assets/products/sandwiches/tostada-de-jamon\.png
assets/products/sandwiches/tostada-de-queso\.png
assets/products/sandwiches/tostada-mixta\.png
```

### Panadería

```text
assets/products/panaderia/pan-de-leche\.png
assets/products/panaderia/quesadilla\.png
assets/products/panaderia/empanadas-de-carne-o-pollo\.png
assets/products/panaderia/empanada\.png
assets/products/panaderia/pan-de-yuca\.png
assets/products/panaderia/croissant-de-jamon-y-queso\.png
```

### Extras

```text
assets/products/extras/chocolate-rallado\.png
assets/products/extras/granola\.png
assets/products/extras/nueces-tostadas\.png
assets/products/extras/sprinkles\.png
assets/products/extras/caramelo\.png
assets/products/extras/chocolate-caliente\.png
assets/products/extras/coulis-de-fresa\.png
assets/products/extras/chicles-surtidos\.png
assets/products/extras/suspiros\.png
assets/products/extras/galleta-del-dia\.png
assets/products/extras/crema-chantilly\.png
assets/products/extras/leche-condensada\.png
assets/products/extras/coco-rallado\.png
assets/products/extras/bola-extra-de-helado\.png
```

Cuando exista la fotografía, aparecerá en la tarjeta y también en el modal de detalle.

Para usar una foto con un nombre o extensión diferente, añade `data-image` a la tarjeta:

```html
<div class="card" data-image="assets/products/helados/copa-simple.webp">
```

La primera imagen del menú puede tardar apenas un momento en cargarse; las demás se cargan al abrir su categoría para mantener la página rápida.

## Agregar el logo oficial

El encabezado está preparado para un logo SVG transparente, sin círculo, fondo blanco ni borde. Copia el logo oficial con este nombre y ruta exactos:

```text
assets/logo/Rosinelda-original.svg
```

El SVG se adapta sin deformarse y se muestra más grande tanto en móvil como en escritorio. Hasta que se agregue, la cabecera muestra una "R" como reemplazo visual, sin iconos de imagen rota.

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

