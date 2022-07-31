/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// export const environment = {
//   production: true,
//   NUXEO: {
//     PATH: 'https://documental.udistrital.edu.co/nuxeo/',
//   },
//   CLIENTE_PRESUPUESTO: '/pages/plan-cuentas',
//   CLIENTE_CONTABILIDAD: 'https://pruebascontabilidad.portaloas.udistrital.edu.co/pages',
//   WSO2_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/',
//   NECESIDADES_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/necesidades_crud/v1/',
//   ADMINISTRATIVA_PRUEBAS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/administrativa_amazon_api/v1/',
//   PLAN_CUENTAS_MONGO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_mongo_crud/v1/',
//   PLAN_CUENTAS_MID_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_mid/v1/',
//   PLAN_ADQUISICION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/bodega_jbpm/v1/',
//   MOVIMIENTOS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/movimientos_crud/v1/',
//   ADMINISTRATIVA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/necesidades_crud/v1/',
//   OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v2/',
//   CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
//   CORE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/core_api/v1/',
//   CORE_AMAZON_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/core_amazon_crud/v1/',
//   NOTIFICACION_SERVICE: 'wss://autenticacion.portaloas.udistrital.edu.co/apioas/notificacion_ws/v1/',
//   CONF_MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
//   KNOWAGE: {
//     PROTOCOL: 'https',
//     HOST: 'tuleap.udistrital.edu.co',
//     PORT: '',
//     CONTEXTPATH: 'knowage',
//     USER: 'bidev',
//     PASSWORD: 'bidev',
//   },
//   MAPSKEY: 'AIzaSyB_TBcoCJNaFCJBiwMreM2PoHOkj19Gr00',
//   TOKEN: {
//     AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
//     CLIENTE_ID: 's2BR5hCyo1Bea2dCiMxx9usviQoa',
//     RESPONSE_TYPE: 'id_token token',
//     SCOPE: 'openid email role',
//     REDIRECT_URL: 'https://pruebassise.portaloas.udistrital.edu.co',
//     SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
//     SIGN_OUT_REDIRECT_URL: 'https://pruebassise.portaloas.udistrital.edu.co',
//   },
//   API_GET_IDENTIFICATION: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
//   DATOS_IDENTIFICACION_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/datos_identificacion',

//   // OVARGAS
//   TERCEROS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1',
//   INFO_COMPLEMENTARIA_IDS: {
//     ESTADO_CIVIL: [8, 9, 10, 11, 12], // 32 -> F, 33 -> M, 34 -> no aplica,
//     GENERO: [32, 33, 34], // 32 -> F, 33 -> M, 34 -> no aplica,
//     CELULAR: 52,
//     CORREO_PERSONAL: 53, // o 253
//     DIRECCION: 54,
//     RED_SOCIAL_UNO: 254,
//     RED_SOCIAL_DOS: 255,
//     NACIONALIDAD: 252,
//     LUGAR_NACIMIENTO: 250,
//     ESTRATO: [159, 160, 161, 162, 163, 164, 165],
//     NOMBRE_COLEGIO: 259,
//     CIUDAD_COLEGIO: 260,
//     FECHA_GRADUACION: 261,
//     INTERESES: 320,
//     PAIS: 321,
//     DPTO: 323,
//     CODIGO_PAIS: 324,
//     MUNICIPIOS: [147, 148, 149],
//   },
//   GRUPO_INFO_COMPLEMENTARIA_IDS: {
//     MUNICIPIOS: 30,
//     LOCALIDADES: 29,
//     ACADEMICA: 17,
//     GENERO: 6,
//     INFO_CONTACTO: 10,
//     ESTADO_CIVIL: 2,
//   },
//   API_ENDPOINT_UBICACIONES: "https://autenticacion.portaloas.udistrital.edu.co/apioas/ubicaciones_crud/v2/",
//   EVENTOS_ENDPOINT: "https://autenticacion.portaloas.udistrital.edu.co/apioas/sesiones_crud/v2",
// };

