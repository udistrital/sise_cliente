import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalposter',
  templateUrl: './modalposter.component.html',
  styleUrls: ['./modalposter.component.scss'],
})
export class ModalposterComponent implements OnInit {
  @Input("pictureURL") pictureURL;

  constructor() { }

  ngOnInit() {}

}
