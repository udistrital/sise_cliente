export class Event {
  Id: string;
  Activo: boolean;
  Nombre: string;
  Descripcion: string;
  Invitados: any;
  InvitadosEspecificos: any;
  FechaInicio: string;
  FechaFin: string;
  TipoSesion: any;
  Lugar: string;
  TipoLugar: any;
  Poster: any;

  constructor(
    Id = '',
    Activo = true,
    Nombre = '',
    Descripcion = '',
    Invitados = [],
    InvitadosEspecificos = [],
    FechaInicio = '',
    TipoSesion = 0,
    FechaFin = '',
    Lugar = '',
    TipoLugar = '',
    Poster = '',
  ) {

    this.Id = Id
    this.Activo = Activo
    this.Nombre = Nombre
    this.Descripcion = Descripcion
    this.Invitados = Invitados
    this.InvitadosEspecificos = InvitadosEspecificos
    this.FechaInicio = FechaInicio
    this.TipoSesion = TipoSesion
    this.FechaFin = FechaFin
    this.Lugar = Lugar
    this.TipoLugar = TipoLugar
    this.Poster = Poster
  }
}