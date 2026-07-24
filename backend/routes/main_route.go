package routes

import (
	"fakhri-rasyad/sistem_monitoring_darah/controllers"
	"log"

	"github.com/gofiber/fiber/v3"
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
){
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

  api.Get("/pekerjaan", pekerjCont.GetPekerjaan)
  api.Get("/alergi", alergiCont.GetAlergi)
  api.Get("/pantangan", pantanCont.GetPantangan)
  api.Get("/ppdh", paramDCont.GetParameterPemeriksaanDarah)
  api.Get("/pasien", pasienCont.GetPasien)


  // Submission
  api.Post("/checkup", submitCont.Create)

}
