import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartnersService } from '../../../core/services/partners.service';

@Component({
  selector: 'app-new-partner',
  templateUrl: './new-partner.component.html',
  styleUrl: './new-partner.component.scss',
})
export class NewPartnerComponent implements OnInit {
  newPartnerForm: any;

  constructor(
    private partnerService: PartnersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onFileSelected(event: any) {
    (this.newPartnerForm as FormGroup).controls['Logo'].setValue(
      event.target.files[0]
    );
    console.log('this.newPartnerForm', this.newPartnerForm.value);
  }

  Submit() {
    this.partnerService
      .createPartner(this.newPartnerForm.value)
      .subscribe((res) => {
        console.log('res', res);
      });
  }

  initForm() {
    this.newPartnerForm = this.fb.group({
      Logo: null,
    });
  }
}
