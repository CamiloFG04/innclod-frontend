// Generated by https://quicktype.io

export interface Document {
  success: boolean;
  data: Data;
}

export interface Data {
  documentos: Documento[];
  procesos: Proceso[];
  tipos: Tipo[];
}

export interface Documento {
  DOC_ID: number;
  DOC_NOMBRE: string;
  DOC_CODIGO: string;
  DOC_CONTENIDO: string;
  DOC_ID_TIPO: number;
  DOC_ID_PROCESO: number;
  TIP_NOMBRE: string;
  PRO_NOMBRE: string;
}

export interface Proceso {
  PRO_ID: number;
  PRO_NOMBRE: string;
}

export interface Tipo {
  TIP_ID: number;
  TIP_NOMBRE: string;
}
