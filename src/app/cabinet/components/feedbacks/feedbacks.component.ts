import { Component } from '@angular/core';
import { FeedbacksService } from '../../../core/services/feedback.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss',
})
export class FeedbacksComponent {
  feedbacks: any = [];
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(
    private feedbackService: FeedbacksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFeedbacks(this.pageSize, this.pageIndex);
  }

  displayedColumns: any[] = [
    {
      key: 'fullName',
      name: 'Ad,soyad',
    },
    {
      key: 'emailAddress',
      name: 'Elektron-poçt ünvanı',
    },
    {
      key: 'phoneNumber',
      name: 'Əlaqə nömrəsi',
    },
    {
      key: 'content',
      name: 'Məzmun',
    },
  ];

  logData($event: any) {
    console.log('event', $event);
  }

  getFeedbacks(pageSize: number, pageIndex: number) {
    this.feedbackService
      .getFeedbacks({
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
          this.feedbacks = response.body.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getFeedbacks($event.pageSize, $event.pageIndex);
  }

  deleteFeedback($event: any) {
    this.feedbackService.deleteFeedback($event.id).subscribe(() => {
      this.getFeedbacks(this.pageSize, this.pageIndex);
      location.reload();
    });
  }
}
