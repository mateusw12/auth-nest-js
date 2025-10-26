import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeyService {
  private apiKeys: Record<string, string> = {}; // userId -> apiKey

  getAll(userId: string): string {
    const keys = this.apiKeys[userId];
    return keys;
  }

  generateApiKey(userId: string): string {
    const apiKey = randomBytes(32).toString('hex');
    this.apiKeys[userId] = apiKey;
    return apiKey;
  }

  validateApiKey(apiKey: string): boolean {
    return Object.values(this.apiKeys).includes(apiKey);
  }

  getUserId(apiKey: string): string | null {
    const entry = Object.entries(this.apiKeys).find(
      ([, key]) => key === apiKey,
    );
    return entry ? entry[0] : null;
  }

  // 🔄 Refresh API Key
  refreshApiKey(oldApiKey: string): string {
    const userId = this.getUserId(oldApiKey);
    if (!userId) {
      throw new UnauthorizedException('API Key inválida ou expirada.');
    }

    const newKey = randomBytes(32).toString('hex');
    this.apiKeys[userId] = newKey; // substitui a chave antiga
    return newKey;
  }
}
