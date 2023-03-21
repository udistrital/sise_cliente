import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FuncsService } from '../funcs.service';

@Injectable({
  providedIn: 'root'
})

export class OikosService {

  constructor(private readonly httpClient: HttpClient, private funcsService: FuncsService) { }

  getDependenciaById(dependenciaId: string | number, fields = "") {
    return this.httpClient.get<any>(environment.OIKOS_SERVICE + `/dependencia?query=Id:${dependenciaId}${fields}`, this.funcsService.openIDDefaultOptions());
  }
}
