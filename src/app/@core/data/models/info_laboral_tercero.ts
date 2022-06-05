export class InfoLaboral {
  Id: string;
  Activo: boolean;
  SituacionLaboral: string;
  EstadoLaboral: string;
  CanalEmpleo: string;
  RazonVinculacion: string;
  ProblematicaAporte: any;
  EtapaEmpresa: string;
  ActividadActual: string;
  NoDiligencia: string;
  DetalleAportes: string;
  DeseaTrabajo: boolean;
  DiligenciaTrabajo: boolean;
  DisponibleTrabajo: boolean;
  TiempoActividad: string;
  ActividadesRealiza: string;
  satisala: string;
  satihora: string;
  saticono: string;
  satidesa: string;
  satiasce: string;
  satiesta: string;
  rangsala: string;
  detaravi: string;
  tipocont: string;
  sectsoci: string;
  emprlabo: string;
  grupecon: string;
  forminde: string;
  prodserv: string;
  ciudmuni: string;
  operempr: string;
  cuanempl: string;
  difitrab: string;

  constructor(
    Id = '',
    Activo = true,
    SituacionLaboral = '',
    EstadoLaboral = '',
    CanalEmpleo = '',
    RazonVinculacion = '',
    ProblematicaAporte = null,
    EtapaEmpresa = '',
    ActividadActual = '',
    NoDiligencia = '',
    DetalleAportes = '',
    DeseaTrabajo = false,
    DiligenciaTrabajo = false,
    DisponibleTrabajo = false,
    TiempoActividad = '',
    ActividadesRealiza = '',
    satisala = '',
    satihora = '',
    saticono = '',
    satidesa = '',
    satiasce = '',
    satiesta = '',
    rangsala = '',
    detaravi = '',
    tipocont = '',
    sectsoci = '',
    emprlabo = '',
    grupecon = '',
    forminde = '',
    prodserv = '',
    ciudmuni = '',
    operempr = '',
    cuanempl = '',
    difitrab = '',
  ) {

    this.Id = Id
    this.Activo = Activo
    this.SituacionLaboral = SituacionLaboral
    this.EstadoLaboral = EstadoLaboral
    this.CanalEmpleo = CanalEmpleo
    this.RazonVinculacion = RazonVinculacion
    this.ProblematicaAporte = ProblematicaAporte
    this.EtapaEmpresa = EtapaEmpresa
    this.ActividadActual = ActividadActual
    this.NoDiligencia = NoDiligencia
    this.DetalleAportes = DetalleAportes
    this.DeseaTrabajo = DeseaTrabajo
    this.DiligenciaTrabajo = DiligenciaTrabajo
    this.DisponibleTrabajo = DisponibleTrabajo
    this.TiempoActividad = TiempoActividad
    this.ActividadesRealiza = ActividadesRealiza
    this.satisala = satisala
    this.satihora = satihora
    this.saticono = saticono
    this.satidesa = satidesa
    this.satiasce = satiasce
    this.satiesta = satiesta
    this.rangsala = rangsala
    this.detaravi = detaravi
    this.tipocont = tipocont
    this.sectsoci = sectsoci
    this.emprlabo = emprlabo
    this.grupecon = grupecon
    this.forminde = forminde
    this.prodserv = prodserv
    this.ciudmuni = ciudmuni
    this.operempr = operempr
    this.cuanempl = cuanempl
    this.difitrab = difitrab
  }
}