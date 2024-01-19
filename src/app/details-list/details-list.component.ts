import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataService } from '../services/data.service';
import * as Interfaces from './details-list.interfaces';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-details-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MapComponent
  ],
  templateUrl: './details-list.component.html',
  styleUrl: './details-list.component.css',
})
export class DetailsListComponent {
  @Input() details: string = '';
  @Input() road: string = '';

  loading: boolean = false;
  data: any;
  paginatedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = this.pageSizeOptions[0];
  pageIndex: number = 0;
  length: number = 0;

  someFunc(element: any){
    console.log(element);
    
  }

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeDescription(description: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      description.replace(/\n/g, '<br>')
    );
  }

  ngOnChanges(): void {
    this.pageIndex = 0;
    this.tableSwapper();
  }

  tableSwapper() {
    this.loading = true;
    switch (this.details) {
      case 'roadworks':
        this.data = this.loadData<Interfaces.RoadWorks>();
        break;
      case 'webcam':
        this.data = this.loadData<Interfaces.Webcams>();
        break;
      case 'parking_lorry':
        this.data = this.loadData<Interfaces.ParkingLorries>();
        break;
      case 'warning':
        this.data = this.loadData<Interfaces.Warnings>();
        break;
      case 'closure':
        this.data = this.loadData<Interfaces.Closures>();
        break;
      case 'electric_charging_station':
        this.data = this.loadData<Interfaces.ElectricChargingStations>();
        break;
    }
  }

  loadData<T>(): void {
    this.dataService.getObjectData<T>(this.road, this.details).subscribe(
      (data: any) => {
        this.data = data[this.details];
        this.loading = false;

        this.updatePaginatedData();
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  updatePaginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedData = this.data.slice(startIndex, endIndex);
    this.length = this.data.length;
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.updatePaginatedData();
  }
}
