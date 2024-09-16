import { Component } from '@angular/core';
import { ContactsService } from '../../../core/services/contacts.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  ELEMENT_DATA: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private contactsService: ContactsService) {}

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
    this.contactsService
      .getContacts({
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
}
