import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HomeService } from '../../../core/services/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-home-page',
  templateUrl: './new-home-page.component.html',
  styleUrl: './new-home-page.component.scss',
})
export class NewHomePageComponent implements OnInit {
  newHomePageForm: any;
  showSpinner = false;
  buttonSpinner=false;
  backgroundImage?: any;
  homePageId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private homeService: HomeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.homePageId) this.getHomePageInfoById(this.homePageId);
    this.route.paramMap.subscribe(params => {
      this.homePageId = +params.get('id')!;
      if (this.homePageId) {
        this.getHomePageInfoById(this.homePageId);
      }
    });
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
          console.log("response", response);
          this.backgroundImage=response.backgroundImageUrl;
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
            backgroundImage: response.backgroundImageUrl,
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
      this.newHomePageForm.controls['backgroundImage'].setValue(
        this.backgroundImage
      );
      console.log(this.backgroundImage);
    }
  }

  submitProject() {
    // console.log(this.newHomePageForm.get('state')!.value);
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
      this.buttonSpinner = true;
      formData.append('id', this.homePageId);
      this.homeService
        .editHomePageInfo(formData)
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
            this.messageService.add({
              severity: 'success',
              summary: 'Uğurlu',
              detail: 'Məlumat müvəffəqiyyətlə yeniləndi!',
              life: 2000,
            });
            this.newHomePageForm.reset();
          },
          (error) => {
            console.error('Error updating contact:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Xəbərdarlıq',
              detail: error
                ? error?.error?.error?.errors?.join('\n')
                : 'Məlumat yenilənmədi!',
            });
          }
        );
      return;
    }
    this.buttonSpinner = true;
    console.log('FormData2', formData);
    this.homeService
      .addHomePageInfo(formData)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.buttonSpinner = false;
          }, 200);
        })
      )
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Uğurlu',
            detail: 'Yeni ana səhifə məlumatı müvəffəqiyyətlə əlavə edildi!',
          });
          console.log('Contact added successfully');
          this.newHomePageForm.reset();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Xəbərdarlıq',
            detail: error
              ? error?.error?.error?.errors?.join('\n')
              : 'Məlumat əlavə edilmədi!',
          });
          console.error('Error adding contact:', error);
        }
      );
  }
}
