# Mi sitio + Newsletter

Sitio personal con newsletter, proyectos y servicios, en **español e inglés**, con **panel de administración** propio.
Todo el contenido (artículos, proyectos, textos, foto, redes) se edita desde **`/admin`**: no hace falta tocar código ni volver a desplegar para publicar.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · PostgreSQL 16 + Prisma 6 · Tailwind CSS 3 · next-intl 4 · Tiptap 3 (editor) · Docker Compose + Caddy (HTTPS automático) · Resend (emails, opcional)

---

## Índice

1. [Funcionalidades](#1-funcionalidades)
2. [Login y seguridad del panel](#2-login-y-seguridad-del-panel)
3. [Dónde se guarda cada cosa](#3-dónde-se-guarda-cada-cosa)
4. [Cómo funciona el bilingüe ES/EN](#4-cómo-funciona-el-bilingüe-esen)
5. [Newsletter: suscripción y envío de emails](#5-newsletter-suscripción-y-envío-de-emails)
6. [Rutas y endpoints](#6-rutas-y-endpoints)
7. [Variables de entorno](#7-variables-de-entorno)
8. [Desarrollo local](#8-desarrollo-local)
9. [Deploy en el VPS](#9-deploy-en-el-vps)
10. [Backups y restauración](#10-backups-y-restauración)
11. [Estructura del código](#11-estructura-del-código)
12. [Cambios comunes en el código](#12-cambios-comunes-en-el-código)
13. [Problemas frecuentes](#13-problemas-frecuentes)

---

## 1. Funcionalidades

### Sitio público

| Sección | Ruta español | Ruta inglés | Qué muestra |
|---|---|---|---|
| Home | `/` | `/en` | Foto, título, dos filas de chips de colores en movimiento, tarjetas "sobre mí" (bio, ubicación con pines, "programando desde" con ventana de código, redes, en qué estás explorando), carrusel de proyectos destacados y tech stack |
| Proyectos | `/projects` | `/en/projects` | Todos los proyectos en tarjetas grandes con captura y botón "Visit Site" del color que elijas |
| Newsletter | `/newsletter` | `/en/newsletter` | Caja de suscripción y grilla de artículos publicados |
| Artículo | `/newsletter/<slug>` | `/en/newsletter/<slug>` | Artículo completo, artículos relacionados e invitación a suscribirse |
| Servicios | `/services` | `/en/services` | "Work with me": servicios, proceso en pasos, "es para vos si…" y botón para agendar llamada |
| Baja del newsletter | `/unsubscribe?token=…` | `/en/unsubscribe?token=…` | Confirmación para darse de baja (link que llega en cada mail) |

Elementos presentes en todas las páginas:

- **Dock de navegación** flotante abajo (Home, Projects, Newsletter, Services + botón azul de suscripción) con tooltips.
- **Selector EN / ES** flotante arriba a la derecha; cambia el idioma sin recargar y te deja en la misma página.
- **Footer** con dos tarjetas de email ("Let's Talk" y "Business Inquiries"), tu foto, menú, redes y proyectos.
- **Navegación sin recarga:** el dock precarga las secciones, el cambio de página es instantáneo y la nueva página entra con un fundido.
- **Animaciones:** el encabezado de cada página aparece con animación, las tarjetas aparecen progresivamente al hacer scroll y las filas de chips se mueven solas. El carrusel de proyectos se arrastra con el mouse o con el dedo.
- **Responsive:** diseño adaptado a celular (el dock se achica, el footer se reorganiza).
- **SEO:** título y descripción por idioma (editables), Open Graph en artículos, `robots.txt` que excluye `/admin` y `/api`.

> Las animaciones se muestran aunque el sistema operativo tenga activado "reducir movimiento", igual que el sitio de referencia.

### Panel de administración (`/admin`)

| Sección | Qué podés hacer |
|---|---|
| **Inicio** | Resumen: artículos publicados, borradores, proyectos y suscriptores, con accesos rápidos |
| **Artículos** | Crear, editar, borrar, publicar o pasar a borrador. Previsualizar en ES y EN. Enviar por email a los suscriptores |
| **Proyectos** | Crear, editar y borrar. Nombre, descripción ES/EN, link, captura, color del botón, "destacado" y orden |
| **Contenido del sitio** | Todos los textos e imágenes del sitio (ver detalle abajo) |
| **Suscriptores** | Ver la lista, quitar suscriptores y exportar a CSV |

**Editor de artículos:**

- Pestañas 🇦🇷 Español / 🇺🇸 English. El español es obligatorio; el inglés es opcional.
- Barra con negrita, cursiva, tachado, títulos (H2/H3), listas, citas, bloques de código, links, imágenes, separador, deshacer/rehacer.
- Imágenes: con el botón 🖼️, o **pegando / arrastrando** una imagen directamente en el texto. Se suben solas.
- **URL (slug):** se genera sola a partir del título en español (sin acentos ni símbolos); la podés cambiar. No puede repetirse.
- **Fecha de publicación:** si ponés una fecha futura, el artículo queda programado y aparece recién ese día.
- **Tiempo de lectura:** se calcula solo (200 palabras por minuto, sobre el texto en español).
- **Borradores:** no aparecen en el sitio. Vos sí los podés ver logueado con "Ver ES ↗ / Ver EN ↗" (aparece un aviso de "Vista previa").
- **Portada:** imagen opcional que se usa en la tarjeta, en el artículo y al compartir el link.

**Contenido del sitio** (todo en ES y EN donde corresponde):

| Grupo | Campos |
|---|---|
| Perfil y contacto | Nombre, foto, email de "Let's Talk", email de "Business Inquiries", ubicación, "programando desde", link para agendar llamadas (Calendly, Cal.com…) |
| SEO | Título de la pestaña y descripción |
| Home — Presentación | Título (negro), subtítulo (gris), chips de la fila 1 |
| Home — Sobre mí | Chips de la fila 2, tarjeta grande (título, texto, emoji), "Always Learning" (texto y emoji) |
| Proyectos — Encabezados | Título de la sección en el Home; emoji, título y subtítulo de la página Projects |
| Home — Tech Stack | Título, títulos de cada columna y la lista de herramientas (nombre, ícono emoji o imagen, color de fondo, descripción, link) |
| Newsletter | Título de la página y textos de la caja de suscripción |
| Services | Título, intro, servicios (emoji, título, descripción), pasos del proceso (un punto por línea), "fit", cierre y texto del botón |
| Redes sociales | Nombre y URL de cada red. Se muestran con su logo y color si el nombre es X, Instagram, TikTok, LinkedIn, YouTube, GitHub, Facebook, Threads, Bluesky, Twitch, Discord o Medium |

Las listas (chips, herramientas, servicios, pasos, redes) permiten **agregar, quitar y reordenar** (↑ ↓). Al guardar, los cambios se ven en el sitio inmediatamente.

**Imágenes subidas:** formatos JPG, PNG, WEBP, GIF y AVIF, hasta **8 MB** cada una.

---

## 2. Login y seguridad del panel

### Cómo se entra

- URL: `https://tudominio.com/admin` (te redirige a `/admin/login`).
- Hay **un solo usuario administrador**. Su email y contraseña **no están en la base de datos**: se leen de las variables `ADMIN_EMAIL` y `ADMIN_PASSWORD` del archivo `.env`.
- El email no distingue mayúsculas; la contraseña sí.

### Cómo funciona la sesión

- Al loguearte, el servidor crea un **token JWT firmado (HS256) con `AUTH_SECRET`** y lo guarda en la cookie `admin_session`.
- La cookie es `HttpOnly` (JavaScript no la puede leer), `Secure` en producción (sólo viaja por HTTPS) y `SameSite=Lax`.
- **Dura 7 días.** Después hay que volver a loguearse. "Salir" (arriba a la derecha) la borra.
- Cada página del panel y cada acción (guardar, borrar, subir imágenes, enviar emails, exportar CSV) **vuelve a verificar la sesión en el servidor**. Sin sesión válida no se puede hacer nada aunque se llame directo a la URL.

### Protecciones

- **Contra fuerza bruta:** después de **5 intentos fallidos desde la misma IP**, el login se bloquea **15 minutos** para esa IP. El contador vive en memoria: se reinicia si se reinicia la app.
- La comparación de credenciales es de tiempo constante (no filtra información por timing).
- Las imágenes sólo se aceptan si son de los formatos permitidos y se guardan con un nombre aleatorio. La ruta que las sirve bloquea intentos de leer archivos fuera de la carpeta de uploads.
- Los artículos se muestran como HTML: sólo el administrador puede escribirlos.
- El formulario público de suscripción tiene un campo oculto "trampa" contra bots.
- Caddy agrega cabeceras de seguridad (HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`).

### Cambiar la contraseña o el email del admin

1. Editá `ADMIN_EMAIL` / `ADMIN_PASSWORD` en `.env` (si la contraseña tiene `$`, `#` o espacios, ponela entre comillas simples).
2. Reiniciá la app: en el VPS `docker compose up -d` (recrea el contenedor con el `.env` nuevo); en local, reiniciá `npm run dev`.

### Cerrar todas las sesiones abiertas

Cambiá `AUTH_SECRET` por otro valor al azar (`openssl rand -hex 32`) y reiniciá la app. Todos los tokens anteriores dejan de valer.

---

## 3. Dónde se guarda cada cosa

| Qué | Dónde | Detalle |
|---|---|---|
| Artículos | PostgreSQL, tabla `Post` | Título, resumen y contenido HTML en ES y EN, slug, portada, estado, fecha, minutos de lectura, fecha del último envío por email |
| Proyectos | PostgreSQL, tabla `Project` | Nombre, descripción ES/EN, captura, link, color del botón, destacado, orden |
| Textos del sitio | PostgreSQL, tabla `SiteSettings` | **Una sola fila** (`id = 1`) con todo el contenido editable en una columna JSON `data` |
| Suscriptores | PostgreSQL, tabla `Subscriber` | Email (único), idioma con el que se suscribió, token para darse de baja, fecha |
| Imágenes subidas | Disco: carpeta `uploads/` | Organizadas por `año/mes/<uuid>.<ext>` y servidas en `/uploads/...`. En Docker es el volumen `uploads` (montado en `/app/uploads`); en local, la carpeta `./uploads` del proyecto |
| Usuario admin | Archivo `.env` | `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET`. No está en la base |
| Sesión del admin | Cookie `admin_session` en tu navegador | JWT firmado, 7 días |
| Idioma elegido por el visitante | Cookie `NEXT_LOCALE` en su navegador | Para recordar si eligió ES o EN |
| Textos fijos de la interfaz | Código: `messages/es.json` y `messages/en.json` | Etiquetas como "Based In", "Back to Top", "Subscribe", "Related Articles". Se cambian editando esos archivos |
| Valores por defecto del contenido | Código: `src/lib/settings-schema.ts` | Lo que se carga la primera vez y la definición de los formularios de "Contenido del sitio" |
| Logos de redes sociales | Externo: [Simple Icons](https://simpleicons.org) (CDN) | Se cargan desde internet al mostrar la página |
| Certificados HTTPS | Volumen Docker `caddy_data` | Caddy los obtiene y renueva solo |
| Base de datos (archivos) | Volumen Docker `pgdata` | En el VPS. Docker antepone el nombre de la carpeta del proyecto (ej. `sitio_pgdata`) |

**Primer arranque:** si la tabla `SiteSettings` está vacía, la app guarda los textos por defecto y, sólo si no hay artículos ni proyectos, crea un artículo ("Bienvenidos") y un proyecto de ejemplo para que el sitio no se vea vacío.

**Campos nuevos:** si en el futuro se agregan textos editables al código, aparecen solos con su valor por defecto; lo que ya guardaste no se pierde.

### Modelo de datos (`prisma/schema.prisma`)

```
Post          id, slug (único), titleEs, titleEn?, excerptEs, excerptEn?, contentEs, contentEn?,
              coverImage?, status (DRAFT | PUBLISHED), publishedAt, readingMinutes, emailSentAt?,
              createdAt, updatedAt
Project       id, name, descriptionEs, descriptionEn?, image?, url?, tag?, accentColor?,
              featured, order, createdAt, updatedAt
SiteSettings  id (= 1), data (JSON), updatedAt
Subscriber    id, email (único), locale, token (único), createdAt
```

Las migraciones están en `prisma/migrations/` y se aplican solas cada vez que arranca el contenedor (`prisma migrate deploy`).

---

## 4. Cómo funciona el bilingüe ES/EN

- **Español es el idioma por defecto** y va sin prefijo (`/newsletter`); el inglés va con `/en` (`/en/newsletter`).
- Al entrar a `/`, se usa el idioma que el visitante eligió la última vez (cookie `NEXT_LOCALE`) o, si es su primera visita, el idioma de su navegador.
- **Contenido** (artículos, proyectos, textos del sitio): cada campo tiene versión ES y EN. **Si la versión en inglés está vacía, se muestra la española**; en artículos además aparece el aviso "This post is only available in Spanish".
- **Etiquetas fijas** de la interfaz: salen de `messages/es.json` y `messages/en.json`.
- **Emails:** cada suscriptor recibe el artículo en el idioma desde el que se suscribió.

---

## 5. Newsletter: suscripción y envío de emails

### Suscripción

- El formulario (página Newsletter y botón azul del dock) guarda el email en la tabla `Subscriber` junto con el idioma de la página.
- Si el email ya existe, no se duplica.
- **No hay doble confirmación por mail** (double opt-in): el suscriptor queda activo apenas envía el formulario.

### Enviar un artículo por email

Requiere configurar Resend (ver abajo). Sin Resend, los suscriptores se guardan igual pero el botón aparece desactivado.

1. Publicá el artículo.
2. En la pantalla de edición, tocá **"✉️ Enviar a suscriptores"** y confirmá.
3. Se envía a todos los suscriptores, en lotes de 100, cada uno en su idioma, con:
   - el artículo completo (las imágenes con URL absoluta usando `SITE_URL`),
   - un botón "Leer en la web",
   - un link para darse de baja y las cabeceras `List-Unsubscribe` (el botón "Unsubscribe" nativo de Gmail/Outlook).
4. Queda registrada la fecha de envío. Si lo querés reenviar, el botón cambia a "Reenviar" y te avisa cuándo se mandó.

### Darse de baja

- El link del mail lleva a `/unsubscribe?token=…`, donde la persona confirma con un botón (así los antivirus de correo que abren links no dan de baja a nadie por accidente).
- El botón nativo de Gmail/Outlook usa `POST /api/unsubscribe?token=…` y da de baja directamente.
- Dar de baja **borra** el registro del suscriptor.

### Configurar Resend

1. Creá una cuenta en [resend.com](https://resend.com) (plan gratis: 3.000 mails por mes, 100 por día).
2. Agregá y verificá tu dominio (te da registros DNS para cargar).
3. En `.env`:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   EMAIL_FROM='Tu Nombre <newsletter@tudominio.com>'
   ```
4. Reiniciá la app (`docker compose up -d`).

---

## 6. Rutas y endpoints

| Ruta | Método | Acceso | Para qué |
|---|---|---|---|
| `/`, `/projects`, `/newsletter`, `/newsletter/<slug>`, `/services` (+ `/en/...`) | GET | Público | Sitio |
| `/unsubscribe?token=` | GET | Público | Confirmar baja |
| `/admin/login` | GET | Público | Login |
| `/admin`, `/admin/posts`, `/admin/projects`, `/admin/settings`, `/admin/subscribers` | GET | Admin | Panel |
| `/admin/subscribers/export` | GET | Admin | Descarga `suscriptores-AAAA-MM-DD.csv` |
| `/api/upload` | POST | Admin | Subida de imágenes (`multipart/form-data`, campo `file`) |
| `/uploads/<año>/<mes>/<archivo>` | GET | Público | Imágenes subidas (con caché de 1 año) |
| `/api/unsubscribe?token=` | POST | Público | Baja en un clic (Gmail/Outlook) |
| `/api/health` | GET | Público | Chequeo de salud: responde `{"ok":true}` si la app y la base funcionan |

Guardar, borrar, suscribirse y loguearse se hacen con *Server Actions* de Next.js (no son endpoints REST públicos).

---

## 7. Variables de entorno

Archivo `.env` en la raíz (copiá `.env.example`). **Nunca lo subas a git** (ya está en `.gitignore`).

| Variable | Obligatoria | Para qué | Ejemplo |
|---|---|---|---|
| `DOMAIN` | Sí (deploy) | Dominio que usa Caddy para el certificado HTTPS | `tudominio.com` |
| `SITE_URL` | Sí | URL pública; se usa en links de los emails y metadatos | `https://tudominio.com` |
| `POSTGRES_PASSWORD` | Sí | Contraseña de la base. Sólo letras y números | `openssl rand -hex 24` |
| `DATABASE_URL` | Sólo local | Conexión a la base en desarrollo (en Docker se arma sola) | `postgresql://newsletter:<pass>@localhost:5432/newsletter` |
| `ADMIN_EMAIL` | Sí | Email para entrar al panel | `vos@mail.com` |
| `ADMIN_PASSWORD` | Sí | Contraseña del panel | `'algo-largo-y-seguro'` |
| `AUTH_SECRET` | Sí | Firma de las sesiones. Mínimo 32 caracteres | `openssl rand -hex 32` |
| `RESEND_API_KEY` | No | Activa el envío de emails | `re_xxx` |
| `EMAIL_FROM` | No (sí con Resend) | Remitente de los emails | `'Tu Nombre <newsletter@tudominio.com>'` |
| `UPLOAD_DIR` | No | Carpeta de imágenes (por defecto `./uploads`; en Docker `/app/uploads`) | |

> Si un valor tiene `$`, `#` o espacios, ponelo entre **comillas simples**.

---

## 8. Desarrollo local

Requisitos: **Node 24+** y **Docker Desktop**.

```bash
cp .env.example .env          # completar ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET, POSTGRES_PASSWORD y DATABASE_URL
docker compose up -d db       # levanta sólo PostgreSQL (en localhost:5432)
npm install
npx prisma migrate deploy     # crea las tablas
npm run dev                   # http://localhost:3000  ·  panel: http://localhost:3000/admin
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Modo desarrollo con recarga automática. La primera vez que abrís cada página tarda unos segundos porque la compila |
| `npm run build` + `npm run start` | Modo producción local (rápido, como en el VPS) |
| `npm run typecheck` | Chequeo de tipos de TypeScript |
| `npm run db:migrate` | Aplica migraciones pendientes |

Para apagar la base local: `docker compose stop db`. Para borrarla por completo (¡se pierde todo!): `docker compose down -v`.

---

## 9. Deploy en el VPS

Requisitos: Linux con **Docker y Docker Compose**, **puertos 80 y 443 libres** y un **dominio**.

1. **DNS:** creá un registro `A` de tu dominio apuntando a la IP del VPS.
2. **Subí el código** (una sola vez):
   ```bash
   git clone <tu-repo> ~/sitio && cd ~/sitio
   # o desde tu PC: scp -r ./newsletter usuario@ip-vps:~/sitio
   ```
3. **Configurá:**
   ```bash
   cp .env.example .env
   nano .env
   ```
   Completá `DOMAIN`, `SITE_URL`, `POSTGRES_PASSWORD`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `AUTH_SECRET` (ver [variables](#7-variables-de-entorno)).
4. **Levantá todo:**
   ```bash
   docker compose up -d --build
   ```
   Se levantan tres contenedores:
   - `db`: PostgreSQL 16 (sólo accesible desde el propio servidor).
   - `app`: Next.js en modo producción. Al iniciar aplica las migraciones.
   - `caddy`: proxy con HTTPS automático (Let's Encrypt).
5. Entrá a `https://tudominio.com/admin` y cargá tu contenido. **De acá en adelante todo se hace desde el panel.**

### Actualizar el código (sólo si cambiás diseño o funciones)

```bash
git pull && docker compose up -d --build
```

Los datos (base, imágenes, certificados) viven en volúmenes de Docker y **no se pierden** al actualizar.

### Ver logs / estado

```bash
docker compose ps
docker compose logs -f app
curl https://tudominio.com/api/health
```

### Si ya tenés Nginx u otro servidor en los puertos 80/443

Borrá el servicio `caddy` de `docker-compose.yml` y agregá al servicio `app`:

```yaml
    ports:
      - "127.0.0.1:3000:3000"
```

En Nginx: `proxy_pass http://127.0.0.1:3000;` y `client_max_body_size 12m;` (para subir imágenes).

---

## 10. Backups y restauración

`backup.sh` guarda la base de datos y las imágenes en `./backups/` y borra los backups de más de 14 días.

```bash
chmod +x backup.sh
./backup.sh
# Programarlo todos los días a las 4 AM:
crontab -e
0 4 * * * /home/usuario/sitio/backup.sh
```

Genera `backups/db-FECHA.sql.gz` y `backups/uploads-FECHA.tgz`. **Copialos también fuera del VPS** (por ejemplo con `scp` a tu PC) por si el servidor falla.

**Restaurar la base:**

```bash
gunzip -c backups/db-FECHA.sql.gz | docker compose exec -T db psql -U newsletter newsletter
```

**Restaurar las imágenes:**

```bash
tar xzf backups/uploads-FECHA.tgz -C /tmp
docker compose cp /tmp/uploads-FECHA/. app:/app/uploads
```

---

## 11. Estructura del código

```
src/
  app/
    [locale]/                 Sitio público (es / en)
      layout.tsx              Estructura común: selector de idioma, footer y dock
      template.tsx            Fundido al cambiar de sección
      page.tsx                Home
      projects/  newsletter/  newsletter/[slug]/  services/  unsubscribe/
    admin/
      login/                  Pantalla y lógica de login
      (panel)/                Panel protegido (artículos, proyectos, contenido, suscriptores)
    api/                      upload, unsubscribe, health
    uploads/[...path]/        Sirve las imágenes subidas
    actions.ts                Suscripción al newsletter
    globals.css               Estilos base y animaciones
  components/
    site/                     Componentes del sitio (Dock, Footer, Bento, Marquee, Carousel, tarjetas…)
    admin/                    Editor de texto, campo de imagen, pestañas ES/EN
  lib/
    auth.ts                   Login, sesión (JWT en cookie) y protección del panel
    settings-schema.ts        Contenido editable: tipos, valores por defecto y formularios del admin
    settings.ts               Lectura/guardado del contenido y carga inicial
    email.ts                  Envío con Resend
    uploads.ts                Guardado de imágenes
    prisma.ts  text.ts        Cliente de base de datos y utilidades de texto/fechas
  i18n/                       Configuración de idiomas (next-intl)
  middleware.ts               Detecta el idioma y arma las rutas /en
messages/es.json, en.json     Textos fijos de la interfaz
prisma/schema.prisma          Modelo de datos
prisma/migrations/            Migraciones SQL
Dockerfile · docker-compose.yml · Caddyfile · backup.sh · .env.example
```

---

## 12. Cambios comunes en el código

**Cambiar una etiqueta fija** (por ejemplo "Back to Top"): editá `messages/es.json` y `messages/en.json`.

**Agregar un texto editable nuevo al panel:**

1. En `src/lib/settings-schema.ts`, agregalo al tipo `SiteSettings`, a `defaultSettings` y a la sección que corresponda en `settingsSections`.
2. Usalo en la página con `pick(settings.seccion.campo, locale)`.

No hace falta migración: se guarda dentro del JSON de `SiteSettings`.

**Agregar un campo a artículos o proyectos (base de datos):**

1. Editá `prisma/schema.prisma`.
2. Con la base local levantada: `npx prisma migrate dev --name descripcion-del-cambio`.
3. Commiteá la carpeta nueva de `prisma/migrations/`. En el VPS se aplica sola al hacer `docker compose up -d --build`.

**Colores y estilos:** los valores del diseño (gris `#F7F7F7`, azul `#1E6EF4`, tamaños) están directamente en las clases de Tailwind de cada componente; las clases compartidas y las animaciones, en `src/app/globals.css`.

---

## 13. Problemas frecuentes

| Problema | Causa / solución |
|---|---|
| "Email o contraseña incorrectos" con los datos correctos | Revisá `.env`. Si la contraseña tiene `$` o `#`, va entre comillas simples. Reiniciá la app después de cambiarla |
| "Demasiados intentos. Esperá 15 minutos." | Bloqueo por 5 intentos fallidos. Esperá o reiniciá la app |
| El login falla con un error y en los logs aparece `AUTH_SECRET must be set` | Falta `AUTH_SECRET` en `.env` o tiene menos de 32 caracteres |
| No se ven los cambios del admin en otra pestaña ya abierta | Las páginas visitadas se guardan hasta 60 segundos para que la navegación sea instantánea. Recargá la página |
| El botón "Enviar a suscriptores" está desactivado | Falta `RESEND_API_KEY` o `EMAIL_FROM` |
| Las imágenes de los emails no cargan | `SITE_URL` tiene que ser la URL pública real (con `https://`) |
| Caddy no consigue el certificado | El DNS todavía no apunta al VPS, o los puertos 80/443 están ocupados o cerrados en el firewall |
| La página tarda mucho la primera vez en local | Estás en `npm run dev`, que compila cada página al entrar. En producción es instantáneo |
| `npm ci` falla en el build de Docker | El `package-lock.json` tiene que generarse con npm 11 (Node 24), la misma versión que usa la imagen |
