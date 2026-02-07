import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FileX, RefreshCw, FileWarning, Plane, Scale, HeartHandshake,
  CloudLightning, PartyPopper, Briefcase, FileCheck, LogOut, Shield
} from "lucide-react";
import { toast } from "sonner";

const services = [
  { id: "lost-passport", title: "Lost Passport", description: "Report a lost or stolen passport and request a replacement", icon: FileX, color: "text-destructive" },
  { id: "passport-renewal", title: "Passport Renewal", description: "Renew an expiring or expired passport", icon: RefreshCw, color: "text-navy-light" },
  { id: "visa-issues", title: "Visa Issues", description: "Report visa-related problems or request assistance", icon: FileWarning, color: "text-accent" },
  { id: "termination-departure", title: "Termination Departure", description: "Process departure after employment termination", icon: Plane, color: "text-navy" },
  { id: "legal-support", title: "Legal Support", description: "Request legal assistance for court cases or disputes", icon: Scale, color: "text-navy-light" },
  { id: "distress-relief", title: "Distress Relief", description: "Emergency assistance for citizens in distress", icon: HeartHandshake, color: "text-destructive" },
  { id: "calamities-support", title: "Calamities Support", description: "Aid and support during natural disasters or emergencies", icon: CloudLightning, color: "text-accent" },
  { id: "cultural-events", title: "Cultural Events", description: "Register or inquire about cultural events and programs", icon: PartyPopper, color: "text-navy" },
  { id: "employment-help", title: "Employment Help", description: "Job assistance, labor disputes, and employment guidance", icon: Briefcase, color: "text-navy-light" },
  { id: "document-verification", title: "Document Verification", description: "Verify and authenticate official documents", icon: FileCheck, color: "text-accent" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("consular_user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("consular_user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="consular-gradient">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-primary-foreground">Consular Portal</h1>
              <p className="text-xs text-primary-foreground/60">Services Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Hero section */}
      <div className="consular-gradient pb-16 pt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">
            How can we help you today?
          </h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            Select a service below to get started with your consular request.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="container mx-auto px-4 -mt-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate(`/service/${service.id}`)}
              className="service-card text-left group"
            >
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 font-sans">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
