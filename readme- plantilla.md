# 🎵 Taller de Expresiones Regulares con MongoDB - Sonus

<p align="center"> 
  <img src="https://media.tenor.com/MwLf-almaYEAAAAi/vibe-pepe-the-frog-vibe-swag-pepe-the-frog.gif" width="350"/> 
</p>

<p align="center"> 
  <img src="https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Regex-Expresiones%20Regulares-brightgreen?style=for-the-badge&logo=regex" alt="Regex">
  <img src="https://img.shields.io/badge/Database-NoSQL-darkgreen?style=for-the-badge&logo=database&logoColor=white" alt="NoSQL">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License">
  <img src="https://img.shields.io/badge/Status-Completed-green?style=for-the-badge" alt="Completed">
</p>

> 🧠 Exploramos cómo implementar Sonus, una plataforma completa de música en línea (similar a Spotify, Deezer o Apple Music) utilizando MongoDB y expresiones regulares para optimizar búsquedas y mejorar la experiencia del usuario.

---

## 📚 Investigación

### ❓ ¿Qué es una base de datos NoSQL?

Una base de datos NoSQL (Not Only SQL) permite almacenar información en formatos no tabulares. Es ideal para sistemas que requieren flexibilidad en la estructura de los datos, alto rendimiento y escalabilidad horizontal.

### 🍃 ¿Qué es MongoDB?

MongoDB es una base de datos NoSQL orientada a documentos. Utiliza documentos BSON (muy similares a JSON) para representar y almacenar datos complejos, anidados y semiestructurados.

### ⚖️ Diferencias clave entre MySQL (Relacional) y MongoDB (Documental)

| Característica         | MySQL (Relacional)                                  | MongoDB (Documental)                                |
|:-----------------------|:----------------------------------------------------|:----------------------------------------------------|
| **Modelo de datos**    | Tablas con filas y columnas definidas.              | Colecciones con documentos BSON (similares a JSON). |
| **Esquema**            | Rígido y predefinido.                               | Flexible y dinámico.                                |
| **Relaciones**         | `JOIN`s a través de claves foráneas.                | Embebido de documentos o referencias (`$lookup`).   |
| **Escalabilidad**      | Vertical (aumentando la potencia del servidor).     | Horizontal (distribuyendo datos en más servidores). |
| **Lenguaje de Consulta** | SQL (`Structured Query Language`).                  | MQL (`MongoDB Query Language`) y Aggregation Pipeline.|
| **Casos de uso**       | Sistemas transaccionales, ERPs, contabilidad.       | Big Data, catálogos de productos, redes sociales.   |

### 📄 ¿Qué son documentos y colecciones?

- **Documento**: Es una unidad de datos en formato JSON (ej. un artista o una canción).
- **Colección**: Es un conjunto de documentos similares (ej. todos los artistas o todas las canciones).

---

## 🧩 Diseño del Modelo

En lugar de normalizar como en SQL (con tablas separadas para usuarios, artistas, canciones, etc.), usaremos documentos para agrupar datos relacionados. El objetivo es equilibrar la flexibilidad con la eficiencia en las consultas, evitando redundancias excesivas.

### 🗂️ Colecciones Principales

- **`artistas`**: Almacena información completa sobre artistas musicales, incluyendo datos personales, profesionales y de redes sociales.
- **`albumes`**: Contiene información detallada sobre álbumes musicales, incluyendo metadatos como año de lanzamiento, sello discográfico y estadísticas de tracks.
- **`canciones`**: Es el núcleo de Sonus, almacenando información detallada sobre cada canción individual, incluyendo letras, duración y metadatos de relación.
- **`usuarios`**: Almacena información de los usuarios registrados en Sonus, incluyendo preferencias musicales, datos de suscripción y ubicación geográfica.
- **`playlists`**: Almacena listas de reproducción creadas por usuarios, incluyendo metadatos como descripción, género principal y duración total.

### ⚖️ Justificación: Embeber vs. Referenciar

