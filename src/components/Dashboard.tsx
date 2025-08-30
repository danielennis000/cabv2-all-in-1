import { useState } from 'react';
import { 
  Clock, 
  Users, 
  FileText, 
  Plus, 
  Search, 
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Archive
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { sampleProjects, type Project } from '../seeds/sampleProjects';
import { clsx } from 'clsx';

interface DashboardProps {
  onCreateNew?: () => void;
  onOpenProject?: (projectId: string) => void;
}

export function Dashboard({ onCreateNew, onOpenProject }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'modified' | 'created' | 'title'>('modified');

  const filteredProjects = sampleProjects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'modified':
          return b.lastModified.getTime() - a.lastModified.getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.lastModified.getTime() - a.lastModified.getTime();
      }
    });

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'archived':
        return <Archive className="w-4 h-4 text-grey-4" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-grey-6 text-grey-3';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-grey-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-arial font-bold text-3xl text-grey-1 mb-2">My AI Projects</h1>
            <p className="text-grey-3 leading-6">
              Manage and collaborate on your custom AI instruction projects
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={onCreateNew}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rightElement={<Search className="w-4 h-4 text-grey-3" />}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-grey-5 rounded-lg text-sm font-arial focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-grey-5 rounded-lg text-sm font-arial focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:border-transparent"
            >
              <option value="modified">Last Modified</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-grey-7 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-asu-maroon" />
              <span className="text-sm font-arial font-medium text-grey-2">Total Projects</span>
            </div>
            <span className="text-2xl font-arial font-bold text-grey-1">{sampleProjects.length}</span>
          </div>
          
          <div className="bg-grey-7 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-arial font-medium text-grey-2">Published</span>
            </div>
            <span className="text-2xl font-arial font-bold text-grey-1">
              {sampleProjects.filter(p => p.status === 'published').length}
            </span>
          </div>
          
          <div className="bg-grey-7 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-arial font-medium text-grey-2">In Progress</span>
            </div>
            <span className="text-2xl font-arial font-bold text-grey-1">
              {sampleProjects.filter(p => p.status === 'draft').length}
            </span>
          </div>
          
          <div className="bg-grey-7 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-brand-teal" />
              <span className="text-sm font-arial font-medium text-grey-2">Collaborators</span>
            </div>
            <span className="text-2xl font-arial font-bold text-grey-1">
              {new Set(sampleProjects.flatMap(p => p.collaborators)).size}
            </span>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="p-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-grey-4 mx-auto mb-4" />
            <h3 className="font-arial font-bold text-lg text-grey-2 mb-2">No projects found</h3>
            <p className="text-grey-3 mb-4">Try adjusting your search or filters, or create a new project.</p>
            <Button variant="primary" onClick={onCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Project
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="border border-grey-4 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white cursor-pointer"
                onClick={() => onOpenProject?.(project.id)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${project.title} project`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProject?.(project.id);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-arial font-bold text-xl text-grey-1">
                        {project.title}
                      </h3>
                      <span className={clsx(
                        "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                        getStatusColor(project.status)
                      )}>
                        {getStatusIcon(project.status)}
                        {project.status}
                      </span>
                      <span className="text-xs text-grey-3 bg-grey-6 px-2 py-1 rounded">
                        {project.version}
                      </span>
                    </div>
                    <p className="text-grey-3 text-sm leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-grey-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(project.lastModified)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {project.collaborators.length} collaborator{project.collaborators.length !== 1 ? 's' : ''}
                      </div>
                      <span className="bg-brand-light-grey text-brand-teal px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {project.collaborators.slice(0, 3).map((collaborator, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-asu-maroon to-red-600 flex items-center justify-center text-white text-xs font-arial font-bold border-2 border-white"
                          title={collaborator}
                        >
                          {collaborator.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {project.collaborators.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-grey-4 flex items-center justify-center text-grey-2 text-xs font-arial font-bold border-2 border-white">
                          +{project.collaborators.length - 3}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
