package utils

import (
	"errors"
	"fakhri-rasyad/sistem_monitoring_darah/config"
	"strconv"
	"time"

	jwtware "github.com/gofiber/contrib/v3/jwt"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

type UserClaims struct{
	jwt.RegisteredClaims
	Nama string `json:"nama"`
	NomorHP string `json:"nomor_handphone"`
  PuskesmasID *int `json:"puskesmas_id"`
  RumahSakitID *int `json:"rumah_sakit_id"`
}

func createClaims(nama, nomorHP string, puskesmasID, rumahSakitID *int) UserClaims {
	expiryMinute, err := strconv.Atoi("1800");

	if err != nil {
		expiryMinute = 1800
	}

	login_expiration_duration := time.Now().Add(time.Duration(expiryMinute) * time.Minute)

	return UserClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer: "Telehealth System",
			ExpiresAt: jwt.NewNumericDate(login_expiration_duration),
		},
		Nama: nama,
    NomorHP: nomorHP,
    PuskesmasID: puskesmasID,
    RumahSakitID: rumahSakitID,
	}
}

func GenerateToken(nama, nomorHP string, puskesmasID, rumahSakitID *int) (string, error){
	claims := createClaims(nama, nomorHP, puskesmasID, rumahSakitID)

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	signedToken, err := token.SignedString([]byte(config.APPConfig.JWTSecret))

	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func VerifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (any, error) {
		return []byte(config.APPConfig.JWTSecret), nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))

	if err != nil {
		return err
	}

	if _, ok := token.Claims.(jwt.MapClaims); !ok {
		return errors.New("Authentication Failed, Used Invalid Token")
	}

	return nil
}

func GetEmailClaim(ctx fiber.Ctx) (string, error) {
	user := jwtware.FromContext(ctx)
	claims := user.Claims.(jwt.MapClaims)
	email := claims["email"].(string)
	return email, nil
}

func GetPuskesmasClaim(ctx fiber.Ctx) (*int, error) {
  user := jwtware.FromContext(ctx)
	claims := user.Claims.(jwt.MapClaims)
  if rumitId, ok := claims["puskesmas_id"].(float64); ok {
    rumID := int(rumitId)
    return &rumID, nil
  }
	return nil, errors.New("NO DATA")
}

func GetRumahSakitClaim(ctx fiber.Ctx) (*int, error) {
  user := jwtware.FromContext(ctx)
	claims := user.Claims.(jwt.MapClaims)
  if rumitId, ok := claims["rumah_sakit_id"].(float64); ok {
    rumID := int(rumitId)
    return &rumID, nil
  }
	return nil, errors.New("NO DATA")
}
