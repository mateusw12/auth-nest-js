import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyGuard } from './guard/api-key.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyDto } from './dto/api-key.dto';
import { Public } from 'src/utils';

@ApiTags('Api key')
@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  // Gera uma API Key para um userId
  @Public()
  @Post('generate')
  generate(@Body() dto: ApiKeyDto) {
    const apiKey = this.apiKeyService.generateApiKey(dto.username);
    return { apiKey };
  }

  // Rota protegida com API Key
  @Public()
  @Get('protected')
  @UseGuards(ApiKeyGuard)
  protectedRoute() {
    return { message: 'Você acessou uma rota protegida com API Key!' };
  }
}
