import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Briefcase, Eye, EyeOff, Building, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    companyName: "",
    password: "",
    businessType: "",
    acceptTerms: false
  });
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(
      formData.email, 
      formData.password, 
      formData.companyName, 
      formData.displayName,
      formData.businessType
    );
    
    if (!error) {
      navigate("/login");
    }
    setLoading(false);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl text-foreground">BizConnect</span>
          </Link>
          <p className="text-muted-foreground mt-2">Business made easy</p>
        </div>

        <Card className="shadow-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="displayName"
                    placeholder="John Doe"
                    value={formData.displayName}
                    onChange={(e) => updateFormData("displayName", e.target.value)}
                    className="bg-background border-input pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="bg-background border-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name(Optional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="companyName"
                    placeholder="Your Company Inc."
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    className="bg-background border-input pl-10"
                    required
                  />
                  
                </div>
              </div>
              
              <div className="space-y-2">
                
                <div className="relative">
                  
                  <div>
      

      

      <p>{status}</p>
    </div>
                  
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className="bg-background border-input pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:text-primary-hover">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:text-primary-hover">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:bg-primary-hover shadow-elegant"
                size="lg"
                disabled={!formData.acceptTerms || loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" size="lg">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary-hover font-medium">
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
