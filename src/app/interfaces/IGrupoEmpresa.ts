import { IEmpresa } from './Empresas'
import { IAdministrator } from './IAdministrator'
export interface IGrupoEmpresa {
  id: number,
  empresas: IEmpresa[],
  grupo: string,
  administrador?: IAdministrator
}
