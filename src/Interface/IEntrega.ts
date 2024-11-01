export  interface IEntrega {
    ID: number | null;
    UID: string;
    DATE: string | null;
    VALUE: number;
    KM: number | null;
    TYPE_DELIVERY: number | null;
    USER_ID: { ID: number | null; NAME: string };
    CLIENTE_ID: { ID: number | null; NAME: string };
    ENDERECO_ID: { ID: number | null; NAME: string; OBS?: string };
  }