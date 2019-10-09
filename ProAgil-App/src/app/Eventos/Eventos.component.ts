import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale  } from 'ngx-bootstrap/locale';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
defineLocale('pt-br', ptBrLocale);

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
  registerForm: FormGroup;


  _filtroLista = '';

  constructor(private eventoService: EventoService, private modalService: BsModalService, private localeService: BsLocaleService) {
    localeService.use('pt-br');
  }


  // showDt() {
  //   this.localeService.use(this.locale);
  // }
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
  this.validation();
  this.getEventos();

  // this.showDt();

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

  validation() {
    this.registerForm = new FormGroup({
      tema: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
      local: new FormControl('', Validators.required ),
      dataEvento: new FormControl('', Validators.required),
      qtdPessoas: new FormControl('', [Validators.required, Validators.max(120000)] ),
      imagemURL: new FormControl('', Validators.required ),
      telefone: new FormControl('', Validators.required ),
      email: new FormControl('', [Validators.required, Validators.email] ),
      

      
    })
  }

  salvarAlteracao() {

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
