import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { MainComponent } from './components/main/main.component';
import { NewHomePageComponent } from './components/new-home-page/new-home-page.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TeamComponent } from './components/team/team.component';
import { PartnersComponent } from './components/partners/partners.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactComponent } from './components/contact/contact.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { NewMemberComponent } from './components/new-member/new-member.component';
import { NewPartnerComponent } from './components/new-partner/new-partner.component';
import { NewServiceComponent } from './components/new-service/new-service.component';
import { NewAboutComponent } from './components/new-about/new-about.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main',
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },
      {
        path: 'partners',
        component: PartnersComponent,
      },
      {
        path: 'blogs',
        component: BlogsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'new-homepage',
        component: NewHomePageComponent,
      },
      {
        path: 'new-about',
        component: NewAboutComponent,
      },
      {
        path: 'new-blog',
        component: NewBlogComponent,
      },
      {
        path: 'new-contact',
        component: NewContactComponent,
      },
      {
        path: 'new-member',
        component: NewMemberComponent,
      },
      {
        path: 'new-partner',
        component: NewPartnerComponent,
      },
      {
        path: 'new-service',
        component: NewServiceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
