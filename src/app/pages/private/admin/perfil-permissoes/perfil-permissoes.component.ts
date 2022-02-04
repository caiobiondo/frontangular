import { Component, OnDestroy, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IEmpresa } from 'src/app/interfaces/Empresas';
import { PerfilPermissoesService } from 'src/app/services/perfil-permissoes.service';
import { PerfilDeAcesso, PerfilPermissoes, Permissoes, UpdatePermissao } from 'src/app/interfaces/perfil-permissoes';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-permissoes',
  templateUrl: './perfil-permissoes.component.html',
  styleUrls: ['./perfil-permissoes.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PerfilPermissoesComponent implements OnInit, OnDestroy {

  [key: string]: any; // nome de variavel dinamico
  private unsubscribe$ = new Subject<void>();
  public selectedId: number = 0;
  public selectedEmpresa: IEmpresa | undefined = {} as IEmpresa;
  public empresas: IEmpresa[] = [
    // {
    //   id: 1,
    //   razaosocial: "BRUNETTO",
    //   cnpj: "41705379000112",
    //   ativo: true
    // },
  ];
  public perfilPermissoesList: PerfilPermissoes[] = [
    // {
    //   id: '',
    //   nome: 'Contabil',
    //   empresa: {
    //     id: 1,
    //     razaosocial: "BRUNETTO",
    //     cnpj: "41705379000112",
    //     ativo: true
    //   },
    //   perfil_de_acesso: [
    //     {
    //       id: '',
    //       nome_perfil_permissao: 'Cadastro',
    //       permissoes: [
    //         {
    //           id: '0',
    //           nome_permissao: "Cadastro de usuario",
    //           ativo: false
    //         }
    //       ]
    //     }
    //   ],
    // }
  ];

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
    private perfilPermissoesService: PerfilPermissoesService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;

    (this.empresaService.getEmpresas())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (resp) => {
          this.empresas = resp;
          console.log(resp);
        },
        closed: true
      });
  }

  onCnpj(event: any) {
    this.selectedId = event.target.value;
    this.selectedEmpresa = this.empresas.find(empresa => empresa.id === this.selectedId)
    this.getPerfilPermissoesEmpresa('' + this.selectedEmpresa?.cnpj);
  }

  openUrl(url: string) {
    this.router.navigateByUrl(`${url}/${this.selectedId}`);
  }

  openCard(code: string) {
    this['' + code] = !this['' + code];
  }

  openModal(pp: PerfilPermissoes) {
    console.log('Oi Modal:');
    this.confirmationService.confirm({
      message: `Você quer realmente deletar esse perfil de permissão "${pp.nome}" ?`,
      header: 'Deletar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.perfilPermissoesService.deletePerfilPermissoesById(pp.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.toastr.success('Perfil deletado com sucesso!', 'Sucesso');
            }
          });
      },
      reject: () => {
        this.toastr.warning('Você cancelou a ação!', 'Cancelar');
      },

    });
  }

  getPerfilPermissoesEmpresa(cnpj: string) {
    (this.perfilPermissoesService.getPerfilPermissoesList(cnpj))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (perfilPermissoes: PerfilPermissoes[]) => {
          perfilPermissoes.forEach((pp: PerfilPermissoes) => {
            this.perfilPermissoesList.push(
              {
                id: pp.id,
                empresa: pp.empresa,
                nome: pp.nome,
                perfil_de_acesso: pp.perfil_de_acesso,
                show: false
              }
            )
          })
        }
      })
  }

  updatePermissao(permissao: Permissoes, acesso: PerfilDeAcesso) {
    const obj: UpdatePermissao = {
      empresa: this.selectedEmpresa?.id,
      nome: this.selectedEmpresa?.razao_social,
      perfil_de_acesso: [
        {
          id: acesso.id,
          nome_perfil_permissao: acesso.nome_perfil_permissao,
          permissoes: [
            {
              id: permissao.id,
              nome_permissao: permissao.nome_permissao,
              ativo: permissao.ativo
            }
          ]
        }
      ]
    }
    this.perfilPermissoesService.updatePerfilPermissoes(obj)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.toastr.success('Atualização feita com sucesso!', 'Sucesso');
        },
        error: () => {
          this.toastr.error('Não foi possível atualizar a permissão, tente novamente', 'Erro');
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
