import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../../../core/services/contacts.service';
import { UtilsSerice } from '../../../core/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
})
export class NewContactComponent implements OnInit {
  newContactForm: any;
  showSpinner = false;
  buttonSpinner = false;
  iconImg?: any;
  contactId: any;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactsService,
    private utilsService: UtilsSerice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.contactId = +params.get('id')!;
      if (this.contactId) {
        this.getContactInfoById(this.contactId);
      }
    });
  }
  initForm() {
    this.newContactForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      addressAz: ['', Validators.required],
      addressEn: ['', Validators.required],
      addressRu: ['', Validators.required],
      facebookUrl: ['', Validators.required],
      twitterUrl: ['', Validators.required],
      instagramUrl: ['', Validators.required],
      googleMapUrl: ['', Validators.required],
      state:['']
    });
  }

  getContactInfoById(id: any) {
    this.showSpinner = true;
    this.contactService
      .getContacts(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          console.log('resods', response);
          this.newContactForm.setValue({
            phoneNumber: response.body.phoneNumber,
            emailAddress: response.body.emailAddress,
            addressAz: response.body.addressAz,
            addressEn: response.body.addressEn,
            addressRu: response.body.addressRu,
            facebookUrl: response.body.facebookUrl,
            twitterUrl: response.body.twitterUrl,
            instagramUrl: response.body.instagramUrl,
            googleMapUrl: response.body.googleMapUrl,
            state: response.body.state,
          });
        },
        (error) => {
          console.error('Error fetching project data:', error);
        }
      );
  }

  submit() {
    const formData = new FormData();
    formData.append('phoneNumber', this.newContactForm.get('phoneNumber')!.value);
    formData.append('emailAddress', this.newContactForm.get('emailAddress')!.value);
    formData.append('addressAz', this.newContactForm.get('addressAz')!.value);
    formData.append('addressEn', this.newContactForm.get('addressEn')!.value);
    formData.append('addressRu', this.newContactForm.get('addressRu')!.value);
    formData.append('facebookUrl', this.newContactForm.get('facebookUrl')!.value);
    formData.append('twitterUrl', this.newContactForm.get('twitterUrl')!.value);
    formData.append('instagramUrl', this.newContactForm.get('instagramUrl')!.value);
    formData.append('googleMapUrl', this.newContactForm.get('googleMapUrl')!.value);
    formData.append('state', this.newContactForm.get('state')!.value);
    if (this.contactId) {
      this.buttonSpinner = true;
      formData.append('id', this.contactId);
      this.contactService
        .updateContactsInfo(formData)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.buttonSpinner = false;
            }, 200);
          })
        )
        .subscribe(
          () => {
            console.log('Contact updated successfully');
            this.newContactForm.reset();
            this.router.navigate(['/contact']);
          },
          (error) => {
            console.error('Error updating contact:', error);
          }
        );
      return;
    }

    this.buttonSpinner = true;
    this.contactService
      .createContact(formData)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.buttonSpinner = false;
          }, 200);
        })
      )
      .subscribe(
        () => {
          console.log('Contact added successfully');
          this.newContactForm.reset();
          this.router.navigate(['/contact']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
