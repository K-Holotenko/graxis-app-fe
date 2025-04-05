export class CookieService {
  static setCookie(
    name: string,
    value: string,
    options:
      | {
          path?: string;
          secure?: boolean;
          sameSite?: 'Strict' | 'Lax' | 'None';
          domain?: string;
          maxAge?: number;
        }
      | string = '/'
  ): void {
    // Handle backwards compatibility where the third parameter was just the path
    let cookieOptions: {
      path?: string;
      secure?: boolean;
      sameSite?: 'Strict' | 'Lax' | 'None';
      domain?: string;
      maxAge?: number;
    } = {};

    if (typeof options === 'string') {
      cookieOptions.path = options;
    } else {
      cookieOptions = options;
    }

    // Set default path if not provided
    if (!cookieOptions.path) {
      cookieOptions.path = '/';
    }

    let cookieString = `${name}=${encodeURIComponent(value)}; path=${cookieOptions.path}`;

    if (cookieOptions.secure) {
      cookieString += '; Secure';
    }

    if (cookieOptions.sameSite) {
      cookieString += `; SameSite=${cookieOptions.sameSite}`;
    }

    if (cookieOptions.domain) {
      cookieString += `; Domain=${cookieOptions.domain}`;
    }

    if (cookieOptions.maxAge !== undefined) {
      cookieString += `; Max-Age=${cookieOptions.maxAge}`;
    }

    document.cookie = cookieString;
  }

  static getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  }

  static deleteCookie(name: string, path: string = '/'): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }

  static hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }
}

export default CookieService;
