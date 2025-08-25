// =====================================================
// EJERCICIOS DE EXPRESIONES REGULARES - LA TIENDA DEL BOROJÓ
// =====================================================
//
// DESCRIPCIÓN: Este script contiene los ejercicios de búsqueda
// usando expresiones regulares (regex) en MongoDB.
//
// OBJETIVO: Aprender a realizar búsquedas avanzadas y flexibles
// usando patrones de texto y caracteres especiales.
//
// IMPORTANTE: Las expresiones regulares son muy poderosas pero
// pueden ser complejas. Ejecuta estos comandos uno por uno.
// =====================================================

// =====================================================
// EJERCICIO 1: NOMBRES QUE EMPIECEN CON "BORO"
// =====================================================
//
// DESCRIPCIÓN: Buscar productos cuyo nombre comience exactamente con "Boro"
//
// PASO A PASO:
// 1. Usamos /^Boro/ donde ^ significa "inicio de cadena"
// 2. No usamos la bandera "i" (case-insensitive)
// 3. Solo encuentra nombres que empiecen exactamente con "Boro"
// 4. Es útil para búsquedas específicas por prefijo
//
// RESULTADO ESPERADO: Deberías ver:
// - Borojó fresco
// - Borojó deshidratado

db.productos.find({ "nombre": /^Boro/ })

// =====================================================
// EJERCICIO 2: NOMBRES QUE CONTENGAN "CON"
// =====================================================
//
// DESCRIPCIÓN: Encontrar productos cuyo nombre contenga la palabra "con"
//
// PASO A PASO:
// 1. Usamos /con/ para buscar "con" en cualquier parte del nombre
// 2. La bandera "i" hace la búsqueda insensible a mayúsculas/minúsculas
// 3. Encuentra "con" en cualquier posición del texto
// 4. Útil para búsquedas flexibles por contenido
//
// RESULTADO ESPERADO: Deberías ver:
// - Galletas con borojó
// - Concentrado de borojó

db.productos.find({ "nombre": /con/i })

// =====================================================
// EJERCICIO 3: NOMBRES CON LA LETRA "Z"
// =====================================================
//
// DESCRIPCIÓN: Encontrar clientes cuyo nombre contenga la letra "z"
//
// PASO A PASO:
// 1. Usamos /z/ para buscar la letra "z" en cualquier parte del nombre
// 2. La bandera "i" hace la búsqueda insensible a mayúsculas/minúsculas
// 3. Encuentra "z" en cualquier posición del nombre
// 4. Útil para búsquedas fonéticas o por letras específicas
//
// RESULTADO ESPERADO: Deberías ver clientes como:
// - Suárez (contiene "z")

db.clientes.find({ "nombre": /z/i })

// =====================================================
// CONSULTAS ADICIONALES CON REGEX PARA LA TIENDA
// =====================================================
//
// Estas consultas avanzadas te ayudarán a realizar búsquedas
// sofisticadas y encontrar patrones específicos en tus datos.

// =====================================================
// CONSULTA 4: BÚSQUEDA POR "BOROJÓ" EN CUALQUIER PARTE
// =====================================================
//
// DESCRIPCIÓN: Productos que contengan "borojó" en cualquier posición
//
// PASO A PASO:
// 1. /borojó/ busca la palabra completa en cualquier parte
// 2. La bandera "i" hace la búsqueda insensible a mayúsculas/minúsculas
// 3. Encuentra "borojó" al inicio, medio o final del nombre
// 4. Es más flexible que la búsqueda por prefijo
//
// RESULTADO ESPERADO: Deberías ver todos los productos que contengan "borojó"

db.productos.find({ "nombre": /borojó/i })

