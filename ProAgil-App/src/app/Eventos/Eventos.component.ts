import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any = [
    {
      EventoId: 1,
      Tema: 'Angular',
      Local: 'Belo Horizonte'
    },
    {
      EventoId: 2,
      Tema: '.NET Corer',
      Local: 'São Paulo'
    },
    {
      EventoId: 3,
      Tema: 'Angular e .NET Core',
      Local: 'Rio de Janeiro'
    }

  ];

  constructor() { }

  ngOnInit() {
  }

}
