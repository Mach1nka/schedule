<<<<<<< HEAD
=======
export interface ResponseFromBack<D> {
  data?: D;
  message?: string;
  errors?: {[ket: string]: string[]};
  status?: number;
}

>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
export interface ParsedResponse<D> {
  data?: D;
  message?: string;
  errors?: {[ket: string]: string[]};
  status?: number;
}
<<<<<<< HEAD
=======

export interface TimeZone {
  TITLE: string,
  VALUE: number,
}
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
