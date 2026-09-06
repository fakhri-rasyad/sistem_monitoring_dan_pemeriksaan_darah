package controllers

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type ParameterPemeriksaanDarahController interface {
	CreateParameterPemeriksaanDarah(ctx fiber.Ctx) error
	GetParameterPemeriksaanDarah(ctx fiber.Ctx) error
	Delete(ctx fiber.Ctx) error
}

type ParameterPemeriksaanDarahControllerImpl struct {
	s services.ParameterPemeriksaanDarahService
}

// CreateSubmit godoc
// @Summary     CreateParameterPemeriksaanDarah
// @Description Endpoint penambahan ParameterPemeriksaanDarah
// @Tags        Parameter Pemeriksaan Darah
// @Accept      json
// @Produce     json
// @Param       ParameterPemeriksaanDarah body dto.ParameterPemeriksaanDarahCreate true "Data ParameterPemeriksaanDarah"
// @Success     200 {object} utils.CreationSuccessResponse
// @Router      /api/v1/ppdh [post]
func (c *ParameterPemeriksaanDarahControllerImpl) CreateParameterPemeriksaanDarah(ctx fiber.Ctx) error {
	ParameterPemeriksaanDarahCreate := &dto.ParameterPemeriksaanDarahCreate{}
	if err := ctx.Bind().Body(ParameterPemeriksaanDarahCreate); err != nil {
		return utils.BadRequest(ctx, "Input ParameterPemeriksaanDarah tidak valid", err)
	}

	data, err := c.s.Create(ParameterPemeriksaanDarahCreate)
	if err != nil {
		return utils.InternalError(ctx, "Gagal menambahkan ParameterPemeriksaanDarah", err)
	}

	return utils.CreationSuccess(ctx, "ParameterPemeriksaanDarah berhasil ditambahkan", data)
}

// CreateSubmit godoc
// @Summary     CreateParameterPemeriksaanDarah
// @Description Endpoint penambahan ParameterPemeriksaanDarah
// @Tags        Parameter Pemeriksaan Darah
// @Accept      json
// @Produce     json
// @Success     200 {object} utils.Response
// @Router      /api/v1/ppdh [get]
func (c *ParameterPemeriksaanDarahControllerImpl) GetParameterPemeriksaanDarah(ctx fiber.Ctx) error {
	data, err := c.s.GetAll()
	if err != nil {
		return utils.InternalError(ctx, "Gagal mengambil data ParameterPemeriksaanDarah", err)
	}
	return utils.SuccessResponse(ctx, "Sukses mengambil data ParameterPemeriksaanDarah", data)
}

func (c *ParameterPemeriksaanDarahControllerImpl) Delete(ctx fiber.Ctx) error {
	query := ctx.Query("public_id")
	if query == "" {
		return utils.BadRequest(ctx, utils.ParsingError, errors.New("Permintaan tidak valid"))
	}

	uid, err := uuid.Parse(query)

	if err != nil {
		return utils.BadRequest(ctx, utils.ParsingError, err)
	}

	if err := c.s.Delete(uid); err != nil {
		return utils.InternalError(ctx, "Gagal menghapus parameter", err)
	}

	return utils.SuccessResponse(ctx, "Sukses menghapus parameter", nil)
}

func NewParameterPemeriksaanDarahController(s services.ParameterPemeriksaanDarahService) ParameterPemeriksaanDarahController {
	return &ParameterPemeriksaanDarahControllerImpl{s: s}
}
