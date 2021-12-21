import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, of, map } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Auth } from '../pages/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth}
  }

  constructor( private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {
    if( !localStorage.getItem('token') ){
      // of()  regresa un observable booleano
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              map( auth => {
                // console.log('map', auth);
                this._auth = auth;
                return true;
              })
            );

  }



  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              // el tap() es para generrar efectos secundarios antes del llegar al subcribe
              tap( auth => this._auth = auth),
              tap( auth => localStorage.setItem( 'token', auth.id ))
            );
  }
  logout(){
    this._auth = undefined;
  }
}
