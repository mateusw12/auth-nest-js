import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyGuard } from './guard/api-key.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyDto } from './dto/api-key.dto';
import { Auth, Public } from 'src/auth/decorator';

@ApiTags('Api key')
@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Public()
  @Post('generate')
  generate(@Body() dto: ApiKeyDto) {
    const apiKey = this.apiKeyService.generateApiKey(dto.username);
    return { apiKey };
  }

  @Auth()
  @Get()
  getAll(@Body() dto: ApiKeyDto) {
    const apiKey = this.apiKeyService.generateApiKey(dto.username);
    return { apiKey };
  }

  @Public()
  @Get('protected')
  @UseGuards(ApiKeyGuard)
  protectedRoute(@Req() req: any) {
    return {
      message: 'Você acessou uma rota protegida com API Key!',
      userId: req.userId,
    };
  }

  // 🔄 Refresh da API Key
  @Public()
  @Post('refresh')
  @UseGuards(ApiKeyGuard)
  refreshKey(@Req() req: any) {
    const oldKey = req.headers['x-api-key'];
    const newKey = this.apiKeyService.refreshApiKey(oldKey);
    return {
      message: 'Nova API Key gerada com sucesso!',
      apiKey: newKey,
    };
  }
}
