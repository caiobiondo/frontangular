import { Component, OnInit } from '@angular/core';
import { FolhaDePagamento } from 'src/app/interfaces/folha-de-pagamento';

@Component({
  selector: 'app-folha-de-pagamento-list',
  templateUrl: './folha-de-pagamento-list.component.html',
  styleUrls: ['./folha-de-pagamento-list.component.scss']
})
export class FolhaDePagamentoListComponent implements OnInit {

  public folhasDePagamento: FolhaDePagamento[] = [
    {
      calculeType: "111",
      payrollCode: "111",
      coworkerName: "Fulano da Silva",
      addNight: "00:00:00",
      missHour: "00:00:00",
      missHourDST: "00:00:00",
      missHour50: "00:00:00",
      missHour100: "00:00:00",
      salaryAdvanced: 200,
      homeOffice: 200,
      descPI: 200,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
