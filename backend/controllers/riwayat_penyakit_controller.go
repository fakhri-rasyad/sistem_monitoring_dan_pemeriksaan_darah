package controllers

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type RiwayatPenyakitController interface {
	CreateRiwayatPenyakit(ctx fiber.Ctx) error
	GetRiwayatPenyakit(ctx fiber.Ctx) error
	Delete(ctx fiber.Ctx) error
}

type RiwayatPenyakitControllerImpl struct {
	s services.RiwayatPenyakitService
}

// CreateSubmit godoc
// @Summary     CreateRiwayatPenyakit
// @Description Endpoint penambahan riwayat penyakit
// @Tags        Checkup
// @Accept      json
// @Produce     json
// @Param       riwayat_penyakit body dto.RiwayatPenyakitCreate true "Data riwayat penyakit"
// @Success     200 {object} utils.CreationSuccessResponse
// @Failure     400 {object} utils.BadRequestResponse
// @Failure     500 {object} utils.InternalErrorResponse
// @Router      /api/v1/riwayat_penyakit [post]
func (c *RiwayatPenyakitControllerImpl) CreateRiwayatPenyakit(ctx fiber.Ctx) error {
	riwayatPenyakit := &dto.RiwayatPenyakitCreate{}
	if err := ctx.Bind().Body(riwayatPenyakit); err != nil {
		return utils.BadRequest(ctx, "Input riwayat penyakit tidak valid", err)
	}

	data, err := c.s.Create(riwayatPenyakit)
	if err != nil {
		return utils.InternalError(ctx, "Gagal menambahkan riwayat penyakit", err)
	}

	return utils.CreationSuccess(ctx, "RiwayatPenyakit berhasil ditambahkan", data)
}

// CreateSubmit godoc
// @Summary     CreateRiwayatPenyakit
// @Description Endpoint penambahan riwayat penyakit
// @Tags        Checkup
// @Accept      json
// @Produce     json
// @Success     200 {object} utils.Response
// @Router      /api/v1/riwayat_penyakit [get]
func (c *RiwayatPenyakitControllerImpl) GetRiwayatPenyakit(ctx fiber.Ctx) error {
	data, err := c.s.GetAll()
	if err != nil {
		return utils.InternalError(ctx, "Gagal mengambil data riwayat penyakit", err)
	}
	return utils.SuccessResponse(ctx, "Sukses mengambil data riwayat penyakit", data)
}

func (c *RiwayatPenyakitControllerImpl) Delete(ctx fiber.Ctx) error {
	query := ctx.Query("public_id")
	if query == "" {
		return utils.BadRequest(ctx, utils.ParsingError, errors.New("Permintaan tidak valid"))
	}

	uid, err := uuid.Parse(query)

	if err != nil {
		return utils.BadRequest(ctx, utils.ParsingError, err)
	}

	if err := c.s.Delete(uid); err != nil {
		return utils.InternalError(ctx, "Gagal menghapus riwayat penyakit", err)
	}

	return utils.SuccessResponse(ctx, "Sukses menghapus riwayat penyakit", nil)
}

func NewRiwayatPenyakitController(s services.RiwayatPenyakitService) RiwayatPenyakitController {
	return &RiwayatPenyakitControllerImpl{s: s}
}
