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
  iconImg?: any;
  blogId: any;
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
            this.iconImg = response.body.icon;
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
              coverImage: response.body.coverImage,
              attachments: response.body.attachments,
            });
          },
          (error) => {
            console.error('Error fetching project data:', error);
          }
        );
    }

  
    submit() {
      const formData = new FormData();
      formData.append('titleAz', this.newBlogForm.get('titleAz')!.value);
      formData.append('titleEn', this.newBlogForm.get('titleEn')!.value);
      formData.append('titleRu', this.newBlogForm.get('titleRu')!.value);
      formData.append('shortDescriptionAz', this.newBlogForm.get('shortDescriptionAz')!.value);
      formData.append('shortDescriptionEn', this.newBlogForm.get('shortDescriptionEn')!.value);
      formData.append('shortDescriptionRu', this.newBlogForm.get('shortDescriptionRu')!.value);
      formData.append('descriptionAz', this.newBlogForm.get('descriptionAz')!.value);
      formData.append('descriptionEn', this.newBlogForm.get('descriptionEn')!.value);
      formData.append('descriptionRu', this.newBlogForm.get('descriptionRu')!.value);
      if (this.iconImg) {
        formData.append('backgroundImage', this.iconImg);
      }
  
      if (this.blogId) {
        this.buttonSpinner = true;
        formData.append('id', this.blogId);
        this.blogService
          .updateBlogInfo(formData)
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
              this.newBlogForm.reset();
              this.router.navigate(['/blog']);
            },
            (error) => {
              console.error('Error updating contact:', error);
            }
          );
        return;
      }
  
      this.buttonSpinner = true;
      this.blogService
        .createBlog(formData)
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
            this.newBlogForm.reset();
            this.router.navigate(['/services']);
          },
          (error) => {
            console.error('Error adding contact:', error);
          }
        );
    }
}
