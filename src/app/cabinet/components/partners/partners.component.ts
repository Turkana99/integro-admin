import { Component } from '@angular/core';
import { PartnersService } from '../../../core/services/partners.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent {
  ELEMENT_DATA: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private partnersService: PartnersService) {}

  ngOnInit(): void {
    this.getPartners(this.pageSize, this.pageIndex);
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

  getPartners(pageSize: number, pageIndex: number) {
    this.partnersService
      .getPartners({
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
    this.getPartners($event.pageSize, $event.pageIndex);
  }
}
