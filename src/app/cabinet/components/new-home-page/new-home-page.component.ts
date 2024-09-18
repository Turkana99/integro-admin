import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HomeService } from '../../../core/services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill'; // Correct import

// Register custom fonts
const Font = Quill.import('formats/font') as any;
Font.whitelist = ['chooseFont', 'poppins', 'arial', 'times New Roman']; // Adjust the font list
Quill.register(Font, true);

@Component({
  selector: 'app-new-home-page',
  templateUrl: './new-home-page.component.html',
  styleUrls: ['./new-home-page.component.scss'],
})
export class NewHomePageComponent implements OnInit {
  newHomePageForm: any;
  showSpinner = false;
  buttonSpinner = false;
  backgroundImage?: any;
  homePageId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private messageService: MessageService
  ) {}

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

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
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
          this.backgroundImage = response.backgroundImageUrl;
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

  submit() {
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
            this.newHomePageForm.reset();
            this.router.navigate(['/homepage']);
          },
          (error) => {
            console.error('Error updating contact:', error);
          }
        );
      return;
    }

    this.buttonSpinner = true;
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
          console.log('Contact added successfully');
          this.newHomePageForm.reset();
          this.router.navigate(['/homepage']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
