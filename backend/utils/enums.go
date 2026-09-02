package utils

import (
	"database/sql/driver"
	"fmt"
)

func scanStringLike(dst *string, value interface{}) error {
	switch v := value.(type) {
	case []byte:
		*dst = string(v)
	case string:
		*dst = v
	case nil:
		*dst = ""
	default:
		return fmt.Errorf("unsupported scan type: %T", value)
	}
	return nil
}

type MetodePembayaran string

const (
	Cash     MetodePembayaran = "Cash"
	Transfer MetodePembayaran = "Transfer"
	Qris     MetodePembayaran = "Qris"
)

func (m *MetodePembayaran) Scan(value interface{}) error {
	return scanStringLike((*string)(m), value)
}

func (m MetodePembayaran) Value() (driver.Value, error) {
	return string(m), nil
}
