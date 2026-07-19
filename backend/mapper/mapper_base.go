package mapper

func Map[M any, R any](model M, fx func(M) R) R {
	return fx(model)
}

func MapSlice[M any, R any](model []M, fx func(M) R) []R {
	var value []R

	for _, v := range model {
		value = append(value, fx(v))
	}

	return value
}
