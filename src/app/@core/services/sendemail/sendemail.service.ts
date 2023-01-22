import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment';
import { FuncsService } from '../funcs.service';

@Injectable({
  providedIn: 'root'
})

export class SendEmailService {

  constructor(private readonly httpClient: HttpClient, private funcsService: FuncsService) { }

  createTopicStep1(body): any { // Paso 1
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/notificaciones/topic`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  suscribeEmailsAndNotificationsStep2And4(body): any {
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/notificaciones/suscribir`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  createQueueStep3(body): any {
    return this.httpClient.post<any>(
      environment.NOTIFICATIONS_SERVICE + `/colas/crear`,
      body,
      this.funcsService.openIDDefaultOptions()
    );
  }

  sendEmailStep5(body): any {
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
  async sendEmailFullSteps({ Emails, Asunto, Mensaje }): Promise<any> {

    let destinatarioId = []

    // Crea el topic | Paso 1
    const topicBody = {
      "Display": Asunto,
      "Fifo": false,
      "Nombre": Asunto.toLowerCase().replace(/ /g, ''),
    }

    const topic = await this.createTopicStep1(topicBody).toPromise()

    const suscribedEmailsBody = {
      "ArnTopic": topic.Data,
      "Suscritos": Emails.map(email => {

        const newDestinatarioId = this.genStrHex(12)
        destinatarioId.push(newDestinatarioId)

        return {
          "Endpoint": email.trim(),
          "Id": newDestinatarioId,
          "Protocolo": "email"
        }
      })
    }

    const emailBody = {
      "ArnTopic": environment.ARNS_EMAILS_EVENTS.TOPIC,
      "Asunto": Asunto,
      "DestinatarioId": destinatarioId,
      "Mensaje": Mensaje,
      "RemitenteId": "SIGE - Gestión del egresado y de eventos"
    }

    const suscribedNotifyBody = {
      "ArnTopic": environment.ARNS_EMAILS_EVENTS.TOPIC,
      "Suscritos": {
        "Endpoint": environment.ARNS_EMAILS_EVENTS.QUEUE,
        "Id": this.genStrHex(12),
        "Protocolo": "sqs"
      }
    }
    try {


      // Suscribe los emails | Paso 2
      await this.suscribeEmailsAndNotificationsStep2And4(suscribedEmailsBody).toPromise()

      // Suscribe la cola a la notificación | Paso 4
      await this.suscribeEmailsAndNotificationsStep2And4(suscribedNotifyBody)
        .toPromise()

      // Envia el correo
      await this.sendEmailStep5(emailBody).toPromise()

      console.info('Email enviado correctamente')
    } catch (error) {
      console.log('🐯💡')
      console.log('error', error)
      console.log('error.statusText', error.statusText)
      if (error.statusText ===
        "Unknown Error") {
        // Suscribe la cola a la notificación | Paso 4
        // await this.suscribeEmailsAndNotificationsStep2And4(suscribedNotifyBody)
        //   .toPromise()
        // Envia el correo
        await this.sendEmailStep5(emailBody).toPromise()
      }
    }
  }
}
