import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, type Profile } from "@/hooks/useProfile";
import Header from "@/components/Header";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const industries = [
    "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
    "Retail", "Real Estate", "Consulting", "Marketing", "Legal",
    "Construction", "Transportation", "Food & Beverage", "Other"
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        company_name: profile.company_name,
        display_name: profile.display_name,
        bio: profile.bio || "",
        website: profile.website || "",
        location: profile.location || "",
        industry: profile.industry || "",
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof Profile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await updateProfile(formData);
    setSaving(false);
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your business profile information
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Update your profile to attract more connections and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name || ""}
                    onChange={(e) => handleInputChange("company_name", e.target.value)}
                    placeholder="Enter your company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name *</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name || ""}
                    onChange={(e) => handleInputChange("display_name", e.target.value)}
                    placeholder="Enter your display name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ""}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about your company and expertise..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website || ""}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={formData.industry || ""} 
                  onValueChange={(value) => handleInputChange("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-primary hover:bg-primary-hover"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;