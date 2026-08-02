export interface SelectOption {
  public_id: string;
  nama: string;
}

export interface ParameterResponse {
  public_id: string;
  nama: string;
  satuan: string;
}

export interface PasienResponse {
  public_id: string;
  nama: string;
}

export interface PekerjaanResponse extends SelectOption { }

export interface PantanganResponse extends SelectOption { }

export interface AlergiResponse extends SelectOption { }
