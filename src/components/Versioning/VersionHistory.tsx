import { useState } from 'react';
import { 
  Clock, 
  User, 
  GitBranch, 
  Eye, 
  RotateCcw,
  MessageSquare,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';

interface Version {
  id: string;
  version: string;
  description: string;
  author: string;
  timestamp: Date;
  changes: string[];
  branch: string;
  isCurrentVersion: boolean;
  commentCount: number;
}

const sampleVersions: Version[] = [
  {
    id: 'v-1',
    version: 'v2.1',
    description: 'Added advanced escalation protocols and sentiment analysis',
    author: 'Sarah Chen',
    timestamp: new Date('2025-01-15T14:30:00'),
    changes: [
      'Added sentiment analysis triggers',
      'Enhanced escalation decision tree',
      'Updated response templates for angry customers',
      'Improved handoff to human agents'
    ],
    branch: 'main',
    isCurrentVersion: true,
    commentCount: 3
  },
  {
    id: 'v-2',
    version: 'v2.0',
    description: 'Major rewrite with new conversation handling',
    author: 'Sarah Chen',
    timestamp: new Date('2025-01-12T16:45:00'),
    changes: [
      'Completely rewrote conversation flow',
      'Added multi-turn context awareness',
      'Implemented customer history lookup',
      'Added proactive suggestion system'
    ],
    branch: 'main',
    isCurrentVersion: false,
    commentCount: 8
  },
  {
    id: 'v-3',
    version: 'v1.9',
    description: 'Bug fixes and performance improvements',
    author: 'Mike Rodriguez',
    timestamp: new Date('2025-01-10T11:20:00'),
    changes: [
      'Fixed timeout issues in API calls',
      'Optimized response generation speed',
      'Corrected typos in help documentation',
      'Updated security validation rules'
    ],
    branch: 'main',
    isCurrentVersion: false,
    commentCount: 2
  },
  {
    id: 'v-4',
    version: 'v1.8',
    description: 'Experimental branch - A/B testing new greeting style',
    author: 'Jennifer Kim',
    timestamp: new Date('2025-01-08T09:15:00'),
    changes: [
      'Added personalized greeting templates',
      'Implemented customer preference detection',
      'Created warmth vs efficiency toggle',
      'Added greeting effectiveness metrics'
    ],
    branch: 'experimental-greetings',
    isCurrentVersion: false,
    commentCount: 5
  },
  {
    id: 'v-5',
    version: 'v1.7',
    description: 'Integration with new knowledge base system',
    author: 'Sarah Chen',
    timestamp: new Date('2025-01-05T13:45:00'),
    changes: [
      'Connected to updated FAQ database',
      'Added dynamic content retrieval',
      'Implemented relevance scoring',
      'Updated citation format for sources'
    ],
    branch: 'main',
    isCurrentVersion: false,
    commentCount: 1
  },
  {
    id: 'v-6',
    version: 'v1.6',
    description: 'Initial release candidate with core functionality',
    author: 'Sarah Chen',
    timestamp: new Date('2025-01-01T10:00:00'),
    changes: [
      'Implemented basic customer service responses',
      'Added escalation keyword detection',
      'Created standard response templates',
      'Established conversation logging'
    ],
    branch: 'main',
    isCurrentVersion: false,
    commentCount: 12
  }
];

interface VersionHistoryProps {
  onRestoreVersion?: (versionId: string) => void;
  onViewVersion?: (versionId: string) => void;
  onCreateBranch?: (fromVersionId: string) => void;
}

export function VersionHistory({ onRestoreVersion, onViewVersion, onCreateBranch }: VersionHistoryProps) {
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set(['v-1']));
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const toggleVersionExpanded = (versionId: string) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(versionId)) {
      newExpanded.delete(versionId);
    } else {
      newExpanded.add(versionId);
    }
    setExpandedVersions(newExpanded);
  };

  const filteredVersions = selectedBranch === 'all' 
    ? sampleVersions 
    : sampleVersions.filter(v => v.branch === selectedBranch);

  const branches = [...new Set(sampleVersions.map(v => v.branch))];

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

  const getBranchColor = (branch: string) => {
    switch (branch) {
      case 'main':
        return 'bg-green-100 text-green-800';
      case 'experimental-greetings':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white border-l border-grey-6 w-80 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-grey-6">
        <h3 className="font-arial font-bold text-lg text-grey-1 mb-2">Version History</h3>
        <p className="text-sm text-grey-3 mb-4">
          Track changes and restore previous versions
        </p>
        
        {/* Branch Filter */}
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="w-full px-3 py-2 border border-grey-5 rounded-lg text-sm font-arial focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:border-transparent"
        >
          <option value="all">All Branches</option>
          {branches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      {/* Version List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredVersions.map((version) => (
            <div
              key={version.id}
              className={clsx(
                "border rounded-lg p-3 transition-all",
                version.isCurrentVersion 
                  ? "border-asu-maroon bg-red-50" 
                  : "border-grey-4 bg-white hover:shadow-sm"
              )}
            >
              {/* Version Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      onClick={() => toggleVersionExpanded(version.id)}
                      className="p-0.5 hover:bg-grey-6 rounded"
                    >
                      {expandedVersions.has(version.id) ? (
                        <ChevronDown className="w-3 h-3 text-grey-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-grey-3" />
                      )}
                    </button>
                    <span className="font-arial font-bold text-sm text-grey-1">
                      {version.version}
                    </span>
                    {version.isCurrentVersion && (
                      <span className="bg-asu-maroon text-white text-xs px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <span className={clsx(
                      "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
                      getBranchColor(version.branch)
                    )}>
                      <GitBranch className="w-3 h-3" />
                      {version.branch}
                    </span>
                  </div>
                  
                  <p className="text-xs text-grey-2 mb-2">
                    {version.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-grey-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {version.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(version.timestamp)}
                    </div>
                    {version.commentCount > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {version.commentCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedVersions.has(version.id) && (
                <div className="mt-3 pt-3 border-t border-grey-6">
                  <h4 className="font-arial font-medium text-xs text-grey-2 mb-2">Changes:</h4>
                  <ul className="space-y-1 mb-3">
                    {version.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="text-xs text-grey-3 flex items-start gap-2">
                        <span className="w-1 h-1 bg-grey-4 rounded-full mt-1.5 flex-shrink-0"></span>
                        {change}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewVersion?.(version.id)}
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    {!version.isCurrentVersion && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRestoreVersion?.(version.id)}
                        className="text-xs"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Restore
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCreateBranch?.(version.id)}
                      className="text-xs"
                    >
                      <GitBranch className="w-3 h-3" />
                      Branch
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-grey-6">
        <Button variant="primary" size="sm" className="w-full text-xs">
          Save New Version
        </Button>
      </div>
    </div>
  );
}
