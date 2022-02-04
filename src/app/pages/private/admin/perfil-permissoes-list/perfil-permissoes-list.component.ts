import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortEvent } from 'primeng/api';
import { PerfilDeAcesso } from 'src/app/interfaces/perfil-permissoes';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-permissoes-list',
  templateUrl: './perfil-permissoes-list.component.html',
  styleUrls: ['./perfil-permissoes-list.component.scss']
})
export class PerfilPermissoesListComponent implements OnInit {

  users: Usuarios[] = [
    // { name: 'fulano', email: 'qwe@qwe.com', group: 'filiar 1', setor: 'suporte ti', perfil: '1' },
    // { name: 'beltrano', email: 'asd@asd.com', group: 'filiar 1', setor: 'suporte ti', perfil: '1' },
  ];
  groupPerfilList: PerfilDeAcesso[] = [
    { id: '1', nome_perfil_permissao: 'Contabil', permissoes: [] },
    { id: '2', nome_perfil_permissao: 'Administrativo', permissoes: [] },
    { id: '3', nome_perfil_permissao: 'RH', permissoes: [] },
  ];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // endpoint para pegar a lista de colaboradores
    this.usuarioService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
    // endpoint para pegar a lista de perfis da empresa
    // ... this.groupPerfilList = groupPerfilList;
  }

  openUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      let value1 = data1[event.field || 0];
      let value2 = data2[event.field || 0];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return ((event.order || 0) * result);
    });
  }

  onUpdateUser(user: Usuarios) {
    this.usuarioService.updateUser(user.id, user).subscribe({
      next: () => { this.toastr.success('Usuário atualziado com sucesso!', 'Sucesso'); }
    })
  }
}
