import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from 'primeng/paginator';
import {CardModule} from 'primeng/card';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {AvatarsComponent} from "./avatars/avatars.component";
import {VideoBannerComponent} from './video-banner/video-banner.component';
import {LawsComponent} from './laws/laws.component';
import {FooterComponent} from './footer/footer.component';
import {RegulatorsComponent} from './regulators/regulators.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AvatarsComponent,
    VideoBannerComponent,
    LawsComponent,
    FooterComponent,
    RegulatorsComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    CardModule,
    SelectButtonModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    AccordionModule,
    ProgressSpinnerModule
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentsModule {
}
