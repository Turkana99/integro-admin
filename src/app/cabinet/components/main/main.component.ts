import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { HomePageService } from '../../../core/services/homepage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  ELEMENT_DATA: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private homeService: HomePageService) {}

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

  ngOnInit(): void {
    this.getHomePageInfo(this.pageSize, this.pageIndex);
  }

  logData($event: any) {
    console.log('event', $event);
  }

  getHomePageInfo(pageSize: number, pageIndex: number) {
    this.homeService
      .getHomePageInfo({
        pageSize: pageSize,
        pageIndex: pageIndex + 1,
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
          console.log('response', response);
          this.ELEMENT_DATA = response.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getHomePageInfo($event.pageSize, $event.pageIndex);
  }
}
