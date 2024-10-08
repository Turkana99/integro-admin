import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { TeamService } from '../../../core/services/team.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  members: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private teamService: TeamService, private router: Router) {}

  displayedColumns: any[] = [
    {
      key: 'fullNameAz',
      name: 'Ad',
    },
    {
      key: 'positionAz',
      name: 'Vəzifəsi',
    },
    {
      key: 'instagramUrl',
      name: 'Instagram adresi',
    },
    {
      key: 'facebookUrl',
      name: 'Facebook adresi',
    },
    {
      key: 'linkedinUrl',
      name: 'Linkedin adresi',
    },
  ];

  logData($event: any) {
    console.log('event', $event);
  }

  getMembers(pageSize: number, pageIndex: number) {
    this.teamService
      .getMembers({
        pageSize: pageSize,
        pageIndex: pageIndex,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.showSpinner = false;
          }, 200);
        })
      )
      .subscribe(
        (response) => {
          this.members = response.body.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  ngOnInit(): void {
    this.getMembers(this.pageSize, this.pageIndex);
  }

  onPageChange($event: any) {
    this.getMembers($event.pageSize, $event.pageIndex);
  }

  deleteMember($event: any) {
    this.teamService.deleteMember($event.id).subscribe(() => {
      this.getMembers(this.pageSize, this.pageIndex);
      location.reload();
    });
  }

  editMember(id: any) {
    this.router.navigate(['/new-member', id]);
  }
}
