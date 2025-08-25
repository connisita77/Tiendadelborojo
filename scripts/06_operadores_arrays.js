// =====================================================
// ANÁLISIS DE PREFERENCIAS Y CATEGORIZACIÓN - LA TIENDA DEL BOROJÓ
// =====================================================
//
// 🎯 ESCENARIO REAL: Como administrador de la tienda, necesitas
// analizar las preferencias de tus clientes y la categorización
// de productos para crear estrategias de marketing dirigidas y
// mejorar la experiencia de compra.
//
// 💼 OBJETIVO DE NEGOCIO: Segmentar clientes por preferencias,
// identificar productos premium, y optimizar la categorización
// para aumentar las ventas y la satisfacción del cliente.
//
// 🔍 IMPORTANTE: Estos operadores te permiten realizar análisis
// sofisticados de arrays para tomar decisiones de negocio inteligentes.
// =====================================================

// =====================================================
// SITUACIÓN 1: SEGMENTACIÓN DE CLIENTES POR PREFERENCIAS
// =====================================================
//
// 👥 ESCENARIO: Quieres lanzar una campaña de marketing
// dirigida a clientes que prefieren productos naturales.
// Necesitas identificar exactamente quiénes son para enviarles
// ofertas personalizadas.
//
// 🎯 ESTRATEGIA DE MARKETING:
// - Clientes con preferencia "natural" = mercado objetivo
// - Puedes enviar ofertas de productos orgánicos
// - Campaña personalizada aumenta conversión
// - Mejor ROI en marketing digital
//
// 🔧 QUÉ BUSCAMOS: Clientes que tengan "natural" en sus preferencias
// - MongoDB automáticamente busca en arrays
// - Encuentra documentos donde "natural" esté en el array
// - Útil para segmentación de clientes
//
// 📊 RESULTADO ESPERADO: Deberías ver clientes como:
// - Carlos Ramírez (preferencias: ["natural", "bebida"])
// - Diana Suárez (preferencias: ["dulce", "snack"])
// - Felipe Castro (preferencias: ["fuerte", "natural"])
// - Valentina Ortiz (preferencias: ["natural", "dulce"])

db.clientes.find({ "preferencias": "natural" })

// =====================================================
// SITUACIÓN 2: IDENTIFICAR PRODUCTOS PREMIUM
// =====================================================
//
// ⭐ ESCENARIO: Quieres crear una sección "Productos Premium"
// en tu tienda. Los productos que tienen tags "natural" Y
// "orgánico" son considerados de alta calidad y pueden
// venderse a precios más altos.
//
// 💰 ESTRATEGIA DE PRECIOS:
// - Productos naturales + orgánicos = premium
// - Puedes aplicar precios más altos
// - Sección especial en la tienda
// - Diferenciación de la competencia
//
// 🔧 QUÉ BUSCAMOS: Productos que tengan AL MENOS los tags "natural" y "orgánico"
// - $all significa que DEBE tener AMBOS tags
// - No importa si tiene tags adicionales
// - Garantiza que el producto cumple ambos criterios
//
// 📊 RESULTADO ESPERADO: Deberías ver productos como:
// - Borojó fresco (tags: ["natural", "orgánico"])
// - Otros productos que cumplan ambos criterios
// - Lista para tu sección "Productos Premium"

db.productos.find({ "tags": { $all: ["natural", "orgánico"] } })

// =====================================================
// SITUACIÓN 3: ANÁLISIS DE CATEGORIZACIÓN DE PRODUCTOS
// =====================================================
//
// 🏷️ ESCENARIO: Necesitas analizar qué tan bien categorizados
// están tus productos. Los productos con más de un tag tienen
// mejor descripción y son más fáciles de encontrar para los
// clientes.
//
// 🎯 ESTRATEGIA DE CATALOGACIÓN:
// - Productos con múltiples tags = mejor categorizados
// - Fácil búsqueda para clientes
// - Mejor experiencia de usuario
// - Productos más vendibles
//
// 🔧 QUÉ BUSCAMOS: Productos que tienen MÁS DE UN TAG
// - $size: 1 significa exactamente 1 tag
// - $gt: 1 significa más de 1 tag
// - Esto identifica productos bien categorizados
//
// 📊 RESULTADO ESPERADO: Deberías ver productos como:
// - Borojó fresco (2 tags: ["natural", "orgánico"])
// - Jugo de borojó (2 tags: ["refrescante", "natural"])
// - Mermelada de borojó (2 tags: ["dulce", "desayuno"])
// - Lista para mejorar la categorización de otros productos

