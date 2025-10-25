import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')), // aplica o guard
    ApiBearerAuth(), // documenta no Swagger
  );
}
