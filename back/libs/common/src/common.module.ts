import { Module } from '@nestjs/common';
import { ErrorValidationPipe } from './pipe/error.validation';


@Module({
  providers: [ErrorValidationPipe],
  exports: [ErrorValidationPipe]
})
export class CommonModule {}