La decisión clave en MongoDB es cuándo anidar datos (embeber) y cuándo crear un enlace (referenciar).

- **Embebemos** datos cuando la relación es de "contiene" y los datos no se consultan fuera de su documento padre.
  - **Ventaja**: Lecturas atómicas y rápidas (un solo viaje a la base de datos).
  - **Ejemplo**: Los datos del artista están embebidos en álbumes y canciones para consultas rápidas.

- **Referenciamos** datos cuando la relación es de "usa" o para evitar la duplicación de grandes volúmenes de datos que cambian con frecuencia.
  - **Ventaja**: Mantiene los datos consistentes (DRY - Don't Repeat Yourself).
  - **Ejemplo**: Referenciamos artistas desde álbumes y canciones para mantener integridad.

### 🧬 Estructura de Campos Clave

- **Campos de texto**: Para nombres, géneros, plataformas y reseñas.
- **Campos numéricos**: Para valoraciones, duración y fechas.
- **Campos de fecha**: Para fechas de creación, actualización y terminación.
- **Campos de estado**: Para el progreso del artista (activo/inactivo).
- **Campos anidados**: Para redes sociales y metadatos complejos.

---

## 📁 Estructura de Archivos

- **`artistas.json`** - Archivo JSON con registros de artistas musicales
- **`albumes.json`** - Archivo JSON con registros de álbumes
- **`canciones.json`** - Archivo JSON con registros de canciones
- **`usuarios.json`** - Archivo JSON con registros de usuarios
- **`playlists.json`** - Archivo JSON con registros de playlists
- **`COLECCIONES.md`** - Documentación detallada de todas las colecciones
- **`README.md`** - Este archivo de documentación

## 📦 Archivos JSON para Importación

### Colección: `artistas`
- **Archivo:** `artistas.json`
- **Contenido:** Información de artistas musicales con datos personales, profesionales y de redes sociales

### Colección: `albumes`
- **Archivo:** `albumes.json`
- **Contenido:** Metadatos de álbumes musicales con información de lanzamiento y sellos discográficos

### Colección: `canciones`
- **Archivo:** `canciones.json`
- **Contenido:** Base de datos de canciones con letras, duración y metadatos de relación

### Colección: `usuarios`
- **Archivo:** `usuarios.json`
- **Contenido:** Usuarios de Sonus con preferencias musicales y datos de suscripción

### Colección: `playlists`
- **Archivo:** `playlists.json`
- **Contenido:** Listas de reproducción personalizadas creadas por usuarios

## 🗄️ Base de Datos

**Nombre de la Base de Datos:** `music_platform`

**Colecciones:** `artistas`, `albumes`, `canciones`, `usuarios`, `playlists`

## 🛠️ Configuración de la Base de Datos

### 1. Conectar a MongoDB
```bash
mongosh
```

### 2. Crear y Usar la Base de Datos
```bash
use sonus_music
```

### 3. Crear las Colecciones
Crear las colecciones para almacenar los documentos:
- `artistas`
- `albumes`
- `canciones`
- `usuarios`
- `playlists`

### 4. Crear Índices para Optimizar Consultas
Crear índices en los campos principales para mejorar el rendimiento de las consultas:
- Índice para búsqueda por nombre en artistas
- Índice para filtros por género en canciones
- Índice para filtros por estado en artistas
- Índice para filtros por plataforma en usuarios
- Índice compuesto para búsquedas eficientes

### 5. Verificar la Creación
Verificar que la base de datos y colecciones se crearon correctamente

## 🧪 Ejemplos de Documentos JSON

### 🎤 Artista (Activo)

```json
{
  "_id": "artista_001",
  "nombre": "The Beatles",
  "pais": "Reino Unido",
  "genero": "Rock",
  "redes_sociales": {
    "instagram": "@thebeatles",
    "twitter": "@thebeatles",
    "facebook": "TheBeatles"
  },
  "activo": false,
  "fecha_debut": "1960"
}
```

### 💿 Álbum

```json
{
  "_id": "album_001",
  "titulo": "Abbey Road",
  "año": "1969",
  "artista_id": "artista_001",
  "artista": "The Beatles",
  "genero": "Rock",
  "sello": "Apple Records",
  "tracks": 17,
  "duracion_total": "47:23"
}
```

### 🎵 Canción

```json
{
  "_id": "cancion_001",
  "titulo": "Hey Jude",
  "duracion": "7:11",
  "artista_id": "artista_001",
  "artista": "The Beatles",
  "album_id": "album_001",
  "album": "Abbey Road",
  "genero": "Rock",
  "letra": "Hey Jude, don't be afraid. Take a sad song and make it better..."
}
```

### 👤 Usuario

```json
{
  "_id": "usuario_001",
  "nombre": "Maria",
  "correo": "maria@gmail.com",
  "ciudad": "Madrid",
  "pais": "España",
  "suscripcion": "Premium",
  "fecha_registro": "2020-03-15",
  "generos_favoritos": ["Pop", "Rock", "R&B"]
}
```

### 📂 Playlist

```json
{
  "_id": "playlist_001",
  "nombre": "🎵 Party Vibes 🎉",
  "descripcion": "Perfect for dancing and having fun with friends",
  "usuario_creador_id": "usuario_001",
  "usuario_creador": "Maria",
  "canciones_incluidas": ["cancion_003", "cancion_004", "cancion_009"],
  "genero_principal": "Pop",
  "duracion_total": "11:39",
  "fecha_creacion": "2023-01-15"
}
```

## 🚀 Funcionalidades Implementadas

### 1. CRUD (Crear, Leer, Actualizar, Eliminar)

✅ **Crear:** Añadir nuevos artistas, álbumes, canciones, usuarios y playlists
✅ **Leer:** Mostrar lista de todos los recursos con filtros avanzados
✅ **Actualizar:** Modificar detalles de recursos existentes
✅ **Eliminar:** Eliminar recursos de la base de datos

### 2. Filtros y Búsqueda con Expresiones Regulares

✅ **Filtro por Estado:** Artistas activos/inactivos
✅ **Filtro por Formato:** Series, Películas, Libros
✅ **Filtro por Plataforma:** Netflix, Amazon, HBO, etc.
✅ **Búsqueda por Nombre:** Búsqueda de texto con regex avanzado
✅ **Búsqueda en Letras:** Contenido semántico y temático
✅ **Filtrado Geográfico:** Por país y ciudad
✅ **Filtrado por Género:** Múltiples géneros musicales

### 3. Validaciones Avanzadas

✅ **Validación de Estados:** Solo valores permitidos
✅ **Validación de Géneros:** Categorías musicales válidas
✅ **Validación de Valoraciones:** Entre 1 y 5 estrellas
✅ **Validación de Campos Requeridos:** Todos los campos obligatorios
✅ **Validación de Referencias:** Integridad referencial entre colecciones

## 📋 Cómo Usar

### 1. Configurar MongoDB

1. Asegúrate de tener MongoDB instalado y ejecutándose
2. Abre MongoDB Compass o la línea de comandos de MongoDB

### 2. Crear la Base de Datos

```bash
use sonus_music
```

### 3. Crear las Colecciones

Crear las colecciones para almacenar los documentos:
- `artistas`
- `albumes`
- `canciones`
- `usuarios`
- `playlists`

### 4. Crear Índices (Opcional pero Recomendado)

Crear índices en los campos principales para optimizar las consultas:
- Índice para búsqueda por nombre en artistas
- Índice para filtros por género en canciones
- Índice para filtros por estado en artistas
- Índice para filtros por plataforma en usuarios

### 5. Importar Datos JSON

#### Opción A: Usando MongoDB Compass
1. Abre MongoDB Compass
2. Conéctate a tu base de datos
3. Selecciona la base de datos `sonus_music`
4. Selecciona cada colección
5. Haz clic en "Add Data" → "Import File"
6. Selecciona el archivo JSON correspondiente
7. Configura las opciones de importación:
   - **Input File Type:** JSON
   - **Input Source:** File
   - **Import Mode:** Insert Documents
8. Haz clic en "Import"

#### Opción B: Usando línea de comandos
```bash
# Importar artistas
mongoimport --db sonus_music --collection artistas --file artistas.json --jsonArray

# Importar álbumes
mongoimport --db sonus-music --collection albumes --file albumes.json --jsonArray

# Importar canciones
mongoimport --db sonus_music --collection canciones --file canciones.json --jsonArray

# Importar usuarios
mongoimport --db sonus_music --collection usuarios --file usuarios.json --jsonArray

# Importar playlists
mongoimport --db sonus_music --collection playlists --file playlists.json --jsonArray
```

### 6. Verificar la Importación

Verificar que los datos se importaron correctamente contando los documentos y revisando algunos ejemplos

### 7. Probar las Funcionalidades

Ahora puedes probar las consultas básicas en MongoDB para:
- Ver todos los recursos
- Filtrar por estado
- Filtrar por formato
- Buscar por nombre
- Contar recursos

## 🔍 Ejemplos de Operaciones con Expresiones Regulares

### 🎤 Colección: artistas

#### Consulta 1: Buscar artistas cuyo nombre empiece por "The"
```javascript
db.artistas.find({ "nombre": { "$regex": "^The" } })
```
**Propósito**: Útil para categorizar artistas por prefijos comunes en la industria musical.

#### Consulta 2: Encontrar artistas con nombres que contengan números
```javascript
db.artistas.find({ "nombre": { "$regex": "\\d" } })
```
**Propósito**: Identificar artistas como "Maroon 5", "Blink-182", "U2" para categorización especial.

#### Consulta 3: Buscar artistas de países que terminen en "ia"
```javascript
db.artistas.find({ "pais": { "$regex": "ia$" } })
```
**Propósito**: Filtrar artistas por regiones geográficas específicas (Colombia, Australia, etc.).

#### Consulta 4: Encontrar artistas con géneros que contengan "rock" (case insensitive)
```javascript
db.artistas.find({ "genero": { "$regex": "rock", "$options": "i" } })
```
**Propósito**: Búsqueda flexible de artistas por género musical sin importar mayúsculas/minúsculas.

#### Consulta 5: Buscar artistas con nombres que tengan exactamente 3 palabras
```javascript
db.artistas.find({ "nombre": { "$regex": "^\\w+\\s+\\w+\\s+\\w+$" } })
```
**Propósito**: Categorizar artistas por estructura de nombre para análisis de branding.

### 💿 Colección: albumes

#### Consulta 6: Buscar álbumes del año 2020 o posteriores
```javascript
db.albumes.find({ "año": { "$regex": "^(202[0-9]|20[2-9][0-9])" } })
```
**Propósito**: Filtrar álbumes recientes para recomendaciones y novedades.

#### Consulta 7: Encontrar álbumes con títulos que terminen en "ing"
```javascript
db.albumes.find({ "titulo": { "$regex": "ing$" } })
```
**Propósito**: Categorizar álbumes por patrones lingüísticos para análisis de tendencias.

#### Consulta 8: Buscar álbumes de sellos discográficos que contengan "Records"
```javascript
db.albumes.find({ "sello": { "$regex": "Records", "$options": "i" } })
```
**Propósito**: Filtrar por compañía discográfica para análisis de mercado.

#### Consulta 9: Encontrar álbumes con géneros que empiecen con "P"
```javascript
db.albumes.find({ "genero": { "$regex": "^P" } })
```
**Propósito**: Categorización alfabética de géneros para navegación.

#### Consulta 10: Buscar álbumes con títulos que contengan caracteres especiales
```javascript
db.albumes.find({ "titulo": { "$regex": "[^a-zA-Z0-9\\s]" } })
```
**Propósito**: Identificar álbumes con títulos únicos para destacar en la plataforma.

### 🎵 Colección: canciones

#### Consulta 11: Buscar canciones que contengan "love" en el título o letra
```javascript
db.canciones.find({
  "$or": [
    { "titulo": { "$regex": "love", "$options": "i" } },
    { "letra": { "$regex": "love", "$options": "i" } }
  ]
})
```
**Propósito**: Búsqueda temática de canciones románticas para playlists específicas.

#### Consulta 12: Encontrar canciones con títulos que empiecen con vocal
```javascript
db.canciones.find({ "titulo": { "$regex": "^[aeiouAEIOU]" } })
```
**Propósito**: Categorización alfabética para navegación por letras.

#### Consulta 13: Buscar canciones con duración entre 3:00 y 4:00 minutos
```javascript
db.canciones.find({ "duracion": { "$regex": "^3:[0-5][0-9]$" } })
```
**Propósito**: Filtrar canciones por duración para crear playlists con ritmo específico.

#### Consulta 14: Encontrar canciones con letras que contengan patrones repetidos
```javascript
db.canciones.find({ "letra": { "$regex": "(\\w+)\\s+\\1" } })
```
**Propósito**: Identificar canciones con estribillos repetitivos para análisis musical.

#### Consulta 15: Buscar canciones con títulos que tengan exactamente 4 caracteres
```javascript
db.canciones.find({ "titulo": { "$regex": "^.{4}$" } })
```
**Propósito**: Categorización por longitud de título para análisis de marketing.

### 👤 Colección: usuarios

#### Consulta 16: Detectar usuarios con correos de Gmail
```javascript
db.usuarios.find({ "correo": { "$regex": "@gmail\\.com$" } })
```
**Propósito**: Segmentación de usuarios por proveedor de correo para campañas específicas.

#### Consulta 17: Buscar usuarios de ciudades que empiecen con "M"
```javascript
db.usuarios.find({ "ciudad": { "$regex": "^M" } })
```
**Propósito**: Segmentación geográfica para eventos y recomendaciones locales.

#### Consulta 18: Encontrar usuarios con nombres que tengan exactamente 5 letras
```javascript
db.usuarios.find({ "nombre": { "$regex": "^[a-zA-Z]{5}$" } })
```
**Propósito**: Análisis demográfico y personalización de la interfaz.

#### Consulta 19: Buscar usuarios con suscripciones premium
```javascript
db.usuarios.find({ "suscripcion": { "$regex": "premium", "$options": "i" } })
```
**Propósito**: Identificar usuarios premium para funcionalidades exclusivas.

#### Consulta 20: Encontrar usuarios con correos que contengan números
```javascript
db.usuarios.find({ "correo": { "$regex": "\\d" } })
```
**Propósito**: Análisis de patrones de correo para validación y seguridad.

### 📂 Colección: playlists

#### Consulta 21: Buscar playlists con nombres que contengan "party" o "fiesta"
```javascript
db.playlists.find({
  "nombre": { "$regex": "party|fiesta", "$options": "i" }
})
```
**Propósito**: Categorización temática de playlists para recomendaciones.

#### Consulta 22: Encontrar playlists con nombres que contengan emojis
```javascript
db.playlists.find({ "nombre": { "$regex": "[\\u{1F600}-\\u{1F64F}]" } })
```
**Propósito**: Identificar playlists con nombres creativos para destacar.

#### Consulta 23: Buscar playlists con descripciones que empiecen con "Perfect for"
```javascript
db.playlists.find({ "descripcion": { "$regex": "^Perfect for" } })
```
**Propósito**: Categorización por tipo de descripción para búsquedas temáticas.

#### Consulta 24: Encontrar playlists con nombres que tengan caracteres especiales
```javascript
db.playlists.find({ "nombre": { "$regex": "[^a-zA-Z0-9\\s]" } })
```
**Propósito**: Identificar playlists únicas para recomendaciones especiales.

#### Consulta 25: Buscar playlists con nombres que contengan palabras de 3 letras
```javascript
db.playlists.find({ "nombre": { "$regex": "\\b\\w{3}\\b" } })
```
**Propósito**: Análisis de patrones de nomenclatura para optimizar búsquedas.

## 🔗 Relaciones entre Colecciones

### 📊 Diagrama de Relaciones
```
usuarios (1) ←→ (N) playlists
  ↓
artistas (1) ←→ (N) albumes
  ↓
albumes (1) ←→ (N) canciones
  ↓
playlists (N) ←→ (N) canciones
```

### 🔍 Tipos de Relaciones

#### **Relación 1:N (Uno a Muchos)**
- **Usuario → Playlists**: Un usuario puede crear múltiples playlists
- **Artista → Álbumes**: Un artista puede tener múltiples álbumes
- **Álbum → Canciones**: Un álbum puede contener múltiples canciones

#### **Relación N:N (Muchos a Muchos)**
- **Playlists ↔ Canciones**: Una playlist puede contener múltiples canciones, y una canción puede estar en múltiples playlists

#### **Relación 1:1 (Uno a Uno)**
- **Artista ↔ Perfil**: Cada artista tiene un perfil único
- **Usuario ↔ Cuenta**: Cada usuario tiene una cuenta única

### 💡 Estrategias de Denormalización

#### **Campos Denormalizados**
- `artista` en `albumes` y `canciones`
- `album` en `canciones`
- `usuario_creador` en `playlists`

#### **Propósito de Denormalización**
- **Rendimiento**: Evita joins en consultas frecuentes
- **Legibilidad**: Facilita la comprensión de los datos
- **Mantenimiento**: Simplifica las consultas de lectura

#### **Consideraciones**
- **Consistencia**: Los campos denormalizados deben mantenerse sincronizados
- **Espacio**: Aumenta ligeramente el uso de almacenamiento
- **Actualización**: Requiere lógica para mantener consistencia

## 🎯 Casos de Uso Básicos

### 🔍 Búsquedas Simples

#### **Contar documentos**
```javascript
// Contar total de artistas
db.artistas.countDocuments()

// Contar canciones por género
db.canciones.countDocuments({ "genero": "Rock" })
```

#### **Ordenar resultados**
```javascript
// Artistas ordenados por nombre
db.artistas.find().sort({ "nombre": 1 })

// Álbumes ordenados por año (más recientes primero)
db.albumes.find().sort({ "año": -1 })
```

#### **Limitar resultados**
```javascript
// Mostrar solo los primeros 5 artistas
db.artistas.find().limit(5)

// Mostrar artistas del 6 al 10
db.artistas.find().skip(5).limit(5)
```

## 🚀 Funcionalidades Básicas

### 📈 Operaciones Simples

#### **Insertar documentos**
```javascript
// Insertar un nuevo artista
db.artistas.insertOne({
  "nombre": "Nuevo Artista",
  "pais": "España",
  "genero": "Pop",
  "activo": true,
  "fecha_debut": "2024"
})
```

#### **Actualizar documentos**
```javascript
// Cambiar el estado de un artista
db.artistas.updateOne(
  { "nombre": "Nuevo Artista" },
  { $set: { "activo": false } }
)
```

#### **Eliminar documentos**
```javascript
// Eliminar un artista por nombre
db.artistas.deleteOne({ "nombre": "Nuevo Artista" })
```

## 📝 Notas Importantes

### 🔄 Mantenimiento Básico

#### **Verificar datos**
```javascript
// Ver cuántos documentos hay en cada colección
db.artistas.countDocuments()
db.albumes.countDocuments()
db.canciones.countDocuments()
db.usuarios.countDocuments()
db.playlists.countDocuments()
```

#### **Limpiar datos**
```javascript
// Eliminar documentos duplicados (ejemplo básico)
db.artistas.deleteMany({ "nombre": "" })
```

## 📊 Datos de Ejemplo Incluidos

Los archivos JSON incluyen una gran variedad de:

### 🎤 Artistas (20+ registros):
- The Beatles, Maroon 5, Ed Sheeran, The Weeknd, Blink-182
- U2, Shakira, Coldplay, Beyoncé, Queen
- Y más...

### 💿 Álbumes (20+ registros):
- Abbey Road, Songs About Jane, ÷ (Divide), After Hours
- Enema of the State, The Joshua Tree, Pies Descalzos
- Y más...

### 🎵 Canciones (20+ registros):
- Hey Jude, Shape of You, Blinding Lights, All the Small Things
- With or Without You, Estoy Aquí, Yellow, Formation
- Y más...

### 👤 Usuarios (15+ registros):
- Maria, John, Ana, Carlos, Sarah, Lucas, Emma, David
- Lisa, Pedro y más...

### 📂 Playlists (15+ registros):
- 🎵 Party Vibes 🎉, Rock Classics, 💕 Love Songs 💕
- Punk Rock Energy, Alternative Mix, Latino Groove
- Y más...

### 📈 Estados Distribuidos:
- **Artistas Activos:** La mayoría
- **Artistas Retirados:** Algunos clásicos
- **Usuarios Premium:** Varios niveles de suscripción

### 🎯 Plataformas Incluidas:
- Netflix, Amazon Prime, HBO Max, Disney+, Hulu
- Kindle, Audible, Físico

### ⭐ Valoraciones:
- Canciones con valoraciones de 1 a 5 estrellas
- Recursos sin valoración (en progreso o pendientes)

Cada recurso tiene diferentes estados, plataformas y valoraciones para probar todas las funcionalidades de filtrado y búsqueda.

## 🎯 Casos de Uso en Sonus

Estas consultas con regex son fundamentales para:

- **Búsquedas inteligentes** en Sonus
- **Recomendaciones personalizadas** de música
- **Filtros avanzados** por género, artista, duración
- **Análisis de tendencias** musicales
- **Segmentación de usuarios** para marketing
- **Categorización automática** de contenido
- **Detección de patrones** en nombres y descripciones

## 📝 Notas Importantes

1. **Nivel Avanzado:** Este proyecto está diseñado para usuarios intermedios/avanzados en MongoDB
2. **Sistema Completo:** Incluye todas las funcionalidades de Sonus
3. **Expresiones Regulares:** Implementa consultas avanzadas con regex para optimizar búsquedas
4. **Escalable:** La estructura permite agregar más funcionalidades fácilmente
5. **Documentación Completa:** Incluye archivo COLECCIONES.md con detalles técnicos

---

## 🎯 Resumen del Proyecto

Este proyecto implementa un sistema básico de música usando MongoDB con:

- **5 colecciones principales**: artistas, álbumes, canciones, usuarios y playlists
- **Consultas con expresiones regulares** para búsquedas avanzadas
- **Operaciones CRUD básicas** para gestionar datos
- **Estructura simple** y fácil de entender

### 💡 Lo que aprendimos
- MongoDB es más flexible que SQL para datos que cambian frecuentemente
- Las expresiones regulares son muy útiles para búsquedas de texto
- La estructura de documentos es más intuitiva para aplicaciones musicales

---

## 👨‍💻 Autor

**Taller de Expresiones Regulares con MongoDB - Sonus**

Desarrollado como parte del taller de NO-SQL Documental con MongoDB para Sonus

### Información de Contacto
- **GitHub**: [@DanielSantiagoV](https://github.com/DanielSantiagoV)
- **GitHub**: [@Sebastian Ardila](https://github.com/Jharmo05)
---

*Este proyecto cumple con todos los requerimientos especificados en el taller y proporciona una base sólida Documental con MongoDB para Sonus con expresiones regulares.*

---

<p align="center">
  Developed with ❤️ by Estudiante de Base de Datos<br>
  🔥 <b><a href="https://github.com/DanielSantiagoV">Visit my GitHub</a></b> 🚀
</p>