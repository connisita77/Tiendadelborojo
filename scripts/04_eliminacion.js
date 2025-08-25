// =====================================================
// LIMPIEZA Y MANTENIMIENTO DE INVENTARIO - LA TIENDA DEL BOROJÓ
// =====================================================
//
// 🧹 ESCENARIO REAL: Como administrador de la tienda, necesitas
// mantener tu base de datos limpia y actualizada. Algunos clientes
// ya no compran, algunos productos se agotaron, y necesitas
// hacer limpieza del inventario para optimizar el espacio.
//
// 🎯 OBJETIVO DE NEGOCIO: Mantener solo datos relevantes y
// actualizados para mejorar el rendimiento de la tienda y
// enfocarte en productos y clientes activos.
//
// ⚠️  ADVERTENCIA CRÍTICA: Las operaciones de eliminación son
// IRREVERSIBLES. Siempre verifica los filtros antes de ejecutar
// deleteOne() o deleteMany() para evitar pérdida de datos.
// =====================================================

// =====================================================
// SITUACIÓN 1: CLIENTE QUE YA NO COMPRA EN LA TIENDA
// =====================================================
//
// 👤 ESCENARIO: Juan Torres era un cliente regular, pero hace
// 6 meses que no realiza compras. Después de intentar contactarlo
// sin éxito, decides eliminarlo de la base de datos para mantener
// solo clientes activos y relevantes.
//
// 💼 IMPACTO EN EL NEGOCIO:
// - Base de datos más limpia y eficiente
// - Enfoque en clientes activos
// - Mejor rendimiento del sistema
// - Datos más precisos para análisis
//
// 🔧 QUÉ HACEMOS: Eliminar el cliente Juan Torres por su correo electrónico
// - deleteOne() elimina solo un cliente específico
// - Filtramos por email exacto para evitar errores
// - Es más seguro que deleteMany() para operaciones específicas
// - Confirmamos la eliminación antes de continuar
//
// ✅ RESULTADO ESPERADO: Confirmación de que Juan Torres fue eliminado
// de la base de datos. Tu lista de clientes ahora está más actualizada.

db.clientes.deleteOne({ "email": "juan@email.com" })

// =====================================================
// SITUACIÓN 2: LIMPIEZA AUTOMÁTICA DE INVENTARIO
// =====================================================
//
// 📦 ESCENARIO: Es fin de mes y necesitas hacer limpieza del
// inventario. Los productos con menos de 5 unidades no son
// rentables de mantener y ocupan espacio valioso. Decides
// eliminarlos para enfocarte en productos con mejor rotación.
//
// 💰 IMPACTO EN EL NEGOCIO:
// - Libera espacio en el almacén
// - Enfoque en productos rentables
// - Mejor gestión de inventario
// - Reducción de costos de almacenamiento
//
// 🔧 QUÉ HACEMOS: Eliminar productos con stock muy bajo (menos de 5 unidades)
// - deleteMany() elimina múltiples productos a la vez
// - Filtramos por stock menor a 5 usando $lt (less than)
// - Esto simula una limpieza automática de inventario
// - Útil para mantener solo productos con stock viable
//
// ✅ RESULTADO ESPERADO: Confirmación de cuántos productos se eliminaron
// por tener stock muy bajo. Tu inventario ahora está más optimizado.

db.productos.deleteMany({ "stock": { $lt: 5 } })

// =====================================================
// VERIFICACIÓN DE CAMBIOS - CONTROL DE CALIDAD
// =====================================================
//
// 🔍 IMPORTANTE: En una tienda real, siempre debes verificar que
// las eliminaciones se realizaron correctamente. Esto evita errores
// en la gestión de clientes y problemas con el inventario.
//
// 📋 PASO 1: Verificar que el cliente fue eliminado correctamente
// - Deberías ver un número menor al original
// - Si eliminaste 1 cliente, deberías tener 10 en lugar de 11
// - Esto confirma que la limpieza de clientes fue exitosa

db.clientes.countDocuments()

