import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Eye, Lock, Zap, Users, BarChart3 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "Track security events as they happen with live WebSocket updates"
    },
    {
      icon: Lock,
      title: "API Protection",
      description: "Monitor sensitive API usage including camera, microphone, and geolocation"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive security metrics and threat intelligence"
    },
    {
      icon: Users,
      title: "Consent Management",
      description: "Privacy-first approach with granular permission controls"
    },
    {
      icon: Zap,
      title: "Instant Response",
      description: "Quick actions to block, allow, or quarantine detected threats"
    },
    {
      icon: Shield,
      title: "Browser Extension",
      description: "Seamless integration across Chrome, Edge, and Firefox"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            {user ? (
              <Button onClick={() => navigate('/dashboard')} className="bg-gradient-primary">
                Dashboard
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} className="bg-gradient-primary">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
              Advanced Security Monitoring
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Real-time threat detection and API monitoring with comprehensive analytics.
              Protect your digital assets with enterprise-grade security intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate(user ? '/dashboard' : '/register')}
                className="bg-gradient-primary px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {user ? 'Go to Dashboard' : 'Get Started Free'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/demo')}
                className="px-8 py-6 text-lg"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Comprehensive Security Suite
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Monitor, analyze, and respond to security threats with our advanced platform
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Secure Your Applications?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers protecting their users with CyberGuard
            </p>
            <Button 
              size="lg"
              onClick={() => navigate(user ? '/dashboard' : '/register')}
              className="bg-gradient-primary px-8 py-6 text-lg font-semibold"
            >
              Start Monitoring Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}