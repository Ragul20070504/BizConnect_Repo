import React, { useEffect, useState } from "react";
import { useFetchData, supabase } from "@/hooks/useFetchData";
import { useAuth } from "@/hooks/useAuth";

interface Service {
  user_id: string;
  title: string;
  price_range: string;
}

interface Profile {
  display_name: string;
  company_name: string;
}

const ServiceList: React.FC = () => {
  const { user } = useAuth();
  const { data: services, loading, error } = useFetchData<Service>("services");
  const [profilesMap, setProfilesMap] = useState<Record<string, Profile>>({});
  const [emailsMap, setEmailsMap] = useState<Record<string, string>>({});

  // Fetch all profiles once
  useEffect(() => {
    const fetchProfiles = async () => {
      const { data: profilesData, error: profilesError } = await supabase
        .from<Profile & { user_id: string }>("profiles")
        .select("*");

      if (profilesError) {
        console.error("Failed to fetch profiles", profilesError);
        return;
      }

      if (profilesData) {
        const map: Record<string, Profile> = {};
        profilesData.forEach((p) => {
          map[p.user_id] = { display_name: p.display_name, company_name: p.company_name };
        });
        setProfilesMap(map);
      }
    };

    fetchProfiles();
  }, []);

  // Fetch emails for service owners via your RPC function
  useEffect(() => {
    const fetchEmails = async () => {
      if (!services) return;

      const map: Record<string, string> = {};
      await Promise.all(
        services.map(async (service) => {
          if (service.user_id && service.user_id !== user?.id) {
            // Call RPC function to get email
            const { data, error } = await supabase.rpc("get_email_from_auth_users", {
              user_id: service.user_id,
            });
            if (error) {
              console.error(`Error fetching email for user ${service.user_id}:`, error);
              map[service.user_id] = "N/A";
            } else if (data && Array.isArray(data) && data.length > 0) {
              map[service.user_id] = data[0].email || "N/A";
            } else {
              map[service.user_id] = "N/A";
            }
          }
        })
      );

      setEmailsMap(map);
    };

    fetchEmails();
  }, [services, user?.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {services
        .filter((s) => s.user_id !== user?.id)
        .map((service) => {
          const profile = profilesMap[service.user_id];
          const email = emailsMap[service.user_id] || "N/A";

          return (
            <div
              key={service.user_id + service.title}
              className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
                  {profile?.company_name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="text-lg font-semibold">{profile?.display_name || "N/A"}</p>
                  <p className="text-sm text-gray-500">{profile?.company_name || "N/A"}</p>
                </div>
              </div>
              <p className="mb-2">
                <strong>Title:</strong> {service.title}
              </p>
              <p className="mb-2">
                <strong>Price Range:</strong> {service.price_range}
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <span className="text-blue-600">{email}</span>
              </p>
              {email !== "N/A" && (
                <a
                  href={`mailto:${email}?subject=Inquiry about your service&body=Hello, I am interested in your service.`}

                  className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Contact Owner
                </a>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ServiceList;

