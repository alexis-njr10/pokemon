import CryptoJS from "crypto-js";
import { environment } from "../environments/environment";

class LaravelEncryptService {

    private key: string;

    constructor() {
        this.key = environment.LARAVEL_KEY;
    }

    encrypt(data) {
        // Generate a random IV
        let iv = CryptoJS.lib.WordArray.random(16);
    
        // Parse the key into CryptoJS format
        let key = CryptoJS.enc.Base64.parse(this.key);
    
        // Encryption options
        let options = {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        };
    
        // Perform AES encryption
        let encrypted = CryptoJS.AES.encrypt(data, key, options);
        encrypted = encrypted.toString(); // Convert encrypted data to string
    
        // Convert IV to Base64 format
        iv = CryptoJS.enc.Base64.stringify(iv);
    
        // Calculate HMAC for integrity check
        let mac = CryptoJS.HmacSHA256(iv + encrypted, key).toString();
    
        // Prepare final result as JSON object
        let result: any = {
            iv: iv,
            value: encrypted,
            mac: mac
        };
    
        // Convert result to UTF-8 encoded string and then Base64 format
        result = JSON.stringify(result);
        result = CryptoJS.enc.Utf8.parse(result);
        return CryptoJS.enc.Base64.stringify(result);
    }

    decrypt(encryptStr: any) {
        try {
            encryptStr = CryptoJS.enc.Base64.parse(encryptStr);
            let encryptData = encryptStr.toString(CryptoJS.enc.Utf8);
            encryptData = JSON.parse(encryptData);
    
            let iv = CryptoJS.enc.Base64.parse(encryptData.iv);
            let decrypted = CryptoJS.AES.decrypt(encryptData.value, CryptoJS.enc.Base64.parse(this.key), {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
    
            decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
            return decrypted;
        } catch (error) {
            return null;
        }
    }

}

const laravelEncrypt = new LaravelEncryptService();
export { laravelEncrypt };