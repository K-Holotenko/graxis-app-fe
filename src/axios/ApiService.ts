import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

export class ApiService {
  private api: AxiosInstance;

  constructor(baseUrl: string = '') {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('access_token');

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config as InternalAxiosRequestConfig;
      },
      (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: AxiosError): Promise<AxiosError> => {
        if (error.response && error.response.status === 401) {
          // TODO GRX-34 Update this condition with user logout logic
        }

        return Promise.reject(error);
      }
    );
  }

  public async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data } = await this.api.get<T>(url, config);

    return data;
  }

  public async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data: d } = await this.api.put<T>(url, data, config);

    return d;
  }

  public async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data: d } = await this.api.post<T>(url, data, config);

    return d;
  }

  public async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { data } = await this.api.delete<T>(url, config);

    return data;
  }
}
