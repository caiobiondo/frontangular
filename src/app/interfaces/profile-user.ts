export interface ProfileUser {
  id: number,
  setor: string,
  cnpj: number,
  razao_social: string,
  telefone: number,
  foto: File,
  user: number,
}

export interface File {
  lastModified: number,
  lastModifiedDate: any,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string,
}
