import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  // providers: [EventoService]
})
export class EventosComponent implements OnInit {

  // tslint:disable-next-line: variable-name

  eventosfiltrados: Evento[];
  eventos: Evento[];
  imagemlargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;

  _filtroLista = '';

  constructor(private eventoService: EventoService, private modalService: BsModalService) { }


  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosfiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  this.getEventos();
    // this.eventosfiltrados = this.eventos;
  }


    filtrarEventos(filtrarPor: string): Evento[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }


  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
      // tslint:disable-next-line: variable-name
      this.eventoService.getAllEvento().subscribe((_eventos: Evento[]) => {
      this.eventos = _eventos;
      // console.log(this.eventos);
      this.eventosfiltrados = this.eventos;
    },
    error => {
      console.log(error);
    }

    );
  }

}
