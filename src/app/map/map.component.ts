import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @Input() markers!: string;

  position: google.maps.LatLng[] = [];
  markersArr!: string[];
  mapCenter: google.maps.LatLng | undefined;

  ngOnInit() {
    this.markersArr = this.markers.split(',');

    this.getMarkerPosition();
    this.calculateMapCenter();
  }

  getMarkerPosition() {
    const marker1 = this.getLatLng(this.markersArr[1], this.markersArr[0]);
    const marker2 = this.getLatLng(this.markersArr[3], this.markersArr[2]);

    this.position.push(marker1, marker2);
  }

  getLatLng(lat: string | number, long: string | number): google.maps.LatLng {
    const coord = new google.maps.LatLng(Number(lat), Number(long));

    return coord;
  }

  calculateMapCenter() {
    const lat1 = Number(this.markersArr[1]);
    const long1 = Number(this.markersArr[0]);
    const lat2 = Number(this.markersArr[3]);
    const long2 = Number(this.markersArr[2]);

    const centerLat = (lat1 + lat2) / 2;
    const centerLong = (long1 + long2) / 2;

    this.mapCenter = this.getLatLng(centerLat, centerLong);
  }
}
