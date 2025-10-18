console.log("Rendering Index Page");
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight, Star, Calendar, Users, Briefcase, Target } from "lucide-react";
import { Service } from "@/hooks/useServices";
import Chatbot from "./Chatbot";
const Index = () => {
  // Sample service data
  const featuredServices: Service[] = [
    {


      id: "1",
      user_id: "mock",
      title: "Digital Marketing Strategy",
      description: "Comprehensive digital marketing strategies to boost your online presence and drive conversions.",
      category: "Marketing",
      price_range: "$2,500",
      location: "New York, NY",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        company_name: "MarketPro Solutions",
        display_name: "Marketing Expert"
      }
    },
    {
      id: "2", 
      user_id: "mock",
      title: "Web Development & Design",
      description: "Custom web applications and responsive designs that engage users and drive business growth.",
      category: "Development",
      price_range: "$5,000", 
      location: "San Francisco, CA",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        company_name: "TechCraft Studios",
        display_name: "Dev Team"
      }
    },
    {
      id: "3",
      user_id: "mock",
      title: "Financial Consulting", 
      description: "Expert financial advisory services to optimize your business finances and investment strategies.",
      category: "Finance",
      price_range: "$1,200",
      location: "Chicago, IL", 
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        company_name: "FinanceWise Inc",
        display_name: "Finance Advisor"
      }
    }
  ];

  const categories = [
    "Marketing", "Development", "Design", "Finance", "Consulting", "Legal", "HR", "Sales"
  ];
  

  return (
    <div className="min-h-screen bg-background">
      
      <Header />
      <Hero />
      
      {/* Search & Filter Section */}
      

      {/* Featured Services */}
      

      {/* Why Choose BizConnect */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose BizConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The platform built specifically for B2B service discovery and networking
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-card border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">GSTIN and udhayam registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Providing assistance in registering gstin and udhayam portal.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Sales Visualizer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Assisting in Entry and Analysis of Sales
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-card border-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">GST Filing Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Display GST filing timeline and notify accordingly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Business Network?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your business journey with BizConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  );
};

export default Index;
