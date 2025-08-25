// =====================================================
// GESTIÓN DE INVENTARIO Y PRECIOS - LA TIENDA DEL BOROJÓ
// =====================================================
//
// 📦 ESCENARIO REAL: Como administrador de la tienda, necesitas
// mantener tu inventario actualizado y ajustar precios según
// la demanda del mercado. Un proveedor acaba de traer más stock
// y quieres ofrecer opciones saludables a tus clientes.
//
// 🎯 OBJETIVO DE NEGOCIO: Optimizar el inventario, ajustar
// precios estratégicamente y mejorar la categorización de
// productos para aumentar las ventas.
//
// 💡 IMPORTANTE: Ejecuta estos comandos uno por uno en mongosh para
// simular operaciones reales de gestión de tu tienda.
// =====================================================

// =====================================================
// SITUACIÓN 1: NUEVO STOCK LLEGA A LA TIENDA
// =====================================================
//
// 🚚 ESCENARIO: El proveedor "Frutas del Chocó" acaba de traer
// un nuevo lote de "Borojó deshidratado". Necesitas actualizar
// el inventario para reflejar las 10 unidades adicionales.
//
// 💰 IMPACTO EN EL NEGOCIO:
// - Stock aumentado = más ventas posibles
// - Producto disponible para promociones
// - Mejor servicio al cliente
// - Inventario actualizado y preciso
//
// 🔧 QUÉ HACEMOS: Incrementar el stock del "Borojó deshidratado" en 10 unidades
// - updateOne() actualiza un solo producto específico
// - $inc significa "increment" (incrementar)
// - Filtramos por nombre exacto del producto
//
// ✅ RESULTADO ESPERADO: Confirmación de que el stock se actualizó
// de 18 a 28 unidades. Ahora tienes más producto para vender.

db.productos.updateOne(
  { "nombre": "Borojó deshidratado" },
  { $inc: { "stock": 10 } }
)

// =====================================================
// SITUACIÓN 2: CAMPAÑA DE PRODUCTOS SALUDABLES
// =====================================================
//
// 🥤 ESCENARIO: Has decidido lanzar una campaña de "Bebidas Saludables"
// para atraer a clientes conscientes de su salud. Necesitas etiquetar
// todos tus productos de bebida como "bajo azúcar" para destacarlos.
//
// 🎯 ESTRATEGIA DE MARKETING:
// - Etiqueta "bajo azúcar" = diferenciación en el mercado
// - Atrae a clientes saludables
// - Permite crear sección especial en la tienda
// - Mejora el posicionamiento de marca
//
// 🔧 QUÉ HACEMOS: Agregar el tag "bajo azúcar" a todos los productos de categoría "Bebida"
// - updateMany() actualiza múltiples productos a la vez
// - Filtramos por categoría "Bebida" para afectar solo bebidas
// - $push añade el nuevo tag al array existente
//
// ✅ RESULTADO ESPERADO: Confirmación de que 3 productos de bebida
// ahora tienen el tag "bajo azúcar". Puedes crear tu sección saludable.

db.productos.updateMany(
  { "categoria": "Bebida" },
  { $push: { "tags": "bajo azúcar" } }
)

// =====================================================
// VERIFICACIÓN DE CAMBIOS - CONTROL DE CALIDAD
// =====================================================
//
// 🔍 IMPORTANTE: En una tienda real, siempre debes verificar que
// los cambios se aplicaron correctamente. Esto evita errores
// en el inventario y problemas con los clientes.
//
// 📋 PASO 1: Verificar que el stock del Borojó deshidratado se actualizó
// - Buscamos el producto por nombre exacto
// - Deberías ver que el stock aumentó de 18 a 28 unidades
// - Esto confirma que el nuevo lote se agregó correctamente

db.productos.find({ "nombre": "Borojó deshidratado" })

// PASO 2: Verificar productos de bebida con el nuevo tag
// - Buscamos todos los productos de categoría "Bebida"
// - Deberías ver que ahora tienen el tag "bajo azúcar" en su array

db.productos.find({ "categoria": "Bebida" })

// =====================================================
// OPERACIONES ESTRATÉGICAS ADICIONALES
// =====================================================
//
// 🚀 Estas operaciones avanzadas te ayudarán a gestionar precios,
// promociones y categorización de productos de manera estratégica
// para maximizar las ventas y la satisfacción del cliente.

// =====================================================
// SITUACIÓN 3: PROMOCIÓN DE FIN DE SEMANA
// =====================================================
//
// 🎉 ESCENARIO: Es fin de semana y quieres atraer más clientes
// a la tienda. Decides hacer una promoción especial en snacks
// con un descuento del 10% para aumentar las ventas.
//
// 💰 ESTRATEGIA DE PRECIOS:
// - Descuento del 10% = mayor volumen de ventas
// - Snacks son productos de alta rotación
// - Atrae a familias y jóvenes
// - Mejora la competitividad en el mercado
//
// 🔧 QUÉ HACEMOS: Reducir el precio de todos los snacks en un 10%
// - updateMany() afecta múltiples productos a la vez
// - Filtramos por categoría "Snack" para la promoción
// - $mul multiplica el precio por 0.9 (90% del original)
//
// 📊 RESULTADO ESPERADO: Los precios de snacks se reducirán:
// - Galletas con borojó: de $6,000 a $5,400
// - Chocolatina de borojó: de $4,000 a $3,600
// - Mayor competitividad y ventas esperadas

db.productos.updateMany(
  { "categoria": "Snack" },
  { $mul: { "precio": 0.9 } }
)

// =====================================================
// SITUACIÓN 4: IDENTIFICAR PRODUCTOS ESTRELLA
// =====================================================
//
// ⭐ ESCENARIO: Quieres identificar y destacar tus productos
// más populares para crear una sección "Productos Estrella"
// en la tienda. Esto ayuda a los clientes a tomar decisiones
// de compra más rápidas.
//
// 🎯 ESTRATEGIA DE MERCHANDISING:
// - Productos con stock alto = alta demanda
// - Etiqueta "popular" = confianza del cliente
// - Sección especial en la tienda
// - Mejor posicionamiento de productos
//
// 🔧 QUÉ HACEMOS: Añadir el tag "popular" a productos con stock alto
// - Filtramos productos con stock mayor a 25 unidades
// - $push añade "popular" al array de tags existente
// - Esto crea una categoría especial de productos
//
// 📊 RESULTADO ESPERADO: Productos como:
// - "Jugo de borojó" (stock: 50) - Muy popular
// - "Galletas con borojó" (stock: 40) - Alta demanda
// - Ahora puedes crear tu sección "Productos Estrella"

db.productos.updateMany(
  { "stock": { $gt: 25 } },
  { $push: { "tags": "popular" } }
)

// =====================================================
// RESUMEN DE OPERACIONES REALIZADAS
// =====================================================
//
// 🎯 LO QUE ACABAS DE HACER:
// ✅ Actualizaste el stock del Borojó deshidratado (+10 unidades)
// ✅ Lanzaste campaña de "Bebidas Saludables" (tag "bajo azúcar")
// ✅ Aplicaste promoción de fin de semana en snacks (-10%)
// ✅ Identificaste tus productos estrella (tag "popular")
//
// 💼 IMPACTO EN TU NEGOCIO:
// - Inventario actualizado y preciso
// - Nueva estrategia de marketing implementada
// - Promociones activas para aumentar ventas
// - Productos destacados para mejor merchandising
//
// 🚀 PRÓXIMO PASO: Ahora puedes continuar con otras operaciones
// como análisis de ventas, gestión de clientes, o implementar
// nuevas estrategias de precios y promociones.
