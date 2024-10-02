import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OurServicesService } from '../../../core/services/our-services.service';
import { UtilsSerice } from '../../../core/services/utils.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import Quill from 'quill';

// Register custom fonts
const Font = Quill.import('formats/font') as any;
Font.whitelist = ['chooseFont', 'poppins', 'arial', 'times New Roman']; // Adjust the font list
Quill.register(Font, true);

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
  iconImg?: string;
  serviceId: any;
  pageTitle = 'Yeni xidmət';
  submitButtonText = 'Əlavə et';
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
        this.pageTitle = 'Xidmət - düzəliş';
        this.submitButtonText = 'Yadda saxla';
      }
    });
  }

  initForm() {
    this.newServiceForm = this.fb.group({
      titleAz: ['', Validators.required],
      titleEn: ['', Validators.required],
      titleRu: ['', Validators.required],
      descriptionAz: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      descriptionRu: ['', Validators.required],
    });
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
  getServiceById(id: any) {
    this.showSpinner = true;
    this.ourServices
      .getServiceInfoById(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          this.iconImg = response.body.icon;
          this.newServiceForm.setValue({
            titleAz: response.body.titleAz,
            titleEn: response.body.titleEn,
            titleRu: response.body.titleRu,
            descriptionAz: response.body.descriptionAz,
            descriptionEn: response.body.descriptionEn,
            descriptionRu: response.body.descriptionRu,
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
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('titleAz', this.newServiceForm.get('titleAz')!.value);
    formData.append('titleEn', this.newServiceForm.get('titleEn')!.value);
    formData.append('titleRu', this.newServiceForm.get('titleRu')!.value);
    formData.append(
      'descriptionAz',
      this.newServiceForm.get('descriptionAz')!.value
    );
    formData.append(
      'descriptionEn',
      this.newServiceForm.get('descriptionEn')!.value
    );
    formData.append(
      'descriptionRu',
      this.newServiceForm.get('descriptionRu')!.value
    );
    if (this.iconImg) {
      formData.append('icon', this.iconImg);
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
          this.newServiceForm.reset();
          this.router.navigate(['/services']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