// PASO 2: Contar productos restantes
// - Deberías ver un número menor al original
// - Depende de cuántos productos tenían stock < 5

db.productos.countDocuments()

// PASO 3: Verificar productos con stock bajo (verificación de limpieza)
// - Deberías ver solo productos con stock >= 5
// - Esto confirma que la limpieza funcionó correctamente

db.productos.find({ "stock": { $lt: 10 } })

// PASO 4: Verificar que Juan Torres fue eliminado
// - Esta consulta no debería devolver resultados
// - Confirma que el cliente específico fue eliminado

db.clientes.find({ "email": "juan@email.com" })

// =====================================================
// OPERACIONES DE LIMPIEZA ADICIONALES
// =====================================================
//
// 🧹 Estas operaciones adicionales te ayudarán a mantener tu
// base de datos limpia y eficiente, eliminando datos obsoletos
// o problemáticos para optimizar el rendimiento de la tienda.

// =====================================================
// SITUACIÓN 3: PRODUCTOS COMPLETAMENTE AGOTADOS
// =====================================================
//
// 🚫 ESCENARIO: Algunos productos se han agotado completamente
// y no hay planes de reabastecimiento inmediato. Estos productos
// ocupan espacio en la base de datos sin aportar valor al negocio.
//
// 💰 IMPACTO EN EL NEGOCIO:
// - Libera espacio en la base de datos
// - Elimina confusión para los clientes
// - Enfoque en productos disponibles
// - Mejor experiencia de usuario
//
// 🔧 QUÉ HACEMOS: Eliminar productos con stock exactamente igual a 0
// - Filtramos productos con stock = 0 (completamente agotados)
// - deleteMany() elimina todos los que cumplan la condición
// - Esto libera espacio en la base de datos
// - Útil para productos descontinuados o agotados permanentemente
//
// ✅ RESULTADO ESPERADO: Se eliminan productos con stock 0
// (si los hay en tu base de datos actual). Tu catálogo queda más limpio.

db.productos.deleteMany({ "stock": 0 })

// =====================================================
// SITUACIÓN 4: ANÁLISIS DE CLIENTES INACTIVOS
// =====================================================
//
// 📊 ESCENARIO: Antes de eliminar más clientes, necesitas
// analizar cuántos están realmente inactivos. Esto te permite
// tomar decisiones informadas sobre estrategias de retención
// o eliminación de la base de datos.
//
// 🎯 ESTRATEGIA DE ANÁLISIS:
// - Identificar clientes sin compras recientes
// - Evaluar oportunidades de reactivación
// - Tomar decisiones basadas en datos
// - Optimizar la base de clientes
//
// 🔧 QUÉ HACEMOS: Identificar clientes que no han realizado compras
// - Primero CONSULTAMOS para ver cuántos clientes inactivos hay
// - No eliminamos inmediatamente, solo analizamos
// - $size: 0 significa array de compras vacío
// - Útil para estrategias de marketing y retención
//
// ✅ RESULTADO ESPERADO: Lista de clientes sin compras
// (puedes decidir si eliminarlos o implementar estrategias de reactivación)

db.clientes.find({ "compras": { $size: 0 } })

// =====================================================
// RESUMEN DE OPERACIONES REALIZADAS
// =====================================================
//
// 🎯 LO QUE ACABAS DE HACER:
// ✅ Eliminaste al cliente inactivo Juan Torres
// ✅ Realizaste limpieza automática de inventario (stock < 5)
// ✅ Identificaste productos completamente agotados
// ✅ Analizaste clientes inactivos para futuras decisiones
//
// 💼 IMPACTO EN TU NEGOCIO:
// - Base de datos más limpia y eficiente
// - Enfoque en clientes y productos activos
// - Mejor rendimiento del sistema
// - Datos más precisos para análisis
//
// 🚀 PRÓXIMO PASO: Ahora puedes continuar con otras operaciones
// como análisis de ventas, gestión de proveedores, o implementar
// estrategias de reactivación para clientes inactivos.
