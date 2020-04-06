import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { KeepersComponent } from './pages/keepers/keepers.component';
import { AreasComponent } from './pages/areas/areas.component';


const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "contact", component: ContactComponent
  },
  {
    path: "privacy", component: PrivacyComponent
  },
  {
    path: "areas", component: AreasComponent
  },
  {
    path: "areas/:id", component: AreasComponent
  },
  {
    path: "credits", component: CreditsComponent
  },
  {
    path: "credits/:id", component: CreditsComponent
  },
  {
    path: "keepers", component: KeepersComponent
  },
  {
    path: "notifications", component: NotificationsComponent
  },
  {
    path: "", redirectTo: "home", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
