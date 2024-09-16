import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  ELEMENT_DATA: any;
  showSpinner = false;
  pageSize = 10;
  pageIndex = 0;

  constructor(private homeService: HomeService) {}

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

  // ELEMENT_DATA: any = [
  //   {
  //     titleAz: 'Etibar Edə Biləcəyiniz Ən Böyük və Ən Güclü Firma',
  //     titleEn: 'The Greatest & Strongest Firm You Can Trust',
  //     titleRu: 'Самая Большая и Сильная Фирма, Которой Вы Можете Доверять',
  //     subTitleAz: 'Məhsul Məsuliyyəti və Şəxsi Xəsarət',
  //     subTitleEn: 'Product Liabilty & Personal Injury',
  //     subTitleRu:
  //       'Ответственность За Качество Продукции и Телесные Повреждения',
  //     textAz:
  //       'Biz bütün hüquqi ehtiyaclarınız üçün ekspert xidmətləri göstərən hüquq peşəkarlarından ibarət xüsusi komandayıq. Biz sizin üçün çox çalışmaq və uğurlu nəticələri təmin etmək öhdəliyimizə sadiqik. Biz bütün hüquqi ehtiyaclarınız üçün ekspert xidmətləri göstərən hüquq peşəkarlarından ibarət xüsusi komandayıq.',
  //     textEn: 'We are a dedicated team of legal professionals providing expert services for all your legal needs. We are committed to working hard for you and ensuring successful outcomes. We are a dedicated team of legal professionals providing expert services for all your legal needs.',
  //     textRu: 'Мы — преданная своему делу команда юристов, предоставляющая экспертные услуги для всех ваших юридических нужд. Мы стремимся усердно работать для вас и обеспечивать успешные результаты. Мы — преданная своему делу команда юристов, предоставляющая экспертные услуги для всех ваших юридических нужд.',
  //     backgroundImage: '../../../../assets/images/jumbBg.png',
  //   },
  // ];

  ngOnInit(): void {
    this.getHomePageInfo(this.pageSize, this.pageIndex);
  }

  logData($event: any) {
    console.log('event', $event);
  }

  getHomePageInfo(pageSize: number, pageIndex: number) {
    this.homeService
      .getHomePageInfo({
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

  onPageChange($event: any) {
    this.getHomePageInfo($event.pageSize, $event.pageIndex);
  }
}
