import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  _filtrolista = '';

  get filtroLista() {
    return this._filtrolista;
  }
  set filtroLista(value: string) {
    this._filtrolista = value;
    this.eventosfiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosfiltrados: any = [];
  eventos: any = [];
  imagemlargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
    this.eventosfiltrados = this.eventos;
  }


    filtrarEventos(filtrarPor: string): any {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }


  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
    this.http.get('http://localhost:5000/api/values').subscribe(data => {
      this.eventos = data;
      console.log(this.eventos);
    },
    error => {
      console.log(error);
    }

    );
  }

}
