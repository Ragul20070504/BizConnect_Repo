import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Service {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  price_range?: string;
  location?: string;
  tags?: string[];
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    company_name: string;
    display_name: string;
    avatar_url?: string;
  };
}

export interface ServiceInput {
  title: string;
  description: string;
  category: string;
  price_range?: string;
  location?: string;
  tags?: string[];
  image_url?: string;
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          profiles!user_id (
            company_name,
            display_name,
            avatar_url
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices((data as any) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: ServiceInput) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a service",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('services')
        .insert([{
          ...serviceData,
          user_id: user.id
        }]);

      if (error) throw error;
      
      await fetchServices();
      toast({
        title: "Success",
        description: "Service created successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateService = async (id: string, updates: Partial<ServiceInput>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchServices();
      toast({
        title: "Success",
        description: "Service updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteService = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchServices();
      toast({
        title: "Success",
        description: "Service deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getUserServices = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      return [];
    }
  };

  return {
    services,
    loading,
    createService,
    updateService,
    deleteService,
    getUserServices,
    refetch: fetchServices
  };
};