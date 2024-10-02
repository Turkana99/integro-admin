import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartnersService } from '../../../core/services/partners.service';
import { UtilsSerice } from '../../../core/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-partner',
  templateUrl: './new-partner.component.html',
  styleUrl: './new-partner.component.scss',
})
export class NewPartnerComponent implements OnInit {
  newPartnerForm: any;
  showSpinner = false;
  buttonSpinner = false;
  iconImg?: any;
  partnerId: any;
  constructor(
    private fb: FormBuilder,
    private partnerService: PartnersService,
    private utilsService: UtilsSerice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.partnerId = +params.get('id')!;
      if (this.partnerId) {
        this.getPartnerById(this.partnerId);
      }
    });
  }
  initForm() {
    this.newPartnerForm = this.fb.group({
      Logo: null,
    });
  }

  getPartnerById(id: any) {
    this.showSpinner = true;
    this.partnerService
      .getPartnersInfoById(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          this.iconImg = response.body.attachmentUrl;
          this.newPartnerForm.setValue({
            Logo: response.body.attachmentUrl,
          });
        },
        (error) => {
          console.error('Error fetching project data:', error);
        }
      );
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.iconImg = file;
      this.newPartnerForm.controls['iconImg'].setValue(this.iconImg);
    }
  }

  submit() {
    const formData = new FormData();
    if (this.iconImg) {
      formData.append('logo', this.iconImg);
    }

    if (this.partnerId) {
      this.buttonSpinner = true;
      formData.append('id', this.partnerId);
      this.partnerService
        .updatePartnerInfo(formData)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.buttonSpinner = false;
            }, 200);
          })
        )
        .subscribe(
          () => {
            this.newPartnerForm.reset();
            this.router.navigate(['/partners']);
          },
          (error) => {
            console.error('Error updating contact:', error);
          }
        );
      return;
    }

    this.buttonSpinner = true;
    this.partnerService
      .createPartner(formData)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.buttonSpinner = false;
          }, 200);
        })
      )
      .subscribe(
        () => {
          this.newPartnerForm.reset();
          this.router.navigate(['/partners']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
