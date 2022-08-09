export const environment = {
  production: false,
  entorno: 'test',
  autenticacion: true,
  notificaciones: false,
  menuApps: false,
  assets: 'https://pruebasassets.portaloas.udistrital.edu.co/',
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
    CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a', // s2BR5hCyo1Bea2dCiMxx9usviQoa -
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email',
    // SCOPE: 'openid email role',
    REDIRECT_URL: 'http://localhost:4200/',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
  },
  API_GET_IDENTIFICATION: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  DATOS_IDENTIFICACION_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/datos_identificacion',

  // OVARGAS
  TERCEROS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1',
  INFO_COMPLEMENTARIA_IDS: {
    FOTO_DE_PERFIL_SISE: 1483,
    GENERO: 1484,
    NACIONALIDAD: 1485,
    LUGAR_DE_NACIMIENTO: 1486,
    ESTRATO: 1487,
    ESTADO_CIVIL: 1488,
    TIPO_DE_POBLACION: 1489,
    CONDICIONES_DISCAPACIDAD: 1490,
    CORREO_PERSONAL: 1491,
    RED_SOCIAL_1: 1492,
    RED_SOCIAL_2: 1493,
    CODIGO_DEL_PAIS: 1494,
    CELULAR: 1495,
    PAIS_RESIDENCIA: 1496,
    DEPARTAMENTO_RESIDENCIA: 1497,
    MUNICIPIO_RESIDENCIA: 1498,
    LOCALIDAD_RESIDENCIA: 1499,
    DIRECCION_RESIDENCIA: 1500,
    INTERESES: 1501,
    NOMBRE_COLEGIO: 1502,
    CIUDAD_COLEGIO: 1503,
    FECHA_GRADUACION: 1504,
    PROGRAMAS_DE_POSGRADO_TITULADOS_EN_LA_UD: 1505,
    NOMBRE_DE_SU_EMPRESA: 1506,
    NIT_DE_LA_EMPRESA: 1507,
    SECTOR_ECONOMICO_DE_LA_EMPRESA: 1508,
    SITIO_WEB_DE_LA_EMPRESA: 1509,
    FECHA_DE_FUNDACION_DE_LA_EMPRESA: 1510,
    ACTIVIDADES_QUE_REALIZA_LA_EMPRESA: 1511,
    NECESIDADES_PROFESIONALES_SATISFACCION: 1512,
    NECESIDADES_ECONOMICAS_SATISFACCION: 1513,
    NECESIDADES_DESARROLLO_PERSONAL_SATISFACCION: 1514,
    NECESIDADES_CON_SU_EMPRESA_SATISFACCION: 1515,
    CANTIDAD_DE_EMPLEADOS: 1516,
    CANTIDAD_DE_PROFESIONALES_O_TECNOLOGOS_EMPLEADOS: 1517,
    CANTIDAD_DE_EGRESADOS_DE_LA_UD_PROFESIONALES_O_TECNOLOGOS_EMPLEADOS: 1518,
    CANTIDAD_DE_EMPLEOS_OPERATIVOS_ASISTENCIALES_O_DE_APOYO_GENERADOS: 1519,
    PRINCIPAL_DIFICULTAD_A_LA_HORA_DE_CONSEGUIR_TRABAJO: 1520,
    CANAL_DE_BUSQUEDA_DE_EMPLEO: 1521,
    PROBLEMTICAS_EN_DONDE_CONSIDERA_QUE_HA_APORTADO: 1522,
    OTRA_PROBLEMTICA_EN_DONDE_CONSIDERA_QUE_HA_APORTADO: 1523,
    SITUACION_LABORAL: 1524,
    CUNTO_TIEMPO_EN_MESES_LLEVA_EN_ESTA_ACTIVIDAD_O_TRABAJO: 1525,
    INGRESO_O_SALARIO_SATISFACCION_LABORAL: 1526,
    CANTIDAD_DE_HORAS_SATISFACCION_LABORAL: 1527,
    APLICACION_DE_CONOCIMIENTOS_DE_LA_CARRERA__SATISFACCION_LABORAL: 1528,
    RETOS_Y_DESAFOS_INTELECTUALES_SATISFACCION_LABORAL: 1529,
    OPORTUNIDADES_DE_ASCENSO_SATISFACCION_LABORAL: 1530,
    ESTABILIDAD_SATISFACCION_LABORAL: 1531,
    INGRESO_O_SALARIO: 1532,
    RAZON_DE_VINCULACION: 1533,
    OTRA_RAZON_DE_VINCULACION: 1534,
    ESTATUS_LABORAL: 1535,
    ACTIVIDADES_QUE_REALIZA: 1536,
    TIPO_DE_CONTRATO: 1537,
    SECTOR: 1538,
    GRUPO_DE_ACTIVIDAD_ECONOMICA: 1539,
    FORMAS_DE_TRABAJO_INDEPENDIENTES: 1540,
    NOMBRE_DE_LA_EMPRESA_EN_DONDE_LABORA: 1541,
    NOMBRE_DE_LA_EMPRESA: 1542,
    CUALES_SON_LOS_PRODUCTOS_O_SERVICIOS: 1543,
    CIUDAD_MUNICIPIO__PROVINCIA_DE_UBICACION_DE_LA_EMPRESA: 1544,
    OPERACION_DE_LA_EMPRESA: 1545,
    ETAPA_EN_QUE_SE_ENCUETRA_LA_EMPRESA: 1546,
    EN_LA_ACTUALIDAD_EN_QU_ACTIVIDAD_OCUPA_LA_MAYOR_PARTE_DE_SU_TIEMPO: 1547,
    DESEA_CONSEGUIR_UN_TRABAJO_O_REALIZAR_UNA_ACTIVIDAD_REMUNERADA: 1548,
    DURANTE_EL_ULTIMO_MES_HIZO_ALGUNA_DILIGENCIA_PARA_CONSEGUIR_UN_TRABAJO_O_REALIZAR_UNA_ACTIVIDAD: 1549,
    AUNQUE_DESEA_TRABAJAR_POR_QU_MOTIVO_NO_HIZO_DILIGENCIAS_PARA_BUSCAR_UN_TRABAJO_EN_EL_ULTIMO_MES: 1550,
    SI_LE_RESULTARA_ALGUN_TRABAJO_REMUNERADO_EST_DISPONIBLE_PARA_EMPEZAR_A_TRABAJAR: 1551,
    HACE_CUNTOS_MESES_HA_ESTADO_BUSCANDO_EMPLEO: 1552,
    SI_DESEA_COMENTARNOS_MS_A_DETALLE_ACERCA_DE_SUS_APORTES_CONTRIBUCIONES_O_LOGROS_PUEDE_HACERLO: 1553,
    MOTIVACION_EMPRENDER: 1554,
    DESARROLLADO_PROTOTIPO_MERCADO: 1555,
    TIENE_INTERES_DESARROLLAR_PROTOTIPO: 1556,
    PRODUCTOS_SERVICIOS_PROYECTA_SON: 1557,
    QUE__TANTO_INTERES_CREAR_EMPRESA: 1558,
    CUANTO_TIEMPO_DEDICAR_PROYECTO_NEGOCIO: 1559,
    TIPO_EMPRENDIMIENTO: 1560,
    TECNOLOGIAS_PROYECTO: 1561,
    TECNOLOGIAS_PROYECTO_OTRO: 1562,
    HERRAMIENTAS_RECURSOS_EMPRENDIMIENTO: 1563,
    HERRAMIENTAS_RECURSOS_EMPRENDIMIENTO_OTRO: 1564,
    CUALES_TEMATICAS_ORIENTACION: 1565,
    HA_VENDIDO_PRODUCTO_SERVICIO: 1566,
    QUIEN_VENDIDO_PRODUCTO_SERVICIO: 1567,
    CANALES_EMPLEO_VENDER_PRODUCTO: 1568,
    CANALES_EMPLEO_VENDER_PRODUCTO_OTRO: 1569,
    COMO_OBTUVO_CAPITAL_VENDER: 1570,
    COMO_OBTUVO_CAPITAL_VENDER_OTRO: 1571,
    CONOCE_TRAMITES_PARA_EMPRENDIMIENTO: 1572,
    CONOCE_ASPECTOS_TRIBUTARIOS_PROYECTO: 1573,
    PROCESO_CONTRATACION_CLIENTES_PROVEEDORES: 1574,
    PROCESO_CONTRATACION_EMPLEADOS: 1575,
    RECURSOS_INICIAR_EMPRESA: 1576,
    RECURSOS_INICIAR_EMPRESA_OTRO: 1577,
    ESTRUCTURA_COSTOS_INGRESOS: 1578,
    ASPECTOS_DEFINIDOS_EMPRENDIMIENTO: 1579,
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
