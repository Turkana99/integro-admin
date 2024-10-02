import { Component } from '@angular/core';
import { NewPageSettingsComponent } from '../new-page-settings/new-page-settings.component';
import { PageSettingsService } from '../../../core/services/pageSettings.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrl: './page-settings.component.scss'
})
export class PageSettingsComponent {
  pages: any = [];
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(
    private pageService: PageSettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPages(this.pageSize, this.pageIndex);
  }

  displayedColumns: any[] = [
    {
      key: 'pageName',
      name: 'Səhifənin adı',
    },
    {
      key: 'titleAz',
      name: 'Başlıq',
    },
    {
      key: 'subTitleAz',
      name: 'Alt başlıq',
    },

  ];

  logData($event: any) {
    console.log('event', $event);
  }

  getPages(pageSize: number, pageIndex: number) {
    this.pageService
      .getPages({
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
          console.log('response', response);
          this.pages = response.body.items;
          console.log('pages', this.pages);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getPages($event.pageSize, $event.pageIndex);
  }

  deletePages($event: any) {
    this.pageService.deletePage($event.id).subscribe(() => {
      this.getPages(this.pageSize, this.pageIndex);
      location.reload();
    });
  }

  editPages(id: any) {
    this.router.navigate(['/new-pageSetting', id]);
  }
}