db.productos.find({ "tags": { $size: { $gt: 1 } } })

// =====================================================
// CONSULTAS ADICIONALES ÚTILES PARA LA TIENDA
// =====================================================
//
// 🚀 Estas consultas avanzadas te ayudarán a realizar análisis
// más sofisticados para optimizar tu negocio y entender mejor
// a tus clientes y productos.

// =====================================================
// CONSULTA 4: CLIENTES CON PREFERENCIAS ESPECÍFICAS
// =====================================================
//
// 🎯 ESCENARIO: Quieres identificar clientes que prefieren
// productos dulces para enviarles ofertas de postres y snacks.
//
// 💰 IMPACTO EN VENTAS:
// - Clientes con preferencia "dulce" = mercado objetivo
// - Puedes promocionar mermeladas, galletas, helados
// - Marketing dirigido aumenta conversión
//
// 🔧 QUÉ BUSCAMOS: Clientes que prefieren productos dulces
// - Buscamos en el array de preferencias
// - Identificamos clientes para campañas específicas
//
// 📊 RESULTADO ESPERADO: Deberías ver clientes como:
// - Diana Suárez (preferencias: ["dulce", "snack"])
// - Ana López (preferencias: ["bebe", "desayuno"])
// - Sofía Gómez (preferencias: ["dulce"])
// - Valentina Ortiz (preferencias: ["natural", "dulce"])

db.clientes.find({ "preferencias": "dulce" })

// =====================================================
// CONSULTA 5: PRODUCTOS CON TAGS ESPECÍFICOS
// =====================================================
//
// 🏷️ ESCENARIO: Quieres crear una sección "Productos Energéticos"
// para deportistas y personas activas.
//
// 💰 ESTRATEGIA DE MERCHANDISING:
// - Productos energéticos = nicho específico
// - Puedes crear sección especial
// - Atrae a clientes deportistas
// - Diferenciación de mercado
//
// 🔧 QUÉ BUSCAMOS: Productos con tag "energético"
// - Buscamos en el array de tags
// - Identificamos productos para la nueva sección
//
// 📊 RESULTADO ESPERADO: Deberías ver productos como:
// - Concentrado de borojó (tags: ["energético", "fuerte"])
// - Lista para tu sección "Productos Energéticos"

db.productos.find({ "tags": "energético" })

// =====================================================
// CONSULTA 6: ANÁLISIS DE PREFERENCIAS MÚLTIPLES
// =====================================================
//
// 📊 ESCENARIO: Quieres identificar clientes que tienen
// múltiples preferencias para enviarles ofertas más
// variadas y aumentar el valor promedio de compra.
//
// 💰 ESTRATEGIA DE VENTAS:
// - Clientes con múltiples preferencias = más oportunidades
// - Puedes ofrecer productos de diferentes categorías
// - Mayor valor promedio de compra
// - Mejor retención de clientes
//
// 🔧 QUÉ BUSCAMOS: Clientes con más de una preferencia
// - $size: 1 significa exactamente 1 preferencia
// - $gt: 1 significa más de 1 preferencia
// - Esto identifica clientes con gustos variados
//
// 📊 RESULTADO ESPERADO: Deberías ver clientes como:
// - Carlos Ramírez (2 preferencias: ["natural", "bebida"])
// - Diana Suárez (2 preferencias: ["dulce", "snack"])
// - Felipe Castro (2 preferencias: ["fuerte", "natural"])
// - Valentina Ortiz (2 preferencias: ["natural", "dulce"])
// - Lista para campañas de productos variados

db.clientes.find({ "preferencias": { $size: { $gt: 1 } } })

