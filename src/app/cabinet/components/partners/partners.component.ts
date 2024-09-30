import { Component } from '@angular/core';
import { PartnersService } from '../../../core/services/partners.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class PartnersComponent {
  partners: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(
    private partnersService: PartnersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPartners(this.pageSize, this.pageIndex);
  }

  displayedColumns: any[] = [
    {
      key: 'attachmentUrl',
      name: 'İkon',
      hasImage: true,
    },
  ];

  logData($event: any) {
    console.log('event', $event);
  }

  getPartners(pageSize: number, pageIndex: number) {
    this.partnersService
      .getPartners({
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
          this.partners = response.body.items;
          console.log('Partners', this.partners);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getPartners($event.pageSize, $event.pageIndex);
  }

  deletePartner($event: any) {
    this.partnersService.deletePartner($event.id).subscribe(() => {
      this.getPartners(this.pageSize, this.pageIndex);
    });
  }

  editPartner(id: any) {
    this.router.navigate(['/new-partner', id]);
  }
}
