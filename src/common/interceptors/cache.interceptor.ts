import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ttl = this.reflector.get<number>('cache_ttl', context.getHandler()) || 300; // 5min default
    const request = context.switchToHttp().getRequest();
    const cacheKey = `${request.method}:${request.url}`;

    // Cache local na requisição (não persiste entre invocações)
    const cacheStore: Record<string, { value: any; expiresAt: number }> = request.cacheStore || {};
    request.cacheStore = cacheStore;

    const cached = cacheStore[cacheKey];
    const now = Date.now();
    if (cached && cached.expiresAt > now) {
      return new Observable((observer) => {
        observer.next(cached.value);
        observer.complete();
      });
    }

    return next.handle().pipe(
      tap((response) => {
        cacheStore[cacheKey] = { value: response, expiresAt: now + ttl * 1000 };
      }),
    );
  }
}

