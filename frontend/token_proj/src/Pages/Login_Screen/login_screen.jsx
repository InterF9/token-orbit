import { useState } from "react";
import { useNavigate } from "react-router";
import { Building2, Phone, CreditCard, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState("");
  const [permitId, setPermitId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!contactNumber || !permitId) {
      setError("Please fill in all fields");
      return;
    }

    if (contactNumber.length < 10) {
      setError("Please enter a valid contact number");
      return;
    }

    if (permitId.length < 6) {
      setError("Please enter a valid resident permit ID");
      return;
    }

    // Store authentication
    localStorage.setItem("consulateAuth", JSON.stringify({
      contactNumber,
      permitId,
      loginTime: new Date().toISOString()
    }));

    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <Building2 className="w-9 h-9 text-white" />
          </div>
          <CardTitle className="text-3xl">Consulate Portal</CardTitle>
          <CardDescription className="text-base">
            Access consular services with your credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="contact" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Number
              </Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="permit" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Resident Permit ID
              </Label>
              <Input
                id="permit"
                type="text"
                placeholder="Enter your resident permit ID"
                value={permitId}
                onChange={(e) => setPermitId(e.target.value)}
                className="h-11"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <LogIn className="w-5 h-5 mr-2" />
              Access Portal
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
            Secure access to official consular services
          </div>
        </CardContent>
      </Card>
    </div>
  );
}