package controllers

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/services"
	"fakhri-rasyad/sistem_monitoring_darah/utils"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type ExportController interface {
	ExportUser(ctx fiber.Ctx) error
}

type ExportControllerImpl struct {
	s services.ExportService
}

func (e *ExportControllerImpl) ExportUser(ctx fiber.Ctx) error {
	public_id := ctx.Query("public_id")

	if public_id == "" {
		return utils.BadRequest(ctx, "Gagal mendownload data pasien", errors.New("Bad id"))
	}

	uid, err := uuid.Parse(public_id)

	if err != nil {
		return utils.BadRequest(ctx, "Gagal mendownload data pasien", err)
	}

	file_path, err := e.s.ExportUser(uid)

	if err != nil {
		return utils.InternalError(ctx, "Gagal membuat file data pasien", err)
	}

	defer os.Remove(*file_path)

	return ctx.Download(*file_path)
}

func NewExportController(s services.ExportService) ExportController {
	return &ExportControllerImpl{s: s}
}
