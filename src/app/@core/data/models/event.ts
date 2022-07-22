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
  TipoLugarDireccion: string
  TipoLugarPais: string
  TipoLugarCiudad: string
  TipoLugarLocalidad: string
  TipoLugarDpto: string
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
    Poster = '',
    TipoLugarDireccion = '',
    TipoLugarPais = '',
    TipoLugarCiudad = '',
    TipoLugarLocalidad = '',
    TipoLugarDpto = '',
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
    this.Poster = Poster
    this.TipoLugarDireccion = TipoLugarDireccion
    this.TipoLugarPais = TipoLugarPais
    this.TipoLugarCiudad = TipoLugarCiudad
    this.TipoLugarLocalidad = TipoLugarLocalidad
    this.TipoLugarDpto = TipoLugarDpto
    this.TipoLugarMeet = TipoLugarMeet
  }
}