import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuth } from './auth/auth.guard';

/* 
 ангуляр заглядывает в конфигурацию ротутера app.routes.ts 
 и пытается отренедирть на месте то router-outlet то что нужно  
*/

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SearchPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
    canActivate: [canActivateAuth],
  },

  {
    path: 'login',
    component: LoginPageComponent,
  },
];
