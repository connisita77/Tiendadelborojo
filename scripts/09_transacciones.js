// =====================================================
// TRANSACCIONES EN MONGODB - LA TIENDA DEL BOROJÓ
// =====================================================
//
// 🚀 ESCENARIO REAL: Como administrador de la tienda, necesitas
// realizar operaciones que involucran múltiples colecciones y
// asegurar que todas las operaciones se completen exitosamente
// o se reviertan completamente en caso de error.
//
// 💼 OBJETIVO DE NEGOCIO: Implementar transacciones para:
// - Operaciones de venta (descontar stock + registrar venta)
// - Entrada de inventario (registrar entrada + aumentar stock)
// - Devoluciones (aumentar stock + eliminar venta)
// - Mantener consistencia de datos en todas las operaciones
//
// 🔍 IMPORTANTE: Las transacciones en MongoDB garantizan que
// múltiples operaciones se ejecuten como una unidad atómica.
// =====================================================

// =====================================================
// PASO 1: TRANSACCIÓN DE VENTA
// =====================================================
//
// 💰 ESCENARIO: Simular una venta que involucra descontar
// stock del producto e insertar la venta en la colección ventas.
//
// 🔧 QUÉ HACEMOS:
// - Iniciar una sesión de transacción
// - Descontar stock del producto
// - Insertar la venta en la colección ventas
// - Confirmar o revertir la transacción según el resultado
//
// 📊 OPERACIONES INVOLUCRADAS:
// - Actualizar stock en colección productos
// - Insertar documento en colección ventas
// - Mantener consistencia entre ambas operaciones

// Función para simular una venta con transacción
function simularVenta(productoId, clienteId, cantidad, precioUnitario) {
  // Iniciar sesión para la transacción
  const session = db.getMongo().startSession();
  
  try {
    // Iniciar transacción
    session.startTransaction();
    
    // Obtener el producto para verificar stock disponible
    const producto = db.productos.findOne({ _id: productoId }, { session: session });
    
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    
    if (producto.stock < cantidad) {
      throw new Error("Stock insuficiente para la venta");
    }
    
    // Calcular total de la venta
    const totalVenta = cantidad * precioUnitario;
    
    // PASO A: Descontar del stock del producto
    const resultadoStock = db.productos.updateOne(
      { _id: productoId },
      { $inc: { stock: -cantidad } },
      { session: session }
    );
    
    if (resultadoStock.modifiedCount === 0) {
      throw new Error("Error al actualizar stock del producto");
    }
    
    // PASO B: Insertar la venta en la colección ventas
    const venta = {
      fecha: new Date().toISOString(),
      clienteId: clienteId,
      productos: [{
        productoId: productoId,
        cantidad: cantidad,
        precioUnitario: precioUnitario
      }],
      total: totalVenta,
      metodoPago: "efectivo",
      estado: "completada"
    };
    
    const resultadoVenta = db.ventas.insertOne(venta, { session: session });
    
    if (!resultadoVenta.insertedId) {
      throw new Error("Error al insertar la venta");
    }
    
    // Confirmar la transacción
    session.commitTransaction();
    
    return {
      exito: true,
      mensaje: "Venta realizada exitosamente",
      ventaId: resultadoVenta.insertedId,
      stockRestante: producto.stock - cantidad
    };
    
  } catch (error) {
    // Revertir la transacción en caso de error
    session.abortTransaction();
    
    return {
      exito: false,
      mensaje: "Error en la transacción: " + error.message,
      error: error.message
    };
  } finally {
    // Cerrar la sesión
    session.endSession();
  }
}

// =====================================================
// PASO 2: TRANSACCIÓN DE ENTRADA DE INVENTARIO
// =====================================================
//
// 📦 ESCENARIO: Simular la entrada de nuevo inventario que
// involucra insertar un documento en inventario y aumentar
// el stock del producto correspondiente.
//
// 🔧 QUÉ HACEMOS:
// - Iniciar una sesión de transacción
// - Insertar documento en colección inventario
// - Aumentar stock del producto correspondiente
// - Confirmar o revertir la transacción según el resultado
//
// 📊 OPERACIONES INVOLUCRADAS:
// - Insertar entrada en colección inventario
// - Actualizar stock en colección productos
// - Mantener consistencia entre ambas operaciones

