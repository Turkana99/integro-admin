import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-new-home-page',
  templateUrl: './new-home-page.component.html',
  styleUrl: './new-home-page.component.scss',
})
export class NewHomePageComponent implements OnInit {
  newHomePageForm: any;
  showSpinner = false;
  backgroundImage?: any;
  homePageId: any;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newHomePageForm = this.fb.group({
      titleAz: ['', Validators.required],
      subTitleAz: ['', Validators.required],
      textAz: ['', Validators.required],
      titleEn: ['', Validators.required],
      subTitleEn: ['', Validators.required],
      textEn: ['', Validators.required],
      titleRu: ['', Validators.required],
      subTitleRu: ['', Validators.required],
      textRu: ['', Validators.required],
      backgroundImage: ['', Validators.required],
    });
  }

  getHomePageInfoById(id: string) {
    this.showSpinner = true;
    this.homeService
      .getHomePageInfoWithId(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          this.newHomePageForm.setValue({
            titleAz: response.titleAz,
            subTitleAz: response.subTitleAz,
            textAz: response.textAz,
            titleEn: response.titleEn,
            subTitleEn: response.subTitleEn,
            textEn: response.textEn,
            titleRu: response.titleRu,
            subTitleRu: response.subTitleRu,
            textRu: response.textRu,
            backgroundImage: response.backgroundImage,
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
      this.backgroundImage = file;
    }
  }

  submitProject() {
    console.log(this.newHomePageForm.get('state')!.value);
    const formData = new FormData();
    formData.append('titleAz', this.newHomePageForm.get('titleAz')!.value);
    formData.append(
      'subTitleAz',
      this.newHomePageForm.get('subTitleAz')!.value
    );
    formData.append('textAz', this.newHomePageForm.get('textAz')!.value);
    formData.append('titleEn', this.newHomePageForm.get('titleEn')!.value);
    formData.append(
      'subTitleEn',
      this.newHomePageForm.get('subTitleEn')!.value
    );
    formData.append('textEn', this.newHomePageForm.get('textEn')!.value);
    formData.append('titleRu', this.newHomePageForm.get('titleRu')!.value);
    formData.append(
      'subTitleRu',
      this.newHomePageForm.get('subTitleRu')!.value
    );
    formData.append('textRu', this.newHomePageForm.get('textRu')!.value);
    
    if (this.backgroundImage) {
      formData.append('backgroundImage', this.backgroundImage);
    }
    if (this.homePageId) {
      formData.append('id', this.homePageId);
      this.homeService.editHomePageInfo(formData).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Uğurlu',
            detail: 'Ana səhifə məlumatları müvəffəqiyyətlə yeniləndi!',
            key: 'br',
            life: 2000,
          });
          this.newHomePageForm.reset();
        },
        (error: any) => {
          console.error('Error updating project:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Xəbərdarlıq',
            detail: 'Ana səhifə məlumatları yenilənmədi!',
            key: 'br',
            life: 2000,
          });
        }
      );
    } else {
      this.homeService.addHomePageInfo(formData).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Uğurlu',
            detail: 'Yeni Ana səhifə məlumatları müvəffəqiyyətlə əlavə edildi!',
            key: 'br',
            life: 2000,
          });
          this.newHomePageForm.reset();
        },
        (error) => {
          console.error('Error adding project:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Xəbərdarlıq',
            detail: 'Ana səhifə məlumatları əlavə edilmədi!',
            life: 2000,
          });
        }
      );
    }
  }
}
