import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/Logo';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LogTable } from '@/components/LogTable';
import { AnalyticsCharts } from '@/components/AnalyticsCharts';
import { FloatingWidget } from '@/components/FloatingWidget';
import { PasswordHealth } from '@/components/PasswordHealth';
import { ConsentModal } from '@/components/ConsentModal';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  Activity, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Download,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleLogout = () => {
    logout();
  };

  const handleExportData = () => {
    console.log('Exporting security data...');
  };

  const handleToggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    setLastUpdate(new Date());
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-4">
            {/* Status Indicators */}
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-muted-foreground">
                  {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            
            <DarkModeToggle />
            
            <Button variant="ghost" onClick={handleLogout} className="text-red-400 hover:text-red-300">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}
              </h1>
              <p className="text-muted-foreground">
                Security monitoring dashboard - Protecting your digital environment 24/7
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleToggleMonitoring}
                variant={isMonitoring ? "destructive" : "default"}
                className="bg-gradient-primary"
              >
                {isMonitoring ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Monitoring
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Monitoring
                  </>
                )}
              </Button>
              
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Threats</p>
                  <p className="text-2xl font-bold text-red-400">3</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Badge className="threat-critical">Critical</Badge>
                <span>+2 from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Events Today</p>
                  <p className="text-2xl font-bold text-blue-400">1,247</p>
                </div>
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Badge className="threat-low">Normal</Badge>
                <span>+15% increase</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Protection Rate</p>
                  <p className="text-2xl font-bold text-green-400">98.5%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Badge className="threat-low">Excellent</Badge>
                <span>+0.3% improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Connected Sources</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Online</Badge>
                <span>All active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Logs</span>
              </TabsTrigger>
              <TabsTrigger value="passwords" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Passwords</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button onClick={handleExportData} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button 
                onClick={() => setShowConsentModal(true)} 
                variant="outline" 
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <LogTable />
          </TabsContent>

          <TabsContent value="passwords" className="space-y-6">
            <PasswordHealth />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Dashboard Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Settings Panel</h3>
                  <p className="text-muted-foreground">
                    Configure monitoring preferences, notifications, and security policies.
                  </p>
                  <Button 
                    className="mt-4 bg-gradient-primary"
                    onClick={() => setShowConsentModal(true)}
                  >
                    Open Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Widget */}
      <FloatingWidget />

      {/* Consent Modal */}
      <ConsentModal 
        open={showConsentModal} 
        onOpenChange={setShowConsentModal} 
      />
    </div>
  );
}