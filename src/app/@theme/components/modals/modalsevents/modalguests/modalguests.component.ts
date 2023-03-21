import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalguests',
  templateUrl: './modalguests.component.html',
  styleUrls: ['./modalguests.component.scss'],
})
export class ModalguestsComponent implements OnInit {
  @Input("guests") guests;

  constructor() { }

  ngOnInit() {}

}
