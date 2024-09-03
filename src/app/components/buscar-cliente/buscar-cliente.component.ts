import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BuscarClienteService } from '@service/buscar-cliente.service';
import { NgClass, NgIf } from '@angular/common';
import { ICliente } from '@interfaces/cliente.interface';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { documentoValidator } from '../../helpers/documentoValidators';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, NgClass, CurrencyMaskModule],
  providers: [ BuscarClienteService ],
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.scss'
})
export class BuscarClienteComponent implements OnInit {
  errorMessage: string | null = null;
  form!: FormGroup;
  public _buscarClienteService = inject(BuscarClienteService);
  public router = inject(Router);

  ngOnInit(): void {
    this.buildForm();
  }

  private readonly formBuilder = inject(FormBuilder);

  buildForm() {
    this.form = this.formBuilder.group({
      tipoDocumento: new FormControl(null, Validators.required),
      numeroDocumento: new FormControl(null, [Validators.required, documentoValidator()]),
    });
  }

  buscar() {
    this._buscarClienteService.obtenerCliente(this.form.value).subscribe({
      next: (resp: ICliente) => {
        this.router.navigate(['/cliente',
          { cliente: JSON.stringify(resp) },
        ],
        { skipLocationChange: true, replaceUrl: false }
      );
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }
}
