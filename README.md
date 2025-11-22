# Simulador de Árbol Binario de Búsqueda

## Descripción del Proyecto

Este es un simulador interactivo de Árboles Binarios de Búsqueda (BST) desarrollado en HTML, CSS y JavaScript (utilizando jQuery y jQuery UI).

La herramienta permite a los usuarios visualizar la estructura de un BST en tiempo real mientras insertan y eliminan nodos. Es ideal para estudiantes y profesionales que desean comprender visualmente cómo funcionan las operaciones fundamentales de los BST y cómo se realizan los recorridos principales.

### Características Principales

*   **Visualización Dinámica:** Dibuja el árbol en un lienzo (Canvas) y ajusta automáticamente el diseño para mantener la claridad.
*   **Operaciones BST:** Permite la inserción de nuevos nodos y la eliminación de nodos (hojas o con un solo hijo, manejando la eliminación de nodos con dos hijos mediante el sucesor inorden).
*   **Recorridos Clásicos:** Calcula y muestra los resultados de los tres recorridos principales:
    *   Preorden
    *   Inorden
    *   Postorden
*   **Interfaz Simple:** Interfaz de usuario limpia y minimalista, enfocada en la funcionalidad.

## Tecnologías Utilizadas

*   HTML5 (Canvas)
*   CSS3 (Estilos minimalistas)
*   JavaScript (Lógica del árbol y dibujo)
*   jQuery (Manipulación del DOM)
*   jQuery UI (Componentes de interfaz como botones y diálogos)

## Uso

Dado que este es un proyecto de frontend puro, no requiere instalación de dependencias de servidor ni compilación.

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd simulador-bst
```

### 2. Abrir la Aplicación

Simplemente abre el archivo `index.html` en tu navegador web preferido.

```bash
open index.html
# o
start index.html
```

### 3. Interacción

1.  **Insertar Nodos:** Utiliza el campo de texto y el botón "Insertar Nodo" en la esquina superior derecha para añadir valores numéricos al árbol.
2.  **Eliminar Nodos:** Haz clic en un nodo para abrir el menú contextual. Si el nodo es una hoja, aparecerá la opción para eliminarlo.
3.  **Ver Recorridos:** Haz clic en el botón "Recorridos" en el menú principal para calcular y mostrar los resultados de los recorridos Preorden, Inorden y Postorden en el contenedor inferior.
4.  **Limpiar:** Usa el botón "Limpiar arbol y recorridos" para resetear completamente el simulador.

---
*Desarrollado por ManuelDevCoder*