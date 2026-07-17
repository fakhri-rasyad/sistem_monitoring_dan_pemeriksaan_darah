DROP INDEX "pasiens_nama_index";
DROP INDEX "pasiens_public_id_index";
DROP INDEX "pasiens_pekerjaan_index";

ALTER TABLE "pasiens"
DROP CONSTRAINT "pasiens_pekerjaan_fk";

DROP TABLE IF EXISTS "pasiens";
