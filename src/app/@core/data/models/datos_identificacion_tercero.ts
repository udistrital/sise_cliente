export class DatosIdentificacionTercero{
  Id?: number;
  TipoDocumentoId?: {
      Id?: number;
      Nombre?: string;
      Descripcion?: string;
      CodigoAbreviacion?: string;
      Activo?: boolean;
      NumeroOrden?: number;
      FechaCreacion?: string;
      FechaModificacion?: string
  };
  TerceroId?: {
      Id?: number;
      NombreCompleto?: string;
      PrimerNombre?: string;
      SegundoNombre?: string;
      PrimerApellido?: string;
      SegundoApellido?: string;
      LugarOrigen?: number;
      FechaNacimiento?: string;
      Activo?: boolean;
      TipoContribuyenteId?: {
          Id?: number;
          Nombre?: string;
          Descripcion?: string;
          CodigoAbreviacion?: string;
          Activo?: boolean;
          FechaCreacion?: string;
          FechaModificacion?: string
      };
      FechaCreacion?: string;
      FechaModificacion?: string;
      UsuarioWSO2?: string
  };
  Numero?: string;
  DigitoVerificacion?: number;
  CiudadExpedicion?: number;
  FechaExpedicion?: string;
  Activo?: boolean;
  DocumentoSoporte?: number;
  FechaCreacion?: string;
  FechaModificacion?: string
}