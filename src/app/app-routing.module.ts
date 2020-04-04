import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreditsComponent } from './pages/credits/credits.component';


const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "privacy", component: PrivacyComponent
  },
  {
    path: "credits", component: CreditsComponent
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
