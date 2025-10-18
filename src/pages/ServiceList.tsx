import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Service } from "@/hooks/useServices";

interface ServiceListProps {
  services: Service[];
  onDeleteService: (id: string) => void;
  onCreateService: () => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onDeleteService, onCreateService }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Services</h2>
        <Button 
          onClick={onCreateService}
          className="bg-gradient-primary hover:bg-primary-hover"
        >
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <Card key={service.id} className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {service.category}
                    </CardDescription>
                  </div>
                  <Badge variant={service.is_active ? "default" : "secondary"}>
                    {service.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDeleteService(service.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-semibold mb-2">No Services Yet</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Start by creating your first service to showcase your expertise
              </p>
              <Button 
                onClick={onCreateService}
                className="bg-gradient-primary hover:bg-primary-hover"
              >
                Create Your First Service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ServiceList;

