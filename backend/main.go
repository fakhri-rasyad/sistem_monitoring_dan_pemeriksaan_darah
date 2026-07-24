package main

import (
	"fakhri-rasyad/sistem_monitoring_darah/config"
	"fakhri-rasyad/sistem_monitoring_darah/controllers"
	"fakhri-rasyad/sistem_monitoring_darah/repositories"
	"fakhri-rasyad/sistem_monitoring_darah/routes"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"log"

	_ "fakhri-rasyad/sistem_monitoring_darah/docs"

	"github.com/gofiber/contrib/v3/swaggo"
	"github.com/gofiber/fiber/v3"
)

// File utama project
// @title           Blood checkup monitoring system
// @version         1.0
// @description     API untuk sistem integrasi monitoring dan logging hasil pemeriksaan darah
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:3200
// @BasePath  /

// @securityDefinitions.apiKey  ApiKeyAuth
// @in                          header
// @name                        Authorization
// @description                 Type "Bearer" followed by a space and JWT token.

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
  config.LoadEnv()
  config.ConnectToDB()

  app := fiber.New()

  app.Get("/swagger/*", swaggo.HandlerDefault)
    app.Get("/docs/*", swaggo.New(swaggo.Config{
        URL:               "http://example.com/doc.json",
        DeepLinking:       false,
        DocExpansion:      "none",
        OAuth2RedirectUrl: "http://localhost:3100/swagger/oauth2-redirect.html",
    }))


  alergiRepo := repositories.NewAlergiRepo(config.DB)
  alePasRepo := repositories.NewAlergiPasienRepo(config.DB)
  pantanRepo := repositories.NewPantanganRepo(config.DB)
  panPasRepo := repositories.NewPantanganPasienRepo(config.DB)
  pemeDhRepo := repositories.NewParameterPemeriksaanDarah(config.DB)
  pekerjRepo := repositories.NewPekerjaanRepo(config.DB)
  pasienRepo := repositories.NewPasienRepo(config.DB)
  kunjunRepo := repositories.NewKunjunganRepo(config.DB)
  komposRepo := repositories.NewKomposisiTubuhRepo(config.DB)
  pemeriRepo := repositories.NewPemeriksaanRepo(config.DB)
  dataLbRepo := repositories.NewDataLabRepo(config.DB)

  submitServ := services.NewSubmitService(
    pekerjRepo,
    pasienRepo,
    alergiRepo,
    pantanRepo,
    alePasRepo,
    panPasRepo,
    kunjunRepo,
    komposRepo,
    pemeDhRepo,
    dataLbRepo,
    pemeriRepo,
  )
  alergiServ := services.NewAlergiService(alergiRepo)
  pantanServ := services.NewPantanganService(pantanRepo)
  pekerjServ := services.NewPekerjaanService(pekerjRepo)
  pasienServ := services.NewPasienService(pasienRepo)
  kunjugServ := services.NewKunjunganService(kunjunRepo)
  parmDhServ := services.NewParameterPemeriksaanDarahService(pemeDhRepo)

  submitCont := controllers.NewSubmissionCont(submitServ)
  alergiCont := controllers.NewAlergiController(alergiServ)
  pantanCont := controllers.NewPantanganController(pantanServ)
  pekerjCont := controllers.NewPekerjaanController(pekerjServ)
  pasienCont := controllers.NewPasienController(pasienServ)
  kunjugCont := controllers.NewKunjunganController(kunjugServ)
  paramDCont := controllers.NewParameterPemeriksaanDarahController(parmDhServ)

  routes.Setup(
    app,
    submitCont,
    alergiCont,
    pantanCont,
    pekerjCont,
    pasienCont,
    kunjugCont,
    paramDCont,
  )

  port := config.APPConfig.APPPort
  log.Print("App running on port: ", port)
  log.Fatal(app.Listen(":" + port))
}
