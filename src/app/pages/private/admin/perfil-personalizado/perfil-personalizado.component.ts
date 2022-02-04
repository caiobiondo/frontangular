import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IEmpresa } from 'src/app/interfaces/Empresas';
import { UpdatePermissao } from 'src/app/interfaces/perfil-permissoes';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PerfilPermissoesService } from 'src/app/services/perfil-permissoes.service';

@Component({
  selector: 'app-perfil-personalizado',
  templateUrl: './perfil-personalizado.component.html',
  styleUrls: ['./perfil-personalizado.component.scss'],
})
export class PerfilPersonalizadoComponent implements OnInit, OnDestroy {

  perfilPersonalizadoForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nomePerfilPersonalizado: new FormControl('Nome do Perfil *', [Validators.required]),

    folhaDePagamentoEnviar: new FormControl(false),
    folhaDePagamentoVisualizar: new FormControl(false),
    folhaDePagamentoBaixar: new FormControl(false),
    folhaDePagamentoPreencher: new FormControl(false),

    solicitacoesAbrir: new FormControl(false),
    solicitacoesVisualizar: new FormControl(false),
  });
  private unsubscribe$ = new Subject<void>();
  public empresa: IEmpresa = {} as IEmpresa;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private perfilPermissoesService: PerfilPermissoesService,
    private empresaService: EmpresaService,
    private toastr: ToastrService
  ) {
    if (this.route.snapshot.params.id != undefined && this.route.snapshot.params.modulo != undefined) {
      this.perfilPersonalizadoForm.patchValue({
        id: this.route.snapshot.params.id,
        nomePerfilPersonalizado: this.route.snapshot.params.modulo,
      });

    } else if (this.route.snapshot.params.id != undefined) {
      this.perfilPersonalizadoForm.patchValue({
        id: this.route.snapshot.params.id,
      });
    }

  }

  ngOnInit(): void {
    this.empresaService.getEmpresaById(this.perfilPersonalizadoForm.controls['id'].value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (empresa: IEmpresa) => { this.empresa = empresa }
      });
  }

  save() {
    if (this.perfilPersonalizadoForm.valid) {
      const obj: UpdatePermissao = {
        empresa: 0,
        nome: this.empresa.razao_social,
        perfil_de_acesso: [
          {
            id: '0',
            nome_perfil_permissao: 'Folha de Pagamento',
            permissoes: [
              {
                id: '0',
                nome_permissao: 'Enviar Folha de Pagamento',
                ativo: this.perfilPersonalizadoForm.controls['folhaDePagamentoEnviar'].value
              },
              {
                id: '0',
                nome_permissao: 'Visualizar Folha de Pagamento',
                ativo: this.perfilPersonalizadoForm.controls['folhaDePagamentoVisualizar'].value
              },
              {
                id: '0',
                nome_permissao: 'Baixar Folha de Pagamento',
                ativo: this.perfilPersonalizadoForm.controls['folhaDePagamentoBaixar'].value
              },
              {
                id: '0',
                nome_permissao: 'Preencher Folha de Pagamento',
                ativo: this.perfilPersonalizadoForm.controls['folhaDePagamentoPreencher'].value
              }
            ]
          },
          {
            id: '0',
            nome_perfil_permissao: 'Solicitações',
            permissoes: [
              {
                id: '0',
                nome_permissao: 'Abrir Solicitações',
                ativo: this.perfilPersonalizadoForm.controls['solicitacoesAbrir'].value
              },
              {
                id: '0',
                nome_permissao: 'Visualizar Solicitações',
                ativo: this.perfilPersonalizadoForm.controls['solicitacoesVisualizar'].value
              },
            ]
          }
        ]
      }

      this.perfilPermissoesService.createPerfilPermissoes(obj).subscribe({
        next: () => {
          this.toastr.success('Perfil criado com sucesso!', 'Sucesso');
          this.router.navigateByUrl('/admin/perfil-permissoes');
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
