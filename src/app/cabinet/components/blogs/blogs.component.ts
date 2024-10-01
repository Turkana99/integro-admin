import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../core/services/blogs.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  blogs: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;
  constructor(private blogService: BlogsService, private router: Router) {}

  displayedColumns: any[] = [
    {
      key: 'titleAz',
      name: 'Başlıq',
    },
    {
      key: 'shortDescriptionAz',
      name: 'Qısa məzmun',
    },
    {
      key: 'descriptionAz',
      name: 'Məzmun',
    },
  ];

  ngOnInit(): void {
    this.getBlogPageInfo(this.pageSize, this.pageIndex);
  }

  getBlogPageInfo(pageSize: number, pageIndex: number) {
    this.blogService
      .getBlogs({
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
          this.blogs = response.body.items;
          console.log('About', this.blogs);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange($event: any) {
    this.getBlogPageInfo($event.pageSize, $event.pageIndex);
  }

  editBlogPageInfo(id: any) {
    this.router.navigate(['/new-blog', id]);
  }

  deleteBlog($event: any) {
    this.blogService.deleteBlog($event.id).subscribe(() => {
      this.getBlogPageInfo(this.pageSize, this.pageIndex);
      location.reload();
    });
  }
}
