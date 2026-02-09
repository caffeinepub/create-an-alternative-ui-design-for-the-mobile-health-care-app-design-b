import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageTitle } from '../designB/components/DesignBTypography';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useDemoOtp } from '../hooks/useDemoOtp';
import { useAuthSession } from '../hooks/useAuthSession';
import { verifyCredentials } from '../auth/demoCredentialStore';
import { Loader2, Phone, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { useEffect } from 'react';

type SignInStep = 'phone' | 'otp';

export default function SignIn() {
  const navigate = useNavigate();
  const { login, isLoggingIn, identity, loginStatus } = useInternetIdentity();
  const { generateOtp, verifyOtp, currentOtp, canResend, resendCooldown, resetSession } = useDemoOtp();
  const { signInAsOtp, signInAsPassword, continueAsGuest } = useAuthSession();

  // OTP flow state
  const [step, setStep] = useState<SignInStep>('phone');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isOtpProcessing, setIsOtpProcessing] = useState(false);

  // Password flow state
  const [passwordCountryCode, setPasswordCountryCode] = useState('+1');
  const [passwordPhoneNumber, setPasswordPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordProcessing, setIsPasswordProcessing] = useState(false);

  // Handle successful Internet Identity login
  useEffect(() => {
    if (identity && loginStatus === 'success') {
      navigate({ to: '/home' });
    }
  }, [identity, loginStatus, navigate]);

  // OTP Flow Handlers
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (!phoneNumber || phoneNumber.length < 10) {
      setOtpError('Please enter a valid phone number.');
      return;
    }

    setIsOtpProcessing(true);
    
    setTimeout(() => {
      const fullPhone = `${countryCode}${phoneNumber}`;
      generateOtp(fullPhone);
      setStep('otp');
      setIsOtpProcessing(false);
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (otpCode.length !== 6) {
      setOtpError('Please enter the complete 6-digit code.');
      return;
    }

    setIsOtpProcessing(true);

    setTimeout(() => {
      const fullPhone = `${countryCode}${phoneNumber}`;
      const result = verifyOtp(fullPhone, otpCode);

      if (result.success) {
        signInAsOtp(fullPhone);
        navigate({ to: '/home' });
      } else {
        setOtpError(result.error || 'Verification failed. Please try again.');
        setIsOtpProcessing(false);
      }
    }, 500);
  };

  const handleResendOtp = () => {
    if (!canResend) return;

    setOtpError(null);
    setOtpCode('');
    const fullPhone = `${countryCode}${phoneNumber}`;
    generateOtp(fullPhone);
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtpCode('');
    setOtpError(null);
    resetSession();
  };

  // Password Flow Handler
  const handlePasswordSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!passwordPhoneNumber || passwordPhoneNumber.length < 10) {
      setPasswordError('Please enter a valid phone number.');
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    setIsPasswordProcessing(true);

    setTimeout(() => {
      const fullPhone = `${passwordCountryCode}${passwordPhoneNumber}`;
      const result = verifyCredentials(fullPhone, password);

      if (result.success && result.account) {
        signInAsPassword(fullPhone, result.account.fullName);
        navigate({ to: '/home' });
      } else {
        setPasswordError(result.error || 'Sign in failed. Please try again.');
        setIsPasswordProcessing(false);
      }
    }, 500);
  };

  const handleInternetIdentityLogin = () => {
    login();
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
    navigate({ to: '/home' });
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <img 
            src="/assets/generated/healthcare-logo.dim_512x512.png" 
            alt="HealthCare Logo" 
            className="h-16 w-16 mx-auto mb-4"
          />
          <PageTitle>Sign In</PageTitle>
          <p className="text-muted-foreground">
            Access your health dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="password" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="otp">OTP</TabsTrigger>
              </TabsList>

              {/* Password Sign In */}
              <TabsContent value="password" className="space-y-4 mt-4">
                <form onSubmit={handlePasswordSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password-phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Select value={passwordCountryCode} onValueChange={setPasswordCountryCode}>
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
                        id="password-phone"
                        type="tel"
                        placeholder="1234567890"
                        value={passwordPhoneNumber}
                        onChange={(e) => setPasswordPhoneNumber(e.target.value.replace(/\D/g, ''))}
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
                        placeholder="Enter your password"
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

                  {passwordError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isPasswordProcessing}>
                    {isPasswordProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* OTP Sign In */}
              <TabsContent value="otp" className="space-y-4 mt-4">
                {step === 'phone' ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp-phone">Phone Number</Label>
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
                          id="otp-phone"
                          type="tel"
                          placeholder="1234567890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          required
                          className="flex-1"
                        />
                      </div>
                    </div>

                    {otpError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{otpError}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isOtpProcessing}>
                      {isOtpProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Phone className="mr-2 h-4 w-4" />
                          Send Code
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otpCode}
                          onChange={setOtpCode}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Code sent to {countryCode} {phoneNumber}
                      </p>
                    </div>

                    {currentOtp && (
                      <Alert>
                        <AlertDescription className="text-center">
                          <strong>Demo Mode:</strong> Your code is <span className="font-mono font-bold text-lg">{currentOtp}</span>
                        </AlertDescription>
                      </Alert>
                    )}

                    {otpError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{otpError}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isOtpProcessing}>
                      {isOtpProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify and Continue'
                      )}
                    </Button>

                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={handleBackToPhone}
                      >
                        Change number
                      </button>
                      <button
                        type="button"
                        className="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleResendOtp}
                        disabled={!canResend}
                      >
                        {canResend ? 'Resend code' : `Resend in ${resendCooldown}s`}
                      </button>
                    </div>
                  </form>
                )}
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleInternetIdentityLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Internet Identity'
              )}
            </Button>

            <div className="space-y-2 text-center text-sm">
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={handleContinueAsGuest}
              >
                Continue as Guest
              </button>
              <div>
                <span className="text-muted-foreground">Don't have an account? </span>
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => navigate({ to: '/signup' })}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
