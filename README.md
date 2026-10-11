# Mi sitio + Newsletter

Sitio personal con newsletter, proyectos y servicios, en español e inglés, con panel de administración.
Todo el contenido se edita desde **`/admin`**: no hace falta tocar código ni redeployar para publicar.

**Stack:** Next.js 15 · PostgreSQL + Prisma · Tailwind · Tiptap (editor) · Docker + Caddy (HTTPS automático)

## Qué incluye

| Página | Ruta (ES) | Ruta (EN) |
|---|---|---|
| Home (hero, sobre mí, proyectos, tech stack, últimos artículos, contacto) | `/` | `/en` |
| Proyectos | `/projects` | `/en/projects` |
| Newsletter (suscripción + artículos) | `/newsletter` | `/en/newsletter` |
| Artículo | `/newsletter/mi-articulo` | `/en/newsletter/mi-articulo` |
| Servicios / Work with me | `/services` | `/en/services` |
| Panel admin | `/admin` | — |

El botón **ES / EN** del header cambia de idioma y te deja en la misma página.

## Uso del panel `/admin`

- **Artículos** → "Nuevo artículo". Escribís en la pestaña 🇦🇷 Español y, si querés, en 🇺🇸 English.
  Si no completás el inglés, el sitio en inglés muestra la versión en español con un aviso.
  - Imágenes: botón 🖼️ de la barra, o **pegá / arrastrá** una imagen directo en el texto.
  - "Guardar borrador" no lo publica; podés previsualizarlo con "Ver ES ↗" (solo vos lo ves).
  - Fecha futura = se publica solo ese día.
  - "✉️ Enviar a suscriptores" manda el artículo por mail (necesita Resend, ver abajo).
- **Proyectos** → nombre, descripción ES/EN, imagen, link. "Destacado" = aparece en el Home.
- **Contenido del sitio** → todos los textos: hero, chips, sobre mí, tech stack, servicios, proceso, redes, email, link de Calendly, foto de perfil…
- **Suscriptores** → listado y exportar CSV.

## Desarrollo local

Requisitos: Node 24+ y Docker.

```bash
cp .env.example .env          # completar: ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET, POSTGRES_PASSWORD
docker compose up -d db       # levanta solo Postgres
npm install
npx prisma migrate deploy     # crea las tablas
npm run dev                   # http://localhost:3000  y  http://localhost:3000/admin
```

La primera vez que se abre el sitio se carga contenido de ejemplo, que después editás desde el admin.

## Deploy en el VPS

Requisitos: Linux con Docker y Docker Compose, puertos 80 y 443 libres, y un dominio.

1. **DNS:** creá un registro `A` de tu dominio apuntando a la IP del VPS.
2. **Subir el código** (una sola vez):
   ```bash
   git clone <tu-repo> ~/sitio && cd ~/sitio
   # o copialo con: scp -r ./newsletter usuario@ip-vps:~/sitio
   ```
3. **Configurar:**
   ```bash
   cp .env.example .env
   nano .env
   ```
   - `DOMAIN=tudominio.com` y `SITE_URL=https://tudominio.com`
   - `POSTGRES_PASSWORD` → `openssl rand -hex 24`
   - `AUTH_SECRET` → `openssl rand -hex 32`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` → tus credenciales del panel
4. **Levantar:**
   ```bash
   docker compose up -d --build
   ```
   Las tablas se crean solas al iniciar y Caddy saca el certificado HTTPS en unos segundos.
5. Entrá a `https://tudominio.com/admin` y cargá tu contenido. **Listo: de acá en adelante todo se hace desde el panel.**

### Actualizar el código (solo si cambiás el diseño o agregás funciones)

```bash
git pull && docker compose up -d --build
```

### Si ya tenés Nginx u otro servidor usando los puertos 80/443

Borrá el servicio `caddy` de `docker-compose.yml`, agregá al servicio `app`:

```yaml
    ports:
      - "127.0.0.1:3000:3000"
```

y en tu Nginx hacé `proxy_pass http://127.0.0.1:3000;` con `client_max_body_size 12m;`.

## Envío de emails (opcional)

1. Creá una cuenta en [resend.com](https://resend.com) (plan gratis: 3.000 mails/mes).
2. Verificá tu dominio (te da registros DNS para agregar).
3. En `.env`: `RESEND_API_KEY=re_...` y `EMAIL_FROM='Tu Nombre <newsletter@tudominio.com>'`.
4. `docker compose up -d` para que tome los cambios.

Cada mail incluye link para darse de baja (y el botón "Unsubscribe" nativo de Gmail/Outlook).

## Backups

```bash
chmod +x backup.sh
./backup.sh                               # guarda DB + imágenes en ./backups
crontab -e                                # backup diario a las 4 AM:
0 4 * * * /home/usuario/sitio/backup.sh
```

Restaurar la base:
```bash
gunzip -c backups/db-FECHA.sql.gz | docker compose exec -T db psql -U newsletter newsletter
```

## Estructura

```
src/app/[locale]/        páginas públicas (home, projects, newsletter, services)
src/app/admin/           panel de administración
src/components/site/     componentes del sitio
src/components/admin/    editor, subida de imágenes
src/lib/settings-schema.ts  textos editables del sitio y sus valores por defecto
messages/es.json, en.json   textos fijos de la interfaz (botones, menús)
prisma/schema.prisma     modelo de datos
```
