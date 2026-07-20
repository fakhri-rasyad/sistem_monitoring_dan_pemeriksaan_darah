package routes

import (
	"fakhri-rasyad/sistem_monitoring_darah/config"
	"fakhri-rasyad/sistem_monitoring_darah/controllers"
	"fakhri-rasyad/sistem_monitoring_darah/utils"
	"log"

	jwtware "github.com/gofiber/contrib/v3/jwt"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/extractors"
	"github.com/joho/godotenv"
)

func Setup(
	app *fiber.App,
  submitCont controllers.SubmissionController,
){
  err := godotenv.Load(".env")
  if err != nil {
    log.Println("No .env file found, using environment variables")
  }

  api := app.Group("/api/v1")
  api.Use(jwtware.New(jwtware.Config{
      SigningKey: jwtware.SigningKey{Key: []byte(config.APPConfig.JWTSecret)},
      Extractor: extractors.FromAuthHeader("Bearer"),
      ErrorHandler: func(c fiber.Ctx, err error) error {
          return utils.UnauthorizedReponse(c, "User unauthorized", err)
      },
  }))

  // Submission
  api.Post("/checkup", submitCont.Create)

}
