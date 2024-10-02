import { Component } from '@angular/core';
import { ContactsService } from '../../../core/services/contacts.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contacts: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}
  displayedColumns: any[] = [
    {
      key: 'phoneNumber',
      name: 'Telefon nömrəsi',
    },
    {
      key: 'emailAddress',
      name: 'Elektron-poçt ünvanı',
    },
    {
      key: 'addressAz',
      name: 'Ünvan',
    },
    {
      key: 'facebookUrl',
      name: 'Facebook adresi',
    },
    {
      key: 'twitterUrl',
      name: 'Twitter adresi',
    },
    {
      key: 'instagramUrl',
      name: 'Instagram adresi',
    },
    {
      key: 'googleMapUrl',
      name: 'Googlemap url',
    },
    {
      key: 'state',
      name: 'Status',
    },
  ];

  ngOnInit(): void {
    this.getContactInfo(this.pageSize, this.pageIndex);
  }

  getContactInfo(pageSize: number, pageIndex: number) {
    this.contactsService
      .getContacts({
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
          this.contacts = response.body.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getContactInfo($event.pageSize, $event.pageIndex);
  }

  editContactPageInfo(id: any) {
    this.router.navigate(['/new-contact', id]);
  }

  deleteContact($event: any) {
    this.contactsService.deleteContact($event.id).subscribe(() => {
      this.getContactInfo(this.pageSize, this.pageIndex);
      location.reload();
    });
  }
}
