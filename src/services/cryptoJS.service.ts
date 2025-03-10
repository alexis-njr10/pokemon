import CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';
class CryptoJSService {

    private keyValue: any;
    private ivKey: any;

    constructor() {
        this.keyValue = environment.CRYPTO_JS.keyValue;
        this.ivKey = environment.CRYPTO_JS.ivKey;
    }

    encryptAES(data: any) {
        if (data) {
            const key = CryptoJS.PBKDF2(this.keyValue, 'salt', { keySize: 256 / 32, iterations: 100 });
            const iv = CryptoJS.enc.Utf8.parse(this.ivKey); // Convert string to WordArray
            const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC });
            return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        }
        return null;
    }

    decryptAES(data: any) {
        if (data) {
            const key = CryptoJS.PBKDF2(this.keyValue, 'salt', { keySize: 256 / 32, iterations: 100 });
            const iv = CryptoJS.enc.Utf8.parse(this.ivKey);
            const decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(data) }, key, { iv: iv, mode: CryptoJS.mode.CBC });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        return null;
    }

}

const dctp = new CryptoJSService();
export { dctp };
