# Tiendadelborojo

CREACIÓN DE LAS COLECCIONES
![alt text](image-1.png)

CLIENTES

![alt text](image-2.png)

VENTAS 
![alt text](image-3.png)

PROVEEDORES
![alt text](image-4.png)

INVENTARIO
![alt text](image-5.png)

CONFIRMAR QUE EFCETIVAMENTE SE EJECUTO 
![alt text](image-6.png)

INSERCCIONES y VERIFICACIONES

![alt text](image-7.png)

3. LECTURA
 Productos con stock > 20
![alt text](image-13.png)

3.1  Clientes que no han comprado (array vacío o inexistente)
![alt text](image-15.png)

4. Actualización (UPDATE)

4.1  Aumentar en 10 el stock de "Borojó deshidratado"

![alt text](image-17.png)

4.2  Añadir el tag "bajo azúcar" a TODOS los productos de categoría "Bebida"

![alt text](image-18.png)

5. ELIMINACIÓN

5.1 Eliminar el cliente con email "juan@email.com"

![alt text](image-19.png)

5.2 Verifica (debe dar 0 resultados):

![alt text](image-20.png)

5.3 Eliminar todos los productos con stock < 5

![alt text](image-21.png)

5.4  Verifica cuántos quedaron con stock < 5 (idealmente 0):

![alt text](image-22.png)

6. Consultas con Expresiones Regulares (REGEX)

6.1 Productos cuyo nombre **empiece** por "Boro"

![alt text](image-23.png)

6.2 . Productos cuyo nombre contenga "con"
Opción A: "con" como **palabra completa** (ej. "Galletas con borojó")

![alt text](image-24.png)

6.3 Encontrar clientes cuyo nombre tenga la letra "z"

![alt text](image-5.png)

7.Operadores en consultas sobre arrays

7.1 Buscar clientes que tengan "natural" en sus preferencias
![alt text](image-10.png)

7.2 Encontrar productos que tengan al menos los tags "natural" y "orgánico" (usando $all)
![alt text](image-12.png)

7.3 Listar productos que tienen más de un tag
![alt text](image-26.png)

8.Aggregation Framework con Pipelines

8.1 Productos más vendidos (suma de unidades por producto)
![alt text](image-27.png)

8.2 Agrupar clientes por cantidad de compras realizadas
![alt text](image-28.png)

8.3  Total de ventas por mes ($group + $month)
![alt text](image-29.png)

8.4 Promedio de precios por categoría de producto

![alt text](image-30.png)

8.5 Top 3 productos con mayor stock ($sort + $limit)
![alt text](image-31.png)

9.INDEXACIONES

9.1 Índice en productos.nombre
![alt text](image-32.png)

9.2 Índice compuesto en productos sobre categoria y precio
![alt text](image-33.png)

9.3 Índice en clientes.email para duplicados (único)

![alt text](image-34.png)

9.4 Verificar con explain() si el índice de nombre se usa

![alt text](image-36.png)
![alt text](image-37.png)
![alt text](image-38.png)