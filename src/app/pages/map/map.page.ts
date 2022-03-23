import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {


  mapStyles = [
    {
      featureType: 'poi.business',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi.attraction',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#A01F50' }
      ]
    },
    {
      featureType: 'poi.attraction',
      elementType: 'labels.icon',
      stylers: [
        { color: '#A01F50' }
      ]
    }
  ];

  centerLatitude = +4.628056;
  centerLongitude = +-74.065278;
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  zoom = 18;

  constructor() { }

  ngOnInit() {
  }

}
