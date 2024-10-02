import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { AboutService } from '../../../core/services/about.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  abouts: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private aboutService: AboutService,
    private router: Router,
    private messageService: MessageService
  ) {}

  displayedColumns: any[] = [
    {
      key: 'contentAz',
      name: 'Məzmun',
    },
  ];
  ngOnInit(): void {
    this.getAboutPageInfo(this.pageSize, this.pageIndex);
  }
  getAboutPageInfo(pageSize: number, pageIndex: number) {
    this.aboutService
      .getAboutPageInfo({
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
          this.abouts = response.body.items;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getAboutPageInfo($event.pageSize, $event.pageIndex);
  }

  editAboutPageInfo(id: any) {
    this.router.navigate(['/new-about', id]);
  }
}
