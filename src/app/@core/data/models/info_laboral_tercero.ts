export class InfoLaboral {
  Id: string;
  Activo: boolean;
  SituacionLaboral: string;
  EstadoLaboral: string;
  CanalEmpleo: string;
  RazonVinculacion: string;
  ProblematicaAporte: string;
  EtapaEmpresa: string;
  ActividadActual: string;
  NoDiligencia: string;
  DeseaTrabajo: boolean;
  DiligenciaTrabajo: boolean;
  DisponibleTrabajo: boolean;

  constructor(
    Id = '',
    Activo = true,
    SituacionLaboral = '',
    EstadoLaboral = '',
    CanalEmpleo = '',
    RazonVinculacion = '',
    ProblematicaAporte = '',
    EtapaEmpresa = '',
    ActividadActual = '',
    NoDiligencia = '',
    DeseaTrabajo = false,
    DiligenciaTrabajo = false,
    DisponibleTrabajo = false,
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
    this.DeseaTrabajo = DeseaTrabajo
    this.DiligenciaTrabajo = DiligenciaTrabajo
    this.DisponibleTrabajo = DisponibleTrabajo
  }
}