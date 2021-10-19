export interface ErrorData {
  code: number;
  codeText: string;
  errorMessage: string;
}

export interface ErrorState {
  isError: boolean;
  error: ErrorData;
}
