import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnnouncementCategory, TargetAudienceType } from '@prisma/client';

export class CreateAnnouncementDto {
  category: AnnouncementCategory;
  title: string;
  content: string;
  actionUrl?: string;
  actionLabel?: string;
  targetAudience?: TargetAudienceType;
  isTicker?: boolean;
}

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  // Seed default announcements if database empty
  private defaultAnnouncements = [
    {
      id: 'ann-1',
      category: 'CONTEST' as AnnouncementCategory,
      title: 'National Collegiate Programming Contest (NCPC) 2026 Registration Open',
      slug: 'ncpc-2026-registration',
      content: 'Department of CSE is hosting preliminary team selection for NCPC 2026. Teams comprising 3 eligible students must register before October 15. Selection round will be held on the department judge system.',
      actionUrl: '/events/ncpc-2026',
      actionLabel: 'REGISTER NOW',
      targetAudience: 'ALL_CSE' as TargetAudienceType,
      isTicker: true,
      isPublished: true,
      authorId: 'mod-1',
      createdAt: new Date('2026-09-25T10:00:00Z'),
    },
    {
      id: 'ann-2',
      category: 'WORKSHOP' as AnnouncementCategory,
      title: 'Full-Stack Architecture & Microservices Masterclass with Google Engineers',
      slug: 'fullstack-architecture-masterclass',
      content: 'A comprehensive 3-day deep dive into scalable cloud systems, event-driven architectures, and modern DevOps tooling. Exclusively for 3rd and 4th-year CSE students.',
      actionUrl: '/events/fullstack-masterclass',
      actionLabel: 'VIEW SYLLABUS & SLOTS',
      targetAudience: 'THIRD_YEAR' as TargetAudienceType,
      isTicker: true,
      isPublished: true,
      authorId: 'mod-1',
      createdAt: new Date('2026-09-24T14:30:00Z'),
    },
    {
      id: 'ann-3',
      category: 'CAREER_OPPORTUNITY' as AnnouncementCategory,
      title: 'Alumni Tech Talk: Landing Remote High-Scale Backend Engineering Roles',
      slug: 'alumni-tech-talk-remote-careers',
      content: 'Join CSE Batch 32 alumnus Farhad Karim (Staff Infrastructure Engineer at Datadog) as he breaks down real-world system design interview patterns and open-source contribution strategies.',
      actionUrl: '/community/events/alumni-talk',
      actionLabel: 'RSVP ATTENDANCE',
      targetAudience: 'ALL_CSE' as TargetAudienceType,
      isTicker: true,
      isPublished: true,
      authorId: 'mod-1',
      createdAt: new Date('2026-09-22T09:00:00Z'),
    },
    {
      id: 'ann-4',
      category: 'IMPORTANT_NOTICE' as AnnouncementCategory,
      title: 'Final Semester Capstone Project Synopsis Submission Deadline Extended',
      slug: 'capstone-project-synopsis-extended',
      content: 'Formal notice from CSE Project Committee: The deadline for submitting revised project synopses, faculty supervisor signatures, and system architecture diagrams has been extended to October 5.',
      actionUrl: '/academic/capstone',
      actionLabel: 'SUBMIT DOCUMENT',
      targetAudience: 'FOURTH_YEAR' as TargetAudienceType,
      isTicker: false,
      isPublished: true,
      authorId: 'mod-1',
      createdAt: new Date('2026-09-20T16:00:00Z'),
    },
  ];

  async getTickerItems() {
    try {
      const items = await this.prisma.announcement.findMany({
        where: { isTicker: true, isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 8,
      });
      if (items.length > 0) return items;
    } catch (e) {
      // Fallback if db offline
    }
    return this.defaultAnnouncements.filter((a) => a.isTicker);
  }

  async getEditorialFeed(category?: AnnouncementCategory) {
    try {
      const items = await this.prisma.announcement.findMany({
        where: {
          isPublished: true,
          ...(category ? { category } : {}),
        },
        orderBy: { createdAt: 'desc' },
      });
      if (items.length > 0) return items;
    } catch (e) {
      // Fallback
    }
    return this.defaultAnnouncements.filter((a) => (!category || a.category === category));
  }

  async create(dto: CreateAnnouncementDto, authorId: string) {
    const slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    try {
      return await this.prisma.announcement.create({
        data: {
          ...dto,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          authorId,
        },
      });
    } catch (e) {
      return { id: `ann-${Date.now()}`, ...dto, slug, authorId, createdAt: new Date() };
    }
  }
}
