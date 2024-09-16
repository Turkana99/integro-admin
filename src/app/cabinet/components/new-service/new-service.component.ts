import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OurServicesService } from '../../../core/services/our-services.service';
import { UtilsSerice } from '../../../core/services/utils.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.scss',
  providers: [MessageService],
})
export class NewServiceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private ourServices: OurServicesService,
    private utilsService: UtilsSerice,
    private messageService: MessageService
  ) {}
  newServiceForm: any;
  ngOnInit(): void {
    this.initForm();
  }

  Submit() {
    this.ourServices
      .createServiceInfo(this.newServiceForm.value)
      .subscribe((res: any) => {
        console.log('res', res);
        if (res?.id) {
        }
      });
  }

  initForm() {
    this.newServiceForm = this.fb.group({
      icon: null,
      titleAz: null,
      titleEn: null,
      titleRu: null,
    });
  }

  async onFileSelected(event: any) {
    (this.newServiceForm as FormGroup).controls['icon'].setValue(
      await this.utilsService.imageToBase64(event.target.files[0])
    );
  }
}
