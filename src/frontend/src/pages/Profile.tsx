import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PageTitle } from '../designB/components/DesignBTypography';
import { MOCK_USER } from '../designB/data/placeholders';
import { User, Mail, Phone, Calendar, Droplet, AlertCircle, UserCircle, Settings, LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAuthSession } from '../hooks/useAuthSession';
import { useRequireAuth } from '../hooks/useRequireAuth';

export default function Profile() {
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();
  const { clearLocalSession } = useAuthSession();

  // Protect this route - redirect to signin if not authenticated
  useRequireAuth();

  const handleSignOut = () => {
    // Clear Internet Identity session
    clear();
    
    // Clear local demo/guest/password session
    clearLocalSession();
    
    // Navigate to sign in page (replace to prevent back navigation)
    navigate({ to: '/signin', replace: true });
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <PageTitle>My Profile</PageTitle>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{MOCK_USER.name}</h2>
              <p className="text-muted-foreground">Member since 2024</p>
            </div>
            <Button variant="destructive" size="sm" className="gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {MOCK_USER.dateOfBirth}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blood Type</p>
              <p className="font-medium flex items-center gap-2">
                <Droplet className="h-4 w-4 text-destructive" />
                {MOCK_USER.bloodType}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {MOCK_USER.email}
            </p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {MOCK_USER.phone}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {MOCK_USER.allergies.length > 0 ? (
                MOCK_USER.allergies.map((allergy) => (
                  <Badge key={allergy} variant="destructive">
                    {allergy}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No known allergies</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{MOCK_USER.emergencyContact.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Relationship</p>
            <p className="font-medium">{MOCK_USER.emergencyContact.relationship}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {MOCK_USER.emergencyContact.phone}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
