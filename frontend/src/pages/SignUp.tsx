import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PageTitle } from '../designB/components/DesignBTypography';
import { createAccount } from '../auth/demoCredentialStore';
import { useAuthSession } from '../hooks/useAuthSession';
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated';
import { initializeLocalProfileFromAuth } from '../profile/profileLocalStore';
import { useBackendCredentials } from '../hooks/useBackendCredentials';
import { CloseButton } from '../components/CloseButton';
import { Loader2, AlertCircle, Eye, EyeOff, UserPlus } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const { signInAsPassword } = useAuthSession();
  const { addCredentials } = useBackendCredentials();

  // Redirect if already authenticated
  useRedirectIfAuthenticated();

  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsProcessing(true);

    setTimeout(async () => {
      const fullPhone = `${countryCode}${phoneNumber}`;
      const result = createAccount(fullName, fullPhone, password);

      if (result.success && result.account && result.passwordHash) {
        // Store credentials in backend
        try {
          await addCredentials({
            phoneNumber: fullPhone,
            hashedPassword: result.passwordHash,
          });
        } catch (backendError) {
          console.warn('Failed to store credentials in backend:', backendError);
          // Continue with sign-up even if backend storage fails
        }

        // Sign in with password session
        signInAsPassword(fullPhone, result.account.fullName);

        // Initialize profile with captured details
        initializeLocalProfileFromAuth({
          fullName: result.account.fullName,
          phone: fullPhone,
        });

        navigate({ to: '/home' });
      } else {
        setError(result.error || 'Account creation failed. Please try again.');
        setIsProcessing(false);
      }
    }, 500);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <CloseButton />
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <img 
            src="/assets/generated/healthcare-logo.dim_512x512.png" 
            alt="HealthCare Logo" 
            className="h-16 w-16 mx-auto mb-4"
          />
          <PageTitle>Create Account</PageTitle>
          <p className="text-muted-foreground">
            Join HealthCare to start your wellness journey
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create your account with phone and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+86">+86</SelectItem>
                      <SelectItem value="+81">+81</SelectItem>
                      <SelectItem value="+49">+49</SelectItem>
                      <SelectItem value="+33">+33</SelectItem>
                      <SelectItem value="+39">+39</SelectItem>
                      <SelectItem value="+34">+34</SelectItem>
                      <SelectItem value="+61">+61</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    required
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={() => navigate({ to: '/signin' })}
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
