import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];
  private nextId = 1;

  create(dto: CreateUserDto): User {
    const hashedPassword = bcrypt.hashSync(dto.password, 10); // hash da senha
    const newUser = {
      id: this.nextId++,
      username: dto.username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  remove(id: number): void {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