// =====================================================
// CONSULTA 5: NOMBRES QUE TERMINEN EN VOCAL
// =====================================================
//
// DESCRIPCIÓN: Clientes cuyo nombre termine en vocal (a, e, i, o, u)
//
// PASO A PASO:
// 1. [aeiou] crea una clase de caracteres con todas las vocales
// 2. $ significa "final de cadena"
// 3. La bandera "i" hace la búsqueda insensible a mayúsculas/minúsculas
// 4. Útil para análisis fonéticos o búsquedas por terminación
//
// RESULTADO ESPERADO: Deberías ver clientes como:
// - Suárez (termina en "z" - no es vocal)
// - López (termina en "z" - no es vocal)
// - Gómez (termina en "z" - no es vocal)

db.clientes.find({ "nombre": /[aeiou]$/i })

// =====================================================
// CONSULTA 6: NOMBRES CON EXACTAMENTE 3 PALABRAS
// =====================================================
//
// DESCRIPCIÓN: Productos cuyo nombre tenga exactamente 3 palabras
//
// PASO A PASO:
// 1. ^ significa "inicio de cadena"
// 2. (\w+\s+){2} significa "2 grupos de palabras seguidas de espacios"
// 3. \w+ significa "una palabra al final"
// 4. $ significa "final de cadena"
// 5. Es una regex compleja para patrones específicos
//
// RESULTADO ESPERADO: Deberías ver productos como:
// - Galletas con borojó (3 palabras)
// - Aceite de borojó (3 palabras)

db.productos.find({ "nombre": /^(\w+\s+){2}\w+$/ })

// =====================================================
// CONSULTA 7: EMAILS QUE TERMINEN EN .COM
// =====================================================
//
// DESCRIPCIÓN: Clientes con direcciones de email que terminen en .com
//
// PASO A PASO:
// 1. \. significa "punto literal" (escapado porque . es especial en regex)
// 2. com$ significa "com al final de la cadena"
// 3. No usamos bandera "i" porque los emails son case-sensitive
// 4. Útil para validar formatos de email
//
// RESULTADO ESPERADO: Deberías ver todos los clientes con emails .com

db.clientes.find({ "email": /\.com$/ })

// =====================================================
// CONSULTA 8: TAGS QUE EMPIECEN CON "N"
// =====================================================
//
// DESCRIPCIÓN: Productos con tags que empiecen con la letra "n"
//
// PASO A PASO:
// 1. ^ significa "inicio de cadena"
// 2. n significa "la letra n literal"
// 3. No usamos bandera "i" para mantener la búsqueda exacta
// 4. Útil para categorizar productos por tipo de tag
//
// RESULTADO ESPERADO: Deberías ver productos con tags como:
// - "natural", "orgánico"

db.productos.find({ "tags": /^n/ })

// =====================================================
// CONSULTA 9: BÚSQUEDA AVANZADA CON PATRONES COMPLEJOS
// =====================================================
//
// DESCRIPCIÓN: Productos con nombre que contenga "de" y "con"
//
// PASO A PASO:
// 1. de.*con significa "de seguido de cualquier cosa y luego con"
// 2. con.*de significa "con seguido de cualquier cosa y luego de"
// 3. | significa "O lógico" (una condición O la otra)
// 4. La bandera "i" hace la búsqueda insensible a mayúsculas/minúsculas
// 5. Es una regex muy avanzada para patrones complejos
//
// RESULTADO ESPERADO: Deberías ver productos como:
// - "Concentrado de borojó" (contiene "con" y "de")

db.productos.find({ "nombre": /de.*con|con.*de/i })

// =====================================================
// RESUMEN DE LO APRENDIDO
// =====================================================
//
// ✅ ^ : Inicio de cadena
// ✅ $ : Final de cadena
// ✅ . : Cualquier carácter (excepto nueva línea)
// ✅ * : Cero o más repeticiones
// ✅ + : Una o más repeticiones
// ✅ [] : Clase de caracteres
// ✅ | : O lógico
// ✅ () : Grupos de captura
// ✅ \w : Carácter de palabra
// ✅ \s : Espacio en blanco
// ✅ i : Bandera case-insensitive
//
