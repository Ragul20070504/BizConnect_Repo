import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, User } from "lucide-react";
import { Service } from "@/hooks/useServices";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-elegant transition-shadow group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              {service.profiles?.avatar_url ? (
                <img 
                  src={service.profiles.avatar_url} 
                  alt={service.profiles.display_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-primary-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {service.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {service.profiles?.company_name || 'Unknown Company'}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-secondary text-secondary-foreground">{service.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {service.description}
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {service.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{service.location}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>New Service</span>
          </div>
        </div>
        {service.tags && service.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {service.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {service.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          {service.price_range && (
            <div className="font-semibold text-primary">{service.price_range}</div>
          )}
          <Button variant="outline" className="hover:bg-gradient-primary hover:text-primary-foreground ml-auto">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;