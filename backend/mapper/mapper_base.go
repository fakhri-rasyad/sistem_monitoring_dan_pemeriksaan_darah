package mapper

func Map[M any, R any](model *M, fx func(*M) *R) *R {
	if model == nil {
		return nil
	}

	return fx(model)
}

func MapSlice[M any, R any](model []M, fx func(*M) *R) []R {
	value := make([]R, 0, len(model))

	for i := range model {
		if mapped := fx(&model[i]); mapped != nil {
			value = append(value, *mapped)
		}
	}

	return value
}
