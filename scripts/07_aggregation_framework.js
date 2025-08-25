// =====================================================
// ANÁLISIS AVANZADO DE VENTAS E INVENTARIO - LA TIENDA DEL BOROJÓ
// =====================================================
//
// 📊 ESCENARIO REAL: Como administrador de la tienda, necesitas
// realizar análisis profundos de tus datos para tomar decisiones
// estratégicas. El Aggregation Framework te permite procesar
// múltiples documentos y generar reportes valiosos para el negocio.
//
// 💼 OBJETIVO DE NEGOCIO: Obtener insights valiosos sobre
// productos más vendidos, comportamiento de clientes, tendencias
// de ventas y optimización de inventario para maximizar ganancias.
//
// 🔍 IMPORTANTE: Estos pipelines de agregación son herramientas
// poderosas para análisis de negocio y toma de decisiones basada en datos.
// =====================================================

// =====================================================
// ANÁLISIS 1: PRODUCTOS MÁS VENDIDOS - ANÁLISIS DE RENDIMIENTO
// =====================================================
//
// 🏆 ESCENARIO: Necesitas identificar cuáles son tus productos
// estrella para enfocar tu inventario y marketing. Los productos
// más vendidos generan la mayor parte de tus ingresos.
//
// 💰 IMPACTO EN EL NEGOCIO:
// - Identificar productos estrella para mayor stock
// - Enfoque en productos de alta demanda
// - Estrategias de precios para productos populares
// - Optimización del espacio en tienda
//
// 🔧 QUÉ HACEMOS: Calcular la suma total de unidades vendidas por producto
// - $unwind: Descompone el array de productos en documentos individuales
// - $group: Agrupa por productoId y suma las cantidades
// - $lookup: Conecta con la colección productos para obtener nombres
// - $sort: Ordena por total vendido (descendente)
//
// 📊 RESULTADO ESPERADO: Lista de productos ordenados por ventas:
// - Producto con más ventas en la parte superior
// - Total de unidades vendidas por cada producto
// - Información para decisiones de inventario

db.ventas.aggregate([
  { $unwind: "$productos" },
  {
    $group: {
      _id: "$productos.productoId",
      totalVendido: { $sum: "$productos.cantidad" }
    }
  },
  {
    $lookup: {
      from: "productos",
      localField: "_id",
      foreignField: "_id",
      as: "producto"
    }
  },
  {
    $project: {
      nombre: { $arrayElemAt: ["$producto.nombre", 0] },
      totalVendido: 1
    }
  },
  { $sort: { totalVendido: -1 } }
])

// =====================================================
// ANÁLISIS 2: SEGMENTACIÓN DE CLIENTES POR FRECUENCIA DE COMPRA
// =====================================================
//
// 👥 ESCENARIO: Quieres segmentar a tus clientes según su
// frecuencia de compra para implementar estrategias de
// fidelización diferenciadas. Los clientes frecuentes son
// más valiosos para el negocio.
//
// 🎯 ESTRATEGIA DE FIDELIZACIÓN:
// - Clientes frecuentes = programas VIP
// - Clientes ocasionales = estrategias de reactivación
// - Clientes nuevos = programas de bienvenida
// - Personalización de ofertas por segmento
//
// 🔧 QUÉ HACEMOS: Agrupar clientes por cantidad de compras realizadas
// - $group: Agrupa por clienteId y cuenta las compras
// - $lookup: Conecta con la colección clientes para obtener nombres
// - $sort: Ordena por cantidad de compras (descendente)
// - $project: Muestra solo la información relevante
//
// 📊 RESULTADO ESPERADO: Clientes agrupados por frecuencia:
// - Clientes con más compras (VIP)
// - Clientes con compras moderadas (regulares)
// - Clientes con pocas compras (ocasionales)
// - Base para estrategias de fidelización

db.ventas.aggregate([
  {
    $group: {
      _id: "$clienteId",
      comprasRealizadas: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "clientes",
      localField: "_id",
      foreignField: "_id",
      as: "cliente"
    }
  },
  {
    $project: {
      nombre: { $arrayElemAt: ["$cliente.nombre", 0] },
      comprasRealizadas: 1
    }
  },
  { $sort: { comprasRealizadas: -1 } }
])

// =====================================================
// ANÁLISIS 3: TENDENCIAS DE VENTAS POR MES - ANÁLISIS TEMPORAL
// =====================================================
//
// 📅 ESCENARIO: Necesitas entender las tendencias de ventas
// a lo largo del tiempo para planificar inventario, promociones
// y personal. Los patrones mensuales te ayudan a optimizar.
//
// 💰 IMPACTO EN LA PLANIFICACIÓN:
// - Identificar meses de alta y baja temporada
// - Planificar promociones en meses lentos
// - Ajustar inventario según demanda estacional
// - Optimizar personal según volumen de ventas
//
// 🔧 QUÉ HACEMOS: Calcular el total de ventas por mes
// - $group: Agrupa por mes extraído de la fecha
// - $month: Extrae el mes de la fecha de venta
// - $sum: Suma los totales de ventas por mes
// - $sort: Ordena cronológicamente por mes
//
// 📊 RESULTADO ESPERADO: Ventas totales por mes:
// - Junio 2025: Total de ventas del mes
// - Patrones de demanda estacional
// - Meses pico y meses valle
// - Base para planificación estratégica

