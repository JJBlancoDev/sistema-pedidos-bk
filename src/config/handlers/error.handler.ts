import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export class ErrorManager {
  private static readonly logger = new Logger('ErrorManager');

  public static handlerExceptions(error: any) {
    this.logger.error(error);

    if (error instanceof HttpException) {
      throw error;
    }

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }
}
