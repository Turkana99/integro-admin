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
  pageTitle = 'Yeni əlaqə məlumatı';
  submitButtonText = 'Əlavə et';
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
        this.pageTitle = 'Əlaqə - düzəliş';
        this.submitButtonText = 'Yadda saxla';
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
      state: [''],
    });
  }

  getContactInfoById(id: any) {
    this.showSpinner = true;
    this.contactService
      .getContactsInfoById(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          this.newContactForm.setValue({
            phoneNumber: response.phoneNumber,
            emailAddress: response.emailAddress,
            addressAz: response.addressAz,
            addressEn: response.addressEn,
            addressRu: response.addressRu,
            facebookUrl: response.facebookUrl,
            twitterUrl: response.twitterUrl,
            instagramUrl: response.instagramUrl,
            googleMapUrl: response.googleMapUrl,
            state: response?.state ?? true,
          });
        },
        (error) => {
          console.error('Error fetching project data:', error);
        }
      );
  }

  submit() {
    let formData: any = {
      phoneNumber: this.newContactForm.value.phoneNumber,
      emailAddress: this.newContactForm.value.emailAddress,
      addressAz: this.newContactForm.value.addressAz,
      addressEn: this.newContactForm.value.addressEn,
      addressRu: this.newContactForm.value.addressRu,
      facebookUrl: this.newContactForm.value.facebookUrl,
      twitterUrl: this.newContactForm.value.twitterUrl,
      instagramUrl: this.newContactForm.value.instagramUrl,
      googleMapUrl: this.newContactForm.value.googleMapUrl,
      state: this.newContactForm.value.state,
    };

    if (this.contactId) {
      this.buttonSpinner = true;
      formData['id'] = this.contactId;
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
          this.newContactForm.reset();
          this.router.navigate(['/contact']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
