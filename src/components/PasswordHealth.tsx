import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  Eye, 
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface PasswordAnalysis {
  id: string;
  service: string;
  strength: 'weak' | 'medium' | 'strong' | 'excellent';
  score: number;
  lastChanged: string;
  breached: boolean;
  reused: boolean;
  issues: string[];
}

// Mock password data
const passwordData: PasswordAnalysis[] = [
  {
    id: '1',
    service: 'Gmail Account',
    strength: 'excellent',
    score: 95,
    lastChanged: '2024-01-15',
    breached: false,
    reused: false,
    issues: []
  },
  {
    id: '2',
    service: 'Banking Portal',
    strength: 'strong',
    score: 85,
    lastChanged: '2023-11-20',
    breached: false,
    reused: false,
    issues: ['Password is over 3 months old']
  },
  {
    id: '3',
    service: 'Social Media',
    strength: 'weak',
    score: 35,
    lastChanged: '2022-08-12',
    breached: true,
    reused: true,
    issues: ['Found in data breach', 'Reused password', 'Too simple', 'Very old password']
  },
  {
    id: '4',
    service: 'Work Email',
    strength: 'medium',
    score: 65,
    lastChanged: '2023-12-05',
    breached: false,
    reused: true,
    issues: ['Password reused elsewhere', 'Missing special characters']
  },
  {
    id: '5',
    service: 'Cloud Storage',
    strength: 'strong',
    score: 88,
    lastChanged: '2024-02-10',
    breached: false,
    reused: false,
    issues: []
  }
];

const getStrengthColor = (strength: string) => {
  switch (strength) {
    case 'excellent':
      return 'threat-low';
    case 'strong':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'medium':
      return 'threat-medium';
    case 'weak':
      return 'threat-critical';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

const getStrengthIcon = (strength: string) => {
  switch (strength) {
    case 'excellent':
      return <ShieldCheck className="w-4 h-4 text-green-400" />;
    case 'strong':
      return <Shield className="w-4 h-4 text-blue-400" />;
    case 'medium':
      return <ShieldAlert className="w-4 h-4 text-yellow-400" />;
    case 'weak':
      return <XCircle className="w-4 h-4 text-red-400" />;
    default:
      return <Shield className="w-4 h-4 text-gray-400" />;
  }
};

export const PasswordHealth = () => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const overallScore = Math.round(passwordData.reduce((sum, p) => sum + p.score, 0) / passwordData.length);
  const weakPasswords = passwordData.filter(p => p.strength === 'weak').length;
  const breachedPasswords = passwordData.filter(p => p.breached).length;
  const reusedPasswords = passwordData.filter(p => p.reused).length;

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Password Health Score
            </CardTitle>
            <Button 
              onClick={handleScan}
              disabled={isScanning}
              variant="outline"
              size="sm"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Rescan
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
              {overallScore}
            </div>
            <div className="text-muted-foreground">Overall Security Score</div>
            <Progress value={overallScore} className="w-full mt-4 h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-2xl font-bold text-red-400">{weakPasswords}</span>
              </div>
              <div className="text-sm text-muted-foreground">Weak Passwords</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <span className="text-2xl font-bold text-orange-400">{breachedPasswords}</span>
              </div>
              <div className="text-sm text-muted-foreground">Breached</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <RefreshCw className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{reusedPasswords}</span>
              </div>
              <div className="text-sm text-muted-foreground">Reused</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Password Analysis</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Hide Details
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Show Details
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {passwordData.map((password) => (
              <div key={password.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStrengthIcon(password.strength)}
                    <div>
                      <div className="font-medium">{password.service}</div>
                      <div className="text-sm text-muted-foreground">
                        Last changed: {new Date(password.lastChanged).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStrengthColor(password.strength)}>
                      {password.strength.toUpperCase()}
                    </Badge>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(password.score)}`}>
                        {password.score}
                      </div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                </div>

                <Progress value={password.score} className="mb-3 h-2" />

                {showPasswords && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {password.breached && (
                        <Badge className="threat-critical">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Breached
                        </Badge>
                      )}
                      {password.reused && (
                        <Badge className="threat-medium">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Reused
                        </Badge>
                      )}
                      {new Date(password.lastChanged) < new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) && (
                        <Badge className="threat-medium">
                          <Clock className="w-3 h-3 mr-1" />
                          Old
                        </Badge>
                      )}
                    </div>

                    {password.issues.length > 0 && (
                      <div className="bg-muted/50 rounded p-3">
                        <div className="text-sm font-medium mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          Issues Found:
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {password.issues.map((issue, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="text-xs">
                        Generate Strong Password
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Update Password
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};