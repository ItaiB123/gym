export interface AppError {
    message: string;
    status: number;
    code?: string;
    showStackTrace?: boolean;
}

