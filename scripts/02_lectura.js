// =====================================================
// EJERCICIOS DE LECTURA - LA TIENDA DEL BOROJÓ
// =====================================================
//
// DESCRIPCIÓN: Este script contiene los ejercicios de lectura y consulta
// de datos en la base de datos de la tienda.
//
// OBJETIVO: Aprender a consultar documentos en MongoDB usando
// diferentes operadores de comparación y consulta.
//
// IMPORTANTE: Ejecuta estos comandos uno por uno en mongosh para
// ver el resultado de cada consulta.
// =====================================================

// =====================================================
// EJERCICIO 1: PRODUCTOS CON STOCK ALTO
// =====================================================
//
// DESCRIPCIÓN: Buscar productos que tengan más de 20 unidades en stock
//
// PASO A PASO:
// 1. Usamos find() para buscar documentos
// 2. $gt significa "greater than" (mayor que)
// 3. Buscamos en el campo "stock" valores mayores a 20
//
// RESULTADO ESPERADO: Deberías ver productos como:
// - Borojó fresco (stock: 30)
// - Jugo de borojó (stock: 50)
// - Galletas con borojó (stock: 40)
// - Compota de borojó (stock: 20)

db.productos.find({ "stock": { $gt: 20 } })

// =====================================================
// EJERCICIO 2: CLIENTES SIN COMPRAS
// =====================================================
//
// DESCRIPCIÓN: Encontrar clientes que aún no han realizado compras
//
// PASO A PASO:
// 1. Usamos find() para buscar en la colección clientes
// 2. $size: 0 significa que el array "compras" está vacío
// 3. Esto identifica clientes nuevos o inactivos
//
// RESULTADO ESPERADO: Deberías ver clientes con array de compras vacío
// (aunque en este caso todos tienen compras, excepto Mario Mendoza)

db.clientes.find({ "compras": { $size: 0 } })

// =====================================================
// CONSULTAS ADICIONALES ÚTILES PARA LA TIENDA
// =====================================================
//
// Estas consultas te ayudarán a gestionar mejor tu negocio
// y entender el comportamiento de tus clientes y productos.

// =====================================================
// CONSULTA 3: PRODUCTOS POR CATEGORÍA
// =====================================================
//
// DESCRIPCIÓN: Filtrar productos por categoría específica
//
// PASO A PASO:
// 1. Buscamos productos donde "categoria" sea exactamente "Bebida"
// 2. No usamos operadores, solo igualdad exacta
// 3. Útil para mostrar productos por sección en la tienda
//
// RESULTADO ESPERADO: Deberías ver:
// - Jugo de borojó
// - Concentrado de borojó
// - Cerveza artesanal de borojó

db.productos.find({ "categoria": "Bebida" })

// =====================================================
// CONSULTA 4: CLIENTES CON PREFERENCIAS ESPECÍFICAS
// =====================================================
//
// DESCRIPCIÓN: Encontrar clientes que prefieren productos naturales
//
// PASO A PASO:
// 1. Buscamos en el array "preferencias"
// 2. MongoDB automáticamente busca en arrays
// 3. Encuentra documentos donde "natural" esté en el array
//
// RESULTADO ESPERADO: Deberías ver clientes como:
// - Carlos Ramírez
// - Diana Suárez
// - Felipe Castro
// - Valentina Ortiz

db.clientes.find({ "preferencias": "natural" })

// =====================================================
// CONSULTA 5: PRODUCTOS DE PRECIO ALTO
// =====================================================
//
// DESCRIPCIÓN: Identificar productos premium (precio > 8000)
//
// PASO A PASO:
// 1. Usamos $gt (mayor que) en el campo precio
// 2. 8000 es el umbral para productos premium
// 3. Útil para estrategias de precios y marketing
//
// RESULTADO ESPERADO: Deberías ver productos como:
// - Mermelada de borojó (8500)
// - Helado de borojó (10000)
// - Concentrado de borojó (12000)
// - Aceite de borojó (15000)

db.productos.find({ "precio": { $gt: 8000 } })

// =====================================================
// CONSULTA 6: ANÁLISIS POR CATEGORÍA (AGGREGATION)
// =====================================================
//
// DESCRIPCIÓN: Contar cuántos productos hay por cada categoría
//
// PASO A PASO:
// 1. Usamos aggregate() para operaciones complejas
// 2. $group agrupa documentos por campo específico
// 3. $sum: 1 cuenta documentos en cada grupo
// 4. _id: "$categoria" especifica el campo de agrupación
//
// RESULTADO ESPERADO: Deberías ver algo como:
// { "_id": "Fruta", "total": 2 }
// { "_id": "Bebida", "total": 3 }
// { "_id": "Snack", "total": 2 }
// etc.

db.productos.aggregate([
  { $group: { _id: "$categoria", total: { $sum: 1 } } }
])

// =====================================================
// RESUMEN DE LO APRENDIDO
// =====================================================
//
// ✅ find(): Para consultar documentos
// ✅ Operadores de comparación: $gt, $lt, $gte, $lte
// ✅ Operadores de arrays: $size
// ✅ Filtros simples: igualdad exacta
// ✅ aggregate(): Para consultas complejas y análisis
// ✅ $group: Para agrupar y contar documentos
//
