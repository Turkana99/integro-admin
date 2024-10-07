import { Component } from '@angular/core';
import { EvaluateService } from '../../../core/services/evaluate.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.scss',
})
export class EvaluateComponent {
  evaluations: any = [];
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(
    private evaluateService: EvaluateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEvaluations(this.pageSize, this.pageIndex);
  }

  displayedColumns: any[] = [
    {
      key: 'message',
      name: 'Mesaj',
    },
  ];

  logData($event: any) {
    console.log('event', $event);
  }

  getEvaluations(pageSize: number, pageIndex: number) {
    this.evaluateService
      .getEvaluations({
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
          this.evaluations = response.body.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getEvaluations($event.pageSize, $event.pageIndex);
  }
  viewEvaluation($event: any) {
    this.router.navigate(['/view-case-evaluation', $event.id]);
  }
  deleteEvaluation($event: any) {
    this.evaluateService.deleteEvaluation($event.id).subscribe(() => {
      this.getEvaluations(this.pageSize, this.pageIndex);
      location.reload();
    });
  }
}
