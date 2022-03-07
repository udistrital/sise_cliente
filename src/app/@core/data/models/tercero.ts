export class Tercero {
  Id: string;
  Activo: boolean;
  FechaCreacion: string;
  FechaModificacion: string;
  FechaNacimiento: string;
  LugarOrigen: string;
  NombreCompleto: string;
  PrimerNombre: string;
  SegundoNombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  TipoContribuyenteId: string;
  UsuarioWSO2: string;
  Numero: string;
  FechaExpedicion: string;
  TipoDocumentoId: string;

  constructor(
    Id = '',
    Activo = true,
    FechaCreacion = '',
    FechaModificacion = '',
    FechaNacimiento = '',
    LugarOrigen = '',
    NombreCompleto = '',
    PrimerNombre = '',
    SegundoNombre = '',
    PrimerApellido = '',
    SegundoApellido = '',
    TipoContribuyenteId = '',
    UsuarioWSO2 = '',
    Numero = '',
    FechaExpedicion = '',
    TipoDocumentoId = ''
  ) {

    this.Id = Id
    this.Activo = Activo
    this.FechaCreacion = FechaCreacion
    this.FechaModificacion = FechaModificacion
    this.FechaNacimiento = FechaNacimiento
    this.LugarOrigen = LugarOrigen
    this.NombreCompleto = NombreCompleto
    this.PrimerNombre = PrimerNombre
    this.SegundoNombre = SegundoNombre
    this.PrimerApellido = PrimerApellido
    this.SegundoApellido = SegundoApellido
    this.TipoContribuyenteId = TipoContribuyenteId
    this.UsuarioWSO2 = UsuarioWSO2
    this.Numero = Numero
    this.FechaExpedicion = FechaExpedicion
    this.TipoDocumentoId = TipoDocumentoId
  }
}