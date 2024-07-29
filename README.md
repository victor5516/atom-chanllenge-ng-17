# ATOM FE CHALLENGE TEMPLATE - ANGULAR

Este proyecto es una plantilla con lo necesario para comenzar a desarrollar el front-end de la aplicación de la prueba técnica de Atom. Se base en Angular con la versión 17.3.6.
Se ha realizado la instalación y configuración de varias dependencias necesarias para el desarrollo de la aplicación, como por ejemplo: Angular Material.

## Instrucciones
Siéntete libre de clonar este repositorio y utilizarlo como base para el desarrollo de la aplicación. Sigue las indicates de la prueba técnica para completar la aplicación y desarrolla como más te sientas cómodo.

De igual manera puedes documentar dentro de este archivo todo lo que deseas contar sobre tu desarrollo, como por ejemplo, decisiones de diseño, problemas encontrados, etc.

## Comentarios sobre el desarrollo
Para el desarrollo de esta prueba técnica, he decidido basarme en la plantilla de Angular proporcionada, ya que ofrece una buena base para comenzar a desarrollar la aplicación. He seguido una estructura de carpetas escalable y reutilizable, que facilita el mantenimiento y la expansión futura de la aplicación. La estructura de la aplicación es la siguiente:

- **models**: Esta carpeta contiene los modelos de datos utilizados en la aplicación. Cada archivo representa un modelo de datos específico, proporcionando una estructura clara y organizada para los datos.
- **services**: Aquí se encuentran los servicios que la aplicación utiliza para realizar peticiones a la API y devolver los datos necesarios. Además, hay un servicio de diálogo que se encarga de gestionar los diálogos de la aplicación, proporcionando una manera centralizada y consistente de mostrar mensajes y confirmaciones.
- **modules**: En esta carpeta se encuentran los modulos de la aplicación los cuales son:
    - **core**: Este módulo contiene componentes principales, como el componente de login. Estos son elementos esenciales para la funcionalidad básica de la aplicación.
    - **shared**:  En este módulo se agrupan los componentes reutilizables en toda la aplicación. Ejemplos de estos componentes son el header, el diálogo de confirmación y el botón de submit con spinner. Este enfoque permite reutilizar código y mantener la consistencia en toda la aplicación.
    - **features**: Este módulo está dedicado a las funcionalidades específicas de la aplicación. Actualmente, incluye el administrador de tareas, pero en el futuro se pueden añadir más funcionalidades de manera organizada.

Este challenge tecnico ha sido una experiencia muy enriquecedora, ya que me ha permitido poner en práctica mis habilidades de desarrollo front-end, aunque he tenido que enfrentarme a varios desafios, como la integración de algunas pruebas unitarias y el angular material, sin embargo, he logrado aprender de ellos.
Por otra parte algunos de los aspectos que he tenido en cuenta para el desarrollo de la aplicación son:
- **Diseño responsivo**: La aplicación es completamente responsiva y se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta pantallas de escritorio.
- **Usabilidad**: Se ha prestado especial atención a la usabilidad de la aplicación, asegurando que sea fácil de usar y que los usuarios puedan realizar sus tareas de manera eficiente.
- **Mantenibilidad**: La estructura de carpetas y la organización del código facilitan la mantenibilidad de la aplicación, permitiendo que se puedan realizar cambios y mejoras de manera sencilla.

Por ultimo me han quedado algunas mejoras pendientes como:
 - **Intercptores**: Implementar interceptores para manejar errores y peticiones HTTP, asi como tambien para manejar la autenticación.
- **Pruebas unitarias**: Añadir más pruebas unitarias para aumentar la cobertura de código y garantizar la calidad del software.

Para el despliegue de la aplicación se ha utilizado firebase, el cual permite desplegar aplicaciones web de manera sencilla y rápida. Para acceder a la aplicación desplegada, puedes hacerlo a través del siguiente enlace: [https://free-food-406ff.firebaseapp.com/](https://free-food-406ff.firebaseapp.com/)



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
