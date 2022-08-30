import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-pages',
  template: `<div style="height:90%;"><router-outlet></router-outlet></div>`,
})

export class PagesComponent implements OnInit {
  loaded = false;
  userData: any;
  environment: any;
  loadingRouter: boolean;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
