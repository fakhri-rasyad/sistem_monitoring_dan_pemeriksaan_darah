package routes

import (
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
	pekerjCont controllers.PekerjaanController,
	pasienCont controllers.PasienController,
	kunjugCont controllers.KunjunganController,
	paramDCont controllers.ParameterPemeriksaanDarahController,
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
			AllowOrigins: []string{"http://localhost:3000"},
			AllowMethods: []string{"GET", "POST"},
		},
	))

	api.Get("/pekerjaan", pekerjCont.GetPekerjaan)
	api.Get("/alergi", alergiCont.GetAlergi)
	api.Get("/pantangan", pantanCont.GetPantangan)
	api.Get("/ppdh", paramDCont.GetParameterPemeriksaanDarah)
	api.Get("/pasien", pasienCont.GetAllWithPreload)

	api.Get("/pasien/detail", pasienCont.GetPasienByPublicIDWithPreload)

	api.Get("/kunjungan", kunjugCont.GetKunjunganList)

	// Submission
	api.Post("/checkup", submitCont.Create)

}