db.ventas.aggregate([
  {
    $group: {
      _id: { $month: { $dateFromString: { dateString: "$fecha" } } },
      totalVentas: { $sum: "$total" },
      cantidadVentas: { $sum: 1 }
    }
  },
  {
    $project: {
      mes: "$_id",
      totalVentas: 1,
      cantidadVentas: 1,
      promedioVenta: { $divide: ["$totalVentas", "$cantidadVentas"] }
    }
  },
  { $sort: { mes: 1 } }
])

// =====================================================
// ANÁLISIS 4: ANÁLISIS DE PRECIOS POR CATEGORÍA - ESTRATEGIA DE PRECIOS
// =====================================================
//
// 💰 ESCENARIO: Necesitas entender la estructura de precios
// de tu catálogo por categoría para optimizar tu estrategia
// de precios y maximizar márgenes de ganancia.
//
// 🎯 ESTRATEGIA DE PRECIOS:
// - Identificar categorías premium para precios altos
// - Ajustar precios según competencia por categoría
// - Optimizar márgenes por segmento de producto
// - Estrategias de precios diferenciadas
//
// 🔧 QUÉ HACEMOS: Calcular el promedio de precios por categoría
// - $group: Agrupa por categoría de producto
// - $avg: Calcula el precio promedio por categoría
// - $min y $max: Identifica rangos de precios
// - $count: Cuenta productos por categoría
//
// 📊 RESULTADO ESPERADO: Análisis de precios por categoría:
// - Fruta: precio promedio, rango de precios
// - Bebida: precio promedio, rango de precios
// - Snack: precio promedio, rango de precios
// - Base para estrategias de precios

db.productos.aggregate([
  {
    $group: {
      _id: "$categoria",
      precioPromedio: { $avg: "$precio" },
      precioMinimo: { $min: "$precio" },
      precioMaximo: { $max: "$precio" },
      cantidadProductos: { $sum: 1 }
    }
  },
  {
    $project: {
      categoria: "$_id",
      precioPromedio: { $round: ["$precioPromedio", 2] },
      precioMinimo: 1,
      precioMaximo: 1,
      cantidadProductos: 1,
      rangoPrecios: { $subtract: ["$precioMaximo", "$precioMinimo"] }
    }
  },
  { $sort: { precioPromedio: -1 } }
])

// =====================================================
// ANÁLISIS 5: TOP 3 PRODUCTOS CON MAYOR STOCK - GESTIÓN DE INVENTARIO
// =====================================================
//
// 📦 ESCENARIO: Necesitas identificar qué productos tienen
// exceso de stock para implementar estrategias de venta
// agresivas o ajustar futuras compras a proveedores.
//
// 💰 IMPACTO EN LA GESTIÓN:
// - Productos con exceso de stock = promociones urgentes
// - Optimización del espacio en almacén
// - Reducción de costos de almacenamiento
// - Mejor rotación de inventario
//
// 🔧 QUÉ HACEMOS: Mostrar los 3 productos con mayor stock
// - $sort: Ordena por stock descendente
// - $limit: Limita a los 3 primeros resultados
// - $project: Muestra solo la información relevante
// - Información para decisiones de inventario
//
// 📊 RESULTADO ESPERADO: Top 3 productos por stock:
// - 1er lugar: Producto con mayor stock
// - 2do lugar: Producto con segundo mayor stock
// - 3er lugar: Producto con tercer mayor stock
// - Base para estrategias de reducción de stock

db.productos.aggregate([
  { $sort: { stock: -1 } },
  { $limit: 3 },
  {
    $project: {
      nombre: 1,
      categoria: 1,
      stock: 1,
      precio: 1,
      tags: 1
    }
  }
])

// =====================================================
// CONSULTAS ADICIONALES ÚTILES PARA LA TIENDA
// =====================================================
//
// 🚀 Estas consultas avanzadas te ayudarán a realizar análisis
// más sofisticados para optimizar tu negocio y entender mejor
// las tendencias de mercado.

// =====================================================
// CONSULTA 6: ANÁLISIS DE VALOR PROMEDIO DE COMPRA POR CLIENTE
// =====================================================
//
// 💰 ESCENARIO: Quieres entender el valor promedio que
// gastan tus clientes por compra para optimizar tus
// estrategias de precios y promociones.
//
// 🎯 ESTRATEGIA DE VALOR:
// - Clientes de alto valor = ofertas premium
// - Clientes de valor medio = promociones estándar
// - Clientes de bajo valor = estrategias de upselling
//
// 🔧 QUÉ HACEMOS: Calcular valor promedio de compra por cliente
// - $group: Agrupa por clienteId
// - $avg: Calcula el promedio de total por cliente
// - $lookup: Conecta con información del cliente
// - $sort: Ordena por valor promedio descendente

db.ventas.aggregate([
  {
    $group: {
      _id: "$clienteId",
      valorPromedioCompra: { $avg: "$total" },
      totalCompras: { $sum: 1 },
      valorTotalGastado: { $sum: "$total" }
    }
  },
  {
    $lookup: {
      from: "clientes",
      localField: "_id",
      foreignField: "_id",
      as: "cliente"
    }
  },
  {
    $project: {
      nombre: { $arrayElemAt: ["$cliente.nombre", 0] },
      valorPromedioCompra: { $round: ["$valorPromedioCompra", 2] },
      totalCompras: 1,
      valorTotalGastado: 1
    }
  },
  { $sort: { valorPromedioCompra: -1 } }
])

//
