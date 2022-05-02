
## Arquitectura
- NPM - v8.8.0
- Vue - v3.2.33

## Instalación
# review-project-frontend

Desarrollado en Vue3 En Conjunto con Vite. UI de apoyo usando PrimeVue V3.12.6

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
## Flujo de generación de documentos

1. El usuario se loguea con el sistema con las credenciales por defecto.
2. El usuario accede a la vista de facturas, donde puede ver todos los registros y tener acciones sobre ellas (Crear, Actualizar, Eliminar, Mostrar).
3. El usuario pulsa en crear Factura.
4. Se renderiza un formulario de creación de facturas, el cuál puede añadir productos según la cantidad.
5. El usuario puede guardar o volver a la página principal.
6. El usuario pulsa en editar Factura.
7. Se renderiza un formulario de edición de facturas, el cuál puede añadir productos según la cantidad (Productos repetidos se sumaran al anterior registro).
8. El usuario pulsa en mostrar Factura.
9. Se renderiza un formulario de muestra de facturas, con todos los datos incluidos el valor total + El IVA.
10. El usuario pulsa en eliminar factura.
11. Elimina el registro instantaneamente.

Credenciales para el logueo: admin@example.com, password: topemdevelop
### Compile and Minify for Production

```sh
npm run build
```
