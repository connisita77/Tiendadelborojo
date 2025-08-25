// =====================================================
// FUNCIONES DEFINIDAS POR EL USUARIO (UDF) - LA TIENDA DEL BOROJÓ
// =====================================================
//
// 🚀 ESCENARIO REAL: Como administrador de la tienda, necesitas
// crear funciones personalizadas que puedas reutilizar en múltiples
// consultas y operaciones. Las UDF te permiten encapsular lógica
// de negocio compleja y mantener consistencia en tus cálculos.
//
// 💼 OBJETIVO DE NEGOCIO: Crear funciones reutilizables para:
// - Cálculos de descuentos y precios
// - Validaciones de clientes y stock
// - Lógica de negocio estandarizada
// - Reducir duplicación de código en consultas
//
// 🔍 IMPORTANTE: Las UDF se almacenan en system.js y pueden ser
// llamadas desde cualquier consulta o script en la base de datos.
// =====================================================

// =====================================================
// PASO 1: DEFINICIÓN DE FUNCIONES EN SYSTEM.JS
// =====================================================
//
// 📝 EXPLICACIÓN: Definimos nuestras funciones personalizadas
// en la colección system.js. Cada función tiene un _id único y un
// valor que contiene el código JavaScript de la función.
//
// 🔧 QUÉ HACEMOS:
// - Usar db.system.js.insertOne() para cada función
// - Cada función tiene un _id descriptivo
// - El valor contiene el código JavaScript como objeto Code
// - Las funciones pueden recibir parámetros y retornar valores

// =====================================================
// FUNCIÓN 1: CALCULAR DESCUENTO
// =====================================================
//
// 💰 FUNCIONALIDAD: Calcula el precio final después de aplicar
// un descuento porcentual. Útil para promociones y ofertas.
//
// 📊 PARÁMETROS:
// - precio: Precio original del producto
// - porcentaje: Porcentaje de descuento (0-100)
//
// 💡 RETORNO: Precio final con descuento aplicado

db.system.js.insertOne({
  _id: "calcularDescuento",
  value: new Code("function(precio, porcentaje) { return precio * (1 - porcentaje / 100); }")
});

// =====================================================
// FUNCIÓN 2: VERIFICAR CLIENTE ACTIVO
// =====================================================
//
// 👥 FUNCIONALIDAD: Determina si un cliente es considerado
// activo basándose en su historial de compras.
//
// 📊 PARÁMETROS:
// - idCliente: ID único del cliente a evaluar
//
// 💡 RETORNO: true si el cliente tiene más de 3 compras, false en caso contrario

db.system.js.insertOne({
  _id: "clienteActivo",
  value: new Code("function(idCliente) { var compras = db.ventas.countDocuments({clienteId: idCliente}); return compras > 3; }")
});

// =====================================================
// FUNCIÓN 3: VERIFICAR STOCK DISPONIBLE
// =====================================================
//
// 📦 FUNCIONALIDAD: Verifica si hay suficiente stock disponible
// para satisfacer una cantidad deseada de un producto.
//
// 📊 PARÁMETROS:
// - productoId: ID del producto a verificar
// - cantidadDeseada: Cantidad que se desea comprar
//
// 💡 RETORNO: true si hay stock suficiente, false en caso contrario

db.system.js.insertOne({
  _id: "verificarStock",
  value: new Code("function(productoId, cantidadDeseada) { var producto = db.productos.findOne({_id: productoId}); return producto && producto.stock >= cantidadDeseada; }")
});

// =====================================================
// PASO 2: VERIFICACIÓN DE FUNCIONES CREADAS
// =====================================================
//
// 🔍 EXPLICACIÓN: Verificamos que las funciones se hayan
// almacenado correctamente en system.js.
//
// 🔧 QUÉ HACEMOS:
// - Consultar todas las funciones almacenadas
// - Verificar que cada función tenga el _id correcto
// - Confirmar que el código esté disponible

db.system.js.find();

// =====================================================
// PASO 3: PRUEBAS DE LAS FUNCIONES UDF
// =====================================================
//
// 🧪 EXPLICACIÓN: Probamos cada función para asegurar
// que funcione correctamente con datos reales de la tienda.
//
// 🔧 QUÉ HACEMOS:
// - Recuperar cada función desde system.js
// - Convertir el código a función ejecutable
// - Probar con datos reales de las colecciones

// =====================================================
// PRUEBA 1: FUNCIÓN CALCULAR DESCUENTO
// =====================================================
//
// 💰 ESCENARIO: Aplicar un descuento del 20% a un producto
// que cuesta $100 para calcular el precio final promocional.

const f1 = db.system.js.findOne({ _id: "calcularDescuento" });
const calcularDescuento = new Function('return ' + f1.value.code)();

const precioOriginal = 100;
const porcentajeDescuento = 20;
const precioConDescuento = calcularDescuento(precioOriginal, porcentajeDescuento);

// =====================================================
// PRUEBA 2: FUNCIÓN CLIENTE ACTIVO
// =====================================================
//
// 👥 ESCENARIO: Verificar si un cliente específico es activo
// basándose en su historial de compras en la tienda.

