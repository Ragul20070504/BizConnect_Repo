import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Briefcase, TrendingUp, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-business.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      <div className="absolute inset-0 opacity-20">
        
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Business made 
            <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              easy.
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            From GST to growth, we handle the deadlines while you focus on building your business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/register"><Button onclick="window.location.href='/register'" size="lg" variant="secondary" className="text-primary hover:text-primary-hover shadow-elegant">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button></a>
            
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <Briefcase className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Open for all your business needs</h3>
              
              
            </Card>
            
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Never miss a Deadline</h3>
              
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <TrendingUp className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Helping small businesses survive</h3>
              
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
