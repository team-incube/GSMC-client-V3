const setCookie = (key: string, value: string) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/`;
};

const getCookie = (key: string) => {
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

const deleteCookie = (key: string) => {
  document.cookie = `${encodeURIComponent(key)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export { setCookie, getCookie, deleteCookie };
