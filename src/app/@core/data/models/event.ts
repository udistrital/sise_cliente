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
  TipoLugarStr: any;
  Poster: any;
  TipoLugarDireccion: string
  TipoLugarMeet: string

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
    TipoLugarStr = '',
    Poster = '',
    TipoLugarDireccion = '',
    TipoLugarMeet = '',
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
    this.TipoLugarStr = TipoLugarStr
    this.Poster = Poster
    this.TipoLugarDireccion = TipoLugarDireccion
    this.TipoLugarMeet = TipoLugarMeet
  }
}
