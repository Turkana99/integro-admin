import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageSettingsService } from '../../../core/services/pageSettings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-page-settings',
  templateUrl: './new-page-settings.component.html',
  styleUrl: './new-page-settings.component.scss',
})
export class NewPageSettingsComponent {
  newPageForm: any;
  showSpinner = false;
  buttonSpinner = false;
  coverImage?: any;
  memberId: any;
  backgroundImageUrl: any;
  constructor(
    private fb: FormBuilder,
    private pageService: PageSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.memberId = +params.get('id')!;
      if (this.memberId) {
        this.getMemberInfoById(this.memberId);
      }
    });
  }

  initForm() {
    this.newPageForm = this.fb.group({
      titleAz: ['', Validators.required],
      titleEn: ['', Validators.required],
      titleRu: ['', Validators.required],
      subTitleAz: ['', Validators.required],
      subTitleEn: ['', Validators.required],
      subTitleRu: ['', Validators.required],
      pageName: ['', Validators.required],
      coverImageUrl: ['', Validators.required],
    });
  }
  getMemberInfoById(id: number) {
    this.showSpinner = true;
    this.pageService.getPagesInfoById(id).subscribe(
      (response: any) => {
        this.coverImage = response.coverImageUrl;
        this.newPageForm.setValue({
          titleAz: response.titleAz,
          titleEn: response.titleEn,
          titleRu: response.titleRu,
          subTitleAz: response.subTitleAz,
          subTitleEn: response.subTitleEn,
          subTitleRu: response.subTitleRu,
          pageName: response.pageName,
          coverImageUrl: response.backgroundImageUrl,
        });
        this.backgroundImageUrl = response.backgroundImageUrl;
      },
      (error) => {
        console.error('Error fetching project data:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    (this.newPageForm as FormGroup).controls['coverImageUrl'].setValue(file);
    this.coverImage = file;
  }

  submit() {
    const formData = new FormData();
    formData.append('TitleAz', this.newPageForm.get('titleAz').value);
    formData.append('TitleEn', this.newPageForm.get('titleEn').value);
    formData.append('TitleRu', this.newPageForm.get('titleRu').value);
    formData.append('SubTitleAz', this.newPageForm.get('subTitleAz').value);
    formData.append('SubTitleEn', this.newPageForm.get('subTitleEn').value);
    formData.append('SubTitleRu', this.newPageForm.get('subTitleRu').value);
    formData.append('PageName', this.newPageForm.get('pageName').value);
    if (this.coverImage) {
      formData.append('BackgroundImage', this.coverImage);
    }
    if (this.memberId) {
      this.buttonSpinner = true;
      formData.append('id', this.memberId);
      this.pageService
        .updatePagesInfo(formData)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.buttonSpinner = false;
            }, 200);
          })
        )
        .subscribe(
          () => {
            this.newPageForm.reset();
            this.router.navigate(['/pageSettings']);
          },
          (error) => {
            console.error('Error updating contact:', error);
          }
        );
      return;
    }

    this.buttonSpinner = true;
    this.pageService
      .createPages(formData)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.buttonSpinner = false;
          }, 200);
        })
      )
      .subscribe(
        () => {
          this.newPageForm.reset();
          this.router.navigate(['/pageSettings']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
