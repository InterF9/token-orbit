import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Building2, ArrowLeft, CheckCircle, FileText, RefreshCw, AlertCircle, Plane, Scale, Heart, CloudRain, Users, Briefcase, FileCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const serviceConfigs = {
  "lost-passport": {
    name: "Lost Passport",
    icon: FileText,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  "passport-renewal": {
    name: "Passport Renewal",
    icon: RefreshCw,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  "visa-issues": {
    name: "Visa Issues",
    icon: AlertCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  "termination-departure": {
    name: "Termination Departure",
    icon: Plane,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  "legal-support": {
    name: "Legal Support",
    icon: Scale,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  "distress-relief": {
    name: "Distress Relief",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  "calamities-support": {
    name: "Calamities Support",
    icon: CloudRain,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  "cultural-events": {
    name: "Cultural Events",
    icon: Users,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  "employment-help": {
    name: "Employment Help",
    icon: Briefcase,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  "document-verification": {
    name: "Document Verification",
    icon: FileCheck,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
};

export default function ServiceForm() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    passportNumber: "",
    nationality: "",
    dateOfBirth: "",
    address: "",
    details: "",
  });

  const serviceConfig = serviceId ? serviceConfigs[serviceId] : null;

  if (!serviceConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Service Not Found</CardTitle>
            <CardDescription>The requested service does not exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/home")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = serviceConfig.icon;

  const generateToken = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `CP-${serviceId.toUpperCase().slice(0, 3)}-${timestamp}-${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const applicationToken = generateToken();
    const application = {
      token: applicationToken,
      serviceId,
      serviceName: serviceConfig.name,
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Store application in localStorage
    const applications = JSON.parse(localStorage.getItem("consulateApplications") || "[]");
    applications.push(application);
    localStorage.setItem("consulateApplications", JSON.stringify(applications));

    setToken(applicationToken);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className={`mx-auto w-20 h-20 ${serviceConfig.bgColor} rounded-full flex items-center justify-center mb-4`}>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-600">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-base mt-2">
              Your application for {serviceConfig.name} has been received
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Your Application Token:</p>
              <p className="text-2xl font-mono font-bold text-blue-600 break-all">{token}</p>
              <p className="text-sm text-gray-500 mt-3">
                Please save this token for tracking your application status
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Information:</h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>Keep your application token safe for future reference</li>
                <li>You will be contacted via email or phone for updates</li>
                <li>Processing time varies by service type</li>
                <li>Check your email regularly for status updates</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => navigate("/home")} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
              <Button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    passportNumber: "",
                    nationality: "",
                    dateOfBirth: "",
                    address: "",
                    details: "",
                  });
                }} 
                variant="outline"
                className="flex-1"
              >
                Submit Another Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Consulate Portal</h1>
                <p className="text-sm text-gray-500">{serviceConfig.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate("/home")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-16 h-16 ${serviceConfig.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${serviceConfig.color}`} />
              </div>
              <div>
                <CardTitle className="text-2xl">{serviceConfig.name} Application</CardTitle>
                <CardDescription className="text-base">
                  Please fill out all required information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number *</Label>
                  <Input
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    placeholder="Enter passport number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Enter your nationality"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Current Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your current address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Additional Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Provide any additional information relevant to your application"
                  rows={5}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All fields marked with * are required. Make sure all information is accurate before submitting.
                </p>
              </div>

              <Button type="submit" className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}