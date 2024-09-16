import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../../core/services/homepage.service';
import { BlogsService } from '../../../core/services/blogs.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  ELEMENT_DATA: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private blogs: BlogsService) {}

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
    this.getBlogs($event.pageSize, $event.pageIndex);
  }

  getBlogs(pageSize: number, pageIndex: number) {
    this.blogs
      .getBlogs({
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
    this.getBlogs(this.pageSize, this.pageIndex);
  }
}
