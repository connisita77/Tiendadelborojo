// =====================================================
// EJERCICIOS DE ACTUALIZACIÓN - LA TIENDA DEL BOROJÓ
// =====================================================
//
// DESCRIPCIÓN: Este script contiene los ejercicios de actualización
// y modificación de datos en la base de datos de la tienda.
//
// OBJETIVO: Aprender a modificar documentos existentes en MongoDB
// usando diferentes operadores de actualización.
//
// IMPORTANTE: Ejecuta estos comandos uno por uno en mongosh para
// ver el resultado de cada operación de actualización.
// =====================================================

// =====================================================
// EJERCICIO 1: AUMENTAR STOCK DE PRODUCTO
// =====================================================
//
// DESCRIPCIÓN: Incrementar el stock del "Borojó deshidratado" en 10 unidades
//
// PASO A PASO:
// 1. Usamos updateOne() para actualizar un solo documento
// 2. Primer parámetro: filtro para encontrar el documento específico
// 3. Segundo parámetro: operación a realizar
// 4. $inc significa "increment" (incrementar)
//
// RESULTADO ESPERADO: Deberías ver un mensaje confirmando la actualización
// con el número de documentos modificados (debería ser 1)

db.productos.updateOne(
  { "nombre": "Borojó deshidratado" },
  { $inc: { "stock": 10 } }
)

// =====================================================
// EJERCICIO 2: AÑADIR TAG A MÚLTIPLES PRODUCTOS
// =====================================================
//
// DESCRIPCIÓN: Agregar el tag "bajo azúcar" a todos los productos de bebida
//
// PASO A PASO:
// 1. Usamos updateMany() para actualizar múltiples documentos
// 2. Primer parámetro: filtro para encontrar todos los productos de categoría "Bebida"
// 3. Segundo parámetro: operación a realizar
// 4. $push añade un elemento al array "tags"
//
// RESULTADO ESPERADO: Deberías ver un mensaje confirmando la actualización
// con el número de documentos modificados (debería ser 3)

db.productos.updateMany(
  { "categoria": "Bebida" },
  { $push: { "tags": "bajo azúcar" } }
)

// =====================================================
// VERIFICACIÓN DE ACTUALIZACIONES
// =====================================================
//
// IMPORTANTE: Siempre verifica que las actualizaciones se realizaron
// correctamente antes de continuar con otros ejercicios.
//
// PASO 1: Verificar stock actualizado del Borojó deshidratado
// - Buscamos el producto por nombre
// - Deberías ver que el stock aumentó de 18 a 28 unidades

db.productos.find({ "nombre": "Borojó deshidratado" })

// PASO 2: Verificar productos de bebida con el nuevo tag
// - Buscamos todos los productos de categoría "Bebida"
// - Deberías ver que ahora tienen el tag "bajo azúcar" en su array

db.productos.find({ "categoria": "Bebida" })

// =====================================================
// ACTUALIZACIONES ADICIONALES ÚTILES PARA LA TIENDA
// =====================================================
//
// Estas operaciones te ayudarán a gestionar precios, promociones
// y categorización de productos de manera eficiente.

// =====================================================
// ACTUALIZACIÓN 3: APLICAR DESCUENTO A SNACKS
// =====================================================
//
// DESCRIPCIÓN: Reducir el precio de todos los productos de categoría "Snack" en un 10%
//
// PASO A PASO:
// 1. Usamos updateMany() para afectar múltiples productos
// 2. Filtramos por categoría "Snack"
// 3. $mul multiplica el precio actual por 0.9 (90% del precio original)
// 4. Esto simula un descuento del 10%
//
// RESULTADO ESPERADO: Los precios de snacks se reducirán:
// - Galletas con borojó: de 6000 a 5400
// - Chocolatina de borojó: de 4000 a 3600

db.productos.updateMany(
  { "categoria": "Snack" },
  { $mul: { "precio": 0.9 } }
)

// =====================================================
// ACTUALIZACIÓN 4: ETIQUETAR PRODUCTOS POPULARES
// =====================================================
//
// DESCRIPCIÓN: Añadir el tag "popular" a productos con stock alto
//
// PASO A PASO:
// 1. Filtramos productos con stock mayor a 25 unidades
// 2. Usamos $push para añadir "popular" al array de tags
// 3. Esto ayuda a identificar productos de alta demanda
//
// RESULTADO ESPERADO: Productos como "Jugo de borojó" (stock: 50)
// y "Galletas con borojó" (stock: 40) tendrán el tag "popular"

db.productos.updateMany(
  { "stock": { $gt: 25 } },
  { $push: { "tags": "popular" } }
)

// =====================================================
// RESUMEN DE LO APRENDIDO
// =====================================================
//
// ✅ updateOne(): Para actualizar un solo documento
// ✅ updateMany(): Para actualizar múltiples documentos
// ✅ $inc: Para incrementar valores numéricos
// ✅ $push: Para añadir elementos a arrays
// ✅ $mul: Para multiplicar valores numéricos
// ✅ Filtros: Para seleccionar documentos específicos
// ✅ Verificación: Siempre verificar después de actualizar
//
