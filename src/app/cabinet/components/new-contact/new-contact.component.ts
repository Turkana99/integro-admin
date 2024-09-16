import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactsService } from '../../../core/services/contacts.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
})
export class NewContactComponent implements OnInit {
  newHomePageForm: any;
  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  Submit() {
    this.contactsService
      .createContact(this.newHomePageForm.value)
      .subscribe((res) => {
        console.log('res', res);
      });
  }

  initForm() {
    this.newHomePageForm = this.fb.group({
      phoneNumber: null,
      emailAddress: null,
      addressAz: null,
      addressEn: null,
      addressRu: null,
      facebookUrl: null,
      twitterUrl: null,
      instagramUrl: null,
      googleMapUrl: null,
    });
  }
}
