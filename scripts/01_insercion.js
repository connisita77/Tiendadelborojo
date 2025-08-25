// =====================================================
// GESTIÓN DE INVENTARIO Y CLIENTES - LA TIENDA DEL BOROJÓ
// =====================================================
// 
// 🌿 ESCENARIO REAL: Estás administrando una tienda de productos
// derivados del borojó en el Pacífico colombiano. Necesitas agregar
// nuevos productos al catálogo y registrar nuevos clientes que
// llegan a la tienda.
//
// 🎯 OBJETIVO DE NEGOCIO: Mantener el inventario actualizado y
// expandir la base de clientes para aumentar las ventas.
//
// 💡 IMPORTANTE: Ejecuta estos comandos uno por uno en mongosh para
// simular operaciones reales de tu tienda.
// =====================================================

// =====================================================
// SITUACIÓN 1: NUEVO PRODUCTO LLEGA A LA TIENDA
// =====================================================
// 
// 📦 ESCENARIO: Un proveedor local acaba de traer "Chocolatinas de borojó"
// que son perfectas para el mercado escolar. Necesitas agregarlas al
// inventario para que los clientes puedan comprarlas.
//
// 💰 ANÁLISIS DE NEGOCIO:
// - Precio competitivo: $4,000 (ideal para estudiantes)
// - Stock inicial: 35 unidades (para probar la demanda)
// - Categoría: Snack (sección de mayor rotación)
// - Tags: "dulce" y "energía" (atractivo para jóvenes)
//
// 🔧 PASO A PASO:
// 1. Usamos insertOne() para agregar el producto al catálogo
// 2. Asignamos _id: 11 para mantener orden en el inventario
// 3. Estructuramos todos los campos necesarios para la venta
// 4. Los tags ayudan a los clientes a encontrar el producto
//
// ✅ RESULTADO ESPERADO: Confirmación de que el producto se agregó
// al catálogo. Ahora los clientes pueden comprarlo.

db.productos.insertOne({
  "_id": 11,
  "nombre": "Chocolatina de borojó",
  "categoria": "Snack",
  "precio": 4000,
  "stock": 35,
  "tags": ["dulce", "energía"]
})

// =====================================================
// SITUACIÓN 2: NUEVO CLIENTE REGISTRADO EN LA TIENDA
// =====================================================
//
// 👤 ESCENARIO: Mario Mendoza acaba de entrar a la tienda por primera vez.
// Es un deportista local que busca productos energéticos y naturales.
// Necesitas registrarlo en el sistema para hacer seguimiento de sus compras.
//
// 🎯 PERFIL DEL CLIENTE:
// - Deportista activo (busca productos energéticos)
// - Consumidor consciente (prefiere productos naturales)
// - Cliente potencial de alto valor (compras frecuentes)
// - Sin historial previo (nuevo en la tienda)
//
// 🔧 PASO A PASO:
// 1. Creamos el perfil del cliente con _id único (11)
// 2. Array de compras vacío [] porque es su primera visita
// 3. Preferencias basadas en su estilo de vida
// 4. Usamos insertOne() para agregarlo a la base de clientes
//
// ✅ RESULTADO ESPERADO: Mario Mendoza queda registrado en el sistema.
// Ahora puedes hacer seguimiento de sus compras y preferencias.

db.clientes.insertOne({
  "_id": 11,
  "nombre": "Mario Mendoza",
  "email": "mario@email.com",
  "compras": [],
  "preferencias": ["energético", "natural"]
})

// =====================================================
// VERIFICACIÓN DE OPERACIONES - CONTROL DE CALIDAD
// =====================================================
//
// 🔍 IMPORTANTE: En una tienda real, siempre debes verificar que
// las operaciones se realizaron correctamente. Esto evita errores
// en el inventario y problemas con los clientes.
//
// 📋 PASO 1: Verificar que el producto se agregó al catálogo
// - Buscamos por _id: 11 para encontrar "Chocolatinas de borojó"
// - Deberías ver todos los detalles del producto en pantalla
// - Esto confirma que está disponible para la venta

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
// RESUMEN DE OPERACIONES REALIZADAS
// =====================================================
//
// 🎯 LO QUE ACABAS DE HACER:
// ✅ Agregaste "Chocolatinas de borojó" al catálogo de productos
// ✅ Registraste a Mario Mendoza como nuevo cliente
// ✅ Verificaste que ambas operaciones fueron exitosas
// ✅ Confirmaste el total actualizado de productos y clientes
//
// 💼 IMPACTO EN TU NEGOCIO:
// - Nuevo producto disponible para venta
// - Cliente potencial registrado en el sistema
// - Inventario actualizado y organizado
// - Base de datos sincronizada
//
// 🚀 PRÓXIMO PASO: Ahora puedes continuar con otras operaciones
// como consultas de inventario, actualizaciones de stock, o
// análisis de ventas para tomar decisiones de negocio.
