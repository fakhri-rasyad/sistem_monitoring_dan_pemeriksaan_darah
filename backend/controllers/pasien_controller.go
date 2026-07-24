package controllers

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type PasienController interface {
	CreatePasien(ctx fiber.Ctx) error
	GetPasien(ctx fiber.Ctx) error
	GetPasienByPublicID(ctx fiber.Ctx) error
  GetPasienByPublicIDWithPreload(ctx fiber.Ctx) error
}

type PasienControllerImpl struct {
	s services.PasienService
}

// CreateSubmit godoc
// @Summary     GetPasienByPublicID
// @Description Endpoint penambahan Pasien
// @Tags        Pasien
// @Accept      json
// @Produce     json
// @Param       public_id path string true "Public ID Pasien"
// @Success     200 string Success
// @Router      /api/v1/pasien/:public_id [get]
func (c *PasienControllerImpl) GetPasienByPublicID(ctx fiber.Ctx) error {
	public_id := ctx.Params("public_id");
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

	return utils.SuccessResponse(ctx, "Sukses mengambil data Pasien", data)
}

// CreateSubmit godoc
// @Summary     CreatePasien
// @Description Endpoint penambahan Pasien
// @Tags        Pasien
// @Accept      json
// @Produce     json
// @Param       Pasien body dto.PasienCreate true "Data Pasien"
// @Success     200 {object} utils.CreationSuccessResponse
// @Router      /api/v1/pasien [post]
func (c *PasienControllerImpl) CreatePasien(ctx fiber.Ctx) error {
	PasienCreate := &dto.PasienCreate{}
	if err := ctx.Bind().Body(PasienCreate); err != nil {
		return utils.BadRequest(ctx, "Input Pasien tidak valid", err)
	}

	if err := c.s.Create(PasienCreate); err != nil {
		return utils.InternalError(ctx, "Gagal menambahkan Pasien", err)
	}

	return utils.CreationSuccess(ctx, "Pasien berhasil ditambahkan", nil)
}

// CreateSubmit godoc
// @Summary     CreatePasien
// @Description Endpoint penambahan Pasien
// @Tags        Pasien
// @Accept      json
// @Produce     json
// @Success     200 {object} utils.Response
// @Router      /api/v1/pasien [get]
func (c *PasienControllerImpl) GetPasien(ctx fiber.Ctx) error {
	data, err := c.s.GetAll()
	if err != nil {
		return utils.InternalError(ctx, "Gagal mengambil data Pasien", err)
	}
	return utils.SuccessResponse(ctx, "Sukses mengambil data Pasien", data)
}


func (c *PasienControllerImpl) GetPasienByPublicIDWithPreload(ctx fiber.Ctx) error {
	public_id := ctx.Params("public_id");
  if public_id == "" {
    return utils.BadRequest(ctx, "Public id tidak valid", errors.New("Failure in parsing public_id"))
  }

  uuidValue, err := uuid.Parse(public_id)

  if err != nil {
    return utils.BadRequest(ctx, "Gagal parsing publid id", err)
  }

  data, err := c.s.GetByPublicIDWithPreload(uuidValue)

  if err != nil {
    return utils.BadRequest(ctx, "Gagal parsing publid id", err)
  }

	return utils.SuccessResponse(ctx, "Sukses mengambil data Pasien", data)
}


func NewPasienController(s services.PasienService) PasienController {
	return &PasienControllerImpl{s: s}
}
