import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState("");
  const [residentPermitId, setResidentPermitId] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!contactNumber || !residentPermitId) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simple validation for demo purposes
    if (contactNumber.length >= 10 && residentPermitId.length >= 6) {
      localStorage.setItem("visaServiceAuth", "true");
      localStorage.setItem("userContact", contactNumber);
      localStorage.setItem("userPermitId", residentPermitId);
      toast.success("Login successful!");
      navigate("/home");
    } else {
      toast.error("Invalid credentials. Contact number must be at least 10 digits and Permit ID at least 6 characters.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Visa Services Portal</CardTitle>
            <CardDescription>Sign in to access visa application services</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permitId">Resident Permit ID</Label>
              <Input
                id="permitId"
                type="text"
                placeholder="Enter your resident permit ID"
                value={residentPermitId}
                onChange={(e) => setResidentPermitId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}