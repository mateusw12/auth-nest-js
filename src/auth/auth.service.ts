import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
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

  async login(dto: LoginDto): Promise<string> {
    const user = await this.validateUser(dto.username, dto.password);
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
