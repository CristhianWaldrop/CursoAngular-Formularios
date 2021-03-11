import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styles: [
  ]
})
export class TemplatesComponent implements OnInit {

  usuario = {
    nombre: 'Cristhian',
    apellido: 'Molina',
    correo: 'cristhian.waldrop@gmail.com',
    pais: 'VEN',
    genero: 'M'
  };

  paises: any[] = [];

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {

    this.paisService.getPaises().subscribe( paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: '[Seleccione Pais]',
        codigo: ''
      });
      // console.log(this.paises);
    });

  }

  guardar( form: NgForm ): void {
    // console.log(form);

    if (form.invalid) {
      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    console.log(form.value);
    form.reset();
  }

}
