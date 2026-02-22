import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Phone, CreditCard } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState("");
  const [permitId, setPermitId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactNumber.trim() || !permitId.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (contactNumber.trim().length < 7) {
      toast.error("Please enter a valid contact number");
      return;
    }
    if (permitId.trim().length < 3) {
      toast.error("Please enter a valid Resident Permit ID");
      return;
    }
    setLoading(true);
    // Simulate authentication
    setTimeout(() => {
      sessionStorage.setItem("consular_user", JSON.stringify({ contactNumber, permitId }));
      toast.success("Login successful!");
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 consular-gradient items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Shield className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">
            Consular Services Portal
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Access passport, visa, legal support, and other essential consular services — all in one place.
          </p>
          <div className="mt-10 flex justify-center gap-6 text-primary-foreground/50 text-sm">
            <span>🛂 Passport</span>
            <span>📋 Visa</span>
            <span>⚖️ Legal</span>
            <span>🤝 Support</span>
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Consular Services</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to access consular services</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-foreground font-medium">Contact Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="contact"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permit" className="text-foreground font-medium">Resident Permit ID</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="permit"
                  type="text"
                  placeholder="e.g. RP-2024-XXXXXX"
                  value={permitId}
                  onChange={(e) => setPermitId(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Protected by the Consular Services Authority. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
