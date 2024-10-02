import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../../../core/services/blogs.service';
import { UtilsSerice } from '../../../core/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { finalize } from 'rxjs';

// Register custom fonts
const Font = Quill.import('formats/font') as any;
Font.whitelist = ['chooseFont', 'poppins', 'arial', 'times New Roman']; // Adjust the font list
Quill.register(Font, true);

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrl: './new-blog.component.scss',
})
export class NewBlogComponent {
  newBlogForm: any;
  showSpinner = false;
  buttonSpinner = false;
  mainImg?: any;
  blogAttachments: any;
  blogId: any;
  selectedFiles: File[] = [];
  constructor(
    private fb: FormBuilder,
    private blogService: BlogsService,
    private utilsService: UtilsSerice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.blogId = +params.get('id')!;
      if (this.blogId) {
        this.getBlogById(this.blogId);
      }
    });
  }

  initForm() {
    this.newBlogForm = this.fb.group({
      titleAz: ['', Validators.required],
      shortDescriptionAz: ['', Validators.required],
      descriptionAz: ['', Validators.required],
      titleEn: ['', Validators.required],
      shortDescriptionEn: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      titleRu: ['', Validators.required],
      shortDescriptionRu: ['', Validators.required],
      descriptionRu: ['', Validators.required],
      coverImage: ['', Validators.required],
      attachments: ['', Validators.required],
    });
  }

  onFile1Selected(event: any) {
    (this.newBlogForm as FormGroup).controls['coverImage'].setValue(
      event.target.files[0]
    );
    console.log('this.newHomePageForm', this.newBlogForm.value);
  }
  onFile2Selected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(event.target.files[i]);
      }
      (this.newBlogForm as FormGroup).controls['attachments'].setValue(
        this.selectedFiles
      );
      console.log('Selected files:', this.selectedFiles);
    }
  }

  // Quill modules with font customization
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [
        'blockquote',
        //'code-block'
      ],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [
        //{ 'script': 'sub'},
        // { 'script': 'super' }
      ], // superscript/subscript

      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      //[{ 'font':  ['arial']}],
      [{ font: Font.whitelist }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      [
        'link',
        //'image',
        //'video'
      ],
    ],
  };

  getBlogById(id: any) {
    this.showSpinner = true;
    this.blogService
      .getBlogsInfoById(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          console.log('resods', response);
          this.mainImg = response.body.coverImageUrl;
          this.blogAttachments = response.body.blogAttachments;
          this.newBlogForm.setValue({
            titleAz: response.body.titleAz,
            titleEn: response.body.titleEn,
            titleRu: response.body.titleRu,
            descriptionAz: response.body.descriptionAz,
            descriptionEn: response.body.descriptionEn,
            descriptionRu: response.body.descriptionRu,
            shortDescriptionAz: response.body.shortDescriptionAz,
            shortDescriptionEn: response.body.shortDescriptionEn,
            shortDescriptionRu: response.body.shortDescriptionRu,
            coverImage: response.body?.coverImageUrl || null,
            attachments: response.body?.blogAttachments || null,
          });

          console.log('this.newBlogForm', this.newBlogForm);
        },
        (error) => {
          console.error('Error fetching project data:', error);
        }
      );
  }
  submitForm(): void {
    const formData = new FormData();
    formData.append('TitleAz', this.newBlogForm.get('titleAz')!.value);
    formData.append('TitleEn', this.newBlogForm.get('titleEn')!.value);
    formData.append('TitleRu', this.newBlogForm.get('titleRu')!.value);
    formData.append(
      'DescriptionAz',
      this.newBlogForm.get('descriptionAz')!.value
    );
    formData.append(
      'DescriptionEn',
      this.newBlogForm.get('descriptionEn')!.value
    );
    formData.append(
      'DescriptionRu',
      this.newBlogForm.get('descriptionRu')!.value
    );
    formData.append(
      'ShortDescriptionAz',
      this.newBlogForm.get('shortDescriptionAz')!.value
    );
    formData.append(
      'ShortDescriptionEn',
      this.newBlogForm.get('shortDescriptionEn')!.value
    );
    formData.append(
      'ShortDescriptionRu',
      this.newBlogForm.get('shortDescriptionRu')!.value
    );
    formData.append('CoverImage', this.newBlogForm.get('coverImage')!.value);

    this.selectedFiles.forEach((file, index) => {
      formData.append(`attachments`, file);
    });

    if (this.blogId) {
      formData.append('id', this.blogId.toString());
      this.buttonSpinner = true;
      this.blogService
        .updateBlogInfo(formData)
        .pipe(finalize(() => (this.buttonSpinner = false)))
        .subscribe(
          () => {
            console.log('Blog updated successfully');
            this.newBlogForm.reset();
            this.selectedFiles = [];
            this.router.navigate(['/blogs']);
          },
          (error) => {
            console.error('Error updating blog:', error);
          }
        );
    } else {
      this.buttonSpinner = true;
      this.blogService
        .createBlog(formData)
        .pipe(finalize(() => (this.buttonSpinner = false)))
        .subscribe(
          () => {
            console.log('Blog created successfully');
            this.newBlogForm.reset();
            this.selectedFiles = [];
            this.router.navigate(['/blogs']);
          },
          (error) => {
            console.error('Error creating blog:', error);
          }
        );
    }
  }
}
