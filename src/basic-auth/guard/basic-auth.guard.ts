import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BasicAuthService } from '../basic-auth.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly basicAuthService: BasicAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    const user = await this.basicAuthService.validateBasicAuth(authorization);

    if (!user) {
      throw new UnauthorizedException('Invalid Basic Auth credentials');
    }

    // injeta o user no request
    request.user = user;
    return true;
  }
}
