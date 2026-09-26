import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsService {
  getToolsCatalog() {
    return [
      {
        category: 'ACADEMIC',
        name: 'Cover Page Generator',
        slug: 'cover-page-generator',
        description: 'Generate standard university assignment, lab report, and project report cover sheets in crisp A4 vector format with official department logos and formatting rules.',
        isReady: true,
      },
      {
        category: 'ACADEMIC',
        name: 'Report Formatter',
        slug: 'report-formatter',
        description: 'IEEE & ACM reference styling, title blocks, and thesis guidelines generator.',
        isReady: true,
      },
      {
        category: 'PDF',
        name: 'PDF Merge & Split',
        slug: 'pdf-tools',
        description: 'Combine multiple course handouts, split exam notes, and reorder document pages client-side without uploading to external unverified servers.',
        isReady: true,
      },
      {
        category: 'CAREER',
        name: 'CSE CV / Resume Builder',
        slug: 'cv-builder',
        description: 'ATS-optimized technical resume builder tailored for CSE internships, software engineering roles, and research positions.',
        isReady: true,
      },
      {
        category: 'DEVELOPER',
        name: 'Developer Toolkit',
        slug: 'developer-suite',
        description: 'JSON beautifier & validator, Base64 encoder/decoder, Regex sandbox, UNIX timestamp converter, and CSS color tokens generator.',
        isReady: true,
      },
    ];
  }
}
