# 🌿 La Tienda del Borojó - Sistema de Gestión con MongoDB

<p align="center"> 
  <img src="https://media.tenor.com/MwLf-almaYEAAAAi/vibe-pepe-the-frog-vibe-swag-pepe-the-frog.gif" width="350"/> 
</p>

<p align="center"> 
  <img src="https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Regex-Expresiones%20Regulares-brightgreen?style=for-the-badge&logo=regex" alt="Regex">
  <img src="https://img.shields.io/badge/Database-NoSQL-darkgreen?style=for-the-badge&logo=database&logoColor=white" alt="NoSQL">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License">
  <img src="https://img.shields.io/badge/Status-Completed-green?style=for-the-badge" alt="Completed">
  <img src="https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge" alt="Version">
</p>

> 🧠 Exploramos cómo implementar "La Tienda del Borojó", un sistema completo de gestión de inventario y ventas para productos derivados del borojó en el Pacífico colombiano, utilizando MongoDB y expresiones regulares para optimizar operaciones comerciales.

---

## 📋 **TABLA DE CONTENIDOS**

- [📚 Investigación](#-investigación)
- [🧩 Diseño del Modelo](#-diseño-del-modelo)
- [📁 Estructura de Archivos](#-estructura-de-archivos)
- [🗄️ Base de Datos](#️-base-de-datos)
- [🛠️ Configuración](#️-configuración-de-la-base-de-datos)
- [🧪 Ejemplos de Documentos](#-ejemplos-de-documentos-json)
- [🚀 Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [📋 Cómo Usar](#-cómo-usar)
- [🔍 Ejemplos de Operaciones con Regex](#-ejemplos-de-operaciones-con-expresiones-regulares)
- [🔗 Relaciones entre Colecciones](#-relaciones-entre-colecciones)
- [🎯 Casos de Uso Básicos](#-casos-de-uso-básicos)
- [📚 Listado de Ejercicios Desarrollados](#-listado-de-ejercicios-desarrollados)
- [💡 Explicación de Cada Funcionalidad](#-explicación-de-cada-funcionalidad-documentada)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla-de-respuesta-a-las-consultas)
- [🚀 Instrucciones para Ejecutar Scripts](#️-instrucciones-para-ejecutar-los-scripts)
- [🎉 Conclusión](#-conclusión)

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

- **Documento**: Es una unidad de datos en formato JSON (ej. un producto o un cliente).
- **Colección**: Es un conjunto de documentos similares (ej. todos los productos o todos los clientes).

---

## 🧩 Diseño del Modelo

En lugar de normalizar como en SQL (con tablas separadas para productos, clientes, ventas, etc.), usaremos documentos para agrupar datos relacionados. El objetivo es equilibrar la flexibilidad con la eficiencia en las consultas, evitando redundancias excesivas.

### 🗂️ Colecciones Principales

- **`productos`**: Almacena información completa sobre productos derivados del borojó, incluyendo categorías, precios, stock y tags descriptivos.
- **`clientes`**: Contiene información detallada sobre clientes registrados, incluyendo historial de compras y preferencias de productos.
- **`ventas`**: Es el núcleo del negocio, almacenando transacciones con detalles de productos vendidos, cantidades y fechas.
- **`proveedores`**: Almacena información de proveedores especializados en diferentes categorías de productos del borojó.
- **`inventario`**: Controla el stock de productos con lotes, cantidades y fechas de entrada para gestión logística.

### ⚖️ Justificación: Embeber vs. Referenciar

La decisión clave en MongoDB es cuándo anidar datos (embeber) y cuándo crear un enlace (referenciar).

- **Embebemos** datos cuando la relación es de "contiene" y los datos no se consultan fuera de su documento padre.
  - **Ventaja**: Lecturas atómicas y rápidas (un solo viaje a la base de datos).
  - **Ejemplo**: Los tags están embebidos en productos para consultas rápidas.

- **Referenciamos** datos cuando la relación es de "usa" o para evitar la duplicación de grandes volúmenes de datos que cambian con frecuencia.
  - **Ventaja**: Mantiene los datos consistentes (DRY - Don't Repeat Yourself).
  - **Ejemplo**: Referenciamos productos desde ventas para mantener integridad.

### 🧬 Estructura de Campos Clave

- **Campos de texto**: Para nombres, categorías, tags y descripciones.
- **Campos numéricos**: Para precios, stock y cantidades.
- **Campos de fecha**: Para fechas de venta, entrada de inventario y registro.
- **Campos de estado**: Para el control de stock y disponibilidad.
- **Campos anidados**: Para arrays de tags, preferencias y productos en ventas.

---

## 📁 Estructura de Archivos

```
📁 Tiendadelborojo/
├── 📁 assets/                    # Imágenes y capturas de pantalla
├── 📁 data/                      # Archivos JSON de datos
│   ├── productos.json           # Catálogo de productos
│   ├── clientes.json            # Base de clientes
│   ├── ventas.json              # Registro de ventas
│   ├── proveedores.json         # Directorio de proveedores
│   └── inventario.json          # Control de stock
├── 📁 scripts/                   # Scripts de MongoDB
│   ├── 01_insercion.js          # Operaciones de inserción
│   ├── 02_lectura.js            # Operaciones de lectura
│   ├── 03_actualizacion.js      # Operaciones de actualización
│   ├── 04_eliminacion.js        # Operaciones de eliminación
│   ├── 05_expresiones_regulares.js # Consultas con regex
│   ├── 06_operadores_arrays.js  # Operadores de arrays
│   ├── 07_aggregation_framework.js # Aggregation Framework
│   ├── 08_user_defined_functions.js # Funciones personalizadas
│   ├── 09_transacciones.js      # Transacciones
│   └── 10_indexacion.js         # Indexación
├── 📄 README.md                  # Documentación principal
├── 📄 taller.txt                 # Especificaciones del proyecto
└── 📄 coleccion.js               # Configuración de colecciones
```

### 📦 Archivos JSON para Importación

#### Colección: `productos`
- **Archivo:** `data/productos.json`
- **Contenido:** Catálogo completo de productos derivados del borojó con categorías, precios y stock
- **Registros:** 10+ productos con diferentes categorías y características

#### Colección: `clientes`
- **Archivo:** `data/clientes.json`
- **Contenido:** Base de datos de clientes con historial de compras y preferencias
- **Registros:** 10+ clientes con perfiles variados

#### Colección: `ventas`
- **Archivo:** `data/ventas.json`
- **Contenido:** Registro de todas las transacciones comerciales con detalles de productos y fechas
- **Registros:** 10+ ventas con diferentes productos y cantidades

#### Colección: `proveedores`
- **Archivo:** `data/proveedores.json`
- **Contenido:** Directorio de proveedores especializados en diferentes categorías de productos
- **Registros:** 7+ proveedores especializados

#### Colección: `inventario`
- **Archivo:** `data/inventario.json`
- **Contenido:** Control de stock con lotes, cantidades y fechas de entrada
- **Registros:** 10+ registros de inventario con trazabilidad

## 🗄️ Base de Datos

**Nombre de la Base de Datos:** `tienda_borojo`

**Colecciones:** `productos`, `clientes`, `ventas`, `proveedores`, `inventario`

**Versión de MongoDB:** 6.0+

---

## 🛠️ Configuración de la Base de Datos

### 1. Conectar a MongoDB
```bash
mongosh
```

### 2. Crear y Usar la Base de Datos
```bash
use tienda_borojo
```

### 3. Crear las Colecciones
Crear las colecciones para almacenar los documentos:
```javascript
// Crear colección de productos
db.createCollection("productos")

// Crear colección de clientes
db.createCollection("clientes")

// Crear colección de ventas
db.createCollection("ventas")

// Crear colección de proveedores
db.createCollection("proveedores")

// Crear colección de inventario
db.createCollection("inventario")
```

### 4. Crear Índices para Optimizar Consultas
Crear índices en los campos principales para mejorar el rendimiento de las consultas:
```javascript
// Índice para búsqueda por nombre en productos
db.productos.createIndex({ "nombre": 1 })

// Índice para filtros por categoría en productos
db.productos.createIndex({ "categoria": 1 })

// Índice para filtros por email en clientes
db.clientes.createIndex({ "email": 1 })

// Índice para filtros por fecha en ventas
db.ventas.createIndex({ "fecha": 1 })

// Índice compuesto para búsquedas eficientes
db.productos.createIndex({ "categoria": 1, "precio": 1 })
```

### 5. Verificar la Creación
Verificar que la base de datos y colecciones se crearon correctamente:
```javascript
// Ver base de datos actual
db

// Ver colecciones disponibles
show collections

// Verificar índices creados
db.productos.getIndexes()
```

---

## 🧪 Ejemplos de Documentos JSON

### 🌿 Producto (Borojó Fresco)

```json
{
  "_id": 1,
  "nombre": "Borojó fresco",
  "categoria": "Fruta",
  "precio": 5000,
  "stock": 30,
  "tags": ["natural", "orgánico"]
}
```

### 👤 Cliente

```json
{
  "_id": 1,
  "nombre": "Carlos Ramírez",
  "email": "carlos@email.com",
  "compras": [1, 2],
  "preferencias": ["natural", "bebida"]
}
```

### 💰 Venta

```json
{
  "_id": 1,
  "clienteId": 1,
  "productos": [{ "productoId": 1, "cantidad": 2 }],
  "fecha": ISODate("2025-06-01T10:30:00Z"),
  "total": 10000
}
```

### 🏪 Proveedor

```json
{
  "_id": 1,
  "nombre": "Frutas del Chocó",
  "contacto": "0987654321",
  "productos": ["Borojó fresco", "Borojó deshidratado"]
}
```

### 📦 Inventario

```json
{
  "_id": 1,
  "productoId": 1,
  "lote": "L001",
  "cantidad": 100,
  "entrada": ISODate("2025-06-01T08:00:00Z")
}
```

---

## 🚀 Funcionalidades Implementadas

### 1. CRUD (Crear, Leer, Actualizar, Eliminar)

✅ **Crear:** Añadir nuevos productos, clientes, ventas, proveedores e inventario
✅ **Leer:** Mostrar lista de todos los recursos con filtros avanzados
✅ **Actualizar:** Modificar detalles de recursos existentes
✅ **Eliminar:** Eliminar recursos de la base de datos

### 2. Filtros y Búsqueda con Expresiones Regulares

✅ **Filtro por Categoría:** Productos por tipo (Fruta, Bebida, Snack, etc.)
✅ **Filtro por Stock:** Productos con stock disponible
✅ **Filtro por Precio:** Rango de precios para análisis comercial
✅ **Búsqueda por Nombre:** Búsqueda de texto con regex avanzado
✅ **Filtrado por Tags:** Productos por características específicas
✅ **Filtrado Geográfico:** Por región de proveedores
✅ **Filtrado por Estado:** Productos activos/inactivos

### 3. Validaciones Avanzadas

✅ **Validación de Categorías:** Solo valores permitidos del catálogo
✅ **Validación de Precios:** Valores positivos y realistas
✅ **Validación de Stock:** Cantidades no negativas
✅ **Validación de Campos Requeridos:** Todos los campos obligatorios
✅ **Validación de Referencias:** Integridad referencial entre colecciones

---

## 📋 Cómo Usar

### 1. Configurar MongoDB

1. Asegúrate de tener MongoDB instalado y ejecutándose
2. Abre MongoDB Compass o la línea de comandos de MongoDB

### 2. Crear la Base de Datos

```bash
use tienda_borojo
```

### 3. Crear las Colecciones

Crear las colecciones para almacenar los documentos:
- `productos`
- `clientes`
- `ventas`
- `proveedores`
- `inventario`

### 4. Crear Índices (Opcional pero Recomendado)

Crear índices en los campos principales para optimizar las consultas:
- Índice para búsqueda por nombre en productos
- Índice para filtros por categoría en productos
- Índice para filtros por email en clientes
- Índice para filtros por fecha en ventas

### 5. Importar Datos JSON

#### Opción A: Usando MongoDB Compass
1. Abre MongoDB Compass
2. Conéctate a tu base de datos
3. Selecciona la base de datos `tienda_borojo`
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
# Importar productos
mongoimport --db tienda_borojo --collection productos --file data/productos.json --jsonArray

# Importar clientes
mongoimport --db tienda_borojo --collection clientes --file data/clientes.json --jsonArray

# Importar ventas
mongoimport --db tienda_borojo --collection ventas --file data/ventas.json --jsonArray

# Importar proveedores
mongoimport --db tienda_borojo --collection proveedores --file data/proveedores.json --jsonArray

# Importar inventario
mongoimport --db tienda_borojo --collection inventario --file data/inventario.json --jsonArray
```

### 6. Verificar la Importación

Verificar que los datos se importaron correctamente contando los documentos y revisando algunos ejemplos:
```javascript
// Contar documentos en cada colección
db.productos.countDocuments()
db.clientes.countDocuments()
db.ventas.countDocuments()
db.proveedores.countDocuments()
db.inventario.countDocuments()

// Ver algunos ejemplos
db.productos.find().limit(3)
db.clientes.find().limit(3)
```

### 7. Probar las Funcionalidades

Ahora puedes probar las consultas básicas en MongoDB para:
- Ver todos los recursos
- Filtrar por categoría
- Filtrar por stock
- Buscar por nombre
- Contar recursos

---

## 🔍 Ejemplos de Operaciones con Expresiones Regulares

### 🌿 Colección: productos

#### Consulta 1: Buscar productos cuyo nombre empiece por "Boro"
```javascript
db.productos.find({ "nombre": { "$regex": "^Boro" } })
```
**Propósito**: Útil para categorizar productos por prefijos comunes en la industria del borojó.

#### Consulta 2: Encontrar productos con nombres que contengan "con"
```javascript
db.productos.find({ "nombre": { "$regex": "\\bcon\\b", "$options": "i" } })
```
**Propósito**: Identificar productos como "Galletas con borojó", "Concentrado de borojó" para categorización especial.

#### Consulta 3: Buscar productos de categorías que terminen en "a"
```javascript
db.productos.find({ "categoria": { "$regex": "a$" } })
```
**Propósito**: Filtrar productos por categorías específicas (Fruta, Bebida, etc.).

#### Consulta 4: Encontrar productos con tags que contengan "natural" (case insensitive)
```javascript
db.productos.find({ "tags": { "$regex": "natural", "$options": "i" } })
```
**Propósito**: Búsqueda flexible de productos por características sin importar mayúsculas/minúsculas.

#### Consulta 5: Buscar productos con nombres que tengan exactamente 3 palabras
```javascript
db.productos.find({ "nombre": { "$regex": "^\\w+\\s+\\w+\\s+\\w+$" } })
```
**Propósito**: Categorizar productos por estructura de nombre para análisis de branding.

### 👤 Colección: clientes

#### Consulta 6: Buscar clientes cuyo nombre contenga la letra "z"
```javascript
db.clientes.find({ "nombre": { "$regex": "z", "$options": "i" } })
```
**Propósito**: Búsqueda flexible de clientes por caracteres específicos en sus nombres.

#### Consulta 7: Encontrar clientes con correos de Gmail
```javascript
db.clientes.find({ "email": { "$regex": "@gmail\\.com$" } })
```
**Propósito**: Segmentación de clientes por proveedor de correo para campañas específicas.

#### Consulta 8: Buscar clientes con nombres que empiecen con vocal
```javascript
db.clientes.find({ "nombre": { "$regex": "^[aeiouAEIOU]" } })
```
**Propósito**: Categorización alfabética para análisis demográfico.

#### Consulta 9: Encontrar clientes con preferencias que contengan "natural"
```javascript
db.clientes.find({ "preferencias": { "$regex": "natural", "$options": "i" } })
```
**Propósito**: Identificar clientes con preferencias específicas para recomendaciones.

#### Consulta 10: Buscar clientes con nombres que tengan exactamente 4 letras
```javascript
db.clientes.find({ "nombre": { "$regex": "^[a-zA-Z]{4}$" } })
```
**Propósito**: Análisis demográfico y personalización de la interfaz.

### 💰 Colección: ventas

#### Consulta 11: Buscar ventas de fechas específicas
```javascript
db.ventas.find({ "fecha": { "$regex": "2025-06-0[1-5]" } })
```
**Propósito**: Filtrar ventas por rangos de fechas para análisis temporal.

#### Consulta 12: Encontrar ventas con totales que empiecen con "1"
```javascript
db.ventas.find({ "total": { "$regex": "^1" } })
```
**Propósito**: Categorizar ventas por rangos de valor para análisis financiero.

#### Consulta 13: Buscar ventas con productos que contengan números específicos
```javascript
db.ventas.find({ "productos.productoId": { "$regex": "^[1-5]$" } })
```
**Propósito**: Filtrar ventas por productos específicos del catálogo.

### 🏪 Colección: proveedores

#### Consulta 14: Buscar proveedores con nombres que contengan "S.A."
```javascript
db.proveedores.find({ "nombre": { "$regex": "S\\.A\\." } })
```
**Propósito**: Identificar proveedores corporativos vs. individuales.

#### Consulta 15: Encontrar proveedores con contactos que empiecen con "098"
```javascript
db.proveedores.find({ "contacto": { "$regex": "^098" } })
```
**Propósito**: Filtrar proveedores por región geográfica específica.

### 📦 Colección: inventario

#### Consulta 16: Buscar lotes que empiecen con "L"
```javascript
db.inventario.find({ "lote": { "$regex": "^L" } })
```
**Propósito**: Categorizar inventario por sistema de lotes.

#### Consulta 17: Encontrar entradas de inventario de fechas específicas
```javascript
db.inventario.find({ "entrada": { "$regex": "2025-06-0[1-3]" } })
```
**Propósito**: Filtrar inventario por fechas de entrada para control logístico.

---

## 🔗 Relaciones entre Colecciones

### 📊 Diagrama de Relaciones
```
clientes (1) ←→ (N) ventas
  ↓
ventas (N) ←→ (N) productos
  ↓
productos (1) ←→ (N) inventario
  ↓
proveedores (1) ←→ (N) productos
```

### 🔍 Tipos de Relaciones

#### **Relación 1:N (Uno a Muchos)**
- **Cliente → Ventas**: Un cliente puede realizar múltiples ventas
- **Producto → Inventario**: Un producto puede tener múltiples registros de inventario
- **Proveedor → Productos**: Un proveedor puede suministrar múltiples productos

#### **Relación N:N (Muchos a Muchos)**
- **Ventas ↔ Productos**: Una venta puede contener múltiples productos, y un producto puede estar en múltiples ventas

#### **Relación 1:1 (Uno a Uno)**
- **Producto ↔ Stock**: Cada producto tiene un stock actual específico
- **Cliente ↔ Perfil**: Cada cliente tiene un perfil único

### 💡 Estrategias de Denormalización

#### **Campos Denormalizados**
- `nombre` del cliente en ventas
- `nombre` del producto en ventas
- `categoria` del producto para consultas rápidas

#### **Propósito de Denormalización**
- **Rendimiento**: Evita joins en consultas frecuentes
- **Legibilidad**: Facilita la comprensión de los datos
- **Mantenimiento**: Simplifica las consultas de lectura

#### **Consideraciones**
- **Consistencia**: Los campos denormalizados deben mantenerse sincronizados
- **Espacio**: Aumenta ligeramente el uso de almacenamiento
- **Actualización**: Requiere lógica para mantener consistencia

---

## 🎯 Casos de Uso Básicos

### 🔍 Búsquedas Simples

#### **Contar documentos**
```javascript
// Contar total de productos
db.productos.countDocuments()

// Contar clientes por preferencias
db.clientes.countDocuments({ "preferencias": "natural" })
```

#### **Ordenar resultados**
```javascript
// Productos ordenados por nombre
db.productos.find().sort({ "nombre": 1 })

// Álbumes ordenados por año (más recientes primero)
db.ventas.find().sort({ "fecha": -1 })
```

#### **Limitar resultados**
```javascript
// Mostrar solo los primeros 5 productos
db.productos.find().limit(5)

// Mostrar productos del 6 al 10
db.productos.find().skip(5).limit(5)
```

---

## 🚀 Funcionalidades Básicas

### 📈 Operaciones Simples

#### **Insertar documentos**
```javascript
// Insertar un nuevo producto
db.productos.insertOne({
  "nombre": "Nuevo Producto",
  "categoria": "Snack",
  "precio": 5000,
  "stock": 25,
  "tags": ["nuevo", "experimental"]
})
```

#### **Actualizar documentos**
```javascript
// Cambiar el stock de un producto
db.productos.updateOne(
  { "nombre": "Nuevo Producto" },
  { $set: { "stock": 30 } }
)
```

#### **Eliminar documentos**
```javascript
// Eliminar un producto por nombre
db.productos.deleteOne({ "nombre": "Nuevo Producto" })
```

---

## 📝 Notas Importantes

### 🔄 Mantenimiento Básico

#### **Verificar datos**
```javascript
// Ver cuántos documentos hay en cada colección
db.productos.countDocuments()
db.clientes.countDocuments()
db.ventas.countDocuments()
db.proveedores.countDocuments()
db.inventario.countDocuments()
```

#### **Limpiar datos**
```javascript
// Eliminar productos sin stock
db.productos.deleteMany({ "stock": 0 })
```

---

## 📊 Datos de Ejemplo Incluidos

Los archivos JSON incluyen una gran variedad de:

### 🌿 Productos (10+ registros):
- Borojó fresco, Jugo de borojó, Mermelada de borojó
- Galletas con borojó, Compota de borojó, Helado de borojó
- Concentrado de borojó, Borojó deshidratado, Aceite de borojó
- Cerveza artesanal de borojó

### 👤 Clientes (10+ registros):
- Carlos Ramírez, Diana Suárez, Juan Torres, Ana López
- Luis Martínez, Sofía Gómez, Felipe Castro, Laura Pérez
- Camilo Rojas, Valentina Ortiz

### 💰 Ventas (10+ registros):
- Transacciones con diferentes productos, cantidades y fechas
- Totales variados para análisis financiero
- Relaciones cliente-producto documentadas

### 🏪 Proveedores (7+ registros):
- Frutas del Chocó, Jugos Naturales S.A., Dulces Pacífico
- Baby Foods, Postres Fríos, Cosmética Natural, Cervecería Artesanal

### 📦 Inventario (10+ registros):
- Control de stock con lotes únicos
- Cantidades variadas para gestión logística
- Fechas de entrada para trazabilidad

### 📈 Categorías Distribuidas:
- **Fruta**: Productos frescos y deshidratados
- **Bebida**: Jugos, concentrados y cerveza
- **Snack**: Galletas y chocolatinas
- **Alimento**: Mermeladas y compotas
- **Cosmético**: Aceites y productos de cuidado

### ⭐ Tags Incluidos:
- Productos con tags como "natural", "orgánico", "dulce"
- Características como "refrescante", "energético", "saludable"
- Categorías como "snack", "postre", "cuidado"

Cada recurso tiene diferentes categorías, precios y stock para probar todas las funcionalidades de filtrado y búsqueda.

---

## 🎯 Casos de Uso en La Tienda del Borojó

Estas consultas con regex son fundamentales para:

- **Búsquedas inteligentes** en el catálogo de productos
- **Recomendaciones personalizadas** para clientes
- **Filtros avanzados** por categoría, precio, stock
- **Análisis de tendencias** de ventas
- **Segmentación de clientes** para marketing
- **Categorización automática** de productos
- **Detección de patrones** en nombres y descripciones

---

## 📝 Notas Importantes

1. **Nivel Avanzado:** Este proyecto está diseñado para usuarios intermedios/avanzados en MongoDB
2. **Sistema Completo:** Incluye todas las funcionalidades de gestión comercial
3. **Expresiones Regulares:** Implementa consultas avanzadas con regex para optimizar búsquedas
4. **Escalable:** La estructura permite agregar más funcionalidades fácilmente
5. **Documentación Completa:** Incluye capturas de pantalla y ejemplos prácticos

---

## 🎯 Resumen del Proyecto

Este proyecto implementa un sistema completo de gestión comercial para "La Tienda del Borojó" usando MongoDB con:

- **5 colecciones principales**: productos, clientes, ventas, proveedores e inventario
- **Consultas con expresiones regulares** para búsquedas avanzadas
- **Operaciones CRUD básicas** para gestionar datos comerciales
- **Estructura simple** y fácil de entender para gestión de inventario

### 💡 Lo que aprendimos
- MongoDB es más flexible que SQL para datos comerciales que cambian frecuentemente
- Las expresiones regulares son muy útiles para búsquedas de texto en catálogos
- La estructura de documentos es más intuitiva para aplicaciones comerciales

---

## 👨‍💻 Autor

**La Tienda del Borojó - Sistema de Gestión con MongoDB**

Desarrollado como parte del taller de NO-SQL Documental con MongoDB para gestión comercial

### Información de Contacto
- **GitHub**: [@DanielSantiagoV](https://github.com/DanielSantiagoV)
- **GitHub**: [@Sebastian Ardila](https://github.com/Jharmo05)
---

*Este proyecto cumple con todos los requerimientos especificados en el taller y proporciona una base sólida para la gestión comercial con MongoDB y expresiones regulares.*

---

<p align="center">
  Developed with ❤️ by Estudiantes de Bases de Datos<br>
  🔥 <b><a href="https://github.com/DanielSantiagoV">Visit my GitHub</a></b> 🚀
</p>