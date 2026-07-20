package utils

import (
	"errors"
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
