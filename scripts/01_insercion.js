// =====================================================
// EJERCICIOS DE INSERCIÓN - LA TIENDA DEL BOROJÓ
// =====================================================
// 
// DESCRIPCIÓN: Este script contiene los ejercicios de inserción de nuevos
// productos y clientes en la base de datos de la tienda.
//
// OBJETIVO: Aprender a insertar documentos individuales en MongoDB
// usando el comando insertOne().
//
// IMPORTANTE: Ejecuta estos comandos uno por uno en mongosh para
// ver el resultado de cada operación.
// =====================================================

// =====================================================
// EJERCICIO 1: INSERTAR NUEVO PRODUCTO
// =====================================================
// 
// PASO A PASO:
// 1. Usamos insertOne() para insertar un solo documento
// 2. Definimos un _id único (11) para evitar conflictos
// 3. Estructuramos el documento con todos los campos necesarios
// 4. Los tags se definen como un array []
//
// RESULTADO ESPERADO: Deberías ver un mensaje confirmando la inserción
// con el ObjectId generado automáticamente.

db.productos.insertOne({
  "_id": 11,
  "nombre": "Chocolatina de borojó",
  "categoria": "Snack",
  "precio": 4000,
  "stock": 35,
  "tags": ["dulce", "energía"]
})

// =====================================================
// EJERCICIO 2: INSERTAR NUEVO CLIENTE
// =====================================================
//
// PASO A PASO:
// 1. Creamos un nuevo cliente con _id único (11)
// 2. El array de compras está vacío [] porque es un cliente nuevo
// 3. Las preferencias se definen como array con sus gustos
// 4. Usamos insertOne() para insertar un solo cliente
//
// RESULTADO ESPERADO: Confirmación de inserción del cliente
// con su ObjectId correspondiente.

db.clientes.insertOne({
  "_id": 11,
  "nombre": "Mario Mendoza",
  "email": "mario@email.com",
  "compras": [],
  "preferencias": ["energético", "natural"]
})

// =====================================================
// VERIFICACIÓN DE INSERCIONES
// =====================================================
//
// IMPORTANTE: Siempre verifica que las inserciones se realizaron
// correctamente antes de continuar con otros ejercicios.
//
// PASO 1: Verificar que el producto se insertó
// - Buscamos por _id: 11 para encontrar el producto específico
// - Deberías ver el documento completo del producto

db.productos.find({"_id": 11})

// PASO 2: Verificar que el cliente se insertó
// - Buscamos por _id: 11 para encontrar el cliente específico
// - Deberías ver el documento completo del cliente

db.clientes.find({"_id": 11})

// =====================================================
// CONTEO FINAL DE DOCUMENTOS
// =====================================================
//
// PASO 3: Contar total de productos
// - Deberías ver 11 productos (10 originales + 1 nuevo)
// - Esto confirma que la inserción fue exitosa

db.productos.countDocuments()

// PASO 4: Contar total de clientes
// - Deberías ver 11 clientes (10 originales + 1 nuevo)
// - Esto confirma que la inserción fue exitosa

db.clientes.countDocuments()

// =====================================================
// RESUMEN DE LO APRENDIDO
// =====================================================
//
// ✅ insertOne(): Para insertar un solo documento
// ✅ _id personalizado: Para controlar identificadores únicos
// ✅ Arrays: Para campos como tags y preferencias
// ✅ Verificación: Siempre verificar después de insertar
// ✅ Conteo: Usar countDocuments() para confirmar totales
//
