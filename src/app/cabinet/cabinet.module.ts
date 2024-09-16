import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './cabinet.component';
import { MainComponent } from './components/main/main.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { MaterialModule } from '../material.module';
import { TableTogglableColumnsComponent } from './components/shared/table-togglable-columns/table-togglable-columns.component';
import { TableMenuDialogComponent } from '../dialogs/table-menu-dialog/table-menu-dialog.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { NewHomePageComponent } from './components/new-home-page/new-home-page.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { PartnersComponent } from './components/partners/partners.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactComponent } from './components/contact/contact.component';
import { FileUploadModule } from 'primeng/fileupload';
import { NewAboutComponent } from './components/new-about/new-about.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { NewPartnerComponent } from './components/new-partner/new-partner.component';
import { NewServiceComponent } from './components/new-service/new-service.component';
import { NewMemberComponent } from './components/new-member/new-member.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { HomeService } from '../core/services/home.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    CabinetComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    TableTogglableColumnsComponent,
    TableMenuDialogComponent,
    NewHomePageComponent,
    ServicesComponent,
    AboutComponent,
    TeamComponent,
    PartnersComponent,
    BlogsComponent,
    ContactComponent,
    NewAboutComponent,
    NewBlogComponent,
    NewContactComponent,
    NewPartnerComponent,
    NewServiceComponent,
    NewMemberComponent,
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [HomeService,MessageService]
})
export class CabinetModule {}
