import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../../../core/services/our-services.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  ELEMENT_DATA: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private ourServices: OurServicesService) {}

  ngOnInit(): void {
    this.getServices(this.pageSize, this.pageIndex);
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

  getServices(pageSize: number, pageIndex: number) {
    this.ourServices
      .getServices({
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
    this.getServices($event.pageSize, $event.pageIndex);
  }

  deleteService($event: any) {
    this.ourServices.deleteService($event.id).subscribe();
  }

  editService($event: any) {}
}
