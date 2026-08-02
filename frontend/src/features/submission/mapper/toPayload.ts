// import { PemeriksaanFormValues } from "../schema/pemeriksaan_schema";

// export function toPayload(data: PemeriksaanFormValues) {
//   return {
//     pasien: data.patientMode === "existing"
//       ? {
//         pasien_public_id: data.pasienPublicID!,
//       }
//       : {
//         pasien_create: {
//           nama: data.pasien.nama,
//           alamat: data.pasien.alamat,
//           tempat_lahir: data.pasien.tempatLahir,
//           tanggal_lahir: data.pasien.tanggalLahir.toISOString(),
//           nomor_hp: data.pasien.nomorHP,
//           email: data.pasien.email,
//           pekerjaan_public_id: data.pasien.pekerjaanPublicID,
//         },
//       },

//     kunjungan: {
//       tanggal: data.kunjungan.tanggal.toISOString(),
//       tensi_sistol: data.kunjungan.tensiSistol,
//       tensi_diastol: data.kunjungan.tensiDiastol,
//     },

//     pemeriksaan: {
//       diperiksa_at: data.pemeriksaan.diperiksaAt.toISOString(),
//       subjective: data.pemeriksaan.subjective,
//       objective: data.pemeriksaan.objective,
//       evaluasi: data.pemeriksaan.evaluasi,
//       planning_terapi: data.pemeriksaan.planningTerapi,
//     },

//     komposisi_tubuh: {
//       tinggi_badan: data.komposisiTubuh.tinggiBadan,
//       berat_badan: data.komposisiTubuh.beratBadan,
//       indeks_massa_tubuh: data.komposisiTubuh.indeksMassaTubuh,
//       air_tubuh: data.komposisiTubuh.airTubuh,
//       massa_otot: data.komposisiTubuh.massaOtot,
//       massa_tulang: data.komposisiTubuh.massaTulang,
//       massa_lemak: data.komposisiTubuh.massaLemak,
//     },

//     alergi_pasiens: data.alergi.map((id) => ({
//       alergi_public_id: id,
//     })),

//     pantangan_pasiens: data.pantangan.map((id) => ({
//       pantangan_public_id: id,
//     })),

//     data_labs: data.dataLabs.map((lab) => ({
//       parameter_public_id: lab.parameterPublicID,
//       nilai: lab.nilai,
//     })),
//   };
// }
