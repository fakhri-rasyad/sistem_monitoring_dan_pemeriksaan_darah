package controllers

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type KunjunganController interface {
	GetKunjunganByPublicID(ctx fiber.Ctx) error
	GetKunjunganList(ctx fiber.Ctx) error
	Update(ctx fiber.Ctx) error
	Delete(ctx fiber.Ctx) error
}

type KunjunganControllerImpl struct {
	s  services.KunjunganService
	ss services.SubmitService
}

func (c *KunjunganControllerImpl) Update(ctx fiber.Ctx) error {
	data := &dto.KunjunganUpdate{}

	if err := ctx.Bind().Body(data); err != nil {
		return utils.BadRequest(ctx, "Input tidak valid", err)
	}

	if err := c.ss.UpdateKunjungan(data); err != nil {
		return utils.InternalError(ctx, "Gagal mengupdate kunjungan", err)
	}

	return utils.SuccessResponse(ctx, "Sukses mengupdate kunjungan pasien", true)

}

// CreateSubmit godoc
// @Summary     GetKunjunganByPublicID
// @Description Endpoint penambahan Kunjungan
// @Tags        Kunjungan
// @Accept      json
// @Produce     json
// @Param       public_id path string true "Public ID Kunjungan"
// @Success     200 {object} utils.CreationSuccessResponse
// @Router      /api/v1/kunjungan [get]
func (c *KunjunganControllerImpl) GetKunjunganByPublicID(ctx fiber.Ctx) error {
	public_id := ctx.Params("public_id")
	if public_id == "" {
		return utils.BadRequest(ctx, "Public id tidak valid", errors.New("Failure in parsing public_id"))
	}

	uuidValue, err := uuid.Parse(public_id)

	if err != nil {
		return utils.BadRequest(ctx, "Gagal parsing publid id", err)
	}

	data, err := c.s.GetByPublicID(uuidValue)

	if err != nil {
		return utils.BadRequest(ctx, "Gagal parsing publid id", err)
	}

	return utils.SuccessResponse(ctx, "Sukses mengambil detail kunjungan", data)
}

func (c *KunjunganControllerImpl) GetKunjunganList(ctx fiber.Ctx) error {
	data, err := c.s.GetAll()

	if err != nil {
		return utils.BadRequest(ctx, "Gagal mengambil data", err)
	}

	return utils.SuccessResponse(ctx, "Sukses mengambil data Pasien", data)
}

func (c *KunjunganControllerImpl) Delete(ctx fiber.Ctx) error {
	query := ctx.Query("public_id")
	if query == "" {
		return utils.BadRequest(ctx, utils.ParsingError, errors.New("Permintaan tidak valid"))
	}

	uid, err := uuid.Parse(query)

	if err != nil {
		return utils.BadRequest(ctx, utils.ParsingError, err)
	}

	if err := c.s.Delete(uid); err != nil {
		return utils.InternalError(ctx, "Gagal menghapus kunjungan", err)
	}

	return utils.SuccessResponse(ctx, "Sukses menghapus kunjungan", nil)
}

func NewKunjunganController(s services.KunjunganService, ss services.SubmitService) KunjunganController {
	return &KunjunganControllerImpl{s: s, ss: ss}
}
