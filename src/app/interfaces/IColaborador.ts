import { IGrupoEmpresa } from './IGrupoEmpresa'

export interface IColaborador {
  id: number,
  nome: string,
  email: string
  grupo: IGrupoEmpresa,
  setor: string,
  perfil: string,
}
