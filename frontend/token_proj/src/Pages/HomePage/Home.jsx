import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Plane, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Heart, 
  Building2, 
  Palmtree, 
  UserCheck, 
  MapPin, 
  Globe,
  LogOut
} from "lucide-react";

const visaServices = [
  {
    id: "tourist",
    title: "Tourist Visa",
    description: "Apply for a tourist visa for leisure and travel purposes",
    icon: Palmtree,
    color: "bg-blue-500",
  },
  {
    id: "business",
    title: "Business Visa",
    description: "Business visa for professional meetings and conferences",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    id: "student",
    title: "Student Visa",
    description: "Student visa for educational institutions and programs",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    id: "work",
    title: "Work Visa",
    description: "Employment visa for working professionals",
    icon: Building2,
    color: "bg-orange-500",
  },
  {
    id: "family",
    title: "Family Visa",
    description: "Family reunion and dependent visa applications",
    icon: Users,
    color: "bg-pink-500",
  },
  {
    id: "spouse",
    title: "Spouse Visa",
    description: "Visa for married partners and spouses",
    icon: Heart,
    color: "bg-red-500",
  },
  {
    id: "transit",
    title: "Transit Visa",
    description: "Short-term transit visa for layovers",
    icon: Plane,
    color: "bg-cyan-500",
  },
  {
    id: "medical",
    title: "Medical Visa",
    description: "Medical treatment and healthcare visa",
    icon: UserCheck,
    color: "bg-teal-500",
  },
  {
    id: "diplomatic",
    title: "Diplomatic Visa",
    description: "Official and diplomatic travel visa",
    icon: Globe,
    color: "bg-indigo-500",
  },
  {
    id: "residence",
    title: "Residence Permit",
    description: "Long-term residence and permanent residency",
    icon: MapPin,
    color: "bg-amber-500",
  },
];

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("visaServiceAuth");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("visaServiceAuth");
    localStorage.removeItem("userContact");
    localStorage.removeItem("userPermitId");
    navigate("/");
  };

  const userContact = localStorage.getItem("userContact");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Visa Services Portal</h1>
            <p className="text-sm text-gray-600">Welcome, {userContact}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a Visa Service</h2>
          <p className="text-gray-600">Select the type of visa you want to apply for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visaServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}