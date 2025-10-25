import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAccess = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Passport injeta o usuário decodificado do JWT aqui
  },
);
