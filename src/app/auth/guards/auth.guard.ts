import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean> | boolean {
      // if (this.authService.auth.id) {
      //   return true; 
      // }
      // console.log('Bloqueado por el authGuard - canActivcate');
      // return false; 
      return this.authService.verificaAutenticacion()
              .pipe(
                tap(estaAutenticado => {
                  if ( !estaAutenticado ) {
                    this.router.navigate(['./auth/login']);
                  }
                })
              );

  }

  // esto es para cargar un modulo
  canLoad(
    route: Route, 
    segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
      
      return this.authService.verificaAutenticacion()
              .pipe(
                tap(estaAutenticado => {
                  if ( !estaAutenticado ) {
                    this.router.navigate(['./auth/login']);
                  }
                })
              );
      
      // if (this.authService.auth.id) {
      //   return true; // se podrá cargar el modulo
      // }

      // // console.log('canLoad', false);
      // // console.log(route);
      // // console.log(segments);

      // console.log('Bloqueado por el authGuard - canLoad');

      // return false; // No se podrá ingresar a la ruta

      
  }
}
