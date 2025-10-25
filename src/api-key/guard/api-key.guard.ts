import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey || !this.apiKeyService.validateApiKey(apiKey)) {
      throw new UnauthorizedException('Invalid API Key');
    }

    // Pode salvar o userId no request
    request.userId = this.apiKeyService.getUserId(apiKey);
    return true;
  }
}
