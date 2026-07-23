package services

import "fakhri-rasyad/sistem_monitoring_darah/config"

func beginWorkflow() *workflow {
	return &workflow{
		tx: config.DB.Begin(),
	}
}
