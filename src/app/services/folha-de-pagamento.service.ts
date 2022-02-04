import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { RequestService } from './global/request.service'
import { environment } from '../../environments/environment';
import { FolhadePagamento2 } from '../interfaces/folha-de-pagamento';

@Injectable({
  providedIn: 'root'
})
export class FolhaDePagamentoService {

  constructor(
    private reqService: RequestService,
  ) { }

  getFolhaDePagamento(): Observable<FolhadePagamento2[]> {
    return this.reqService.get<FolhadePagamento2[]>({}, 'api/v1/folha-de-pagamentos/', environment.apiPermissoes);
  }
}
