
# 🧪 Pruebas Técnicas - Vacante Desarrollador Backend (Python/Django)

Este repositorio contiene el desarrollo de las pruebas técnicas para aplicar a una vacante como desarrollador backend. Se incluyen soluciones a problemas de lógica en Python y la construcción de una API REST usando Django + PostgreSQL.

---

## ✅ Contenido

| Test | Nombre                                     | Estado    |
|------|--------------------------------------------|-----------|
| 1    | Recursión y Colores                        | ✅ Terminado |
| 2    | API REST para Resultados de Imágenes Médicas | ✅ Terminado |
| 3    | Por implementar                            | 🚧 Pendiente |
| 4    | Por implementar                            | 🚧 Pendiente |

---

## 🔹 Test 1 – Recursión y Colores

### 📝 Requisitos

- Python 3.8 o superior
- No se requieren librerías externas

### 🚀 Instrucciones para ejecutar

```bash
cd PythonTestTechImexhs
python main.py
```

---

## 🔷 Test 2 – API REST de Resultados de Imágenes Médicas

### 🧩 Tecnologías

- Django
- Django REST Framework
- PostgreSQL
- python-decouple

---

### 📦 Instalación (modo manual)

```bash
git clone https://github.com/Ob18ad15/PythonTestTechImexhs.git
cd medical_api #ingresa al directorio de la aplicación
python -m venv env
source env/bin/activate  # o env\Scripts\activate en Windows
pip install -r requirements.txt
```

### ⚙️ Archivo `.env`

```env
SECRET_KEY=tu_clave_secreta
DEBUG=True
DB_NAME=nombre_bd
DB_USER=usuario
DB_PASSWORD=clave
DB_HOST=localhost
DB_PORT=5432
```

### ▶️ Migraciones y ejecución

```bash
python manage.py migrate
python manage.py runserver
```

---

## 📡 Endpoints Principales

| Método | Endpoint                | Descripción                                     |
|--------|-------------------------|-------------------------------------------------|
| POST   | `/api/elements/`        | Crear múltiples resultados                     |
| GET    | `/api/elements/`        | Listar resultados (con filtros)                |
| GET    | `/api/elements/<id>/`   | Obtener un resultado específico                |
| PUT    | `/api/elements/<id>/`   | Cambiar ID o nombre del dispositivo            |
| PATCH  | `/api/elements/<id>/`   | Actualización parcial                          |
| DELETE | `/api/elements/<id>/`   | Eliminar un resultado                          |

---

### 📤 Ejemplo de Payload (POST)

```json
{
  "1": {
    "id": "aabbcc1",
    "data": ["78 83 21 68 96 46 40 11 1 88"],
    "deviceName": "CT SCAN"
  }
}
```

---

### 📥 Ejemplo de Payload (PATCH)

```json
{
  "id": "nuevo_id",
  "device_name": "Nuevo Dispositivo"
}
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


