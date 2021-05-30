import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOne(data: DeepPartial<User>) {
    // entity instance
    const entity = this.userRepository.create({
      ...data,
    });

    // real database insert

    return this.userRepository.save(entity);
  }

  async findOne(socialId: string) {
    return this.userRepository.findOne({
      where: {
        socialId: socialId,
      },
    });
  }
}
