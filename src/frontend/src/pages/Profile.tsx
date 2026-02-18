import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PageTitle, BodyText } from '../designB/components/DesignBTypography';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useProfileDetails } from '../profile/useProfileDetails';
import { validateProfileDetails } from '../profile/profileValidation';
import { getEmptyProfileDetails } from '../profile/profileTypes';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAuthSession } from '../hooks/useAuthSession';
import { useQueryClient } from '@tanstack/react-query';
import { CloseButton } from '../components/CloseButton';
import { User, Mail, Phone, Calendar, Droplet, AlertTriangle, UserCircle, Loader2, AlertCircle, LogOut } from 'lucide-react';

export default function Profile() {
  useRequireAuth();
  const queryClient = useQueryClient();
  const { clear: clearInternetIdentity } = useInternetIdentity();
  const { clearLocalSession } = useAuthSession();

  const { profile, isLoading, saveProfile, isSaving } = useProfileDetails();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(getEmptyProfileDetails());
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleEditClick = () => {
    setEditedProfile(profile || getEmptyProfileDetails());
    setValidationErrors([]);
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    const validation = validateProfileDetails(editedProfile);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    try {
      await saveProfile(editedProfile);
      setIsEditDialogOpen(false);
      setValidationErrors([]);
    } catch (error: any) {
      setValidationErrors([error.message || 'Failed to save profile']);
    }
  };

  const handleSignOut = async () => {
    if (!confirm('Are you sure you want to sign out?')) return;

    // Clear Internet Identity if authenticated
    await clearInternetIdentity();
    
    // Clear local session
    clearLocalSession();
    
    // Clear all cached data
    queryClient.clear();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const profileData = profile || getEmptyProfileDetails();

  return (
    <div className="space-y-8 pb-24">
      <CloseButton />
      
      {/* Header */}
      <div className="space-y-2">
        <PageTitle>Profile</PageTitle>
        <BodyText className="text-muted-foreground">
          Manage your personal and medical information
        </BodyText>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </div>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleEditClick}>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal and medical information
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Personal Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={editedProfile.fullName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, fullName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        placeholder="+1234567890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={editedProfile.dateOfBirth}
                        onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedProfile.location || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Medical Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={editedProfile.bloodType}
                        onValueChange={(value) => setEditedProfile({ ...editedProfile, bloodType: value })}
                      >
                        <SelectTrigger id="bloodType">
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        value={editedProfile.allergies.join(', ')}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          allergies: e.target.value.split(',').map(a => a.trim()).filter(a => a) 
                        })}
                        placeholder="List any allergies (e.g., Penicillin, Peanuts)"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Emergency Contact</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={editedProfile.emergencyContact.name}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          emergencyContact: { ...editedProfile.emergencyContact, name: e.target.value }
                        })}
                        placeholder="Emergency contact name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactPhone">Phone</Label>
                      <Input
                        id="emergencyContactPhone"
                        type="tel"
                        value={editedProfile.emergencyContact.phone}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          emergencyContact: { ...editedProfile.emergencyContact, phone: e.target.value }
                        })}
                        placeholder="+1234567890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                      <Input
                        id="emergencyContactRelationship"
                        value={editedProfile.emergencyContact.relationship}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          emergencyContact: { ...editedProfile.emergencyContact, relationship: e.target.value }
                        })}
                        placeholder="e.g., Spouse, Parent, Sibling"
                      />
                    </div>
                  </div>

                  {validationErrors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{profileData.fullName || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{profileData.email || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{profileData.phone || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{profileData.dateOfBirth || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Droplet className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <p className="font-medium">{profileData.bloodType || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Allergies</p>
                <p className="font-medium">{profileData.allergies.length > 0 ? profileData.allergies.join(', ') : 'None listed'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>Person to contact in case of emergency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <UserCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{profileData.emergencyContact.name || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{profileData.emergencyContact.phone || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Relationship</p>
                <p className="font-medium">{profileData.emergencyContact.relationship || 'Not set'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
