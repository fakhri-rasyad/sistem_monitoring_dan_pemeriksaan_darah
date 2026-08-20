package controllers

import (
	"fakhri-rasyad/sistem_monitoring_darah/dto"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"

	"github.com/gofiber/fiber/v3"
)

type SubmissionController interface {
	FirstKunjunganSubmissionCreate(ctx fiber.Ctx) error
	KunjunganSubmissionCreate(ctx fiber.Ctx) error
}

type SubmissionControllerImpl struct {
	s services.SubmitService
}

func NewSubmissionCont(s services.SubmitService) SubmissionController {
	return &SubmissionControllerImpl{s: s}
}

// CreateSubmit godoc
// @Summary     CreateSubmission
// @Description Endpoint checkup data
// @Tags        Checkup
// @Accept      json
// @Produce     json
// @Param       submit body dto.SubmissionCreate true "Data checkup"
// @Success     200 string Success
// @Router      /api/v1/checkup [post]
func (c *SubmissionControllerImpl) FirstKunjunganSubmissionCreate(ctx fiber.Ctx) error {
	submit := &dto.SubmissionCreate{}

	if err := ctx.Bind().Body(submit); err != nil {
		return utils.BadRequest(ctx, "Input submit tidak valid", err)
	}

	if err := c.s.FirstSubmissionCreation(submit); err != nil {
		return utils.InternalError(ctx, "Gagal menambahkan kunjungan", err)
	}

	return utils.CreationSuccess(ctx, "Kunjungan berhasil ditambahkan", true)
}

func (c *SubmissionControllerImpl) KunjunganSubmissionCreate(ctx fiber.Ctx) error {
	data := &dto.KunjunganSubmission{}

	if err := ctx.Bind().Body(data); err != nil {
		return utils.BadRequest(ctx, "Input tidak valid", err)
	}

	if err := c.s.LaterSubmissionCreation(data); err != nil {
		return utils.InternalError(ctx, "Gagal menambahkan kunjungan", err)
	}

	return utils.CreationSuccess(ctx, "Sukses menambahkan kunjungan pasien", true)

}
