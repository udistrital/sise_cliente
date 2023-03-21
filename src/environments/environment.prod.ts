export const environment = {
  production: false,
  entorno: 'test',
  NUXEO: {
    PATH: 'https://documental.udistrital.edu.co/nuxeo/',
  },
  WSO2_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/',
  PLAN_CUENTAS_CRUD_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_crud/v1/',
  PLAN_CUENTAS_MID_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_mid/v1/',
  PLAN_CUENTAS_MONGO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/plan_cuentas_mongo_crud/v1/',
  CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
  NOTIFICACION_SERVICE: 'wss://autenticacion.portaloas.udistrital.edu.co/apioas/notificacion_ws/v1/',
  CORE_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8092/v1/',
  CORE_AMAZON_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/core_amazon_crud/v1/',
  CONF_MENU_SERVICE:
    'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
  OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v2/',
  TOKEN: {
    AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
    CLIENTE_ID: 'LUMPNmm7b6nmtW_eujuXv8uuKrga',
    RESPONSE_TYPE: 'id_token token',
    SCOPE: 'openid email',
    BUTTON_CLASS: 'btn btn-warning btn-sm',
    REDIRECT_URL: 'https://sisecliente.portaloas.udistrital.edu.co',
    SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
    SIGN_OUT_REDIRECT_URL: 'https://sisecliente.portaloas.udistrital.edu.co',
    SIGN_OUT_APPEND_TOKEN: 'true',
    AUTENTICACION_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  },
  API_GET_IDENTIFICATION: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/autenticacion_mid/v1/token/userRol',
  DATOS_IDENTIFICACION_TERCERO_ENDPOINT: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/datos_identificacion',
  ID_GRUPO_GENERO: 6,
  MAPSKEY: 'AIzaSyB_TBcoCJNaFCJBiwMreM2PoHOkj19Gr00',
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
  ID_INFO_COMPLEMENTARIA_DPTO: 323,
  IDS_INFO_COMPLEMENTARIA_MUNICIPIOS: [147, 148, 149],
  ID_GRUPO_INFO_COMPLEMENTARIA_MUNICIPIOS: 30,
  API_ENDPOINT_UBICACIONES: "https://autenticacion.portaloas.udistrital.edu.co/apioas/ubicaciones_crud/v2/",
  EVENTOS_ENDPOINT: "https://autenticacion.portaloas.udistrital.edu.co/apioas/sesiones_crud/v2",
  ID_GRUPO_INFO_COMPLEMENTARIA_LOCALIDADES: 29,
  ID_GRUPO_INFO_COMPLEMENTARIA_ACADEMICA: 17,
  TERCEROS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1',
  INFO_COMPLEMENTARIA_IDS: {
    GENERO: [29, 30, 31],
    NOMBRE_DE_SU_EMPRESA: 336,
    NIT_DE_LA_EMPRESA: 337,
    SECTOR_ECONOMICO_DE_LA_EMPRESA: 338,
    SITIO_WEB_DE_LA_EMPRESA: 339,
    FECHA_DE_FUNDACION_DE_LA_EMPRESA: 340,
    ACTIVIDADES_QUE_REALIZA_LA_EMPRESA: 341,
    NECESIDADES_PROFESIONALES_SATISFACCION: 342,
    NECESIDADES_ECONOMICAS_SATISFACCION: 343,
    NECESIDADES_DESARROLLO_PERSONAL_SATISFACCION: 344,
    NECESIDADES_CON_SU_EMPRESA_SATISFACCION: 345,
    CANTIDAD_DE_EMPLEADOS: 346,
    CANTIDAD_DE_PROFESIONALES_O_TECNOLOGOS_EMPLEADOS: 347,
    CANTIDAD_DE_EGRESADOS_DE_LA_UD_PROFESIONALES_O_TECNOLOGOS_EMPLEADOS: 348,
    CANTIDAD_DE_EMPLEOS_OPERATIVOS_ASISTENCIALES_O_DE_APOYO_GENERADOS: 349,
    FOTO_DE_PERFIL_SISE: 350,
    NACIONALIDAD: 351,
    RED_SOCIAL_1: 352,
    RED_SOCIAL_2: 353,
    INTERESES: 354,
    NOMBRE_COLEGIO: 355,
    CIUDAD_COLEGIO: 356,
    FECHA_GRADUACION: 357,
    PROGRAMAS_DE_POSGRADO_TITULADOS_EN_LA_UD: 358,
    PRINCIPAL_DIFICULTAD_A_LA_HORA_DE_CONSEGUIR_TRABAJO: 359,
    CANAL_DE_BUSQUEDA_DE_EMPLEO: 360,
    PROBLEMTICAS_EN_DONDE_CONSIDERA_QUE_HA_APORTADO: 361,
    OTRA_PROBLEMTICA_EN_DONDE_CONSIDERA_QUE_HA_APORTADO: 362,
    SITUACION_LABORAL: 363,
    CUNTO_TIEMPO_EN_MESES_LLEVA_EN_ESTA_ACTIVIDAD_O_TRABAJO: 364,
    INGRESO_O_SALARIO_SATISFACCION_LABORAL: 365,
    CANTIDAD_DE_HORAS_SATISFACCION_LABORAL: 366,
    APLICACION_DE_CONOCIMIENTOS_DE_LA_CARRERA__SATISFACCION_LABORAL: 367,
    RETOS_Y_DESAFOS_INTELECTUALES_SATISFACCION_LABORAL: 368,
    OPORTUNIDADES_DE_ASCENSO_SATISFACCION_LABORAL: 369,
    ESTABILIDAD_SATISFACCION_LABORAL: 370,
    INGRESO_O_SALARIO: 371,
    RAZON_DE_VINCULACION: 372,
    OTRA_RAZON_DE_VINCULACION: 373,
    ESTATUS_LABORAL: 374,
    ACTIVIDADES_QUE_REALIZA: 375,
    TIPO_DE_CONTRATO: 376,
    SECTOR: 377,
    GRUPO_DE_ACTIVIDAD_ECONOMICA: 378,
    FORMAS_DE_TRABAJO_INDEPENDIENTES: 379,
    NOMBRE_DE_LA_EMPRESA_EN_DONDE_LABORA: 380,
    NOMBRE_DE_LA_EMPRESA: 381,
    CUALES_SON_LOS_PRODUCTOS_O_SERVICIOS: 382,
    CIUDAD_MUNICIPIO__PROVINCIA_DE_UBICACION_DE_LA_EMPRESA: 383,
    OPERACION_DE_LA_EMPRESA: 384,
    ETAPA_EN_QUE_SE_ENCUETRA_LA_EMPRESA: 385,
    EN_LA_ACTUALIDAD_EN_QU_ACTIVIDAD_OCUPA_LA_MAYOR_PARTE_DE_SU_TIEMPO: 386,
    DESEA_CONSEGUIR_UN_TRABAJO_O_REALIZAR_UNA_ACTIVIDAD_REMUNERADA: 387,
    DURANTE_EL_ULTIMO_MES_HIZO_ALGUNA_DILIGENCIA_PARA_CONSEGUIR_UN_TRABAJO_O_REALIZAR_UNA_ACTIVIDAD: 388,
    AUNQUE_DESEA_TRABAJAR_POR_QU_MOTIVO_NO_HIZO_DILIGENCIAS_PARA_BUSCAR_UN_TRABAJO_EN_EL_ULTIMO_MES: 389,
    SI_LE_RESULTARA_ALGUN_TRABAJO_REMUNERADO_EST_DISPONIBLE_PARA_EMPEZAR_A_TRABAJAR: 390,
    HACE_CUNTOS_MESES_HA_ESTADO_BUSCANDO_EMPLEO: 391,
    SI_DESEA_COMENTARNOS_MS_A_DETALLE_ACERCA_DE_SUS_APORTES_CONTRIBUCIONES_O_LOGROS_PUEDE_HACERLO: 392,
    MOTIVACION_EMPRENDER: 393,
    DESARROLLADO_PROTOTIPO_MERCADO: 394,
    TIENE_INTERES_DESARROLLAR_PROTOTIPO: 395,
    PRODUCTOS_SERVICIOS_PROYECTA_SON: 396,
    QUE__TANTO_INTERES_CREAR_EMPRESA: 397,
    CUANTO_TIEMPO_DEDICAR_PROYECTO_NEGOCIO: 398,
    TIPO_EMPRENDIMIENTO: 399,
    TECNOLOGIAS_PROYECTO: 400,
    TECNOLOGIAS_PROYECTO_OTRO: 401,
    HERRAMIENTAS_RECURSOS_EMPRENDIMIENTO: 402,
    HERRAMIENTAS_RECURSOS_EMPRENDIMIENTO_OTRO: 403,
    CUALES_TEMATICAS_ORIENTACION: 404,
    HA_VENDIDO_PRODUCTO_SERVICIO: 405,
    QUIEN_VENDIDO_PRODUCTO_SERVICIO: 406,
    CANALES_EMPLEO_VENDER_PRODUCTO: 407,
    CANALES_EMPLEO_VENDER_PRODUCTO_OTRO: 408,
    COMO_OBTUVO_CAPITAL_VENDER: 409,
    COMO_OBTUVO_CAPITAL_VENDER_OTRO: 410,
    CONOCE_TRAMITES_PARA_EMPRENDIMIENTO: 411,
    CONOCE_ASPECTOS_TRIBUTARIOS_PROYECTO: 412,
    PROCESO_CONTRATACION_CLIENTES_PROVEEDORES: 413,
    PROCESO_CONTRATACION_EMPLEADOS: 414,
    RECURSOS_INICIAR_EMPRESA: 415,
    RECURSOS_INICIAR_EMPRESA_OTRO: 416,
    ESTRUCTURA_COSTOS_INGRESOS: 417,
    ASPECTOS_DEFINIDOS_EMPRENDIMIENTO: 418,
    EN_LA_ACTUALIDAD_TIENE_PERSONAS_A_CARGO: 419,
    CON_MOTIVO_DE_SU_PRXIMA_GRADUACIN_CUL_ES_SU_NIVEL_DE_EXPECTATIVA_E_INCERTIDUMBRE_FRENTE_A_LA: 420,
    QUE_ASPECTOS_O_COMPETENCIAS_LE_GENERAN_INSEGURIDAD_FRENTE_A_SU_PERFIL_PROFESIONAL: 421,
    DESEA_OBTENER_INFORMACIN_DEL_SEMINARIO_DE_EMPLEABILIDAD: 422,
    SELECCIONE_LA_FACULTAD_DE_LA_QUE_ES_EGRESADO: 423,
    SELECCIONE_SU_CARRERA: 424,
    INDIQU_LA_FECHA_PROGRAMADA_O_ESTIMADA_DE_SU_GRADUACIN: 425,
    DESPUS_DE_SU_GRADUACIN_CUL_DE_LAS_SIGUIENTES_OPCIONES_DE_FORMACIN_HA_PENSADO_REALIZAR: 426,
    TIENE_CONOCIMIENTO_DE_LOS_BENEFICIOS_APLICABLES_EN_PROGRAMAS_DE_POSGRADOS_PARA_EGRESADOS: 427,
    SELECCIONE_LOS_POSGRADOS_DE_SU_INTERS_Y_EN_LOS_CUALES_DESEA_OBTENER_INFORMACIN: 428,

    // Antiguos
    CORREO_PERSONAL: 50,
    DIRECCION_RESIDENCIA: 51,
    CELULAR: 49,
    ESTRATO: 38,
    ESTADO_CIVIL: 10,
    TIPO_POBLACION: 138,
    CONDICIONES_DISCAPACIDAD: 7,
    CODIGO_DEL_PAIS: 32,
    PAIS_RESIDENCIA: 42,
    DEPARTAMENTO_RESIDENCIA: 79,
    MUNICIPIO_RESIDENCIA: 40,
    LOCALIDAD_RESIDENCIA: 87
  },
  GRUPO_INFO_COMPLEMENTARIA_IDS: {
    MUNICIPIOS: 30,
    LOCALIDADES: 21,
    ACADEMICA: 17,
    GENERO: 6,
    INFO_CONTACTO: 10,
    ESTADO_CIVIL: 2,
  },
  OIKOS_POSGRADOS_ID: 15,
  NOTIFICATIONS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/notificacion_mid',
  ARN_QUEUE_SIGE_EMAILS: {
    TOPIC: "arn:aws:sns:us-east-1:699001025740:production-SIGE",
    QUEUE: "arn:aws:sqs:us-east-1:699001025740:production-sigemails"
  },
  ROL_ENCARGADO_EVENTO_IDS:{
    TERCERO_ROL_ID: 3,
    DEPENDENCIA_ROL_ID: 4,
  }
};