export const environment = {
  production: true,
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
    CLIENTE_ID: 's2BR5hCyo1Bea2dCiMxx9usviQoa',
    RESPONSE_TYPE: 'id_token token',
    // SCOPE: 'openid email role',
    SCOPE: 'openid email',
    REDIRECT_URL: 'https://pruebassise.portaloas.udistrital.edu.co',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'https://pruebassise.portaloas.udistrital.edu.co',
    SIGN_OUT_APPEND_TOKEN:  "true",
  },
  API_GET_IDENTIFICATION: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  DATOS_IDENTIFICACION_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/datos_identificacion',

  // OVARGAS
  TERCEROS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1',
  INFO_COMPLEMENTARIA_IDS: {
    // NOTA: LOS campos o datos CON DISABLED HAY QUE BUSCARLES EL ID

    // ESTADO_CIVIL: [8, 9, 10, 11, 12], // 32 -> F, 33 -> M, 34 -> no aplica,
    GENERO: [32, 33, 34], // 32 -> F, 33 -> M, 34 -> no aplica,
    // CELULAR: 52,
    // CORREO_PERSONAL: 53, // o 253
    // DIRECCION: 54,
    // RED_SOCIAL_UNO: 254,
    // RED_SOCIAL_DOS: 255,
    NACIONALIDAD: 252,
    LUGAR_NACIMIENTO: 250,
    // INTERESES: 320,
    // PAIS_RESIDENCIA: 321,
    // DEPARTAMENTO_RESIDENCIA: 323,
    // CODIGO_DEL_PAIS: 324,
    // MUNICIPIOS: [147, 148, 149],
    // ESTRATO: [159, 160, 161, 162, 163, 164, 165],
    NOMBRE_COLEGIO: 259,
    CIUDAD_COLEGIO: 260,
    FECHA_GRADUACION: 261,

    // GENERO: 1366,
    // NACIONALIDAD: 1367,
    // LUGAR_DE_NACIMIENTO: 1368,
    ESTRATO: 1369,
    ESTADO_CIVIL: 1370,
    TIPO_DE_POBLACION: 1371,
    CONDICIONES_DISCAPACIDAD: 1372,
    CORREO_PERSONAL: 1373,
    RED_SOCIAL_1: 1374,
    RED_SOCIAL_2: 1375,
    CODIGO_DEL_PAIS: 1376,
    CELULAR: 1377,
    PAIS_RESIDENCIA: 1378,
    DEPARTAMENTO_RESIDENCIA: 1379,
    MUNICIPIO_RESIDENCIA: 1380,
    LOCALIDAD_RESIDENCIA: 1381,
    DIRECCION_RESIDENCIA: 1382,
    INTERESES: 1383,
    // NOMBRE_COLEGIO: 1384,
    // CIUDAD_COLEGIO: 1385,
    // FECHA_GRADUACION: 1386,
    PROGRAMAS_DE_POSGRADO_TITULADOS_EN_LA_UD: 1387,
    NOMBRE_DE_SU_EMPRESA: 1388,
    NIT_DE_LA_EMPRESA: 1389,
    SECTOR_ECONOMICO_DE_LA_EMPRESA: 1390,
    SITIO_WEB_DE_LA_EMPRESA: 1391,
    FECHA_DE_FUNDACION_DE_LA_EMPRESA: 1392,
    ACTIVIDADES_QUE_REALIZA_LA_EMPRESA: 1393,
    NECESIDADES_PROFESIONALES_SATISFACCION: 1394,
    NECESIDADES_ECONOMICAS_SATISFACCION: 1395,
    NECESIDADES_DESARROLLO_PERSONAL_SATISFACCION: 1396,
    NECESIDADES_CON_SU_EMPRESA_SATISFACCION: 1397,
    CANTIDAD_DE_EMPLEADOS: 1398,
    CANTIDAD_DE_PROFESIONALES_O_TECNOLOGOS_EMPLEADOS: 1399,
    CANTIDAD_DE_EGRESADOS_DE_LA_UD_PROFESIONALES_O_TECNOLOGOS_EMPLEADOS: 1400,
    CANTIDAD_DE_EMPLEOS_OPERATIVOS_ASISTENCIALES_O_DE_APOYO_GENERADOS: 1401,
    PRINCIPAL_DIFICULTAD_A_LA_HORA_DE_CONSEGUIR_TRABAJO: 1402,
    CANAL_DE_BUSQUEDA_DE_EMPLEO: 1403,
    PROBLEMTICAS_EN_DONDE_CONSIDERA_QUE_HA_APORTADO: 1404,
    OTRA_PROBLEMTICA_EN_DONDE_CONSIDERA_QUE_HA_APORTADO: 1405,
    SITUACION_LABORAL: 1406,
    CUNTO_TIEMPO_EN_MESES_LLEVA_EN_ESTA_ACTIVIDAD_O_TRABAJO: 1407,
    INGRESO_O_SALARIO_SATISFACCION_LABORAL: 1408,
    CANTIDAD_DE_HORAS_SATISFACCION_LABORAL: 1409,
    APLICACION_DE_CONOCIMIENTOS_DE_LA_CARRERA__SATISFACCION_LABORAL: 1410,
    RETOS_Y_DESAFOS_INTELECTUALES_SATISFACCION_LABORAL: 1411,
    OPORTUNIDADES_DE_ASCENSO_SATISFACCION_LABORAL: 1412,
    ESTABILIDAD_SATISFACCION_LABORAL: 1413,
    INGRESO_O_SALARIO: 1414,
    RAZON_DE_VINCULACION: 1415,
    OTRA_RAZON_DE_VINCULACION: 1416,
    ESTATUS_LABORAL: 1417,
    ACTIVIDADES_QUE_REALIZA: 1418,
    TIPO_DE_CONTRATO: 1419,
    SECTOR: 1420,
    GRUPO_DE_ACTIVIDAD_ECONOMICA: 1421,
    FORMAS_DE_TRABAJO_INDEPENDIENTES: 1422,
    NOMBRE_DE_LA_EMPRESA_EN_DONDE_LABORA: 1423,
    NOMBRE_DE_LA_EMPRESA: 1424,
    CUALES_SON_LOS_PRODUCTOS_O_SERVICIOS: 1425,
    CIUDAD_MUNICIPIO__PROVINCIA_DE_UBICACION_DE_LA_EMPRESA: 1426,
    OPERACION_DE_LA_EMPRESA: 1427,
    ETAPA_EN_QUE_SE_ENCUETRA_LA_EMPRESA: 1428,
    EN_LA_ACTUALIDAD_EN_QU_ACTIVIDAD_OCUPA_LA_MAYOR_PARTE_DE_SU_TIEMPO: 1429,
    DESEA_CONSEGUIR_UN_TRABAJO_O_REALIZAR_UNA_ACTIVIDAD_REMUNERADA: 1430,
    DURANTE_EL_ULTIMO_MES_HIZO_ALGUNA_DILIGENCIA_PARA_CONSEGUIR_UN_TRABAJO_O_REALIZAR_UNA_ACTIVIDAD: 1431,
    AUNQUE_DESEA_TRABAJAR_POR_QU_MOTIVO_NO_HIZO_DILIGENCIAS_PARA_BUSCAR_UN_TRABAJO_EN_EL_ULTIMO_MES: 1432,
    SI_LE_RESULTARA_ALGUN_TRABAJO_REMUNERADO_EST_DISPONIBLE_PARA_EMPEZAR_A_TRABAJAR: 1433,
    HACE_CUNTOS_MESES_HA_ESTADO_BUSCANDO_EMPLEO: 1434,
    SI_DESEA_COMENTARNOS_MS_A_DETALLE_ACERCA_DE_SUS_APORTES_CONTRIBUCIONES_O_LOGROS_PUEDE_HACERLO: 1435,


    // INFO EMPRENDIMIENTO
    MOTIVACION_EMPRENDER: 1457,
    DESARROLLADO_PROTOTIPO_MERCADO: 1458,
    TIENE_INTERES_DESARROLLAR_PROTOTIPO: 1459,
    PRODUCTOS_SERVICIOS_PROYECTA_SON: 1460,
    QUE__TANTO_INTERES_CREAR_EMPRESA: 1461,
    CUANTO_TIEMPO_DEDICAR_PROYECTO_NEGOCIO: 1462,
    TIPO_EMPRENDIMIENTO: 1463,
    TECNOLOGIAS_PROYECTO: 1464,
    TECNOLOGIAS_PROYECTO_OTRO: 1465,
    HERRAMIENTAS_RECURSOS_EMPRENDIMIENTO: 1466,
    HERRAMIENTAS_RECURSOS_EMPRENDIMIENTO_OTRO: 1467,
    CUALES_TEMATICAS_ORIENTACION: 1468,
    HA_VENDIDO_PRODUCTO_SERVICIO: 1469,
    QUIEN_VENDIDO_PRODUCTO_SERVICIO: 1470,
    CANALES_EMPLEO_VENDER_PRODUCTO: 1471,
    CANALES_EMPLEO_VENDER_PRODUCTO_OTRO: 1472,
    COMO_OBTUVO_CAPITAL_VENDER: 1473,
    COMO_OBTUVO_CAPITAL_VENDER_OTRO: 1474,
    CONOCE_TRAMITES_PARA_EMPRENDIMIENTO: 1475,
    CONOCE_ASPECTOS_TRIBUTARIOS_PROYECTO: 1476,
    PROCESO_CONTRATACION_CLIENTES_PROVEEDORES: 1477,
    PROCESO_CONTRATACION_EMPLEADOS: 1478,
    RECURSOS_INICIAR_EMPRESA: 1479,
    RECURSOS_INICIAR_EMPRESA_OTRO: 1480,
    ESTRUCTURA_COSTOS_INGRESOS: 1481,
    ASPECTOS_DEFINIDOS_EMPRENDIMIENTO: 1482,
  },
  GRUPO_INFO_COMPLEMENTARIA_IDS: {
    MUNICIPIOS: 30,
    LOCALIDADES: 29,
    ACADEMICA: 17,
    GENERO: 6,
    INFO_CONTACTO: 10,
    ESTADO_CIVIL: 2,
  },
  API_ENDPOINT_UBICACIONES: "https://autenticacion.portaloas.udistrital.edu.co/apioas/ubicaciones_crud/v2/",
  EVENTOS_ENDPOINT: "https://autenticacion.portaloas.udistrital.edu.co/apioas/sesiones_crud/v2",
  OIKOS_POSGRADOS_ID: 15,
};
