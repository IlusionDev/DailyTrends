export default class ApiResponseDto {
  message?: string;
  data: any;
  error: boolean | undefined;
  statusCode?: number;
}
