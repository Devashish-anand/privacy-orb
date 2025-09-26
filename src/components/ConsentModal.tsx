import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Shield, 
  Camera, 
  Mic, 
  MapPin, 
  Clipboard, 
  HardDrive,
  Cookie,
  Wifi,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface ConsentItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  required: boolean;
  enabled: boolean;
  category: 'essential' | 'functional' | 'analytics' | 'security';
  riskLevel: 'low' | 'medium' | 'high';
}

const consentItems: ConsentItem[] = [
  {
    id: 'camera',
    name: 'Camera Access Monitoring',
    description: 'Monitor and log camera access requests from websites and applications',
    icon: Camera,
    required: false,
    enabled: true,
    category: 'security',
    riskLevel: 'high'
  },
  {
    id: 'microphone',
    name: 'Microphone Access Monitoring', 
    description: 'Track microphone permission requests and usage patterns',
    icon: Mic,
    required: false,
    enabled: true,
    category: 'security',
    riskLevel: 'high'
  },
  {
    id: 'geolocation',
    name: 'Location Tracking Detection',
    description: 'Detect and alert on geolocation access attempts',
    icon: MapPin,
    required: false,
    enabled: true,
    category: 'security',
    riskLevel: 'medium'
  },
  {
    id: 'clipboard',
    name: 'Clipboard Monitoring',
    description: 'Monitor clipboard access and data reading attempts',
    icon: Clipboard,
    required: false,
    enabled: false,
    category: 'security',
    riskLevel: 'medium'
  },
  {
    id: 'storage',
    name: 'Local Storage Analysis',
    description: 'Analyze local storage modifications and data patterns',
    icon: HardDrive,
    required: true,
    enabled: true,
    category: 'essential',
    riskLevel: 'low'
  },
  {
    id: 'cookies',
    name: 'Cookie Tracking',
    description: 'Monitor cookie creation, modification, and tracking behavior',
    icon: Cookie,
    required: false,
    enabled: true,
    category: 'functional',
    riskLevel: 'low'
  },
  {
    id: 'network',
    name: 'Network Request Monitoring',
    description: 'Log and analyze network requests for security patterns',
    icon: Wifi,
    required: true,
    enabled: true,
    category: 'essential',
    riskLevel: 'low'
  },
  {
    id: 'analytics',
    name: 'Usage Analytics',
    description: 'Collect anonymous usage data to improve security detection',
    icon: FileText,
    required: false,
    enabled: false,
    category: 'analytics',
    riskLevel: 'low'
  }
];

interface ConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConsentModal = ({ open, onOpenChange }: ConsentModalProps) => {
  const [consents, setConsents] = useState<ConsentItem[]>(consentItems);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedConsents = localStorage.getItem('cyberguard_consents');
    if (savedConsents) {
      try {
        const parsed = JSON.parse(savedConsents);
        setConsents(parsed);
      } catch (error) {
        console.error('Failed to load consent preferences');
      }
    }
  }, []);

  const handleConsentChange = (id: string, enabled: boolean) => {
    setConsents(prev => prev.map(item => 
      item.id === id ? { ...item, enabled } : item
    ));
  };

  const handleSave = () => {
    localStorage.setItem('cyberguard_consents', JSON.stringify(consents));
    onOpenChange(false);
  };

  const handleAcceptAll = () => {
    setConsents(prev => prev.map(item => ({ ...item, enabled: true })));
    localStorage.setItem('cyberguard_consents', JSON.stringify(
      consents.map(item => ({ ...item, enabled: true }))
    ));
    onOpenChange(false);
  };

  const handleRejectOptional = () => {
    const updated = consents.map(item => ({
      ...item,
      enabled: item.required
    }));
    setConsents(updated);
    localStorage.setItem('cyberguard_consents', JSON.stringify(updated));
    onOpenChange(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'security':
        return 'threat-critical';
      case 'functional':
        return 'threat-medium';
      case 'analytics':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <AlertTriangle className="w-3 h-3 text-red-400" />;
      case 'medium':
        return <AlertTriangle className="w-3 h-3 text-yellow-400" />;
      case 'low':
        return <CheckCircle className="w-3 h-3 text-green-400" />;
      default:
        return <Info className="w-3 h-3 text-blue-400" />;
    }
  };

  const enabledCount = consents.filter(c => c.enabled).length;
  const requiredCount = consents.filter(c => c.required).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-5 h-5 text-primary" />
            Privacy & Consent Settings
          </DialogTitle>
          <DialogDescription>
            Configure your privacy preferences and security monitoring permissions. 
            You can change these settings at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary */}
          <Card className="bg-muted/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-medium">{enabledCount}</span>
                    <span className="text-muted-foreground"> of {consents.length} permissions enabled</span>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                    {requiredCount} Required
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? 'Simple View' : 'Advanced Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Consent Items */}
          <div className="space-y-4">
            {consents.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-shrink-0 p-2 bg-muted rounded-lg">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.required && (
                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        
                        {showAdvanced && (
                          <div className="flex items-center gap-2">
                            <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                              {item.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {getRiskIcon(item.riskLevel)}
                              <span className="text-xs text-muted-foreground">
                                {item.riskLevel} risk
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={item.id}
                          checked={item.enabled}
                          onCheckedChange={(checked) => handleConsentChange(item.id, checked)}
                          disabled={item.required}
                        />
                        <Label htmlFor={item.id} className="sr-only">
                          {item.name}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < consents.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              onClick={handleAcceptAll}
              className="bg-gradient-primary flex-1"
            >
              Accept All & Continue
            </Button>
            <Button 
              onClick={handleRejectOptional}
              variant="outline"
              className="flex-1"
            >
              Only Required
            </Button>
            <Button 
              onClick={handleSave}
              variant="outline"
              className="flex-1"
            >
              Save Preferences
            </Button>
          </div>

          {/* Privacy Notice */}
          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardContent className="pt-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Your Privacy Matters</p>
                  <p className="text-muted-foreground">
                    CyberGuard processes data locally when possible and follows privacy-first principles. 
                    Required permissions are essential for security monitoring functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};