
# 🩺 API REST de Resultados de Imágenes Médicas

Esta es una API RESTful desarrollada con Django + Django REST Framework para gestionar resultados de procesamiento de imágenes médicas usando PostgreSQL. La API acepta estructuras JSON, valida, normaliza y almacena los datos.

---

## 🚀 Características

- ✅ Operaciones CRUD completas sobre resultados
- ✅ Manejo de dispositivos mediante clave foránea (`Device`)
- ✅ Validación y normalización de los datos
- ✅ Cálculo de promedios antes y después de la normalización
- ✅ Filtros avanzados por fechas, promedios y tamaño de datos
- ✅ Configuración basada en variables de entorno (`.env`)
- ✅ Soporte para Docker (opcional)

---

## 🛠️ Instalación Manual

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/medical_api.git
cd medical_api
```

### 2. Crear y activar entorno virtual

```bash
python -m venv env
# En Windows
env\Scripts\activate
# En Linux/macOS
source env/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Crear archivo `.env`

```env
SECRET_KEY=clave_secreta_segura
DEBUG=True
DB_NAME=nombre_basedatos
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
DB_PORT=5432
```

### 5. Ejecutar migraciones

```bash
python manage.py migrate
```

### 6. Iniciar el servidor

```bash
python manage.py runserver
```
Esto iniciará la API y PostgreSQL usando los valores del archivo `.env`.

---

## 📡 Endpoints Disponibles

| Método | Endpoint                | Descripción                                      |
|--------|-------------------------|--------------------------------------------------|
| POST   | `/api/elements/`        | Crear múltiples resultados en lote              |
| GET    | `/api/elements/`        | Listar resultados (con soporte para filtros)    |
| GET    | `/api/elements/<id>/`   | Obtener un resultado específico                 |
| PUT    | `/api/elements/<id>/`   | Actualizar `image_result_id` o `device_name`    |
| PATCH  | `/api/elements/<id>/`   | Actualización parcial                           |
| DELETE | `/api/elements/<id>/`   | Eliminar un resultado                           |

---

## 📤 Ejemplo de Payload POST

```json
{
  "1": {
    "id": "aabbcc1",
    "data": [
      "78 83 21 68 96 46 40 11 1 88",
      "58 75 71 69 33 14 15 93 18 54"
    ],
    "deviceName": "CT SCAN"
  }
}
```

---

## 🧪 Ejemplo de Payload PATCH

```json
{
  "id": "aabbcc22",
  "device_name": "TOMOGRAFO R3"
}
```

---

## 📥 Ejemplo de Respuesta

```json
[
  {
    "id": 12,
    "image_result_id": "aabbcc1",
    "device": 2,
    "data": [
      "78 83 21 68 96 46 40 11 1 88",
      "58 75 71 69 33 14 15 93 18 54"
    ],
    "data_size": 20,
    "average_before": 51.3,
    "average_after": 0.627,
    "created_at": "2025-07-04T12:00:00Z",
    "updated_at": "2025-07-04T12:00:00Z"
  }
]
```

---

## 🔍 Soporte para Filtros

Puedes realizar filtros en los endpoints `GET /api/elements/` con los siguientes campos:

- `created_at`, `updated_at`
- `average_before`, `average_after`
- `data_size`

Todos los campos soportan los siguientes sufijos:

| Sufijo   | Descripción                  |
|----------|------------------------------|
| `__gte`  | Mayor o igual que            |
| `__lte`  | Menor o igual que            |

### 📌 Ejemplos de uso

- Obtener resultados con promedio antes ≤ 50:
  ```
  /api/elements/?average_before__lte=50
  ```

- Obtener resultados con tamaño de datos ≥ 60:
  ```
  /api/elements/?data_size__gte=60
  ```

- Obtener resultados con múltiples condiciones:
  ```
  /api/elements/?average_before__lte=50&data_size__gte=60
  ```

---

## 🔐 Seguridad

- Las variables sensibles están en `.env`
- Validación estricta de `SECRET_KEY`
- `.env` está excluido en `.gitignore`

---
