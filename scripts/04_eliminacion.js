// =====================================================
// EJERCICIOS DE ELIMINACIÓN - LA TIENDA DEL BOROJÓ
// =====================================================
//
// DESCRIPCIÓN: Este script contiene los ejercicios de eliminación
// y limpieza de datos en la base de datos de la tienda.
//
// OBJETIVO: Aprender a eliminar documentos en MongoDB usando
// diferentes operadores de eliminación y filtros.
//
// ⚠️  ADVERTENCIA: Las operaciones de eliminación son IRREVERSIBLES.
// Siempre verifica los filtros antes de ejecutar deleteOne() o deleteMany().
// =====================================================

// =====================================================
// EJERCICIO 1: ELIMINAR CLIENTE ESPECÍFICO
// =====================================================
//
// DESCRIPCIÓN: Eliminar el cliente Juan Torres por su correo electrónico
//
// PASO A PASO:
// 1. Usamos deleteOne() para eliminar un solo documento
// 2. Filtramos por el campo "email" con valor exacto
// 3. Solo se elimina el primer documento que coincida
// 4. Es más seguro que deleteMany() para operaciones específicas
//
// RESULTADO ESPERADO: Deberías ver un mensaje confirmando la eliminación
// con el número de documentos eliminados (debería ser 1)

db.clientes.deleteOne({ "email": "juan@email.com" })

// =====================================================
// EJERCICIO 2: LIMPIEZA DE INVENTARIO
// =====================================================
//
// DESCRIPCIÓN: Eliminar todos los productos con stock muy bajo (menos de 5 unidades)
//
// PASO A PASO:
// 1. Usamos deleteMany() para eliminar múltiples documentos
// 2. Filtramos por stock menor a 5 usando $lt (less than)
// 3. Esto simula una limpieza automática de inventario
// 4. Útil para mantener solo productos con stock viable
//
// RESULTADO ESPERADO: Deberías ver un mensaje confirmando la eliminación
// con el número de productos eliminados (puede variar según el stock actual)

db.productos.deleteMany({ "stock": { $lt: 5 } })

// =====================================================
// VERIFICACIÓN DE ELIMINACIONES
// =====================================================
//
// IMPORTANTE: Siempre verifica que las eliminaciones se realizaron
// correctamente y que no se eliminaron documentos incorrectos.
//
// PASO 1: Contar clientes restantes
// - Deberías ver un número menor al original
// - Si eliminaste 1 cliente, deberías tener 10 en lugar de 11

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
// ELIMINACIONES ADICIONALES ÚTILES PARA LA TIENDA
// =====================================================
//
// Estas operaciones te ayudarán a mantener tu base de datos
// limpia y eficiente, eliminando datos obsoletos o problemáticos.

// =====================================================
// ELIMINACIÓN 3: PRODUCTOS SIN STOCK
// =====================================================
//
// DESCRIPCIÓN: Eliminar productos que no tienen stock disponible
//
// PASO A PASO:
// 1. Filtramos productos con stock exactamente igual a 0
// 2. Usamos deleteMany() para eliminar todos los que cumplan la condición
// 3. Esto libera espacio en la base de datos
// 4. Útil para productos descontinuados o agotados
//
// RESULTADO ESPERADO: Se eliminan productos con stock 0
// (si los hay en tu base de datos actual)

db.productos.deleteMany({ "stock": 0 })

// =====================================================
// ELIMINACIÓN 4: IDENTIFICAR CLIENTES INACTIVOS
// =====================================================
//
// DESCRIPCIÓN: Identificar clientes que no han realizado compras
//
// PASO A PASO:
// 1. Primero CONSULTAMOS para ver cuántos clientes inactivos hay
// 2. No eliminamos inmediatamente, solo identificamos
// 3. $size: 0 significa array de compras vacío
// 4. Útil para estrategias de marketing y retención
//
// RESULTADO ESPERADO: Lista de clientes sin compras
// (puedes decidir si eliminarlos o contactarlos)

db.clientes.find({ "compras": { $size: 0 } })

// =====================================================
// RESUMEN DE LO APRENDIDO
// =====================================================
//
// ✅ deleteOne(): Para eliminar un solo documento
// ✅ deleteMany(): Para eliminar múltiples documentos
// ✅ Filtros: Para seleccionar qué documentos eliminar
// ✅ Operadores: $lt para comparaciones numéricas
// ✅ Verificación: Siempre verificar después de eliminar
// ✅ Conteo: Usar countDocuments() para confirmar cambios
// ⚠️  Seguridad: Las eliminaciones son irreversibles
//
