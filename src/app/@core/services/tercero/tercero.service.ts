import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FuncsService } from '../funcs.service';

@Injectable({
  providedIn: 'root'
})
export class TerceroService {

  constructor(private readonly httpClient: HttpClient, private funcsService: FuncsService) { }

  getTercerosAsync(): any {
    return this.httpClient.get<any>(environment.TERCEROS_SERVICE + `/tercero?fields=UsuarioWSO2,Id&limit=-1`, this.funcsService.openIDDefaultOptions());
  }
}
