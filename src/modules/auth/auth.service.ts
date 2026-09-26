import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserRoleType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    // Create user and profile transactionally
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        fullName: dto.fullName,
        role: UserRoleType.STUDENT,
        studentProfile: dto.studentId
          ? {
              create: {
                studentId: dto.studentId,
                currentSemester: dto.semester || 1,
                batch: {
                  connectOrCreate: {
                    where: { batchNumber: dto.batchNumber || 40 },
                    create: {
                      batchNumber: dto.batchNumber || 40,
                      startYear: 2023,
                      department: {
                        connectOrCreate: {
                          where: { code: 'CSE' },
                          create: {
                            name: 'Computer Science and Engineering',
                            code: 'CSE',
                          },
                        },
                      },
                    },
                  },
                },
              },
            }
          : undefined,
      },
      include: {
        studentProfile: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return {
      message: 'Account registered successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        studentProfile: user.studentProfile,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        studentProfile: true,
        facultyProfile: true,
        alumniProfile: true,
        mentorProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('This account has been deactivated by administration');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        studentProfile: user.studentProfile,
        facultyProfile: user.facultyProfile,
        alumniProfile: user.alumniProfile,
        mentorProfile: user.mentorProfile,
      },
      ...tokens,
    };
  }

  async refreshTokens(refreshToken: string) {
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token is expired or invalid');
    }

    // Revoke old refresh token (Token rotation security)
    await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

    // Generate fresh token pair
    return this.generateTokens(
      storedToken.user.id,
      storedToken.user.email,
      storedToken.user.role,
    );
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'cse_hub_super_secret_jwt_access_token_key_2026',
      expiresIn: '15m',
    });

    // Cryptographically secure refresh token
    const rawRefreshToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      expiresIn: 900, // 15 mins in seconds
    };
  }
}
