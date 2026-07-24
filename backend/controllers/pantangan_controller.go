package controllers

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
)

type PantanganController interface {
	CreatePantangan(ctx fiber.Ctx) error
	GetPantangan(ctx fiber.Ctx) error
}

type PantanganControllerImpl struct {
	s services.PantanganService
}

// CreateSubmit godoc
// @Summary     CreatePantangan
// @Description Endpoint penambahan Pantangan
// @Tags        Pantangan
// @Accept      json
// @Produce     json
// @Param       Pantangan body dto.PantanganCreate true "Data Pantangan"
// @Success     200 {object} utils.CreationSuccessResponse
// @Router      /api/v1/pantangan [post]
func (c *PantanganControllerImpl) CreatePantangan(ctx fiber.Ctx) error {
	PantanganCreate := &dto.PantanganCreate{}
  if err := ctx.Bind().Body(PantanganCreate); err != nil {
    return utils.BadRequest(ctx, "Input Pantangan tidak valid", err)
  }

  if err := c.s.Create(PantanganCreate); err != nil {
    return utils.InternalError(ctx, "Gagal menambahkan Pantangan", err)
  }

  return utils.CreationSuccess(ctx, "Pantangan berhasil ditambahkan", nil)
}

// CreateSubmit godoc
// @Summary     CreatePantangan
// @Description Endpoint penambahan Pantangan
// @Tags        Pantangan
// @Accept      json
// @Produce     json
// @Success     200 {object} utils.Response
// @Router      /api/v1/pantangan [get]
func (c *PantanganControllerImpl) GetPantangan(ctx fiber.Ctx) error {
  data, err := c.s.GetAll()
  if err != nil {
    return utils.InternalError(ctx, "Gagal mengambil data Pantangan", err)
  }
  return utils.SuccessResponse(ctx, "Sukses mengambil data Pantangan", data)
}

func NewPantanganController(s services.PantanganService) PantanganController {
	return &PantanganControllerImpl{s: s}
}
