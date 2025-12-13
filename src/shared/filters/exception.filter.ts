import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);
  
    catch(error: unknown, host: ArgumentsHost): void {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message: string | string[] = 'Internal server error';
      let errorName = 'InternalServerError';
  
      // 🧩 Nếu là HttpException (BadRequest, Unauthorized, v.v.)
      if (error instanceof HttpException) {
        status = error.getStatus();
        const res = error.getResponse();
  
        if (typeof res === 'string') {
          message = res;
        } else if (typeof res === 'object') {
          const r = res as Record<string, any>;
          message = r.message || message;
          errorName = r.error || errorName;
        }
      } else if (error instanceof Error) {
        // 🧠 Nếu là lỗi runtime (VD: TypeError, QueryFailedError,...)
        message = error.message;
        errorName = error.name;
      }
  
      const errorResponse = {
        statusCode: status,
        message,
        error: errorName,
        path: request.url,
        timestamp: new Date().toISOString(),
      };
  
      // Ghi log ra console
      this.logger.error(
        `[${request.method}] ${request.url} → ${status} ${errorName}: ${JSON.stringify(message)}`,
      );
  
      response.status(status).json(errorResponse);
    }
  }
  