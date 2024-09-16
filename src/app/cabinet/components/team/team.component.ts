import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { TeamService } from '../../../core/services/team.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  ELEMENT_DATA: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private teamService: TeamService) {}

  displayedColumns: any[] = [
    {
      key: 'title',
      name: 'Başlıq',
    },
    {
      key: 'subTitle',
      name: 'Alt başlıq',
    },
    {
      key: 'text',
      name: 'Məzmun',
    },
  ];

  logData($event: any) {
    console.log('event', $event);
  }

  onPageChange($event: any) {
    this.getMembers($event.pageSize, $event.pageIndex);
  }

  getMembers(pageSize: number, pageIndex: number) {
    this.teamService
      .getMembers({
        pageSize: pageSize,
        pageIndex: pageIndex + 1,
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
          console.log('response', response);
          this.ELEMENT_DATA = response.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  ngOnInit(): void {
    this.getMembers(this.pageSize, this.pageIndex);
  }
}
