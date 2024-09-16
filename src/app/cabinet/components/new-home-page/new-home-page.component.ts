import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomePageService } from '../../../core/services/homepage.service';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-new-home-page',
  templateUrl: './new-home-page.component.html',
  styleUrl: './new-home-page.component.scss',
})
export class NewHomePageComponent implements OnInit {
  newHomePageForm: any;

  constructor(private fb: FormBuilder, private homeService: HomePageService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newHomePageForm = this.fb.group({
      TitleAz: null,
      SubTitleAz: null,
      TextAz: null,
      TitleEn: null,
      SubTitleEn: null,
      TextEn: null,
      TitleRu: null,
      SubTitleRu: null,
      TextRu: null,
      BackgroundImage: null,
    });
  }

  onFileSelected(event: any) {
    (this.newHomePageForm as FormGroup).controls['BackgroundImage'].setValue(
      event.target.files[0]
    );
    console.log('this.newHomePageForm', this.newHomePageForm.value);
  }

  Submit() {
    this.homeService
      .createPageInfo(this.newHomePageForm.value)
      .subscribe((res) => {
        console.log('res', res);
      });
  }
}
