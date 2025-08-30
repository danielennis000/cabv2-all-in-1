export interface Project {
  id: string;
  title: string;
  description: string;
  lastModified: Date;
  createdBy: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  collaborators: string[];
  version: string;
}

export const sampleProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Customer Support Bot v2.1',
    description: 'Enhanced customer service assistant with advanced escalation protocols and sentiment analysis',
    lastModified: new Date('2025-01-15T14:30:00'),
    createdBy: 'Sarah Chen',
    status: 'published',
    category: 'Customer Service',
    collaborators: ['Sarah Chen', 'Mike Rodriguez', 'Jennifer Kim'],
    version: 'v2.1'
  },
  {
    id: 'proj-2',
    title: 'Educational Math Tutor',
    description: 'Adaptive learning assistant specializing in high school algebra and geometry',
    lastModified: new Date('2025-01-14T09:15:00'),
    createdBy: 'Dr. Emily Watson',
    status: 'draft',
    category: 'Education',
    collaborators: ['Dr. Emily Watson', 'Mark Thompson'],
    version: 'v1.3'
  },
  {
    id: 'proj-3',
    title: 'Code Review Assistant Pro',
    description: 'Advanced technical reviewer with security scanning and performance optimization suggestions',
    lastModified: new Date('2025-01-13T16:45:00'),
    createdBy: 'Alex Patel',
    status: 'published',
    category: 'Development',
    collaborators: ['Alex Patel', 'Lisa Chang', 'David Kumar', 'Rachel Green'],
    version: 'v3.0'
  },
  {
    id: 'proj-4',
    title: 'Content Marketing Assistant',
    description: 'SEO-optimized content creator for blog posts, social media, and email campaigns',
    lastModified: new Date('2025-01-12T11:20:00'),
    createdBy: 'Maria Gonzalez',
    status: 'draft',
    category: 'Marketing',
    collaborators: ['Maria Gonzalez', 'Tom Wilson'],
    version: 'v1.0'
  },
  {
    id: 'proj-5',
    title: 'Research Analysis Bot',
    description: 'Academic research assistant with citation management and literature review capabilities',
    lastModified: new Date('2025-01-11T13:10:00'),
    createdBy: 'Prof. Robert Lee',
    status: 'published',
    category: 'Research',
    collaborators: ['Prof. Robert Lee', 'Anna Schmidt', 'James Foster'],
    version: 'v2.5'
  },
  {
    id: 'proj-6',
    title: 'Healthcare Appointment Scheduler',
    description: 'HIPAA-compliant patient interaction assistant for appointment booking and basic health inquiries',
    lastModified: new Date('2025-01-10T08:30:00'),
    createdBy: 'Dr. Michelle Adams',
    status: 'draft',
    category: 'Healthcare',
    collaborators: ['Dr. Michelle Adams', 'Nurse Tracy Johnson'],
    version: 'v1.1'
  },
  {
    id: 'proj-7',
    title: 'E-commerce Product Advisor',
    description: 'Personalized shopping assistant with product recommendations and price comparisons',
    lastModified: new Date('2025-01-09T15:45:00'),
    createdBy: 'Kevin Zhang',
    status: 'published',
    category: 'E-commerce',
    collaborators: ['Kevin Zhang', 'Sophie Miller', 'Chris Johnson'],
    version: 'v1.8'
  },
  {
    id: 'proj-8',
    title: 'Financial Planning Assistant',
    description: 'Personal finance advisor with budgeting tools and investment guidance',
    lastModified: new Date('2025-01-08T12:00:00'),
    createdBy: 'Amanda Roberts',
    status: 'archived',
    category: 'Finance',
    collaborators: ['Amanda Roberts', 'Steve Davis'],
    version: 'v1.0'
  }
];

export const getProjectsByStatus = (status: Project['status']) => 
  sampleProjects.filter(project => project.status === status);

export const getProjectsByUser = (userId: string) => 
  sampleProjects.filter(project => 
    project.createdBy === userId || project.collaborators.includes(userId)
  );

export const getRecentProjects = (limit: number = 5) => 
  sampleProjects
    .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
    .slice(0, limit);
