import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BuscarClienteComponent } from './buscar-cliente.component';
import { BuscarClienteService } from '../../service/buscar-cliente.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ICliente } from '../../interfaces/cliente.interface';
import { ReactiveFormsModule } from '@angular/forms';

describe('BuscarClienteComponent', () => {
  let component: BuscarClienteComponent;
  let fixture: ComponentFixture<BuscarClienteComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [BuscarClienteComponent, ReactiveFormsModule],
      providers: [
        { provide: BuscarClienteService, useValue: jasmine.createSpyObj('BuscarClienteService', ['obtenerCliente']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.controls['tipoDocumento']).toBeDefined();
    expect(component.form.controls['numeroDocumento']).toBeDefined();
  });

  it('should call buildForm', () => {
    spyOn(component, 'buildForm');
    component.ngOnInit();
    expect(component.buildForm).toHaveBeenCalled();
  });

  it('should initialize the form', () => {
    component.buildForm();
    expect(component.form).toBeDefined();
    expect(component.form.get('tipoDocumento')).toBeDefined();
    expect(component.form.get('numeroDocumento')).toBeDefined();
  });

  it('should navigate to /cliente with the correct parameters on success', fakeAsync(() => {
    const mockCliente: ICliente = {
      primerNombre: 'John',
      segundoNombre: 'Doe',
      primerApellido: 'Smith',
      segundoApellido: 'Johnson',
      telefono: 1234567,
      direccion: '123 Main St',
      ciudadResidencia: 'Anytown'
    };

    spyOn(component._buscarClienteService, 'obtenerCliente').and.returnValue(of(mockCliente));

    component.form.setValue({ tipoDocumento: 'C', numeroDocumento: '23445322' });

    component.buscar();

    tick();

    expect(component._buscarClienteService.obtenerCliente).toHaveBeenCalledWith(component.form.value);
    expect(component.router.navigate).toHaveBeenCalledWith(
      ['/cliente', { cliente: JSON.stringify(mockCliente) }],
      { skipLocationChange: true, replaceUrl: false }
    );
  }));

  it('should set errorMessage on error', fakeAsync(() => {
      const mockError = { error: { message: 'Error message' } };
      spyOn(component._buscarClienteService, 'obtenerCliente').and.returnValue(throwError(() => mockError));

      component.form.setValue({ tipoDocumento: 'C', numeroDocumento: '12345678' });
      component.buscar();
      tick();

      expect(component._buscarClienteService.obtenerCliente).toHaveBeenCalledWith(component.form.value);
      expect(component.errorMessage).toBe('Error message');
  }));

});
