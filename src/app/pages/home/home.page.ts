import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { PhotoService } from '../../@core/services/photo.service';

// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment.dev';
// import { Documento } from '../../@core/data/models/document';
import { ModalController } from '@ionic/angular';
import { ModalbasicinfoComponent } from '../../@theme/components/modalbasicinfo/modalbasicinfo.component';
import { HomeService } from '../../@core/services/home.service';

// declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeService, InfoPersonalService, PhotoService]
})

export class HomePage implements OnInit {
  // @ViewChild('modalBasicInfoUserOpen') modalBasicInfoUserOpen: ElementRef;

  private autenticacion = new ImplicitAutenticationService;
  sessionUser: any
  // formModal: any
  // isModalOpen: any
  // modalBasicInfoUserOpen:any

  constructor(
    public homeService: HomeService,
    public modalCtrl: ModalController,
    // private renderer: Renderer2,
    public photoService: PhotoService,
    // private camera: Camera,
    private readonly infoPersonalService: InfoPersonalService
  ) {
    // this.isModalOpen = true

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalbasicinfoComponent,
      keyboardClose: false,
      backdropDismiss: false,
      id: 'modalCreateTercero'
    });

    return await modal.present();
  }

  public dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async ngOnInit() {

    try {
      
      console.log('HERE')
      // this.formModal = new window.bootstrap.Modal(
      //   document.getElementById('modalBasicUserData')
      // )
  
      const { email } = this.autenticacion.getPayload()
  
      // console.log(email)
      // if (email)
      //   this.sessionUser.email = email
  
      const body = {
        // "user": email
        "user": 'egresados@udistrital.edu.co'
      };
  
      this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body)
        .subscribe(res => (result: any) => {
  
          console.log(result);
        },
          error => {
            if (error.error.System.Error == 'usuario no registrado') {
              this.openModal();
            }
          }
  
        )
  
      // if (!documento) {
      //   console.log("Something went wrong, when try to get the identification");
      //   return
      // }
  
      // this.sessionUser.NombreCompleto = 
    } catch (error) {
      console.log(error)
    }

  }

  logout() {
    this.autenticacion.logout();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
