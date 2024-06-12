export interface MiseADisposition {
  codeMAD?: number;
  client?: { code: string };
  responsable?: { codeResponsable: string };
  createdAt?: Date;
  state: string;
  livrer: boolean;
  chequesBancaires: boolean;
  titresDePaiement: boolean;
  documentsBancaires: boolean;
  documentsConfidentiels: boolean;
}
