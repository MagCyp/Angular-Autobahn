import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { MatListModule } from '@angular/material/list';
import {
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from '@angular/material/tabs';
import { DetailsTableComponent } from './details-table/details-table.component';
import { DetailsListComponent } from './details-list/details-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatListModule, MatTabsModule, DetailsTableComponent, DetailsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  roads: string[] = [];
  activeRoad: string = '';
  activeTab: string = '';

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService
      .getData<{ roads: string[] }>('https://verkehr.autobahn.de/o/autobahn/')
      .subscribe(
        (responseData: { roads: string[] }) => {
          this.roads = responseData.roads;
          this.activeRoad = responseData.roads[0];
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngAfterViewInit(): void {
    const activeTabIndex = this.tabGroup.selectedIndex!;

    this.activeTab = this.tabGroup._tabs.toArray()[activeTabIndex].ariaLabel;
    this.cdr.detectChanges();
  }

  onTabChange($event: MatTabChangeEvent): void {
    this.activeTab = $event.tab.ariaLabel;
  }

  setElement(road: string): void {
    this.activeRoad = road;
    console.log(this.activeRoad);
  }
}
