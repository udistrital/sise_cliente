import { Injectable } from '@angular/core';
import { Tercero } from '../data/models/tercero';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  selectedBasicUserData: Tercero
  constructor() {
    this.selectedBasicUserData = new Tercero(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }
}
