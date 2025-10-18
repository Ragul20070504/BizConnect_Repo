import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SchemesPage from "./SchemesPage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Lorem from "./Lorem";
import { useProfile } from "@/hooks/useProfile";
import { useServices, Service } from "@/hooks/useServices";
import Header from "@/components/Header";
import DataDisplay from "./DataDisplay";
import Chatbot from "./Chatbot";
import CreateServiceDialog from "@/components/CreateServiceDialog";

const usefulLinksData = [
  {
    name: "GST Portal",
    description: (
      <ol className="list-decimal ml-5 space-y-1">
        <li>To get your GSTIN, first create an account on the official GST portal.</li>
        <li>Fill in your business details, PAN, Aadhaar, and bank account information.</li>
        <li>Upload the required documents like proof of business and address.</li>
        <li>Once verified, you’ll receive your GSTIN, which allows you to file returns and run your business legally.</li>
      </ol>
    ),
    url: "https://www.gst.gov.in"
  },
  {
    name: "Udyam Registration",
    description: (
      <ol className="list-decimal ml-5 space-y-1">
        <li>
          Udyam Registration is your gateway to being officially recognized as an MSME. 
          It unlocks access to government schemes, subsidies, cheaper bank loans, and protection under MSME laws. With Udyam, your small business gains credibility and the support to grow faster.
        </li>
        <li>
          To register on Udyam, click the link to the Official Udyam portal below.
        </li>
        <li>
          Enter your Aadhaar, PAN, and business details such as type, activity, and location. Provide bank account information and investment/turnover details. After OTP verification, you’ll get your Udyam Registration Certificate, which gives your business official MSME recognition.
        </li>
      </ol>
    ),
    url: "https://www.udyamregistration.gov.in"
  },
  {
    name: "Government Schemes",
    description: (
      <ol className="list-decimal ml-5 space-y-1">
      	<SchemesPage />
      </ol>
    ),
  }
];


const Dashboard = () => {
  const [userServices, setUserServices] = useState<Service[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const { getUserServices, deleteService } = useServices();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const toggleLink = (linkName: string) => {
    setActiveLink(activeLink === linkName ? null : linkName);
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadUserServices();
    }
  }, [user]);

  const loadUserServices = async () => {
    const services = await getUserServices();
    setUserServices(services);
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
      loadUserServices();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.display_name}
          </h1>
          <p className="text-muted-foreground">
            Manage your services and grow your business network
          </p>
        </div>

        {/* Useful Links Section */}
        <h2 style={{ fontSize: "28px" }}>Useful Links:</h2>
        <ul className="space-y-2 mb-6">
          {usefulLinksData.map((link) => (
            <li key={link.name}>
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => toggleLink(link.name)}
              >
                {link.name}
              </button>

              {activeLink === link.name && (
                <div className="mt-2 p-2 border-l-4 border-blue-400 bg-gray-50 rounded">
                  <p className="text-sm">{link.description}</p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline mt-1 inline-block"
                  >
                    Visit {link.name}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Tabs Section */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Services</h2>
              <Button 
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-primary hover:bg-primary-hover"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userServices.map((service) => (
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
                        onClick={() => handleDeleteService(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {userServices.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-lg font-semibold mb-2">No Services Yet</h3>
                    <p className="text-muted-foreground mb-4 text-center">
                      Start by creating your first service to showcase your expertise
                    </p>
                    <Button 
                      onClick={() => setShowCreateDialog(true)}
                      className="bg-gradient-primary hover:bg-primary-hover"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Service
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardContent>
                  <CardTitle>Available services</CardTitle>
                </CardContent>
                <CardDescription>
                  List of all available services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Lorem />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections">
            <Card>
              <CardHeader>
                <CardTitle>Business Connections</CardTitle>
                <CardDescription>
                  Manage your professional network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connections coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <CreateServiceDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={loadUserServices}
      />
      <Chatbot />
    </div>
  );
};

export default Dashboard;

