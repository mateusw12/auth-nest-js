import { SetMetadata } from '@nestjs/common';

export const CACHE_TTL_KEY = 'cache_ttl';

/**
 * Define o TTL (segundos) do cache para uma rota específica.
 * Padrão: 5 minutos (300 segundos)
 */
export const CacheTTL = (seconds = 300) =>
  SetMetadata(CACHE_TTL_KEY, seconds);
