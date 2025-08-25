// =====================================================
// ANÁLISIS DE INVENTARIO Y CLIENTES - LA TIENDA DEL BOROJÓ
// =====================================================
//
// 📊 ESCENARIO REAL: Como administrador de la tienda, necesitas
// analizar tu inventario y base de clientes para tomar decisiones
// de negocio inteligentes. ¿Qué productos se están agotando?
// ¿Qué clientes necesitan atención especial?
//
// 🎯 OBJETIVO DE NEGOCIO: Obtener insights valiosos sobre tu
// inventario, clientes y tendencias de ventas para optimizar
// la gestión de la tienda.
//
// 💡 IMPORTANTE: Ejecuta estos comandos uno por uno en mongosh para
// obtener información real de tu negocio.
// =====================================================

// =====================================================
// ANÁLISIS 1: PRODUCTOS CON STOCK SUFICIENTE
// =====================================================
//
// 📦 SITUACIÓN DE NEGOCIO: Necesitas identificar qué productos
// tienen stock suficiente para satisfacer la demanda de la semana.
// Los productos con más de 20 unidades están en buen estado.
//
// 💰 IMPACTO EN VENTAS:
// - Productos con stock alto = ventas garantizadas
// - No hay riesgo de quedarte sin producto
// - Puedes hacer promociones con confianza
//
// 🔍 QUÉ BUSCAMOS: Productos con stock mayor a 20 unidades
// - $gt significa "greater than" (mayor que)
// - Esto te da una lista de productos seguros para vender
//
// 📊 RESULTADO ESPERADO: Deberías ver productos como:
// - Borojó fresco (stock: 30) - Producto estrella
// - Jugo de borojó (stock: 50) - Muy popular
// - Galletas con borojó (stock: 40) - Snack de alta demanda
// - Compota de borojó (stock: 20) - Límite mínimo aceptable

db.productos.find({ "stock": { $gt: 20 } })

// =====================================================
// ANÁLISIS 2: CLIENTES QUE NECESITAN ATENCIÓN
// =====================================================
//
// 👥 SITUACIÓN DE NEGOCIO: Identificar clientes que se registraron
// pero aún no han realizado su primera compra. Estos son clientes
// potenciales que necesitan atención especial para convertirlos.
//
// 🎯 ESTRATEGIA DE RETENCIÓN:
// - Clientes sin compras = oportunidades de venta
// - Puedes enviar ofertas especiales
// - Necesitan motivación para su primera compra
// - Son candidatos para programas de fidelización
//
// 🔍 QUÉ BUSCAMOS: Clientes con array de compras vacío
// - $size: 0 significa que no han comprado nada
// - Esto identifica clientes nuevos o inactivos
// - Útil para campañas de marketing dirigidas
//
// 📊 RESULTADO ESPERADO: Deberías ver clientes como:
// - Mario Mendoza (cliente nuevo registrado hoy)
// - Otros clientes que no han comprado aún
// - Lista para estrategias de activación

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
