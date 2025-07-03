// src/jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({
  providers: [JwtService],
  exports: [JwtService], // ⚠️ importante para poder usarlo desde otros módulos
})
export class JwtModule {}
