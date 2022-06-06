import { Component, OnInit } from '@angular/core';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { DataInfoTercero } from '../../@core/data/models/data_info_tercero';
import { environment } from '../../../environments/environment';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { Documento } from '../../@core/data/models/document';
import { LoaderService } from '../../@core/services/notify/loader.service';

@Component({
  selector: 'app-info-academica',
  templateUrl: './info-academica.page.html',
  styleUrls: ['./info-academica.page.scss'],
})
export class InfoAcademicaPage implements OnInit {

  private autenticacion = new ImplicitAutenticationService;
  idPersonalInfo: any
  posgradosUD: any
  dataInfo: DataInfoTercero = new DataInfoTercero();

  constructor(
    private readonly infoPersonalService: InfoPersonalService,
    private loaderService: LoaderService,
  ) { }

  //   COLEGIO
  // _CIUDAD_COLEGIO
  // _FECHA_GRADUACION
  async ngOnInit() {
    let loader = await this.loaderService.presentLoading('Cargando información academica')

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    if (!documento) {
      console.log("Something went wrong, when try to get the identification");
      return
    }

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()
    const Id = data[0].TerceroId.Id as number; // id del tercero
    this.idPersonalInfo = Id

    this.dataInfo.NombreCompleto = data[0].TerceroId.NombreCompleto as string;

    // setear nombre colegio
    const nombreColegioAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.NOMBRE_COLEGIO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.NombreColegio = JSON.parse(nombreColegioAPIResults[0].Dato).Data

    // setear nombre colegio
    const ciudadColegioAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.CIUDAD_COLEGIO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.CiudadColegio = JSON.parse(ciudadColegioAPIResults[0].Dato).Data

    // setear nombre colegio
    const fechaGraduacionColegioAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.FECHA_GRADUACION},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.FechaGraduacionColegio = JSON.parse(fechaGraduacionColegioAPIResults[0].Dato).Data;

    // Seteo de posgrados UD
    const posgrados = await this.infoPersonalService.getInfoComplementariaTercero(environment.OIKOS_SERVICE, `dependencia?query=DependenciaTipoDependencia.TipoDependenciaId.Id:${environment.OIKOS_POSGRADOS_ID}&limit=-1`).toPromise();

    this.posgradosUD = posgrados
    // TipoDependenciaId

    loader.dismiss()

  }

}
