import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export type HttpOptions = {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe: 'events' | 'response' | 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
} | null