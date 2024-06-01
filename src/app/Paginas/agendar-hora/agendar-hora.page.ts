import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendar-hora',
  templateUrl: './agendar-hora.page.html',
  styleUrls: ['./agendar-hora.page.scss'],
})
export class AgendarHoraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selectedDateTime: string | undefined;
}
