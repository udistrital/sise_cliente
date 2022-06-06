export class InfoPersonal {
  Id: string;
  Activo: boolean;
  TipoIdentificacion: string;
  NumeroDocumento: string;
  Genero: string;
  FechaNacimiento: string;
  LugarNacimiento: string;
  Nacionalidad: string;
  Estrato: string;
  EstadoCivil: string;
  TipoPoblacion: string;
  CondicionesDiscapacidad: string;
  CorreoInstitucional: string;
  CorreoPersonal: string;
  RedSocialUno: string;
  RedSocialDos: string;
  CodigoPais: any;
  Celular: string;
  PaisResidencia: string;
  DepartamentoResidencia: string;
  MunicipioResidencia: string;
  LocalidadResidencia: string;
  DireccionResidencia: string;
  Intereses: string;

  constructor(
    Id = '',
    Activo = true,
    TipoIdentificacion = '',
    NumeroDocumento = '',
    Genero = '',
    FechaNacimiento = '',
    LugarNacimiento = '',
    Nacionalidad = '',
    Estrato = '',
    EstadoCivil = '',
    TipoPoblacion = '',
    CondicionesDiscapacidad = '',
    CorreoInstitucional = '',
    CorreoPersonal = '',
    RedSocialUno = '',
    RedSocialDos = '',
    CodigoPais = 0,
    Celular = '',
    PaisResidencia = '',
    DepartamentoResidencia = '',
    MunicipioResidencia = '',
    LocalidadResidencia = '',
    DireccionResidencia = '',
    Intereses = ''
  ) {

    this.Id = Id
    this.Activo = Activo
    this.TipoIdentificacion = TipoIdentificacion
    this.NumeroDocumento = NumeroDocumento
    this.Genero = Genero
    this.FechaNacimiento = FechaNacimiento
    this.LugarNacimiento = LugarNacimiento
    this.Nacionalidad = Nacionalidad
    this.Estrato = Estrato
    this.EstadoCivil = EstadoCivil
    this.TipoPoblacion = TipoPoblacion
    this.CondicionesDiscapacidad = CondicionesDiscapacidad
    this.CorreoInstitucional = CorreoInstitucional
    this.CorreoPersonal = CorreoPersonal
    this.RedSocialUno = RedSocialUno
    this.RedSocialDos = RedSocialDos
    this.CodigoPais = CodigoPais
    this.Celular = Celular
    this.PaisResidencia = PaisResidencia
    this.DepartamentoResidencia = DepartamentoResidencia
    this.MunicipioResidencia = MunicipioResidencia
    this.LocalidadResidencia = LocalidadResidencia
    this.DireccionResidencia = DireccionResidencia
    this.Intereses = Intereses
  }
}