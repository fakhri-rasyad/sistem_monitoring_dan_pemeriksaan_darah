export interface SelectOption {
  public_id: string;
  nama: string;
}

export interface ParameterOption extends SelectOption {
  satuan: string;
}
