/**
 * @deprecated
 * @param key 
 * @param value 
 * @returns 
 */
const setCookie = (key: string, value: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/`;
};

/**
 * @deprecated
 * @param key 
 * @returns 
 */
const getCookie = (key: string) => {
  if (typeof document === 'undefined') return null;
  const name = encodeURIComponent(key) + '=';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return decodeURIComponent(cookie.substring(name.length));
    }
  }
  return null;
};

/**
 * @deprecated
 * @param key 
 * @returns 
 */
const deleteCookie = (key: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(key)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export { setCookie, getCookie, deleteCookie };
