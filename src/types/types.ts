export interface ResponseFromBack<D> {
  data?: D;
  message?: string;
  errors?: {[ket: string]: string[]};
  status?: number;
}

export interface ParsedResponse<D> {
  data?: D;
  message?: string;
  errors?: {[ket: string]: string[]};
  status?: number;
}
