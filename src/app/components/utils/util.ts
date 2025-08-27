
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment.prod';

export class Util{

  private static CHAVE: string = "BR_COM_CONTROLES"
    jwtHelper: any;
    static jwtHelper: any;

    static encodeTime(text: string, tempo: number): string {
      const currentTime = new Date().getTime()
      const expireTime = currentTime + tempo;
      const formattedTime = new Date(expireTime).toISOString().replace(/[-:.]/g, '').replace('T', '').substr(0, 14);
      const token = text +"/"+formattedTime;
      const chaveBytes = CryptoJS.enc.Utf8.parse(this.CHAVE); // Convertendo a chave para bytes
      const encrypted = CryptoJS.AES.encrypt(token, chaveBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
      return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    static decodeTime(base64: string): string{
      if(base64 != null){
        // Converte de URL-safe para padrão
        const base64Standard = base64.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64Standard.length % 4;
        const base64Padded = pad ? base64Standard + '='.repeat(4 - pad) : base64Standard;
        const chaveBytes = CryptoJS.enc.Utf8.parse(this.CHAVE); // Convertendo a chave para bytes
        const decrypted = CryptoJS.AES.decrypt(base64Padded, chaveBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        const parts = decryptedText.split('_');
        const time = parts[1];
        const text = parts[0];
        const formattedTime = time;
        const year = formattedTime.substr(0, 4);
        const month = formattedTime.substr(4, 2);
        const day = formattedTime.substr(6, 2);
        const hour = formattedTime.substr(8, 2);
        const minute = formattedTime.substr(10, 2);
        const second = formattedTime.substr(12, 2);
        const expireTime = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).getTime();
        const currentTime = new Date().getTime();
        if ((currentTime - expireTime) > 300000) { // Verifica se expirou (300000 milissegundos = 5 minutos)
          return "Tempo expirou";
        }
        return text;
      }
      return '';
    }

    static encodeByteBase64(bytes: Uint8Array): string{
      const binaryString = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
      const base64String = window.btoa(binaryString);
      return base64String;
    }

    static decodeByteBase64(base64String: string): Uint8Array {
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return bytes;
    }

    static encode(valor: string): string{
      return btoa(valor);
    }

    static decode(valor: string): string{
      return atob(valor);
    }
    static mostraImagem(bytes: Uint8Array): string{
      const imageUrl = 'data:image/png;base64,' + bytes;
      return imageUrl;
    }
    static mostraImagemString(bytes: string): string{
      const imageUrl = 'data:image/png;base64,' + bytes;
      return imageUrl;
    }

    static mostraImagemEmpresa(width: number, height: number): string {
        return `${environment.api_url_public}/empresa/imagem?width=${width}&height=${height}&descricao=logo`;
    }
    static getImagemImovel(imgCodigo: number, width: number, height: number): string {
      return `${environment.api_url_public}/imagens/${imgCodigo}?width=${width}&height=${height}&descricao=imovel`;
    }
    static mostraImagemUsuario(usrCodigo:number, width:number, height:number){
      return `${environment.api_url_public}/usuario/imagem/${usrCodigo}?width=${width}&height=${height}&descricao=usuario`
    }
    static mostrarLogo(width: number, height: number): string {
      return `${environment.api_url_public}/empresa/icone?width=${width}&height=${height}&descricao=icone`
    }
}


