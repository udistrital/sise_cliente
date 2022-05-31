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
  DeseaTrabajo: boolean;
  DiligenciaTrabajo: boolean;

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
    DeseaTrabajo = false,
    DiligenciaTrabajo = false,
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
    this.DeseaTrabajo = DeseaTrabajo
    this.DiligenciaTrabajo = DiligenciaTrabajo
  }
}