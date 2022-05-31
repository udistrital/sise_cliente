import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InfoLaboral } from '../../@core/data/models/info_laboral_tercero';

@Component({
  selector: 'app-info-laboral',
  templateUrl: './info-laboral.page.html',
  styleUrls: ['./info-laboral.page.scss'],
})

export class InfoLaboralPage implements OnInit {

  selectedData: InfoLaboral

  constructor() { 
    this.selectedData = new InfoLaboral();
  }

  ngOnInit() {
  }

  onChange(selectValue, id) {

    if(id == 'SituacionLaboral'){
      if(selectValue == 'conemple'){

      } else if(selectValue == 'sinemple'){

      } else if(selectValue == 'pensiona'){

      }
    }
    console.log(this.selectedData);
    // console.log(selectValue)
  }

  async handleForm(form: NgForm) {
    console.log(form);
    console.log(form.value);
  }

//   $scope.detectSelectValue = function(mySelect) {
//     console.log(mySelect);
// }

}
