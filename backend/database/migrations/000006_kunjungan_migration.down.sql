DROP INDEX "kunjungans_pasien_index";

ALTER TABLE "kunjungans"
DROP CONSTRAINT "kunjungans_pasien_fk";

DROP TABLE IF EXISTS "kunjungans";
