export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<Body> {
  params?: any;
  headers?: any;
  body?: Body;
}