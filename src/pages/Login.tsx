import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Logo } from '@/components/Logo';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(formData.email, formData.password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged into your CyberGuard dashboard.",
      });
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Logo />
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground">Sign in to your CyberGuard account</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary font-semibold py-6 transition-all duration-300 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-primary hover:underline transition-colors">
                      Create one here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-4 border-border/30 bg-muted/20">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground text-center mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground text-center">
                Use any email and password combination to access the demo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}