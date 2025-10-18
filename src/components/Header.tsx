import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, MessageSquare, Calendar, ChartLine, Users, Briefcase, User, LogOut, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import HamburgerMenu from "./HamburgerMenu"

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
   
      <div className="container mx-auto px-4">
      
        <div className="flex items-center justify-between h-16">
   		<HamburgerMenu />     
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">BizConnect</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/analysis"
              className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChartLine className="w-5 h-5" />
              <span className="text-xs mt-1">Sales analysis</span>
            </Link>
            <Link
              to="/calender"
              className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs mt-1">GST calendar</span>
            </Link>
            
            <Link
  to="/doc"
  className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
>
  <FileText className="w-5 h-5" />
  <span className="text-xs mt-1">Document Scan</span>
</Link>

            
            
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3 ml-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-primary hover:bg-primary-hover"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
