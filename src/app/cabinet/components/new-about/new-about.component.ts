import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-about',
  templateUrl: './new-about.component.html',
  styleUrl: './new-about.component.scss',
})
export class NewAboutComponent {
  newAboutForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newAboutForm = this.fb.group({
      TitleAz: ['', Validators.required],
      SubTitleAz: ['', Validators.required],
      TextAz: ['', Validators.required],
      TitleEn: ['', Validators.required],
      SubTitleEn: ['', Validators.required],
      TextEn: ['', Validators.required],
      TitleRu: ['', Validators.required],
      SubTitleRu: ['', Validators.required],
      TextRu: ['', Validators.required],
      BackgroundImage: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    (this.newAboutForm as FormGroup).controls['BackgroundImage'].setValue(
      event.target.files[0]
    );
    console.log('this.newHomePageForm', this.newAboutForm.value);
  }
}
