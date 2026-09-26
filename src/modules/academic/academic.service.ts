import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CourseData {
  id: string;
  code: string;
  title: string;
  credits: number;
  semesterNo: number;
  facultyName: string;
  syllabusOverview: string;
  resourcesCount: number;
}

export interface ResourceItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  category: string;
  title: string;
  fileFormat: string;
  fileSize: string;
  downloadsCount: number;
  uploadedAt: string;
  uploadedBy: string;
}

@Injectable()
export class AcademicService {
  constructor(private prisma: PrismaService) {}

  private coursesList: CourseData[] = [
    { id: 'c-1', code: 'CSE-111', title: 'Structured Programming Language (C)', credits: 3.0, semesterNo: 1, facultyName: 'Dr. Shahriar Rahman', syllabusOverview: 'Syntax, pointers, dynamic memory allocation, file I/O, recursion.', resourcesCount: 18 },
    { id: 'c-2', code: 'CSE-121', title: 'Object Oriented Programming (Java/C++)', credits: 3.0, semesterNo: 2, facultyName: 'Asst. Prof. Nadia Islam', syllabusOverview: 'Classes, inheritance, polymorphism, abstract classes, exception handling, STL/Collections.', resourcesCount: 24 },
    { id: 'c-3', code: 'CSE-211', title: 'Data Structures and Algorithms', credits: 4.0, semesterNo: 3, facultyName: 'Prof. K. M. Hossain', syllabusOverview: 'Arrays, linked lists, trees, graphs, sorting, searching, DP, shortest paths.', resourcesCount: 38 },
    { id: 'c-4', code: 'CSE-221', title: 'Discrete Mathematics', credits: 3.0, semesterNo: 3, facultyName: 'Dr. Mahmudul Hasan', syllabusOverview: 'Set theory, propositional logic, graph theory, combinatorics, proof methods.', resourcesCount: 15 },
    { id: 'c-5', code: 'CSE-311', title: 'Database Management Systems', credits: 3.0, semesterNo: 5, facultyName: 'Asst. Prof. Tanvir Ahmed', syllabusOverview: 'Relational algebra, SQL, normalization (BCNF/3NF), indexing, transactions & ACID.', resourcesCount: 29 },
    { id: 'c-6', code: 'CSE-321', title: 'Operating Systems & System Programming', credits: 3.0, semesterNo: 5, facultyName: 'Dr. Farhana Yasmin', syllabusOverview: 'Processes, threads, CPU scheduling, semaphores, deadlock, memory management, page replacement.', resourcesCount: 31 },
    { id: 'c-7', code: 'CSE-331', title: 'Computer Networks', credits: 3.0, semesterNo: 6, facultyName: 'Prof. Anisul Haque', syllabusOverview: 'OSI & TCP/IP stack, routing protocols, sliding window, congestion control, sockets.', resourcesCount: 22 },
    { id: 'c-8', code: 'CSE-411', title: 'Software Engineering & System Architecture', credits: 3.0, semesterNo: 7, facultyName: 'Dr. Zulfikar Ali', syllabusOverview: 'Agile/Scrum, UML, design patterns, microservices, CI/CD, testing methodologies.', resourcesCount: 19 },
  ];

  private resourcesList: ResourceItem[] = [
    { id: 'r-1', courseCode: 'CSE-211', courseTitle: 'Data Structures and Algorithms', category: 'LECTURE_NOTE', title: 'Complete Graph Algorithms & Dijkstra Walkthrough', fileFormat: 'PDF', fileSize: '4.2 MB', downloadsCount: 248, uploadedAt: '2026-09-18', uploadedBy: 'Prof. K. M. Hossain' },
    { id: 'r-2', courseCode: 'CSE-211', courseTitle: 'Data Structures and Algorithms', category: 'PREVIOUS_QUESTION', title: 'Midterm Examination Question Papers (Fall 2024 - Spring 2026)', fileFormat: 'PDF', fileSize: '2.8 MB', downloadsCount: 412, uploadedAt: '2026-09-15', uploadedBy: 'Academic Cell' },
    { id: 'r-3', courseCode: 'CSE-311', courseTitle: 'Database Management Systems', category: 'SLIDES', title: 'Lecture 07 - B+ Tree Indexing & Query Plans', fileFormat: 'PPTX', fileSize: '6.1 MB', downloadsCount: 184, uploadedAt: '2026-09-20', uploadedBy: 'Asst. Prof. Tanvir Ahmed' },
    { id: 'r-4', courseCode: 'CSE-311', courseTitle: 'Database Management Systems', category: 'LAB_MANUAL', title: 'PostgreSQL Advanced Triggers & Stored Procedures Lab Manual', fileFormat: 'PDF', fileSize: '1.9 MB', downloadsCount: 290, uploadedAt: '2026-09-12', uploadedBy: 'Lab Instructor' },
    { id: 'r-5', courseCode: 'CSE-321', courseTitle: 'Operating Systems & System Programming', category: 'EXAM_SUGGESTION', title: 'Final Exam Preparation Guide: Deadlock & Virtual Memory', fileFormat: 'PDF', fileSize: '1.4 MB', downloadsCount: 356, uploadedAt: '2026-09-21', uploadedBy: 'Dr. Farhana Yasmin' },
    { id: 'r-6', courseCode: 'CSE-121', courseTitle: 'Object Oriented Programming', category: 'ASSIGNMENT_SPEC', title: 'Term Project Specification: University ERP Console App', fileFormat: 'PDF', fileSize: '850 KB', downloadsCount: 195, uploadedAt: '2026-09-14', uploadedBy: 'Asst. Prof. Nadia Islam' },
  ];

  getCourses(semester?: number, search?: string) {
    let result = [...this.coursesList];
    if (semester) {
      result = result.filter((c) => c.semesterNo === Number(semester));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
    }
    return result;
  }

  getResources(category?: string, courseCode?: string, search?: string) {
    let result = [...this.resourcesList];
    if (category) {
      result = result.filter((r) => r.category === category);
    }
    if (courseCode) {
      result = result.filter((r) => r.courseCode.toLowerCase() === courseCode.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) => r.title.toLowerCase().includes(q) || r.courseCode.toLowerCase().includes(q));
    }
    return result;
  }
}
