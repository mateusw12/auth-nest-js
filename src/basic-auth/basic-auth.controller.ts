import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BasicAuthService } from './basic-auth.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { BasicAuthGuard } from './guard/basic-auth.guard';
import { Public } from 'src/auth/decorator';

@Controller('basic-auth')
export class BasicAuthController {
  constructor(private readonly basicAuthService: BasicAuthService) {}

  @Public()
  @Get('login')
  async basicLogin(@Headers('authorization') authorization: string) {
    const user = await this.basicAuthService.validateBasicAuth(authorization);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      message: 'Basic Auth successful!',
      user,
    };
  }

  @Public()
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth()
  @Get('secure-basic')
  getWithBasicAuth() {
    return { message: 'Acesso permitido via Basic Auth' };
  }
}
