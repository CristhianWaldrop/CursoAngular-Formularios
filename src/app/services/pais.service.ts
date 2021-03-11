import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient ) { }

  // tslint:disable-next-line: typedef
  getPaises() {

    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map( (paises: any[]) => {
          return paises.map( pais => ({ nombre: pais.name, codigo: pais.alpha3Code }) );
        })
      );
  }
}
