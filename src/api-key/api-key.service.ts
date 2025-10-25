import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeyService {
  private apiKeys: Record<string, string> = {}; // userId -> apiKey

  // Gera uma nova API Key para um usuário
  generateApiKey(userId: string): string {
    const apiKey = randomBytes(32).toString('hex');
    this.apiKeys[userId] = apiKey;
    return apiKey;
  }

  // Valida se a API Key é válida
  validateApiKey(apiKey: string): boolean {
    return Object.values(this.apiKeys).includes(apiKey);
  }

  // Recupera o userId a partir da API Key
  getUserId(apiKey: string): string | null {
    const entry = Object.entries(this.apiKeys).find(
      ([, key]) => key === apiKey,
    );
    return entry ? entry[0] : null;
  }
}
