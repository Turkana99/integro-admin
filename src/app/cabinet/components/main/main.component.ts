import { Component } from '@angular/core';
import { HomePageService } from '../../../core/services/homePage.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  ELEMENT_DATA:any;
  showSpinner=false;
  constructor(private homeService:HomePageService){

  }
  displayedColumns: any[] = [
    {
      key: 'title',
      name: 'Başlıq',
    },
    {
      key: 'subTitle',
      name: 'Alt başlıq',
    },
    {
      key: 'text',
      name: 'Məzmun',
    },
  ];

  logData($event: any) {
    console.log('event', $event);
  }
  getHomePageInfo(
    pageSize: number,
    pageIndex: number
  ) {
    this.homeService
      .getHomePageInfo({
        pageSize: pageSize,
        pageIndex: pageIndex + 1
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.showSpinner = false;
          }, 200);
        })
      )
      .subscribe(
        (response) => {
          this.ELEMENT_DATA = response.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

}
