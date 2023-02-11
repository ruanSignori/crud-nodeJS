import { HttpResponse } from "./protocols";
export declare const ok: <T>(body: any) => HttpResponse<T>;
export declare const created: <T>(body: any) => HttpResponse<T>;
export declare const badRequest: (message: string) => HttpResponse<string>;
export declare const serverError: () => HttpResponse<string>;
