/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {

  production: false,
  NUXEO: {
    PATH: 'https://documental.udistrital.edu.co/nuxeo/',
  },
  CLIENTE_PRESUPUESTO: '/pages/plan-cuentas',
  CLIENTE_CONTABILIDAD: 'https://pruebascontabilidad.portaloas.udistrital.edu.co/pages',
  WSO2_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/',
  NECESIDADES_CRUD_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8201/v1/',
  PLAN_ADQUISICION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/bodega_jbpm/v1/',
  // MOVIMIENTOS_CRUD_SERVICE: 'http://localhost:8085/v1/',
  ADMINISTRATIVA_PRUEBAS_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8104/v1/',
  // PLAN_CUENTAS_MID_SERVICE: 'http://localhost:8084/v1/',
  // PLAN_CUENTAS_MONGO_SERVICE: 'http://localhost:8082/v1/',
  PLAN_CUENTAS_MONGO_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8203/v1/',
  PLAN_CUENTAS_MID_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8204/v1/',
  ADMINISTRATIVA_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8090/v1/',
  ADMINISTRATIVA_JBPM_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_jbpm/v1/',
  // NECESIDADES_CRUD_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/necesidades_crud/v1/',
  // MOVIMIENTOS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/movimientos_crud/v1/',
  // MOVIMIENTOS_CRUD_SERVICE: 'http://localhost:8085/v1/',
  MOVIMIENTOS_CRUD_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8202/v1/',
  // MOVIMIENTOS_CRUD_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/movimientos_crud/v1/',
  // ADMINISTRATIVA_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8201/v1/',
  OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v2/',
  CORE_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8092/v1/',
  CORE_AMAZON_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/core_amazon_crud/v1/',
  CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
  CONF_MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
  TERCEROS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1',
  KNOWAGE: {
    PROTOCOL: 'https',
    HOST: 'tuleap.udistrital.edu.co',
    PORT: '',
    CONTEXTPATH: 'knowage',
    USER: 'bidev',
    PASSWORD: 'bidev',
  },
  MAPSKEY: 'AIzaSyB_TBcoCJNaFCJBiwMreM2PoHOkj19Gr00',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email role',
    REDIRECT_URL: 'https://pruebassise.portaloas.udistrital.edu.co',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'https://pruebassise.portaloas.udistrital.edu.co',
  },

  // OVARGAS
  API_GET_IDENTIFICATION: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  DATOS_IDENTIFICACION_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/datos_identificacion',
  ID_GRUPO_GENERO: 6,
  ID_GRUPO_INFO_PERSONAL: 70,
  ID_GRUPO_INFO_CONTACTO: 10,
  ID_GRUPO_ESTADO_CIVIL: 2,
  IDS_INFO_COMPLEMENTARIA_ESTADO_CIVIL: [8, 9, 10, 11, 12], // 32 -> F, 33 -> M, 34 -> no aplica, 
  IDS_INFO_COMPLEMENTARIA_GENERO: [32, 33, 34], // 32 -> F, 33 -> M, 34 -> no aplica, 
  ID_INFO_COMPLEMENTARIA_CELULAR: 52,
  ID_INFO_COMPLEMENTARIA_CORREO_PERSONAL: 53, // o 253
  ID_INFO_COMPLEMENTARIA_DIRECCION: 54,
  ID_INFO_COMPLEMENTARIA_RED_SOCIAL_UNO: 254,
  ID_INFO_COMPLEMENTARIA_RED_SOCIAL_DOS: 255,
  ID_INFO_COMPLEMENTARIA_NACIONALIDAD: 252,
  ID_INFO_COMPLEMENTARIA_LUGAR_NACIMIENTO: 250,
  ID_INFO_COMPLEMENTARIA_ESTRATO: [159, 160, 161, 162, 163, 164, 165],
  ID_INFO_COMPLEMENTARIA_NOMBRE_COLEGIO: 259,
  ID_INFO_COMPLEMENTARIA_CIUDAD_COLEGIO: 260,
  ID_INFO_COMPLEMENTARIA_FECHA_GRADUACION: 261,
  ID_INFO_COMPLEMENTARIA_INTERESES: 320,
  ID_INFO_COMPLEMENTARIA_PAIS: 321,
  IDS_INFO_COMPLEMENTARIA_MUNICIPIOS: [147, 148, 149],
  ID_GRUPO_INFO_COMPLEMENTARIA_MUNICIPIOS: 30
};