const f2 = db.system.js.findOne({ _id: "clienteActivo" });
const clienteActivo = new Function('return ' + f2.value.code)();

const clienteEjemplo = db.clientes.findOne();
const esActivo = clienteActivo(clienteEjemplo._id);

// =====================================================
// PRUEBA 3: FUNCIÓN VERIFICAR STOCK
// =====================================================
//
// 📦 ESCENARIO: Verificar si hay suficiente stock disponible
// para satisfacer una venta de 5 unidades de un producto.

const f3 = db.system.js.findOne({ _id: "verificarStock" });
const verificarStock = new Function('return ' + f3.value.code)();

const productoEjemplo = db.productos.findOne();
const cantidadDeseada = 5;
const hayStock = verificarStock(productoEjemplo._id, cantidadDeseada);

// =====================================================
// PASO 4: APLICACIONES PRÁCTICAS EN CONSULTAS REALES
// =====================================================
//
// 🚀 EXPLICACIÓN: Usamos las funciones UDF en consultas
// reales de la tienda para obtener insights valiosos.
//
// 🔧 QUÉ HACEMOS:
// - Usar las UDF en consultas de agregación
// - Aplicar lógica de negocio personalizada
// - Generar reportes con cálculos complejos

// =====================================================
// APLICACIÓN 1: PRODUCTOS CON DESCUENTO APLICADO
// =====================================================
//
// 💰 ESCENARIO: Generar una lista de todos los productos
// con un descuento del 15% aplicado para una promoción especial.

const fDescuento = db.system.js.findOne({ _id: "calcularDescuento" });
const calcularDescuentoApp = new Function('return ' + fDescuento.value.code)();

const productosConDescuento = db.productos.find().toArray().map(function(producto) {
  const precioConDescuento = calcularDescuentoApp(producto.precio, 15);
  const ahorro = producto.precio - precioConDescuento;
  
  return {
    nombre: producto.nombre,
    categoria: producto.categoria,
    precioOriginal: producto.precio,
    precioPromocional: precioConDescuento.toFixed(2),
    ahorro: ahorro.toFixed(2),
    porcentajeDescuento: 15
  };
});

// =====================================================
// APLICACIÓN 2: CLIENTES VIP CON DESCUENTO ESPECIAL
// =====================================================
//
// 👑 ESCENARIO: Identificar clientes VIP (activos) y aplicar
// un descuento especial del 25% a sus compras.

const fClienteActivo = db.system.js.findOne({ _id: "clienteActivo" });
const clienteActivoApp = new Function('return ' + fClienteActivo.value.code)();

const fDescuentoVIP = db.system.js.findOne({ _id: "calcularDescuento" });
const calcularDescuentoVIP = new Function('return ' + fDescuentoVIP.value.code)();

const clientesVIP = db.clientes.find().toArray().filter(function(cliente) {
  return clienteActivoApp(cliente._id);
});

// =====================================================
// APLICACIÓN 3: ANÁLISIS DE STOCK Y ALERTAS
// =====================================================
//
// 📦 ESCENARIO: Analizar el stock de todos los productos
// y generar alertas para productos con stock bajo.

const fVerificarStock = db.system.js.findOne({ _id: "verificarStock" });
const verificarStockApp = new Function('return ' + fVerificarStock.value.code)();

const analisisStock = db.productos.find().toArray().map(function(producto) {
  const stockCritico = producto.stock < 10;
  const stockBajo = producto.stock < 25;
  const stockOptimo = producto.stock >= 25;
  
  const puedeVender5 = verificarStockApp(producto._id, 5);
  
  return {
    nombre: producto.nombre,
    categoria: producto.categoria,
    stock: producto.stock,
    precio: producto.precio,
    valorStock: producto.stock * producto.precio,
    estado: stockCritico ? "CRÍTICO" : (stockBajo ? "BAJO" : "ÓPTIMO"),
    puedeVender5: puedeVender5,
    recomendacion: stockCritico ? "REABASTECER URGENTE" : 
                   (stockBajo ? "Reabastecer pronto" : "Stock adecuado")
  };
});

// =====================================================
// RESUMEN FINAL
// =====================================================
//
// 🎯 EXPLICACIÓN: Las User Defined Functions (UDF) en MongoDB
// proporcionan una forma poderosa de encapsular lógica de negocio
// y reutilizar código en múltiples consultas y operaciones.
//
// 💰 BENEFICIOS PARA LA TIENDA:
// - Código reutilizable y mantenible
// - Lógica de negocio centralizada
// - Consistencia en cálculos y validaciones
// - Fácil actualización de reglas de negocio
// - Mejor rendimiento en operaciones repetitivas
//
// 🚀 APLICACIONES FUTURAS:
// - Cálculos de impuestos y comisiones
// - Validaciones de reglas de negocio
// - Algoritmos de recomendación
// - Análisis predictivo de ventas
// - Gestión de promociones dinámicas 