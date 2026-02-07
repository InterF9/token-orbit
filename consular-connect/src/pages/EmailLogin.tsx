import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const EmailLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Login</h1>
          <p className="text-muted-foreground mt-1">Sign in with your email and password</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <Button variant="link" onClick={() => navigate("/signup")}>Sign up</Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailLogin;
