import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../../../core/services/our-services.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  services: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(
    private ourServices: OurServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getServices(this.pageSize, this.pageIndex);
  }

  displayedColumns: any[] = [
    {
      key: 'titleAz',
      name: 'Başlıq',
    },
  ];

  logData($event: any) {
    console.log('event', $event);
  }

  getServices(pageSize: number, pageIndex: number) {
    this.ourServices
      .getServices({
        pageSize: pageSize,
        pageIndex: pageIndex,
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
          this.services = response.body.items;
          console.log('Services', this.services);
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
    this.ourServices.deleteService($event.id).subscribe(() => {
      this.getServices(this.pageSize, this.pageIndex);
      location.reload();
    });
  }

  editService(id: any) {
    this.router.navigate(['/new-service', id]);
  }
}
