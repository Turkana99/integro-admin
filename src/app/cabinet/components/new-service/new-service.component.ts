import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OurServicesService } from '../../../core/services/our-services.service';
import { UtilsSerice } from '../../../core/services/utils.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.scss',
  providers: [MessageService],
})
export class NewServiceComponent implements OnInit {
  newServiceForm: any;
  showSpinner = false;
  buttonSpinner = false;
  iconImg?: any;
  serviceId: any;
  constructor(
    private fb: FormBuilder,
    private ourServices: OurServicesService,
    private utilsService: UtilsSerice,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.serviceId = +params.get('id')!;
      if (this.serviceId) {
        this.getServiceById(this.serviceId);
      }
    });
  }

  initForm() {
    this.newServiceForm = this.fb.group({
      icon: ['', Validators.required],
      titleAz: ['', Validators.required],
      titleEn: ['', Validators.required],
      titleRu: ['', Validators.required],
    });
  }

  getServiceById(id: any) {
    this.showSpinner = true;
    this.ourServices
      .getServiceInfoById(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          console.log('resods', response);
          this.iconImg = response.body.icon;
          this.newServiceForm.setValue({
            titleAz: response.body.titleAz,
            titleEn: response.body.titleEn,
            titleRu: response.body.titleRu,
            icon:response.body.icon,
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
      this.newServiceForm.controls['iconImg'].setValue(this.iconImg);
      console.log(this.iconImg);
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('titleAz', this.newServiceForm.get('titleAz')!.value);
    formData.append('titleEn', this.newServiceForm.get('titleEn')!.value);
    formData.append('titleRu', this.newServiceForm.get('titleRu')!.value);
    if (this.iconImg) {
      formData.append('backgroundImage', this.iconImg);
    }

    if (this.serviceId) {
      this.buttonSpinner = true;
      formData.append('id', this.serviceId);
      this.ourServices
        .updateServiceInfo(formData)
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
            this.newServiceForm.reset();
            this.router.navigate(['/services']);
          },
          (error) => {
            console.error('Error updating contact:', error);
          }
        );
      return;
    }

    this.buttonSpinner = true;
    this.ourServices
      .createServiceInfo(formData)
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
          this.newServiceForm.reset();
          this.router.navigate(['/services']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