// Función para simular entrada de inventario con transacción
function simularEntradaInventario(productoId, cantidad, precioCompra, proveedorId, fechaEntrada) {
  // Iniciar sesión para la transacción
  const session = db.getMongo().startSession();
  
  try {
    // Iniciar transacción
    session.startTransaction();
    
    // Verificar que el producto existe
    const producto = db.productos.findOne({ _id: productoId }, { session: session });
    
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    
    // PASO A: Insertar un documento en inventario
    const entradaInventario = {
      fecha: fechaEntrada || new Date().toISOString(),
      productoId: productoId,
      tipo: "entrada",
      cantidad: cantidad,
      precioUnitario: precioCompra,
      proveedorId: proveedorId,
      motivo: "Compra a proveedor",
      estado: "confirmada"
    };
    
    const resultadoInventario = db.inventario.insertOne(entradaInventario, { session: session });
    
    if (!resultadoInventario.insertedId) {
      throw new Error("Error al insertar entrada de inventario");
    }
    
    // PASO B: Aumentar el stock del producto correspondiente
    const resultadoStock = db.productos.updateOne(
      { _id: productoId },
      { $inc: { stock: cantidad } },
      { session: session }
    );
    
    if (resultadoStock.modifiedCount === 0) {
      throw new Error("Error al actualizar stock del producto");
    }
    
    // Confirmar la transacción
    session.commitTransaction();
    
    return {
      exito: true,
      mensaje: "Entrada de inventario registrada exitosamente",
      inventarioId: resultadoInventario.insertedId,
      stockActualizado: producto.stock + cantidad
    };
    
  } catch (error) {
    // Revertir la transacción en caso de error
    session.abortTransaction();
    
    return {
      exito: false,
      mensaje: "Error en la transacción: " + error.message,
      error: error.message
    };
  } finally {
    // Cerrar la sesión
    session.endSession();
  }
}

// =====================================================
// PASO 3: TRANSACCIÓN DE DEVOLUCIÓN
// =====================================================
//
// 🔄 ESCENARIO: Simular una operación de devolución que
// involucra aumentar el stock del producto y eliminar
// la venta correspondiente.
//
// 🔧 QUÉ HACEMOS:
// - Iniciar una sesión de transacción
// - Aumentar stock del producto
// - Eliminar la venta correspondiente
// - Confirmar o revertir la transacción según el resultado
//
// 📊 OPERACIONES INVOLUCRADAS:
// - Actualizar stock en colección productos
// - Eliminar documento en colección ventas
// - Mantener consistencia entre ambas operaciones

// Función para simular devolución con transacción
function simularDevolucion(ventaId, productoId, cantidad, motivo) {
  // Iniciar sesión para la transacción
  const session = db.getMongo().startSession();
  
  try {
    // Iniciar transacción
    session.startTransaction();
    
    // Verificar que la venta existe
    const venta = db.ventas.findOne({ _id: ventaId }, { session: session });
    
    if (!venta) {
      throw new Error("Venta no encontrada");
    }
    
    // Verificar que el producto existe
    const producto = db.productos.findOne({ _id: productoId }, { session: session });
    
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    
    // PASO A: Aumentar el stock del producto
    const resultadoStock = db.productos.updateOne(
      { _id: productoId },
      { $inc: { stock: cantidad } },
      { session: session }
    );
    
    if (resultadoStock.modifiedCount === 0) {
      throw new Error("Error al actualizar stock del producto");
    }
    
    // PASO B: Eliminar la venta correspondiente
    const resultadoVenta = db.ventas.deleteOne({ _id: ventaId }, { session: session });
    
    if (resultadoVenta.deletedCount === 0) {
      throw new Error("Error al eliminar la venta");
    }
    
    // Registrar la devolución en inventario
    const devolucionInventario = {
      fecha: new Date().toISOString(),
      productoId: productoId,
      tipo: "devolucion",
      cantidad: cantidad,
      motivo: motivo || "Devolución del cliente",
      ventaId: ventaId,
      estado: "confirmada"
    };
    
    db.inventario.insertOne(devolucionInventario, { session: session });
    
    // Confirmar la transacción
    session.commitTransaction();
    
    return {
      exito: true,
      mensaje: "Devolución procesada exitosamente",
      stockActualizado: producto.stock + cantidad,
      ventaEliminada: ventaId
    };
    
  } catch (error) {
    // Revertir la transacción en caso de error
    session.abortTransaction();
    
    return {
      exito: false,
      mensaje: "Error en la transacción: " + error.message,
      error: error.message
    };
  } finally {
    // Cerrar la sesión
    session.endSession();
  }
}

// =====================================================
// PASO 4: PRUEBAS DE LAS TRANSACCIONES
// =====================================================
//
// 🧪 EXPLICACIÓN: Probamos cada transacción para asegurar
// que funcionen correctamente y mantengan la consistencia
// de los datos en la base de datos.
//
// 🔧 QUÉ HACEMOS:
// - Probar transacción de venta
// - Probar transacción de entrada de inventario
// - Probar transacción de devolución
// - Verificar que los datos se mantengan consistentes

// =====================================================
// PRUEBA 1: TRANSACCIÓN DE VENTA
// =====================================================
//
// 💰 ESCENARIO: Probar la transacción de venta con un
// producto y cliente reales de la base de datos.

// Obtener datos de prueba
const productoPrueba = db.productos.findOne();
const clientePrueba = db.clientes.findOne();

