import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Documento } from 'src/app/@core/data/models/document';
import { InfoPersonalService } from 'src/app/@core/services/infopersonal.service';
import { environment } from 'src/environments/environment';
import { FuncsService } from '../funcs.service';

@Injectable({
  providedIn: 'root'
})

export class SendEmailService {


  constructor(private readonly httpClient: HttpClient, private funcsService: FuncsService, private readonly infoPersonalService: InfoPersonalService) { }

  createTopic(body): any { // Paso 1
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/notificaciones/topic`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  suscribeReceptors(body): any {
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/notificaciones/suscribir`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  receptorsExists(body): any {
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/notificaciones/suscripcion`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  createQueue(body): any {
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/colas/crear`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  sendEmail(body): any {
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/notificaciones/enviar`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  genStrHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  /**
**
** recibe
** Emails
** Asunto
** Mensaje
**/
  // Acá es automatico el paso 3 , 4
  async sendEmailFull({ Emails, Asunto, Mensaje }): Promise<any> {


    try {
      let receptorsIds = []

      console.log("🍁", Emails)

      const suscriptorsArr = []
      for (let i = 0; i < Emails.length; i++) {
        const mainEmail = Emails[i];
        const body = { "user": mainEmail };

        const { documento } = await this
          .infoPersonalService
          .getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body)
          .toPromise() as Documento;

        receptorsIds.push(documento)

        const validateReceptorBody = {
          "Endpoint": mainEmail,
          "ArnTopic": environment.ARN_QUEUE_SIGE_EMAILS.TOPIC,

        }

        const { Data } = await this
          .receptorsExists(validateReceptorBody)
          .toPromise()

        if (!Data) {
          suscriptorsArr.push({
            "Endpoint": mainEmail,
            "Id": documento,
            "Protocolo": "email"
          })
        }
      }

      const suscribedEmailsBody = {
        "ArnTopic": environment.ARN_QUEUE_SIGE_EMAILS.TOPIC,
        "Suscritos": suscriptorsArr
      }

      // Suscribe los emails al topic que no estén suscritos
      if (suscriptorsArr.length > 0)
        await this
          .suscribeReceptors(suscribedEmailsBody)
          .toPromise()

      const emailBody = {
        "ArnTopic": environment.ARN_QUEUE_SIGE_EMAILS.TOPIC,
        "Asunto": Asunto,
        "DestinatarioId": receptorsIds,
        "Mensaje": Mensaje,
        "RemitenteId": "sigeud"
      }

      // Envia el correo
      await this.sendEmail(emailBody)
        .toPromise()

      console.info('Email enviado correctamente')
    } catch (error) {
      console.log('🐯💡')
      console.log('error', error)
      console.log('error.statusText', error.statusText)
    }
  }
}
