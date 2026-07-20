package utils

import "errors"

var (
	ErrNotFound     = errors.New("record not found")
	ErrDuplicate    = errors.New("duplicate entry")
	ErrInvalidInput = errors.New("invalid input")
  MissingQuery    = errors.New("Missing query")
)


