package routes

import (
	"fakhri-rasyad/sistem_monitoring_darah/config"
	"fakhri-rasyad/sistem_monitoring_darah/controllers"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/joho/godotenv"
)

func Setup(
	app *fiber.App,
	submitCont controllers.SubmissionController,
	alergiCont controllers.AlergiController,
	pantanCont controllers.PantanganController,
	rwytPyktCont controllers.RiwayatPenyakitController,
	pekerjCont controllers.PekerjaanController,
	pasienCont controllers.PasienController,
	kunjugCont controllers.KunjunganController,
	paramDCont controllers.ParameterPemeriksaanDarahController,
	exportCont controllers.ExportController,
) {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("No .env file found, using environment variables")
	}

	api := app.Group("/api/v1")
	// api.Use(jwtware.New(jwtware.Config{
	//     SigningKey: jwtware.SigningKey{Key: []byte(config.APPConfig.JWTSecret)},
	//     Extractor: extractors.FromAuthHeader("Bearer"),
	//     ErrorHandler: func(c fiber.Ctx, err error) error {
	//         return utils.UnauthorizedReponse(c, "User unauthorized", err)
	//     },
	// }))

	api.Use(cors.New(
		cors.Config{
			AllowOrigins: []string{config.APPConfig.FRONTENDUrl},
			AllowMethods: []string{
				"GET",
				"POST",
				"PUT",
				"PATCH",
				"DELETE",
				"OPTIONS",
			},
			AllowHeaders: []string{
				"Origin",
				"Content-Type",
				"Accept",
				"Authorization",
			},
			ExposeHeaders: []string{"Content-Disposition"},
		},
	))

	api.Get("/pekerjaan", pekerjCont.GetPekerjaan)
	api.Post("/pekerjaan", pekerjCont.CreatePekerjaan)
	api.Delete("/pekerjaan", pekerjCont.Delete)

	api.Get("/alergi", alergiCont.GetAlergi)
	api.Post("/alergi", alergiCont.CreateAlergi)
	api.Delete("/alergi", alergiCont.Delete)

	api.Get("/pantangan", pantanCont.GetPantangan)
	api.Post("/pantangan", pantanCont.CreatePantangan)
	api.Delete("/pantangan", pantanCont.Delete)

	api.Get("/riwayat_penyakit", rwytPyktCont.GetRiwayatPenyakit)
	api.Post("/riwayat_penyakit", rwytPyktCont.CreateRiwayatPenyakit)
	api.Delete("/riwayat_penyakit", rwytPyktCont.Delete)

	api.Get("/ppdh", paramDCont.GetParameterPemeriksaanDarah)
	api.Post("/ppdh", paramDCont.CreateParameterPemeriksaanDarah)
	api.Delete("/ppdh", paramDCont.Delete)

	api.Get("/pasien", pasienCont.GetAllWithPreload)
	api.Patch("/pasien", pasienCont.Update)
	api.Get("/pasien/export", exportCont.ExportUser)
	api.Get("/pasien/detail", pasienCont.GetPasienByPublicIDWithPreload)
	api.Delete("/pasien", pasienCont.Delete)

	api.Get("/kunjungan/:public_id", kunjugCont.GetKunjunganByPublicID)
	api.Get("/kunjungan", kunjugCont.GetKunjunganList)
	api.Delete("/kunjungan", kunjugCont.Delete)

	// Submission
	api.Post("/checkup", submitCont.FirstKunjunganSubmissionCreate)
	api.Post("/kunjungan/followup", submitCont.KunjunganSubmissionCreate)

}
