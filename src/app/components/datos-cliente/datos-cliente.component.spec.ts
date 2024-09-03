import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosClienteComponent } from './datos-cliente.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ICliente } from '../../interfaces/cliente.interface';

describe('DatosClienteComponent', () => {
  let component: DatosClienteComponent;
  let fixture: ComponentFixture<DatosClienteComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockCliente: ICliente = {
    primerNombre: 'John',
    segundoNombre: 'Doe',
    primerApellido: 'Smith',
    segundoApellido: 'Johnson',
    telefono: 1234567,
    direccion: '123 Main St',
    ciudadResidencia: 'Anytown'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosClienteComponent, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ cliente: JSON.stringify(mockCliente) })
          }
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosClienteComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call buildForm and loadData', () => {
    spyOn(component, 'buildForm').and.callThrough();
    spyOn(component, 'loadData').and.callThrough();

    component.ngOnInit();

    expect(component.buildForm).toHaveBeenCalled();
    expect(component.loadData).toHaveBeenCalled();
  });

  it('should initialize the form with disabled controls', () => {
    component.buildForm();
    expect(component.form.controls['primerNombre'].disabled).toBeTrue();
    expect(component.form.controls['segundoNombre'].disabled).toBeTrue();
    expect(component.form.controls['primerApellido'].disabled).toBeTrue();
    expect(component.form.controls['segundoApellido'].disabled).toBeTrue();
    expect(component.form.controls['telefono'].disabled).toBeTrue();
    expect(component.form.controls['direccion'].disabled).toBeTrue();
    expect(component.form.controls['ciudadResidencia'].disabled).toBeTrue();
  });

  it('should load data from route params and patch the form', () => {
    component.loadData();
    expect(component.cliente).toEqual(mockCliente);
    expect(component.form.value).toEqual({
      primerNombre: mockCliente.primerNombre,
      segundoNombre: mockCliente.segundoNombre,
      primerApellido: mockCliente.primerApellido,
      segundoApellido: mockCliente.segundoApellido,
      telefono: mockCliente.telefono,
      direccion: mockCliente.direccion,
      ciudadResidencia: mockCliente.ciudadResidencia
    });
  });

  it('should navigate to /buscar-cliente', () => {
    spyOn(router, 'navigate');
    const event = new Event('click');
    spyOn(event, 'preventDefault');

    component.volver(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/buscar-cliente']);
  });
});
