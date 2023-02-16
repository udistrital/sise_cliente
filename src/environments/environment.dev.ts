/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  entorno: 'dev',
  NUXEO: {/*  */
    PATH: 'https://documental.udistrital.edu.co/nuxeo/',
  },
  WSO2_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/',
  ADMINISTRATIVA_PRUEBAS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/',
  // PLAN_CUENTAS_CRUD_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/plan_cuentas_crud/v1/',
  // PLAN_CUENTAS_MID_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/plan_cuentas_mid/v1/',
  // PLAN_CUENTAS_MONGO_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/plan_cuentas_mongo_crud/v1/',
  // PLAN_ADQUISICION_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services/bodega_produccion.HTTPEndpoint/',
  // MOVIMIENTOS_CRUD_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/movimientos_crud/v1/',
  // OIKOS_SERVICE: 'http://10.20.0.254/oikos_api/v1/',
  // CONFIGURACION_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
  // NOTIFICACION_SERVICE: 'ws://10.20.0.254/notificacionws/ws/join',
  // CORE_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8092/v1/',
  // CORE_AMAZON_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/core_amazon_crud/v1/',
  TERCEROS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1',
  CONF_MENU_SERVICE: 'https://autenticacion.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
  MAPSKEY: 'AIzaSyB_TBcoCJNaFCJBiwMreM2PoHOkj19Gr00',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: 'Vp8iPJl5TtB7fbPokSmVRc2mj9ca',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email role',
    REDIRECT_URL: 'http://10.20.0.254/sise/',
    SIGN_OUT_URL: 'https://autenticacion.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'http://10.20.0.254/sise/',
  },
  API_GET_IDENTIFICATION: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  DATOS_IDENTIFICACION_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/datos_identificacion',
  CREATE_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/tercero',
  CREATE_DATA_IDENTIFICATION_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/datos_identificacion',
  GET_DOCUMENT_TYPES_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/tipo_documento',
  NOTIFICATIONS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/notificacion_mid',

};
