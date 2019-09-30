import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
baseURl = 'httl//localhost:5000/api/evento';
  constructor(private http: HttpClient) { }

getEvento() {

  return this.http.get(this.baseURl);

}


}
