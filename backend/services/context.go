package services

import (
	"fmt"

	"gorm.io/gorm"
)

type workflow struct {
	tx *gorm.DB
}

func (wf *workflow) Commit() error {
	fmt.Println("Commit called")
	return wf.tx.Commit().Error
}

func (w *workflow) Rollback() {
	w.tx.Rollback()
}
