import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Shield, 
  ShieldAlert, 
  ShieldX,
  MoreHorizontal,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  details: string;
  status: 'active' | 'blocked' | 'allowed';
}

// Mock data
const generateMockLogs = (): LogEntry[] => {
  const events = [
    'Camera access request',
    'Microphone permission denied',
    'Clipboard read attempt',
    'Geolocation tracking detected',
    'Cross-origin data access',
    'Local storage modification',
    'Cookie manipulation detected',
    'WebRTC connection established',
    'File download initiated',
    'Screen sharing request'
  ];
  
  const sources = ['extension-123', 'webapp-456', 'api-789', 'mobile-app'];
  const severities: LogEntry['severity'][] = ['critical', 'high', 'medium', 'low'];
  const statuses: LogEntry['status'][] = ['active', 'blocked', 'allowed'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `log-${i + 1}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    event: events[Math.floor(Math.random() * events.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    details: `Detailed information about security event ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }));
};

const getSeverityIcon = (severity: LogEntry['severity']) => {
  switch (severity) {
    case 'critical':
      return <ShieldX className="w-4 h-4 text-red-400" />;
    case 'high':
      return <ShieldAlert className="w-4 h-4 text-orange-400" />;
    case 'medium':
      return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    case 'low':
      return <Shield className="w-4 h-4 text-green-400" />;
  }
};

const getSeverityColor = (severity: LogEntry['severity']) => {
  switch (severity) {
    case 'critical':
      return 'threat-critical';
    case 'high':
      return 'threat-high';
    case 'medium':
      return 'threat-medium';
    case 'low':
      return 'threat-low';
  }
};

const getStatusIcon = (status: LogEntry['status']) => {
  switch (status) {
    case 'blocked':
      return <XCircle className="w-4 h-4 text-red-400" />;
    case 'allowed':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'active':
      return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
  }
};

export const LogTable = () => {
  const [logs] = useState<LogEntry[]>(generateMockLogs());
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof LogEntry>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedLogs = useMemo(() => {
    let filtered = logs.filter(log => {
      const matchesSearch = log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
      
      return matchesSearch && matchesSeverity && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sortField === 'timestamp') {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        if (aTime < bTime) return sortDirection === 'asc' ? -1 : 1;
        if (aTime > bTime) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [logs, searchTerm, severityFilter, statusFilter, sortField, sortDirection]);

  const handleSort = (field: keyof LogEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleAction = (logId: string, action: string) => {
    console.log(`Action ${action} on log ${logId}`);
  };

  const exportLogs = () => {
    console.log('Exporting logs...');
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Event Log
          </CardTitle>
          <Button onClick={exportLogs} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events, sources, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="allowed">Allowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center gap-1">
                    Timestamp
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('severity')}
                >
                  <div className="flex items-center gap-1">
                    Severity
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('event')}
                >
                  <div className="flex items-center gap-1">
                    Event
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getSeverityColor(log.severity)} border`}>
                      <div className="flex items-center gap-1">
                        {getSeverityIcon(log.severity)}
                        {log.severity.toUpperCase()}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.event}</TableCell>
                  <TableCell className="font-mono text-sm">{log.source}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(log.status)}
                      <span className="capitalize">{log.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={log.details}>
                    {log.details}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction(log.id, 'block')}>
                          <XCircle className="w-4 h-4 mr-2 text-red-400" />
                          Block
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(log.id, 'allow')}>
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          Allow
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction(log.id, 'quarantine')}>
                          <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
                          Quarantine
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};