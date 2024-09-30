import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { AboutService } from '../../../core/services/about.service';
import { finalize } from 'rxjs';

// Register custom fonts for Quill
const Font = Quill.import('formats/font') as any;
Font.whitelist = ['chooseFont', 'poppins', 'arial', 'times New Roman'];
Quill.register(Font, true);

@Component({
  selector: 'app-new-about',
  templateUrl: './new-about.component.html',
  styleUrls: ['./new-about.component.scss'],
})
export class NewAboutComponent implements OnInit {
  newAboutForm!: FormGroup; // Initialize the form as non-optional
  selectedFiles: File[] = [];
  aboutId: number | null = null; // Track the about ID
  showSpinner = false;
  images: any[] = [];
  buttonSpinner = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private aboutService: AboutService
  ) {}

  // Quill configuration with toolbar options
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: Font.whitelist }],
      [{ align: [] }],
      ['clean'],
      ['link'],
    ],
  };

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      this.aboutId = params.get('id') ? parseInt(params.get('id')!, 10) : null;
      if (this.aboutId) {
        this.getAboutPageInfoById(this.aboutId);
      }
    });
  }

  // Initialize the form
  initForm(): void {
    this.newAboutForm = this.fb.group({
      contentAz: ['', Validators.required],
      contentEn: ['', Validators.required],
      contentRu: ['', Validators.required],
      // No 'images' control
    });
  }

  // Fetch about page information based on `aboutId`
  getAboutPageInfoById(id: any): void {
    this.showSpinner = true;
    this.aboutService
      .getAboutInfoWithId(id)
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe(
        (response) => {
          console.log('AboutresponseId', response);

          this.images = response.aboutAttachments;
          console.log('Attachements', this.images);
          this.newAboutForm.setValue({
            contentAz: response.contentAz,
            contentEn: response.contentEn,
            contentRu: response.contentRu,
            // No need to set files
          });
        },
        (error) => {
          console.error('Error fetching page info:', error);
        }
      );
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    console.log('Selected files:', this.selectedFiles);
    // No need to set in the form control
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('contentAz', this.newAboutForm.get('contentAz')!.value);
    formData.append('contentEn', this.newAboutForm.get('contentEn')!.value);
    formData.append('contentRu', this.newAboutForm.get('contentRu')!.value);

    this.selectedFiles.forEach((file, index) => {
      console.log('file' + (index + 1), file);
      formData.append(`attachment`, file);
    });

    // Append the `id` only if it's not null
    if (this.aboutId !== null) {
      formData.append('id', this.aboutId.toString());
      this.buttonSpinner = true;
      this.aboutService
        .editAboutPageInfo(formData)
        .pipe(finalize(() => (this.buttonSpinner = false)))
        .subscribe(
          () => {
            console.log('Page updated successfully');
            this.newAboutForm.reset();
            this.selectedFiles = []; // Clear selected files after submission
            this.router.navigate(['/about']);
          },
          (error) => {
            console.error('Error updating page:', error);
          }
        );
      return;
    }

    // Add new page info if no `aboutId`
    this.buttonSpinner = true;
    this.aboutService
      .addAboutPageInfo(formData)
      .pipe(finalize(() => (this.buttonSpinner = false)))
      .subscribe(
        () => {
          console.log('Page added successfully');
          this.newAboutForm.reset();
          this.selectedFiles = []; // Clear selected files after submission
          this.router.navigate(['/about']);
        },
        (error) => {
          console.error('Error adding page:', error);
        }
      );
  }
  trackByAttachmentUrl(index: number, item: any): string {
    return item.attachmentUrl;
  }
}
