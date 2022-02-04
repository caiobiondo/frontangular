import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SortEvent } from 'primeng/api'
import { Solicitacoes } from 'src/app/interfaces/solicitacoes';

@Component({
  selector: 'app-solicitacao-dashboard',
  templateUrl: './solicitacao-dashboard.component.html',
  styleUrls: ['./solicitacao-dashboard.component.scss']
})
export class SolicitacaoDashboardComponent implements OnInit {
  solicitacoes: Solicitacoes[] = [
    {
      cod: '1',
      data_abertura: '10/01/2022',
      titulo: 'qwe',
      topico: 'asd',
      responsavel: 'zxc',
      situacao: 'iop',
    },
  ];
  dateNow: Date = new Date();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      const value1 = data1[event.field || 0]
      const value2 = data2[event.field || 0]
      let result = null

      if (value1 == null && value2 != null) { result = -1 } else if (value1 != null && value2 == null) { result = 1 } else if (value1 == null && value2 == null) { result = 0 } else if (typeof value1 === 'string' && typeof value2 === 'string') { result = value1.localeCompare(value2) } else { result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0 }

      return ((event.order || 0) * result)
    })
  }
}
