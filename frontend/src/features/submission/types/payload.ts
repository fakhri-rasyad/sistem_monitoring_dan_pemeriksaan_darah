export interface PemeriksaanPayload {
  pasien: {
    pasien_public_id?: string;

    pasien_create?: {
      nama: string;
      alamat: string;
      tempat_lahir: string;
      tanggal_lahir: string;
      nomor_hp: string;
      email: string;
      pekerjaan_public_id: string;
    };
  };

  kunjungan: {
    tanggal: string;
    tensi_sistol: number;
    tensi_diastol: number;
  };

  pemeriksaan: {
    diperiksa_at: string;
    subjective: string;
    objective: string;
    evaluasi: string;
    planning_terapi: string;
  };

  komposisi_tubuh: {
    berat_badan: number;
    tinggi_badan: number;
    indeks_massa_tubuh: number;
    air_tubuh: number;
    massa_lemak: number;
    massa_otot: number;
    massa_tulang: number;
  };

  data_labs: {
    parameter_public_id: string;
    nilai: number;
  }[];

  alergi_pasiens: {
    alergi_public_id: string;
  }[];

  pantangan_pasiens: {
    pantangan_public_id: string;
  }[];
}
