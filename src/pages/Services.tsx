import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { services, loading } = useServices();

  const categories = [
    "Technology", "Marketing", "Design", "Consulting", "Finance", 
    "Legal", "Healthcare", "Manufacturing", "Education", "Other"
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.profiles?.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Discover Business Services
          </h1>
          <p className="text-muted-foreground">
            Find the perfect services to grow your business
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search services, companies, or keywords..."
                className="pl-10 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-lg">Loading services...</div>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No Services Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter 
                ? "Try adjusting your search criteria" 
                : "No services are currently available"}
            </p>
            {(searchTerm || categoryFilter) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Services;