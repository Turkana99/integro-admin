import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrl: './new-blog.component.scss',
})
export class NewBlogComponent {
  newBlogForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newBlogForm = this.fb.group({
      TitleAz: ['', Validators.required],
      ShortDescriptionAz: ['', Validators.required],
      DescriptionAz: ['', Validators.required],
      TitleEn: ['', Validators.required],
      ShortDescriptionEn: ['', Validators.required],
      DescriptionEn: ['', Validators.required],
      TitleRu: ['', Validators.required],
      ShortDescriptionRu: ['', Validators.required],
      DescriptionRu: ['', Validators.required],
      CoverImage: ['', Validators.required],
      Attachments: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    (this.newBlogForm as FormGroup).controls['CoverImage'].setValue(
      event.target.files[0]
    );
    (this.newBlogForm as FormGroup).controls['Attachments'].setValue(
      event.target.files[0]
    );
    console.log('this.newHomePageForm', this.newBlogForm.value);
  }
}
