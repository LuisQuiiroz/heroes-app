import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    // Lazyload
    // Funcion que carga los hijos, importandolos, y cuando se resuelve (.then()), carga ese respectivo module
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( module => module.HeroesModule),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
    
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
