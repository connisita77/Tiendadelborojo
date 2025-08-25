// =====================================================
// INDEXACIÓN EN MONGODB - LA TIENDA DEL BOROJÓ
// =====================================================

// 1. Crear un índice en el campo nombre de productos
db.productos.createIndex({ nombre: 1 })

// Esto crea un índice ascendente en nombre. Sirve para búsquedas exactas o con expresiones regulares al inicio (/^abc/).

// 2. Crear un índice compuesto sobre categoria y precio
db.productos.createIndex({ categoria: 1, precio: -1 })

// Esto ordena primero por categoria (ascendente) y dentro de cada categoría por precio (descendente). Útil para queries tipo:

db.productos.find({ categoria: "bebidas" }).sort({ precio: -1 })

// 3. Crear un índice en el campo email de clientes
db.clientes.createIndex({ email: 1 }, { unique: true })

// Esto no solo indexa, sino que garantiza unicidad. Evita correos duplicados en la colección.

// 4. Usar explain() para verificar el uso del índice

// Ejemplo de búsqueda por nombre en productos:
db.productos.find({ nombre: "Café Colombiano" }).explain("executionStats")

// En el resultado, fíjate en:
// "winningPlan" → debería mostrar "IXSCAN" (Index Scan) en vez de "COLLSCAN".
// "executionStats.nReturned" → cantidad de documentos encontrados.
// "totalKeysExamined" → cuántas entradas del índice se revisaron.
// "totalDocsExamined" → cuántos documentos reales se leyeron (idealmente debe ser bajo).

// 5. Verificar índices creados
db.productos.getIndexes()
db.clientes.getIndexes()

// 6. Probar consulta con índice compuesto
db.productos.find({ categoria: "bebidas", precio: { $lt: 50 } }).explain("executionStats")

// 7. Eliminar índice si es necesario
// db.productos.dropIndex("nombre_1") 