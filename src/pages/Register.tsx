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
import { Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { text: 'At least 8 characters', valid: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', valid: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', valid: /[a-z]/.test(formData.password) },
    { text: 'Contains number', valid: /\d/.test(formData.password) },
    { text: 'Contains special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ];

  const isPasswordValid = passwordRequirements.every(req => req.valid);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet security requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    const success = await register(formData.name, formData.email, formData.password);
    if (success) {
      toast({
        title: "Account created!",
        description: "Welcome to CyberGuard. Your security dashboard is ready.",
      });
      navigate('/dashboard');
    } else {
      setError('Failed to create account. Please try again.');
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
                Create Account
              </CardTitle>
              <p className="text-muted-foreground">Join CyberGuard's security platform</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    disabled={isLoading}
                  />
                </div>

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
                      placeholder="Create a strong password"
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
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-2 p-3 bg-muted/50 rounded-md space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          {req.valid ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={req.valid ? 'text-green-600' : 'text-muted-foreground'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.confirmPassword && (
                    <div className="flex items-center gap-2 text-xs">
                      {passwordsMatch ? (
                        <>
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-green-600">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3 text-red-500" />
                          <span className="text-red-500">Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary font-semibold py-6 transition-all duration-300 hover:shadow-lg"
                  disabled={isLoading || !isPasswordValid || !passwordsMatch}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:underline transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}