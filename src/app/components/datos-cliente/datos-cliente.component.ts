import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICliente } from '@interfaces/cliente.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './datos-cliente.component.html',
  styleUrl: './datos-cliente.component.scss'
})
export class DatosClienteComponent implements OnInit {

  form!: FormGroup;
  cliente: ICliente = {} as ICliente;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
  }

  loadData() {
    this.activatedRoute.params.subscribe((params) => {
      this.cliente = JSON.parse(params['cliente']) as ICliente;
      this.form.patchValue({
        primerNombre: this.cliente.primerNombre,
        segundoNombre: this.cliente.segundoNombre,
        primerApellido: this.cliente.primerApellido,
        segundoApellido: this.cliente.segundoApellido,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion,
        ciudadResidencia: this.cliente.ciudadResidencia,
      });
    });
  }

  buildForm() {
    this.form = this.fb.group({
      primerNombre: [{ value: '', disabled: true }],
      segundoNombre: [{ value: '', disabled: true }],
      primerApellido: [{ value: '', disabled: true }],
      segundoApellido: [{ value: '', disabled: true }],
      telefono: [{ value: '', disabled: true }],
      direccion: [{ value: '', disabled: true }],
      ciudadResidencia: [{ value: '', disabled: true }],
    });
  }

  volver(event: Event) {
    event.preventDefault();
    this.router.navigate(['/buscar-cliente']);
  }

}
