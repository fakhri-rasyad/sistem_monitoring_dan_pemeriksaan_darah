package controllers

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type PekerjaanController interface {
	CreatePekerjaan(ctx fiber.Ctx) error
	GetPekerjaan(ctx fiber.Ctx) error
	Delete(ctx fiber.Ctx) error
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

	data, err := c.s.Create(PekerjaanCreate)
	if err != nil {
		return utils.InternalError(ctx, "Gagal menambahkan Pekerjaan", err)
	}

	return utils.CreationSuccess(ctx, "Pekerjaan berhasil ditambahkan", data)
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

func (c *PekerjaanControllerImpl) Delete(ctx fiber.Ctx) error {
	query := ctx.Query("public_id")
	if query == "" {
		return utils.BadRequest(ctx, utils.ParsingError, errors.New("Permintaan tidak valid"))
	}

	uid, err := uuid.Parse(query)

	if err != nil {
		return utils.BadRequest(ctx, utils.ParsingError, err)
	}

	if err := c.s.Delete(uid); err != nil {
		return utils.InternalError(ctx, "Gagal menghapus pekerjaan", err)
	}

	return utils.SuccessResponse(ctx, "Sukses menghapus pekerjaan", nil)
}

func NewPekerjaanController(s services.PekerjaanService) PekerjaanController {
	return &PekerjaanControllerImpl{s: s}
}
