import { Injectable } from '@angular/core';

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
}
