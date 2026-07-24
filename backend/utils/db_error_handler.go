package utils

import (
	"errors"
	"fmt"
	"strings"

	"gorm.io/gorm"
)

func ParseDBError(err error) error {
    if err == nil {
        return nil
    }

    if errors.Is(err, gorm.ErrRecordNotFound) {
        return ErrNotFound
    }

    if strings.Contains(err.Error(), "23505") {
        return ErrDuplicate
    }

    if strings.Contains(err.Error(), "23503") {
        return ErrInvalidInput
    }

    return err
}

func ParseGormError(err error) error {
	switch {
	case err == nil:
		return nil
	case errors.Is(err, gorm.ErrRecordNotFound):
		return fmt.Errorf("data not found")
	case errors.Is(err, gorm.ErrDuplicatedKey):
		return fmt.Errorf("duplicate data")
	case errors.Is(err, gorm.ErrForeignKeyViolated):
		return fmt.Errorf("referenced data does not exist")
	default:
		return err
	}
}
