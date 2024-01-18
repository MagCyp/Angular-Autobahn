import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { MatListModule } from '@angular/material/list';
import {
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatListModule, MatTabsModule],
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
    this.dataService.getRoads().subscribe(
      (roads) => {
        this.roads = roads;
        this.activeRoad = roads[0];
      },
      (err) => {
        console.log(err);
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
  }
}
