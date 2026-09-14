package dto

type SubmissionCreate struct {
	Pasien                 PasienReference               `json:"pasien"`
	AlergiPasiens          []AlergiPasienCreate          `json:"alergi_pasiens"`
	PantanganPasiens       []PantanganPasienCreate       `json:"pantangan_pasiens"`
	RiwayatPenyakitPasiens []RiwayatPenyakitPasienCreate `json:"riwayat_penyakit_pasiens"`
	Kunjungan              KunjunganCreate               `json:"kunjungan"`
	KomposisiTubuh         KomposisiTubuhCreate          `json:"komposisi_tubuh"`
	DataLabs               []DataLabCreate               `json:"data_labs"`
	Pemeriksaan            PemeriksaanCreate             `json:"pemeriksaan"`
	Tagihan                TagihanCreate                 `json:"tagihan"`
}
