import axios, { AxiosResponse } from 'axios';

export class APIService {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string, params?: any): Promise<T> {
    try {
      const url = this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
      const response: AxiosResponse<T> = await axios.get(url, { params });
      return response.data;
    } catch (error: any) {
      throw new Error(`API Error: ${error.message}`);
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const url = this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
      const response: AxiosResponse<T> = await axios.post(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(`API Error: ${error.message}`);
    }
  }
}
