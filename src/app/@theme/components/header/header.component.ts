import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from 'src/app/@core/utils/implicit_autentication.service';
import { MenuController } from '@ionic/angular'; //import MenuController to access toggle() method.

// import { IonicModule } from 'ionic-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  private autenticacion = new ImplicitAutenticationService;
  constructor(public menuCtrl: MenuController) { 
  }

  logout() {
    // console.log(this.autenticacion)
    this.autenticacion.logout();
  }
  ngOnInit() { }

}
