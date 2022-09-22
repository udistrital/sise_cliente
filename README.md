# sise_cliente
Cliente del Sistema de información y seguimiento al egresado

## Especificaciones Técnicas
### Tecnologías Implementadas y Versiones
* [Angular 14.0.3](https://angular.io/)
* [Ionic Angular 6.1.7](https://ionicframework.com/)
* [oidc-auth 0.6.0](https://github.com/udistrital/oidc-auth-js)

### Variables de Entorno
```shell
# En Pipeline drone.yml
AWS_ACCESS_KEY_ID: llave de acceso ID Usuario AWS
AWS_SECRET_ACCESS_KEY: Secreto de Usuario AWS
```

### Ejecución del Proyecto

Clonar el proyecto del repositorio de git
```bash
# clone the project
git clone https://github.com/udistrital/sise_cliente.git
# enter the project directory
cd sise_cliente
```
Iniciar el servidor en local
```bash
# install dependency
yarn
or
npm install
# start server
yarn dev
or
npm run dev
or
ng serve --port=4200
```

### Ejecución Dockerfile
```bash
# Does not apply
```
### Ejecución docker-compose
```bash
# Does not apply
```
### Ejecución Pruebas

Pruebas unitarias powered by Jest
```bash
# run unit test
npm run test
# Runt linter + unit test
npm run test:ui
```

## Estado CI

| Develop | Relese 0.0.1 | Master |
| -- | -- | -- |
| [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/sise_cliente/status.svg?ref=refs/heads/develop)](https://hubci.portaloas.udistrital.edu.co/udistrital/sise_cliente) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/sise_cliente/status.svg?ref=refs/heads/release/0.0.1)](https://hubci.portaloas.udistrital.edu.co/udistrital/sise_cliente) | Copied
[![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/sise_cliente/status.svg)](https://hubci.portaloas.udistrital.edu.co/udistrital/sise_cliente) |

## Licencia

[This file is part of sise_cliente.](LICENSE)

sise_cliente is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (atSara Sampaio your option) any later version.

sise_cliente is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with sise_cliente. If not, see https://www.gnu.org/licenses/.
