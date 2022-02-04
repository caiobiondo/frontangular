import { IEmpresa } from "./Empresas";

export interface PerfilPermissoes {
  id: string,
  empresa: IEmpresa,
  nome: string,
  show?: boolean,
  perfil_de_acesso: PerfilDeAcesso[],
}

export interface PerfilDeAcesso {
  id: string,
  nome_perfil_permissao: string,
  permissoes: Permissoes[],
}
export interface Permissoes {
  id: string,
  nome_permissao: string,
  ativo: boolean
}

export interface UpdatePermissao {
  empresa: number | undefined,
  nome: string | undefined,
  perfil_de_acesso: PerfilDeAcesso[]
}
