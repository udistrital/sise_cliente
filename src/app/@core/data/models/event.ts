export class Event {
  Id: string;
  Activo: boolean;
  Descripcion: string;
  Invitados: any;
  InvitadosEspecificos: any;
  FechaInicio: string;
  FechaFin: string;
  TipoSesion: string;
  Lugar: string;

  constructor(
    Id = '',
    Activo = true,
    Descripcion = '',
    Invitados = [],
    InvitadosEspecificos = [],
    FechaInicio = '',
    TipoSesion = '',
    FechaFin = '',
    Lugar = '',
  ) {

    this.Id = Id
    this.Activo = Activo
    this.Descripcion = Descripcion
    this.Invitados = Invitados
    this.InvitadosEspecificos = InvitadosEspecificos
    this.FechaInicio = FechaInicio
    this.TipoSesion = TipoSesion
    this.FechaFin = FechaFin
    this.Lugar = Lugar
  }
}