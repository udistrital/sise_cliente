export class Event {
  Id: string;
  Activo: boolean;
  Title: string;
  Invitados: any;
  Fecha: string;
  Lugar: string;

  constructor(
    Id = '',
    Activo = true,
    Title = '',
    Invitados = [],
    Fecha = '',
    Lugar = '',
  ) {

    this.Id = Id
    this.Activo = Activo
    this.Title = Title
    this.Invitados = Invitados
    this.Fecha = Fecha
    this.Lugar = Lugar
  }
}