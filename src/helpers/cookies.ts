// https://github.com/js-cookie/js-cookie

import Cookies from 'js-cookie';
// import CryptoJS from 'crypto-js';
// import { getConfigs } from './env';

export function CookiesSet(cookiesName: string, cookiesValue: any, cookiesTime: any) {
  // const cookiesValueBase64 = btoa(cookiesValue);
  // const cookiesNameBase64 = btoa(cookiesName);
  // const configEnvs: any = getConfigs();
  // const ciphertext = CryptoJS.Rabbit.encrypt(cookiesValueBase64, configEnvs.SECRET_KEY_URANO).toString();

  Cookies.set(cookiesName, cookiesValue, { expires: cookiesTime });
}

export function CookiesGet(cookiesName: string) {
  // const cookiesNameBase64 = btoa(cookiesName);
  // let cookiesValueBase64: any = Cookies.get(cookiesNameBase64);
  // if (cookiesValueBase64 === undefined) {
  //   return null;
  // }
  // const configEnvs: any = getConfigs();

  try {
    // const bytes = CryptoJS.Rabbit.decrypt(cookiesValueBase64, configEnvs.SECRET_KEY_URANO);
    // cookiesValueBase64 = bytes.toString(CryptoJS.enc.Utf8);
    // const cookiesValue = atob(cookiesValueBase64);

    const cookiesValue = Cookies.get(cookiesName);

    return cookiesValue;
  } catch {
    return null;
  }
}
