import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  ShieldAlert, 
  Activity,
  Users,
  Globe,
  AlertTriangle
} from 'lucide-react';

// Mock data
const threatTrends = [
  { month: 'Jan', critical: 12, high: 45, medium: 123, low: 234 },
  { month: 'Feb', critical: 8, high: 52, medium: 156, low: 198 },
  { month: 'Mar', critical: 15, high: 38, medium: 134, low: 267 },
  { month: 'Apr', critical: 22, high: 67, medium: 189, low: 298 },
  { month: 'May', critical: 18, high: 78, medium: 201, low: 334 },
  { month: 'Jun', critical: 25, high: 89, medium: 223, low: 356 }
];

const eventDistribution = [
  { name: 'Camera Access', value: 234, color: 'hsl(217, 91%, 60%)' },
  { name: 'Microphone', value: 187, color: 'hsl(15, 90%, 55%)' },
  { name: 'Geolocation', value: 156, color: 'hsl(45, 93%, 58%)' },
  { name: 'Clipboard', value: 123, color: 'hsl(142, 76%, 36%)' },
  { name: 'Local Storage', value: 89, color: 'hsl(260, 84%, 60%)' }
];

const realTimeActivity = [
  { time: '00:00', events: 12 },
  { time: '04:00', events: 8 },
  { time: '08:00', events: 45 },
  { time: '12:00', events: 67 },
  { time: '16:00', events: 89 },
  { time: '20:00', events: 56 },
  { time: '24:00', events: 23 }
];

const topSources = [
  { source: 'extension-chrome-123', events: 456, trend: 'up' },
  { source: 'webapp-security-scan', events: 334, trend: 'down' },
  { source: 'mobile-app-tracker', events: 289, trend: 'up' },
  { source: 'api-gateway-monitor', events: 234, trend: 'up' },
  { source: 'browser-extension-ff', events: 198, trend: 'down' }
];

export const AnalyticsCharts = () => {
  const totalEvents = threatTrends.reduce((sum, month) => 
    sum + month.critical + month.high + month.medium + month.low, 0
  );
  
  const criticalEvents = threatTrends.reduce((sum, month) => sum + month.critical, 0);
  const changePercent = ((criticalEvents - 85) / 85 * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Summary Cards */}
      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalEvents.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
              <Badge className="mt-2 threat-low">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{criticalEvents}</div>
              <div className="text-sm text-muted-foreground">Critical Threats</div>
              <Badge className="mt-2 threat-critical">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{changePercent}%
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">98.5%</div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
              <Badge className="mt-2 threat-low">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.1%
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">2.3s</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
              <Badge className="mt-2 threat-medium">
                <TrendingDown className="w-3 h-3 mr-1" />
                -0.5s
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threat Trends Chart */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" />
            Threat Trends (6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={threatTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="critical" stackId="a" fill="hsl(0, 84%, 60%)" name="Critical" />
              <Bar dataKey="high" stackId="a" fill="hsl(15, 90%, 55%)" name="High" />
              <Bar dataKey="medium" stackId="a" fill="hsl(45, 93%, 58%)" name="Medium" />
              <Bar dataKey="low" stackId="a" fill="hsl(142, 76%, 36%)" name="Low" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Event Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Event Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {eventDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Real-time Activity */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Real-time Activity (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={realTimeActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="events" 
                stroke="hsl(217, 91%, 60%)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(217, 91%, 60%)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Top Event Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-sm truncate max-w-32">{source.source}</div>
                    <div className="text-xs text-muted-foreground">{source.events} events</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {source.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};