if (productoPrueba && clientePrueba) {
  print("=== PRUEBA TRANSACCIÓN DE VENTA ===");
  print("Producto: " + productoPrueba.nombre + " - Stock actual: " + productoPrueba.stock);
  print("Cliente: " + clientePrueba.nombre);
  
  // Ejecutar transacción de venta
  const resultadoVenta = simularVenta(
    productoPrueba._id,
    clientePrueba._id,
    2, // cantidad
    productoPrueba.precio
  );
  
  print("Resultado: " + JSON.stringify(resultadoVenta, null, 2));
  
  // Verificar cambios en la base de datos
  const productoActualizado = db.productos.findOne({ _id: productoPrueba._id });
  print("Stock después de la venta: " + productoActualizado.stock);
  
  const ventasRecientes = db.ventas.find().sort({ fecha: -1 }).limit(1).toArray();
  if (ventasRecientes.length > 0) {
    print("Última venta registrada: " + JSON.stringify(ventasRecientes[0], null, 2));
  }
}

// =====================================================
// PRUEBA 2: TRANSACCIÓN DE ENTRADA DE INVENTARIO
// =====================================================
//
// 📦 ESCENARIO: Probar la transacción de entrada de
// inventario para aumentar el stock de un producto.

if (productoPrueba) {
  print("\n=== PRUEBA TRANSACCIÓN DE ENTRADA DE INVENTARIO ===");
  print("Producto: " + productoPrueba.nombre + " - Stock actual: " + productoPrueba.stock);
  
  // Ejecutar transacción de entrada de inventario
  const resultadoInventario = simularEntradaInventario(
    productoPrueba._id,
    10, // cantidad a agregar
    productoPrueba.precio * 0.7, // precio de compra (70% del precio de venta)
    "proveedor001", // ID del proveedor
    new Date().toISOString()
  );
  
  print("Resultado: " + JSON.stringify(resultadoInventario, null, 2));
  
  // Verificar cambios en la base de datos
  const productoConStockActualizado = db.productos.findOne({ _id: productoPrueba._id });
  print("Stock después de entrada de inventario: " + productoConStockActualizado.stock);
  
  const entradasInventario = db.inventario.find().sort({ fecha: -1 }).limit(1).toArray();
  if (entradasInventario.length > 0) {
    print("Última entrada de inventario: " + JSON.stringify(entradasInventario[0], null, 2));
  }
}

// =====================================================
// PRUEBA 3: TRANSACCIÓN DE DEVOLUCIÓN
// =====================================================
//
// 🔄 ESCENARIO: Probar la transacción de devolución
// para revertir una venta y aumentar el stock.

// Buscar una venta reciente para la devolución
const ventaParaDevolucion = db.ventas.findOne();

if (ventaParaDevolucion && productoPrueba) {
  print("\n=== PRUEBA TRANSACCIÓN DE DEVOLUCIÓN ===");
  print("Venta a devolver: " + ventaParaDevolucion._id);
  print("Producto: " + productoPrueba.nombre + " - Stock actual: " + productoPrueba.stock);
  
  // Ejecutar transacción de devolución
  const resultadoDevolucion = simularDevolucion(
    ventaParaDevolucion._id,
    productoPrueba._id,
    1, // cantidad a devolver
    "Producto defectuoso"
  );
  
  print("Resultado: " + JSON.stringify(resultadoDevolucion, null, 2));
  
  // Verificar cambios en la base de datos
  const productoDespuesDevolucion = db.productos.findOne({ _id: productoPrueba._id });
  print("Stock después de la devolución: " + productoDespuesDevolucion.stock);
  
  // Verificar que la venta fue eliminada
  const ventaEliminada = db.ventas.findOne({ _id: ventaParaDevolucion._id });
  print("Venta eliminada: " + (ventaEliminada === null ? "SÍ" : "NO"));
}

// =====================================================
// PASO 5: VERIFICACIÓN DE CONSISTENCIA DE DATOS
// =====================================================
//
// 🔍 EXPLICACIÓN: Verificamos que todas las transacciones
// mantuvieron la consistencia de los datos entre las
// diferentes colecciones de la base de datos.
//
// 🔧 QUÉ HACEMOS:
// - Verificar stock final de productos
// - Verificar registros de inventario
// - Verificar estado de ventas
// - Confirmar integridad referencial

print("\n=== VERIFICACIÓN DE CONSISTENCIA DE DATOS ===");

// Verificar stock final de productos
const productosFinales = db.productos.find().toArray();
print("Stock final de productos:");
productosFinales.forEach(function(producto) {
  print("- " + producto.nombre + ": " + producto.stock + " unidades");
});

// Verificar registros de inventario
const registrosInventario = db.inventario.find().toArray();
print("\nTotal de registros de inventario: " + registrosInventario.length);

// Verificar estado de ventas
const totalVentas = db.ventas.countDocuments();
print("Total de ventas en la base de datos: " + totalVentas);

