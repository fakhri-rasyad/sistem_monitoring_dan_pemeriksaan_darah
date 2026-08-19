package controllers

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
)

type AlergiController interface {
	CreateAlergi(ctx fiber.Ctx) error
	GetAlergi(ctx fiber.Ctx) error
}

type AlergiControllerImpl struct {
	s services.AlergiService
}

// CreateSubmit godoc
// @Summary     CreateAlergi
// @Description Endpoint penambahan alergi
// @Tags        Checkup
// @Accept      json
// @Produce     json
// @Param       alergi body dto.AlergiCreate true "Data alergi"
// @Success     200 {object} utils.CreationSuccessResponse
// @Router      /api/v1/alergi [post]
func (c *AlergiControllerImpl) CreateAlergi(ctx fiber.Ctx) error {
	alergiCreate := &dto.AlergiCreate{}
	if err := ctx.Bind().Body(alergiCreate); err != nil {
		return utils.BadRequest(ctx, "Input alergi tidak valid", err)
	}

	data, err := c.s.Create(alergiCreate)
	if err != nil {
		return utils.InternalError(ctx, "Gagal menambahkan alergi", err)
	}

	return utils.CreationSuccess(ctx, "Alergi berhasil ditambahkan", data)
}

// CreateSubmit godoc
// @Summary     CreateAlergi
// @Description Endpoint penambahan alergi
// @Tags        Checkup
// @Accept      json
// @Produce     json
// @Success     200 {object} utils.Response
// @Router      /api/v1/alergi [get]
func (c *AlergiControllerImpl) GetAlergi(ctx fiber.Ctx) error {
	data, err := c.s.GetAll()
	if err != nil {
		return utils.InternalError(ctx, "Gagal mengambil data alergi", err)
	}
	return utils.SuccessResponse(ctx, "Sukses mengambil data alergi", data)
}

func NewAlergiController(s services.AlergiService) AlergiController {
	return &AlergiControllerImpl{s: s}
}
