import { useNavigate } from "react-router";
import { Building2, LogOut, FileText, RefreshCw, AlertCircle, Plane, Scale, Heart, CloudRain, Users, Briefcase, FileCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const services = [
  {
    id: "lost-passport",
    name: "Lost Passport",
    description: "Report and request replacement for lost passport",
    icon: FileText,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "passport-renewal",
    name: "Passport Renewal",
    description: "Renew your existing passport",
    icon: RefreshCw,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "visa-issues",
    name: "Visa Issues",
    description: "Get assistance with visa-related problems",
    icon: AlertCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "termination-departure",
    name: "Termination Departure",
    description: "Assistance with employment termination procedures",
    icon: Plane,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: "legal-support",
    name: "Legal Support",
    description: "Access legal assistance and guidance",
    icon: Scale,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    id: "distress-relief",
    name: "Distress Relief",
    description: "Emergency assistance for distress situations",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    id: "calamities-support",
    name: "Calamities Support",
    description: "Support during natural disasters and calamities",
    icon: CloudRain,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
  {
    id: "cultural-events",
    name: "Cultural Events",
    description: "Information about cultural programs and events",
    icon: Users,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
  {
    id: "employment-help",
    name: "Employment Help",
    description: "Guidance on employment and job opportunities",
    icon: Briefcase,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    id: "document-verification",
    name: "Document Verification",
    description: "Verify and authenticate your documents",
    icon: FileCheck,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("consulateAuth");
    navigate("/login");
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Consulate Portal</h1>
                <p className="text-sm text-gray-500">Official Consular Services</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h2>
          <p className="text-gray-600">Select a service to submit your application</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${service.borderColor}`}
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader>
                  <div className={`w-14 h-14 ${service.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
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

      {/* Footer */}
      <footer className="mt-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
          © 2026 Consulate Portal. All rights reserved. | Official Consular Services Platform
        </div>
      </footer>
    </div>
  );
}
