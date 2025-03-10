export interface HttpOptions {
    Params?: { [key: string]: any };
    Payload?: { [key: string]: any } | FormData;  // Allowing FormData
    Headers?: { [key: string]: string };
    ResponseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
    ErrorCallback?: (error: any) => void;
}

export interface HttpProtocol {
    get: (url: string, options?: HttpOptions) => Promise<any>;
    post: (url: string, options?: HttpOptions) => Promise<any>;
    put: (url: string, options?: HttpOptions) => Promise<any>;
    delete: (url: string, options?: HttpOptions) => Promise<any>;
}

export interface ConfigOptions {
    SucessNotification?: boolean;
    SucessNotificationDelay?: number;
    ErrorNotification?: boolean;
    ErrorNotificationDelay?: number;
    NotificationPosition?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}


export interface IHttpService {
    get<T>(url: string): Promise<T>;
}

export type T = any;
