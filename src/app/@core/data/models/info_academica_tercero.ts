export class InfoAcademica {
  Id: string;
  NombreColegio: string;
  CiudadColegio: string;
  FechaGraduacion: string;
  PosgradosTituladosUD: string;

  constructor(
    Id = '',
    NombreColegio = '',
    CiudadColegio = '',
    FechaGraduacion = '',
    PosgradosTituladosUD = '',
  ) {

    this.Id = Id
    this.NombreColegio = NombreColegio
    this.CiudadColegio = CiudadColegio
    this.FechaGraduacion = FechaGraduacion
    this.PosgradosTituladosUD = PosgradosTituladosUD
  }
}