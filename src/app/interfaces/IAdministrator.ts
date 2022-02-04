import { IEmpresa } from './Empresas'
export interface IAdministrator {
  empresa?: IEmpresa,
  nome: string,
  email: string
}
