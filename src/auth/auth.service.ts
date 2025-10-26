import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private refreshTokens: Record<number, string> = {}; // userId -> refreshToken

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Usuário ou senha inválidos');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Usuário ou senha inválidos');

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.username, dto.password);
    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1m' }); // expira rápido
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); // expira em 7 dias

    this.refreshTokens[user.id] = refreshToken; // salva o último refresh válido

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'chave_super_secreta',
      });

      const storedRefresh = this.refreshTokens[payload.sub];
      if (storedRefresh !== token) {
        throw new ForbiddenException('Refresh token inválido');
      }

      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub },
        { expiresIn: '1m' },
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Token expirado ou inválido');
    }
  }

  async logout(userId: number) {
    delete this.refreshTokens[userId]; // invalida refresh token
    return { message: 'Logout realizado com sucesso' };
  }
  
}
