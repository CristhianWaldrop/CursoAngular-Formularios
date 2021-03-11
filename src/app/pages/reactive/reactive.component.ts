import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService) {

    this.crearFormulario();
    this.cargarDataInicial();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get nombreNoValido(): boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(): boolean {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido(): boolean {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido(): boolean {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get ciudadNoValida(): boolean {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get distritoNoValido(): boolean {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get pass1NoValido(): boolean {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido(): boolean {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return ( pass1 === pass2 ) ? false : true;
  }

  get pasatiempos(): FormArray {
    return this.forma.get('pasatiempos') as FormArray;
  }

  crearFormulario(): void {

    this.forma = this.fb.group({
      nombre: [ '', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera] ],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario: [ '', , this.validadores.existeUsuario ],
      pass1: [ '', [Validators.required] ],
      pass2: [ '', [Validators.required] ],
      direccion: this.fb.group({
        distrito: [ '', [Validators.required] ],
        ciudad: [ '', [Validators.required] ]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: [ this.validadores.passwordsIguales('pass1', 'pass2') ]
    });
  }

  cargarDataInicial(): void {

    // this.forma.setValue({
      this.forma.reset({
      nombre: 'Cristhian' ,
      apellido: 'Molina' ,
      correo: 'cristhian@gmail.com' ,
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Distrito capital',
        ciudad: 'Caracas'
      }
    });
  }

  crearListeners(): void {

    // this.forma.valueChanges.subscribe(console.log);
    // this.forma.statusChanges.subscribe(console.log);
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

  agregarPasatiempo(): void {
    this.pasatiempos.push( this.fb.control('') );
  }

  borrarPasatiempo( i: number): void {
    this.pasatiempos.removeAt(i);
  }

  guardar(): void {

    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values( this.forma.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    // Posteo de la información
    // this.forma.reset();
  }

}
