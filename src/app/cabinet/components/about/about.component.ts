import { Component } from '@angular/core';
import { HomePageService } from '../../../core/services/homepage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  ELEMENT_DATA: any;
  showSpinner = false;
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

  logData($event: any) {
    console.log('event', $event);
  }
}