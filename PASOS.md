# Registro de Cambios: Configuración de PostgreSQL con Variables de Entorno (.env)

Este documento detalla los pasos y ajustes realizados para la correcta ejecución del servicio de PostgreSQL utilizando el archivo `.env` de la raíz, preservando la separación con el `.env` del servidor (`server/.env`).

---

## 1. Contexto y Diagnóstico Inicial

En el proyecto existen dos archivos de variables de entorno con propósitos diferentes:
1. **`.env` (en la raíz)**: Diseñado para el levantamiento y configuración del contenedor de base de datos PostgreSQL (`postgres:16-alpine`).
2. **`server/.env`**: Contiene la configuración específica de la API y el backend Elysia, destacando la cadena de conexión completa (`DATABASE_URL`).

### Problemas Detectados:
- **Falta de vinculación explícita en `docker-compose.yml`**: El servicio `db` no declaraba `env_file: - .env`, a diferencia del servicio `server` que sí declaraba `env_file: - server/.env`.
- **Conflicto de variables entre raíz y servidor**: En `docker-compose.yml`, el servicio `server` declaraba `environment: DATABASE_URL: ${DATABASE_URL}`. Dado que `${DATABASE_URL}` no existía en el `.env` de la raíz, Docker Compose arrojaba la advertencia:
  ```text
  WARN[0000] The "DATABASE_URL" variable is not set. Defaulting to a blank string.
  ```
  Esto sobreescribía con una cadena vacía la variable `DATABASE_URL` cargada desde `server/.env`, rompiendo la conexión de la API.
- **Nombres de variables**: El archivo `.env` utilizaba `db_user`, `db_password`, etc., mientras que la imagen oficial de PostgreSQL en Docker consume nativamente las variables `POSTGRES_USER`, `POSTGRES_PASSWORD` y `POSTGRES_DB`.
- **Formato en `.env.example`**: Tenía espacios alrededor del signo `=` (`clave = valor`), lo cual genera incompatibilidades con diversos parsers de variables de entorno.

---

## 2. Acciones Realizadas (Solo en la raíz)

Siguiendo las instrucciones, **no se modificó ningún archivo dentro de `/server` ni en otras carpetas**, limitando los cambios exclusivamente a la raíz:

### A. Modificación de `docker-compose.yml`
Se ajustó la configuración del servicio `db` y del servicio `server`:
1. **Se vinculó explícitamente el archivo `.env`** al servicio `db`:
   ```yaml
   env_file:
     - .env
   ```
2. **Se configuró compatibilidad dual de variables**:
   Se definió el bloque `environment` para aceptar tanto la nomenclatura estándar de PostgreSQL (`POSTGRES_*`) como las variables previamente utilizadas (`db_*`), con valores por defecto seguros:
   ```yaml
   environment:
     POSTGRES_USER: ${POSTGRES_USER:-${db_user}}
     POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-${db_password}}
     POSTGRES_DB: ${POSTGRES_DB:-${db_name}}
   ports:
     - "${POSTGRES_PORT:-${db_port:-5432}}:5432"
   ```
3. **Se eliminó la sobreescritura de `DATABASE_URL` en `server`**:
   Al remover `DATABASE_URL: ${DATABASE_URL}` del bloque `environment` de `server`, Docker Compose permite que `env_file: - server/.env` inyecte la variable sin interferencias ni advertencias.

### B. Actualización de `.env` (Raíz)
Se incorporaron las variables estándar de PostgreSQL manteniendo también las variables `db_*`:
```env
# Variables para la imagen de PostgreSQL (Docker)
POSTGRES_USER=zoe
POSTGRES_PASSWORD=Metips1234
POSTGRES_DB=vgbuilder
POSTGRES_PORT=5432

# Variables compatibles
db_user=zoe
db_password=Metips1234
db_name=vgbuilder
db_port=5432
```

### C. Actualización de `.env.example` (Raíz)
Se corrigió la sintaxis eliminando espacios y reflejando la misma estructura de nombres:
```env
# Variables para la imagen de PostgreSQL (Docker)
POSTGRES_USER=[user]
POSTGRES_PASSWORD=[password]
POSTGRES_DB=[db_name]
POSTGRES_PORT=[port]

# Variables compatibles
db_user=[user]
db_password=[password]
db_name=[db_name]
db_port=[port]
```

---

## 3. Verificación de Funcionamiento

Se ejecutó la validación del esquema con `docker compose config`:
- La salida compiló limpiamente **sin advertencias de variables no definidas**.
- El servicio `db` recibe correctamente:
  * `POSTGRES_USER: zoe`
  * `POSTGRES_PASSWORD: Metips1234`
  * `POSTGRES_DB: vgbuilder`
  * Puerto publicado: `5432:5432`
- El servicio `server` conserva su `DATABASE_URL` proveniente de `server/.env`.

---

## 4. Estado de Git

En cumplimiento con la solicitud del usuario:
- **No se realizó ningún `git commit`**.
- Los cambios permanecen en el working tree listos para su revisión.
