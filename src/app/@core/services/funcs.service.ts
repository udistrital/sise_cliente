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

  imageUpload = async (images, options) => {

    const { preset_name, cloud_name } = options
    // console.log(images);
    let imgArr = []

    for (const item of images) {
      const formData = new FormData()

      // Configuraciones para guardar las imgs en CLOUDINARY
      formData.append('file', item)
      formData.append('upload_preset', preset_name)
      formData.append('cloud_name', cloud_name)

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      // console.log(data);

      imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }

    // Guardar en cloudinary y a la vez consulta la API DE nuestra imágenes
    return imgArr
  }

  isoStrToYYYYMMDDHHSS(isostrdate){
    let [yyyy, mm, dd, hh, mi] = isostrdate.split(/[/:\-T]/);
    // return `${yyyy}-${mm}-${dd} ${isostrdate.getHours()}:${isostrdate.getMinutes}`
    return `${yyyy}-${mm}-${dd} ${isostrdate.getHours()}:${isostrdate.getMinutes()}`
  }

  isoStrToYYYYMMDDHHSSNormal(isostrdate){
    let [yyyy, mm, dd, hh, mi] = isostrdate.split(/[/:\-T]/);
    // return `${yyyy}-${mm}-${dd} ${isostrdate.getHours()}:${isostrdate.getMinutes}`
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
  }

  strToDateTimeWithoutSeconds(str){
    const [dateValues, timeValues] = str.split(' ');
    // console.log(dateValues); // 👉️ "2022-05-21"
    // console.log(timeValues); // 👉️ "07:30:14"
    
    const [year, month, day] = dateValues.split('-');
    const [hours, minutes] = timeValues.split(':');
    
    const date = new Date(+year, +month - 1, +day, +hours, +minutes);

    return date;
  }
}
