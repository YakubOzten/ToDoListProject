package com.example.YakubOzten.exception;

// 201 : oluşturuldu (Created)
// 400 : Kötü istek (Bad Request)
// 401 : Yetkisiz Giriş ( Authorized)
// 402 : Ödeme ( Payment Required)
// 403 : Yasak Giriş ( Forbidden)
// 404 : Bulunamadı (not found)
// 502 : Kötü Ağ Geçidi  (Bad Gateway)

// My Special Exception
public class YakubOztenException extends RuntimeException{

    // Override
    public YakubOztenException(String message) {
        super(message);
    }
}
