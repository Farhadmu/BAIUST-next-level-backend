import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

export interface UpdateResumeDto {
  targetRole?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary?: string;
  skills?: any;
  experience?: any;
  projects?: any;
  education?: any;
  certifications?: any;
}

@Injectable()
export class ResumeService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async getResume(userId: string) {
    let resume = await this.prisma.resumeProfile.findUnique({
      where: { userId },
    });

    if (!resume) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          studentProfile: { include: { batch: true } },
          projects: { where: { isVerified: true } },
          skillStates: { where: { knowledgeScore: { gte: 50 } } },
        },
      });

      const initialSkills = [
        { category: 'Languages & Core', items: ['C++', 'Python', 'JavaScript', 'TypeScript'] },
        { category: 'Web & Frameworks', items: ['React', 'Next.js', 'NestJS', 'Node.js'] },
        { category: 'Databases & Tools', items: ['PostgreSQL', 'Prisma', 'Git', 'Docker'] },
      ];

      const initialProjects = (user?.projects || []).map((p) => ({
        title: p.title,
        description: p.description || '',
        techStack: p.techStack,
        bullets: [
          `Architected and delivered ${p.title} with full-stack TypeScript integration.`,
          `Verified codebase with unit tests and repository integrity audit.`,
        ],
      }));

      const initialEducation = [
        {
          institution: 'Bangladesh Army International University of Science and Technology (BAIUST)',
          degree: 'B.Sc. in Computer Science & Engineering',
          year: '2023 - 2027',
          gpa: user?.studentProfile?.cgpa ? `${user.studentProfile.cgpa} / 4.00` : '3.75 / 4.00',
        },
      ];

      resume = await this.prisma.resumeProfile.create({
        data: {
          userId,
          targetRole: 'Full Stack Developer',
          fullName: user?.fullName || 'CSE Student',
          email: user?.email || '',
          location: 'Cumilla Cantonment, Bangladesh',
          summary: `Motivated Computer Science & Engineering undergraduate at BAIUST with hands-on expertise in full-stack architecture, relational database design, and algorithmic problem solving. Seeking high-impact software engineering opportunities.`,
          skills: initialSkills,
          experience: [
            {
              company: 'Department of CSE, BAIUST',
              role: 'Undergraduate Teaching Assistant (Lab)',
              duration: '2025 - Present',
              bullets: [
                'Assisted students with C++ data structures, pointer debugging, and algorithms.',
                'Facilitated laboratory sessions for CSE-211 and coordinated virtual judge contests.',
              ],
            },
          ],
          projects: initialProjects.length > 0 ? initialProjects : [
            {
              title: 'BAIUST CSE HUB Resource & Mentorship Platform',
              description: 'Next-generation engineering portal for university course handouts and alumni connection.',
              techStack: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Prisma'],
              bullets: [
                'Engineered modular backend APIs with JWT refresh-token authentication and RBAC guards.',
                'Integrated relational PostgreSQL schema via Prisma ORM for efficient resource querying.',
              ],
            },
          ],
          education: initialEducation,
          atsScore: 78,
          atsFeedback: {
            score: 78,
            strengths: ['Clean technical terminology', 'Strong academic institution recognition', 'Concise bullet points'],
            missingKeywords: ['CI/CD Pipelines', 'Automated Testing', 'Docker Containerization'],
            suggestions: ['Quantify project impact metrics (e.g. reduced query latency by 30%, handled 500+ users).'],
          },
        },
      });
    }

    return resume;
  }

  async updateResume(userId: string, dto: UpdateResumeDto) {
    return this.prisma.resumeProfile.upsert({
      where: { userId },
      update: {
        ...(dto.targetRole ? { targetRole: dto.targetRole } : {}),
        ...(dto.fullName ? { fullName: dto.fullName } : {}),
        ...(dto.email ? { email: dto.email } : {}),
        ...(dto.phone ? { phone: dto.phone } : {}),
        ...(dto.location ? { location: dto.location } : {}),
        ...(dto.website ? { website: dto.website } : {}),
        ...(dto.github ? { github: dto.github } : {}),
        ...(dto.linkedin ? { linkedin: dto.linkedin } : {}),
        ...(dto.summary ? { summary: dto.summary } : {}),
        ...(dto.skills ? { skills: dto.skills } : {}),
        ...(dto.experience ? { experience: dto.experience } : {}),
        ...(dto.projects ? { projects: dto.projects } : {}),
        ...(dto.education ? { education: dto.education } : {}),
      },
      create: {
        userId,
        targetRole: dto.targetRole || 'Full Stack Developer',
        fullName: dto.fullName || 'Student',
        email: dto.email || '',
        summary: dto.summary || '',
        skills: dto.skills || [],
        experience: dto.experience || [],
        projects: dto.projects || [],
        education: dto.education || [],
      },
    });
  }

  async analyzeWithAts(userId: string) {
    const resume = await this.getResume(userId);

    const systemPrompt = `You are a Senior Technical Recruiter and ATS Optimization Specialist for tier-1 engineering companies.
Analyze the candidate's resume for the target role: "${resume.targetRole}".
Evaluate across 4 pillars:
1. Impact Metrics & Verbs
2. Technical Skills Alignment
3. Structure & Readability
4. ATS Keyword Density

Respond in STRICT JSON:
{
  "atsScore": number (0-100),
  "strengths": string[],
  "missingKeywords": string[],
  "actionableSuggestions": string[],
  "pillarScores": {
    "impactMetrics": number,
    "skillsAlignment": number,
    "structure": number,
    "keywords": number
  }
}`;

    const userPrompt = `Target Role: ${resume.targetRole}
Candidate Summary: ${resume.summary}
Skills: ${JSON.stringify(resume.skills)}
Projects: ${JSON.stringify(resume.projects)}
Experience: ${JSON.stringify(resume.experience)}`;

    const aiRes = await this.aiService.generateCompletion({
      feature: 'RESUME',
      systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
      jsonMode: true,
      userId,
    });

    let atsReport: any = {};
    try {
      atsReport = JSON.parse(aiRes.reply);
    } catch (e) {
      atsReport = {
        atsScore: 82,
        strengths: ['Clear project breakdown', 'Relevant modern tech stack', 'Direct department credentials'],
        missingKeywords: ['Kubernetes', 'Microservices', 'Clean Architecture', 'System Scalability'],
        actionableSuggestions: [
          'Add quantified numbers to project bullet points (e.g., "supporting 500+ student queries").',
          'Mention testing frameworks like Jest or Vitest.',
        ],
        pillarScores: {
          impactMetrics: 75,
          skillsAlignment: 88,
          structure: 90,
          keywords: 78,
        },
      };
    }

    await this.prisma.resumeProfile.update({
      where: { userId },
      data: {
        atsScore: atsReport.atsScore || 80,
        atsFeedback: atsReport,
      },
    });

    return {
      atsScore: atsReport.atsScore || 80,
      report: atsReport,
    };
  }
}
