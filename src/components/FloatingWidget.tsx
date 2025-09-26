import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  ShieldAlert, 
  X, 
  Minimize2, 
  Maximize2, 
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SecurityAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

export const FloatingWidget = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  // Simulate real-time security alerts
  useEffect(() => {
    const generateAlert = () => {
      const alertTypes: SecurityAlert['type'][] = ['critical', 'warning', 'info'];
      const messages = [
        'Camera access attempt blocked',
        'Suspicious geolocation request detected',
        'Microphone permission requested',
        'Clipboard data access prevented',
        'Cross-origin request flagged',
        'Local storage modification detected'
      ];

      const newAlert: SecurityAlert = {
        id: Date.now().toString(),
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date()
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]); // Keep only 5 latest
    };

    // Generate initial alerts
    generateAlert();
    generateAlert();
    
    // Generate new alerts every 10-30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every interval
        generateAlert();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Simulate connection status
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.05); // 95% uptime simulation
    }, 30000);

    return () => clearInterval(statusInterval);
  }, []);

  const getAlertIcon = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  const getAlertColor = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'critical':
        return 'threat-critical';
      case 'warning':
        return 'threat-medium';
      case 'info':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-12 h-12 bg-gradient-primary shadow-xl hover:shadow-2xl transition-all duration-300 pulse-glow"
        >
          <Shield className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`transition-all duration-300 shadow-2xl border-border/50 bg-card/90 backdrop-blur-sm ${
        isExpanded ? 'w-96' : 'w-72'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="relative">
                <Shield className="w-5 h-5 text-primary" />
                {!isOnline && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              CyberGuard
            </CardTitle>
            
            <div className="flex items-center gap-1">
              <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6"
              >
                {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-6 w-6"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-lg font-bold text-primary">{alerts.length}</div>
              <div className="text-xs text-muted-foreground">Active Alerts</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-lg font-bold text-green-400">98.5%</div>
              <div className="text-xs text-muted-foreground">Protection</div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Activity className="w-4 h-4" />
              Recent Activity
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-4">
                  No recent alerts
                </div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg text-sm">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <Badge className={`${getAlertColor(alert.type)} text-xs`}>
                      {alert.type}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gradient-primary text-sm"
              size="sm"
            >
              Open Dashboard
            </Button>
            {isExpanded && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log('Settings opened')}
              >
                Settings
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};