package main

import (
	"fakhri-rasyad/sistem_monitoring_darah/config"
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

  // #### Routing ####
  // routes.Setup(
  //   app,
  // )

  port := config.APPConfig.APPPort
  log.Print("App running on port: ", port)
  log.Fatal(app.Listen(":" + port))
}
