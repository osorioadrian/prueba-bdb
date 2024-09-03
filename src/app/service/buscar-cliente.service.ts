import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBuscar } from '@interfaces/buscar.interface';
import { environment } from '../../environments/environment.development';
import { ICliente } from '@interfaces/cliente.interface';

const base_url = environment.apiUrl;

@Injectable()
export class BuscarClienteService {

  private http = inject(HttpClient);

  obtenerCliente(data: IBuscar): Observable<ICliente> {
    const apiUrl = `${base_url}/obtenerCliente`;

    return this.http.post<ICliente>(apiUrl, data);
  }
}
