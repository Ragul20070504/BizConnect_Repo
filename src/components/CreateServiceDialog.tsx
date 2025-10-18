import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useServices, ServiceInput } from "@/hooks/useServices";

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CreateServiceDialog = ({ open, onOpenChange, onSuccess }: CreateServiceDialogProps) => {
  const [formData, setFormData] = useState<ServiceInput>({
    title: "",
    description: "",
    category: "",
    price_range: "",
    location: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const { createService } = useServices();

  const categories = [
    "Technology", "Marketing", "Design", "Consulting", "Finance", 
    "Legal", "Healthcare", "Manufacturing", "Education", "Other"
  ];

  const priceRanges = [
    "$0 - $100", "$100 - $500", "$500 - $1,000", 
    "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+"
  ];

  const handleInputChange = (field: keyof ServiceInput, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
    handleInputChange("tags", tags);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await createService(formData);
    
    // Reset form and close dialog
    setFormData({
      title: "",
      description: "",
      category: "",
      price_range: "",
      location: "",
      tags: [],
    });
    setLoading(false);
    onOpenChange(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
          <DialogDescription>
            Add a new service to showcase your expertise and attract clients
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Custom Web Development"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your service in detail..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleInputChange("category", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_range">Price Range</Label>
              <Select 
                value={formData.price_range || ""} 
                onValueChange={(value) => handleInputChange("price_range", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Service Location</Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Remote, New York, Global"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags?.join(", ") || ""}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB (separate with commas)"
            />
            <p className="text-sm text-muted-foreground">
              Add relevant tags to help clients find your service
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-primary hover:bg-primary-hover"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceDialog;