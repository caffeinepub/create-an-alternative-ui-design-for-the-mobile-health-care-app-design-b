import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { PageTitle, SectionTitle } from '../designB/components/DesignBTypography';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAuthSession } from '../hooks/useAuthSession';
import { useProfileDetails } from '../profile/useProfileDetails';
import { getEmptyProfileDetails, type ProfileDetails } from '../profile/profileTypes';
import { validateProfileDetails } from '../profile/profileValidation';
import { User, Mail, Phone, Calendar, Droplet, AlertTriangle, UserCircle, Edit, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function Profile() {
  useRequireAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();
  const { clearLocalSession } = useAuthSession();
  const { profile, isLoading, saveProfile, isSaving } = useProfileDetails();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileDetails>(getEmptyProfileDetails());

  const handleOpenEdit = () => {
    setEditedProfile(profile || getEmptyProfileDetails());
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = async () => {
    const validation = validateProfileDetails(editedProfile);
    if (!validation.isValid) {
      toast.error(validation.errors[0]);
      return;
    }

    try {
      await saveProfile(editedProfile);
      toast.success('Profile updated successfully');
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save profile');
      console.error('Save profile error:', error);
    }
  };

  const handleSignOut = async () => {
    // Clear both Internet Identity and local session
    await clearLocalSession();
    queryClient.clear();
    navigate({ to: '/signin', replace: true });
  };

  const displayProfile = profile || getEmptyProfileDetails();

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageTitle>Profile</PageTitle>
          <Button onClick={handleOpenEdit} size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{displayProfile.fullName || 'Not set'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{displayProfile.email || 'Not set'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{displayProfile.phone || 'Not set'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{displayProfile.dateOfBirth || 'Not set'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Droplet className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <p className="font-medium">{displayProfile.bloodType || 'Not set'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-muted-foreground mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Allergies</p>
                {displayProfile.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {displayProfile.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-destructive/10 text-destructive text-sm"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium">None</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{displayProfile.emergencyContact.name || 'Not set'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{displayProfile.emergencyContact.phone || 'Not set'}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <UserCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Relationship</p>
                <p className="font-medium">{displayProfile.emergencyContact.relationship || 'Not set'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Button */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal and medical information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <SectionTitle>Personal Information</SectionTitle>
              
              <div className="space-y-2">
                <Label htmlFor="edit-fullName">Full Name *</Label>
                <Input
                  id="edit-fullName"
                  value={editedProfile.fullName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone *</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-dob">Date of Birth *</Label>
                <Input
                  id="edit-dob"
                  type="date"
                  value={editedProfile.dateOfBirth}
                  onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                />
              </div>
            </div>

            <Separator />

            {/* Medical Information */}
            <div className="space-y-4">
              <SectionTitle>Medical Information</SectionTitle>
              
              <div className="space-y-2">
                <Label htmlFor="edit-bloodType">Blood Type</Label>
                <Select
                  value={editedProfile.bloodType}
                  onValueChange={(value) => setEditedProfile({ ...editedProfile, bloodType: value })}
                >
                  <SelectTrigger id="edit-bloodType">
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
                <Label htmlFor="edit-allergies">Allergies (comma-separated)</Label>
                <Input
                  id="edit-allergies"
                  value={editedProfile.allergies.join(', ')}
                  onChange={(e) => {
                    const allergies = e.target.value
                      .split(',')
                      .map(a => a.trim())
                      .filter(a => a.length > 0);
                    setEditedProfile({ ...editedProfile, allergies });
                  }}
                  placeholder="Penicillin, Peanuts"
                />
              </div>
            </div>

            <Separator />

            {/* Emergency Contact */}
            <div className="space-y-4">
              <SectionTitle>Emergency Contact</SectionTitle>
              
              <div className="space-y-2">
                <Label htmlFor="edit-ec-name">Name *</Label>
                <Input
                  id="edit-ec-name"
                  value={editedProfile.emergencyContact.name}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    emergencyContact: { ...editedProfile.emergencyContact, name: e.target.value }
                  })}
                  placeholder="Jane Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-ec-phone">Phone *</Label>
                <Input
                  id="edit-ec-phone"
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
                <Label htmlFor="edit-ec-relationship">Relationship *</Label>
                <Input
                  id="edit-ec-relationship"
                  value={editedProfile.emergencyContact.relationship}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile,
                    emergencyContact: { ...editedProfile.emergencyContact, relationship: e.target.value }
                  })}
                  placeholder="Spouse, Parent, Sibling"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
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
  );
}
