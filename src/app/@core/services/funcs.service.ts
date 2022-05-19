import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FuncsService {

  constructor() { }

  renameProp(obj, keyToRemove, newKey) {
    // Verificas si la propiedad existe y si el nuevo nombre es distinto
    if (obj.hasOwnProperty(keyToRemove) && keyToRemove !== newKey) {
      // Defines la nueva propiedad, tomando como base la anterior (incluso si es un objeto)
      Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, keyToRemove));
      // Eliminas la propiedad anterior
      delete obj[keyToRemove];
    }

    return obj
  }

  openIDDefaultOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
      }),
    };
  }
}
