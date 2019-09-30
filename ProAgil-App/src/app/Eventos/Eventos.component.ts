import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  _filtroLista = '';

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosfiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  eventosfiltrados: any = [];
  eventos: any = [];
  imagemlargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  constructor(private eventoService: EventoService ) { }

  ngOnInit() {
  this.getEventos();
    // this.eventosfiltrados = this.eventos;
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
      this.eventoService.getEvento().subscribe(data => {
      this.eventos = data;
      // console.log(this.eventos);
      this.eventosfiltrados = this.eventos;
    },
    error => {
      console.log(error);
    }

    );
  }

}
