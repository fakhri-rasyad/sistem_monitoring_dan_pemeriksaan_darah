package controllers

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
)

type PekerjaanController interface {
	CreatePekerjaan(ctx fiber.Ctx) error
	GetPekerjaan(ctx fiber.Ctx) error
}

type PekerjaanControllerImpl struct {
	s services.PekerjaanService
}

// CreateSubmit godoc
// @Summary     CreatePekerjaan
// @Description Endpoint penambahan Pekerjaan
// @Tags        Pekerjaan
// @Accept      json
// @Produce     json
// @Param       Pekerjaan body dto.PekerjaanCreate true "Data Pekerjaan"
// @Success     200 {object} utils.CreationSuccessResponse
// @Router      /api/v1/pekerjaan [post]
func (c *PekerjaanControllerImpl) CreatePekerjaan(ctx fiber.Ctx) error {
	PekerjaanCreate := &dto.PekerjaanCreate{}
  if err := ctx.Bind().Body(PekerjaanCreate); err != nil {
    return utils.BadRequest(ctx, "Input Pekerjaan tidak valid", err)
  }

  if err := c.s.Create(PekerjaanCreate); err != nil {
    return utils.InternalError(ctx, "Gagal menambahkan Pekerjaan", err)
  }

  return utils.CreationSuccess(ctx, "Pekerjaan berhasil ditambahkan", nil)
}

// CreateSubmit godoc
// @Summary     CreatePekerjaan
// @Description Endpoint penambahan Pekerjaan
// @Tags        Pekerjaan
// @Accept      json
// @Produce     json
// @Success     200 {object} utils.Response
// @Router      /api/v1/pekerjaan [get]
func (c *PekerjaanControllerImpl) GetPekerjaan(ctx fiber.Ctx) error {
  data, err := c.s.GetAll()
  if err != nil {
    return utils.InternalError(ctx, "Gagal mengambil data Pekerjaan", err)
  }
  return utils.SuccessResponse(ctx, "Sukses mengambil data Pekerjaan", data)
}

func NewPekerjaanController(s services.PekerjaanService) PekerjaanController {
	return &PekerjaanControllerImpl{s: s}
}
