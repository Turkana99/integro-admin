import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../core/services/team.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrl: './new-member.component.scss',
})
export class NewMemberComponent implements OnInit {
  newMemberForm: any;
  constructor(private fb: FormBuilder, private teamService: TeamService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newMemberForm = this.fb.group({
      FullNameAz: null,
      FullNameEn: null,
      FullNameRu: null,
      PositionAz: null,
      PositionEn: null,
      PositionRu: null,
      InstagramUrl: null,
      FacebookUrl: null,
      LinkedinUrl: null,
      CoverImage: null,
    });
  }

  onFileSelected(event: any) {
    (this.newMemberForm as FormGroup).controls['CoverImage'].setValue(
      event.target.files[0]
    );
    console.log('this.newMemberForm', this.newMemberForm.value);
  }

  Submit() {
    this.teamService.createMember(this.newMemberForm.value).subscribe((res) => {
      console.log('res', res);
    });
  }
}
