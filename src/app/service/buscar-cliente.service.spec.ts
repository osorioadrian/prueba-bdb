import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BuscarClienteService } from './buscar-cliente.service';
import { IBuscar } from '../interfaces/buscar.interface';
import { environment } from '../../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';
import { ICliente } from '../interfaces/cliente.interface';

describe('BuscarClienteService', () => {
  let service: BuscarClienteService;
  let httpMock: HttpTestingController;
  const base_url = environment.apiUrl;
  const mockData: IBuscar = { tipoDocumento: 'CC', numeroDocumento: '123456789' };
  const mockDataResponse: ICliente = {
    primerNombre: 'Juan',
    segundoNombre: 'Carlos',
    primerApellido: 'Perez',
    segundoApellido: 'Gomez',
    telefono: 1234567,
    direccion: 'Calle 123',
    ciudadResidencia: 'Bogota',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BuscarClienteService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(BuscarClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<ICliente>', () => {
    service.obtenerCliente(mockData).subscribe((response) => {
      expect(response).toEqual(mockDataResponse);
    });

    const req = httpMock.expectOne(`${base_url}/obtenerCliente`);
    expect(req.request.method).toBe('POST');
    req.flush(mockDataResponse);
  });
});
