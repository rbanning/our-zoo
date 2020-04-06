import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

//material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';

const materialModules = [
  MatToolbarModule,
  MatListModule,
  MatDialogModule,
  MatMenuModule,
  MatSidenavModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
];

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { services } from './services';
import { PageHeaderComponent } from './components/page/page-header/page-header.component';
import { PageFooterComponent } from './components/page/page-footer/page-footer.component';
import { PageLayoutComponent } from './components/page/page-layout/page-layout.component';
import { LogoIconComponent } from './components/icons/logo-icon/logo-icon.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { ExhibitComponent } from './components/exhibit/exhibit.component';
import { KeepersComponent } from './pages/keepers/keepers.component';
import { PanelSliderComponent } from './components/panel-slider/panel-slider.component';
import { CreditBadgeComponent } from './components/credit-badge/credit-badge.component';
import { AreasComponent } from './pages/areas/areas.component';
import { AreaBadgeComponent } from './components/area-badge/area-badge.component';
import { ContactComponent } from './pages/contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageLayoutComponent,
    LogoIconComponent,
    AboutComponent,
    PrivacyComponent,
    NotificationsComponent,
    CreditsComponent,
    ExhibitComponent,
    KeepersComponent,
    PanelSliderComponent,
    CreditBadgeComponent,
    AreasComponent,
    AreaBadgeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HammerModule,
    ReactiveFormsModule,
    materialModules
  ],
  providers: [
    services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
