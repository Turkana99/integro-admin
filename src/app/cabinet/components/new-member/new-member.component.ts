import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../core/services/team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrl: './new-member.component.scss',
})
export class NewMemberComponent implements OnInit {
  newMemberForm: any;
  showSpinner = false;
  buttonSpinner = false;
  coverImage?: any;
  memberId: any;
  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
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
    this.newMemberForm = this.fb.group({
      fullNameAz: ['', Validators.required],
      fullNameEn: ['', Validators.required],
      fullNameRu: ['', Validators.required],
      positionAz: ['', Validators.required],
      positionEn: ['', Validators.required],
      positionRu: ['', Validators.required],
      instagramUrl: ['', Validators.required],
      facebookUrl: ['', Validators.required],
      linkedinUrl: ['', Validators.required],
      coverImageUrl: ['', Validators.required],
    });
  }
  getMemberInfoById(id: string) {
    this.showSpinner = true;
    this.teamService.getMemberInfoWithId(id).subscribe(
      (response) => {
        this.coverImage = response.coverImageUrl;
        this.newMemberForm.setValue({
          fullNameAz: response.fullNameAz,
          fullNameEn: response.fullNameEn,
          fullNameRu: response.fullNameRu,
          positionAz: response.positionAz,
          positionEn: response.positionEn,
          positionRu: response.positionRu,
          instagramUrl: response.instagramUrl,
          facebookUrl:response.facebookUrl,
          linkedinUrl: response.linkedinUrl,
          coverImageUrl: response.coverImageUrl,
        });
      },
      (error) => {
        console.error('Error fetching project data:', error);
      }
    );
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  (this.newMemberForm as FormGroup).controls['coverImageUrl'].setValue(file);
  this.coverImage = file; // Store the file for submission
}

  submit() {
    const formData = new FormData();
    
    formData.append('FullNameAz', this.newMemberForm.get('fullNameAz').value);
    formData.append('FullNameEn',this.newMemberForm.get('fullNameEn').value);
    formData.append('FullNameRu', this.newMemberForm.get('fullNameRu').value);
    formData.append('PositionAz', this.newMemberForm.get('positionAz').value);
    formData.append('PositionEn', this.newMemberForm.get('positionEn').value);
    formData.append('PositionRu', this.newMemberForm.get('positionRu').value);
    formData.append('InstagramUrl', this.newMemberForm.get('instagramUrl').value);
    formData.append('FacebookUrl', this.newMemberForm.get('facebookUrl').value);
    formData.append('LinkedinUrl', this.newMemberForm.get('linkedinUrl').value);
    if (this.coverImage) {
      formData.append('CoverImage', this.coverImage);
    }

    if (this.memberId) {
      this.buttonSpinner = true;
      formData.append('id', this.memberId);
      this.teamService
        .updateMemberInfo(formData)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.buttonSpinner = false;
            }, 200);
          })
        )
        .subscribe(
          () => {
            this.newMemberForm.reset();
            this.router.navigate(['/team']);
          },
          (error) => {
            console.error('Error updating contact:', error);
          }
        );
      return;
    }

    this.buttonSpinner = true;
    this.teamService
      .createMember(formData)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.buttonSpinner = false;
          }, 200);
        })
      )
      .subscribe(
        () => {
          this.newMemberForm.reset();
          this.router.navigate(['/team']);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
  }
}
