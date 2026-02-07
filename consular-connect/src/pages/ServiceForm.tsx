import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Shield, CheckCircle, Users, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ServiceConfig {
  title: string;
  commonFields: boolean;
  extraFields: ExtraField[];
}

interface ExtraField {
  id: string;
  label: string;
  type: "text" | "date" | "select" | "textarea" | "number";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

const serviceConfigs: Record<string, ServiceConfig> = {
  "lost-passport": {
    title: "Lost Passport",
    commonFields: true,
    extraFields: [
      { id: "passportNumber", label: "Lost Passport Number", type: "text", placeholder: "e.g. A12345678", required: true },
      { id: "visitorStatus", label: "Visitor Status", type: "select", options: ["Tourist", "Resident"], required: true },
      { id: "flightStatus", label: "Flight Status", type: "select", options: ["Upcoming Flight", "No Upcoming Flight", "Flight Missed", "Flight Cancelled"], required: true },
      { id: "flightDate", label: "Flight Date (if applicable)", type: "date" },
      { id: "lastSeenLocation", label: "Where was it last seen?", type: "text", placeholder: "Location or city" },
      { id: "policeReport", label: "Police Report Filed?", type: "select", options: ["Yes", "No", "In Progress"] },
      { id: "details", label: "Additional Details", type: "textarea", placeholder: "Describe the circumstances..." },
    ],
  },
  "passport-renewal": {
    title: "Passport Renewal",
    commonFields: true,
    extraFields: [
      { id: "currentPassportNumber", label: "Current Passport Number", type: "text", placeholder: "e.g. A12345678", required: true },
      { id: "expirationDate", label: "Current Passport Expiration Date", type: "date", required: true },
      { id: "renewalReason", label: "Reason for Renewal", type: "select", options: ["Expiring Soon", "Already Expired", "Damaged", "Name Change", "Other"], required: true },
      { id: "urgency", label: "Urgency Level", type: "select", options: ["Normal", "Urgent", "Emergency"] },
      { id: "details", label: "Additional Notes", type: "textarea", placeholder: "Any special circumstances..." },
    ],
  },
  "visa-issues": {
    title: "Visa Issues",
    commonFields: true,
    extraFields: [
      { id: "visaType", label: "Visa Type", type: "select", options: ["Work Visa", "Student Visa", "Tourist Visa", "Business Visa", "Transit Visa", "Other"], required: true },
      { id: "visaNumber", label: "Visa Number", type: "text", placeholder: "e.g. V-2024-XXXXX", required: true },
      { id: "visaExpirationDate", label: "Visa Expiration Date", type: "date", required: true },
      { id: "issueType", label: "Type of Issue", type: "select", options: ["Visa Denied", "Visa Expired", "Visa Overstay", "Visa Transfer", "Visa Extension", "Other"], required: true },
      { id: "details", label: "Describe the Issue", type: "textarea", placeholder: "Provide details about your visa issue...", required: true },
    ],
  },
  "termination-departure": {
    title: "Termination Departure",
    commonFields: true,
    extraFields: [
      { id: "employerName", label: "Employer Name", type: "text", placeholder: "Company or employer name", required: true },
      { id: "terminationDate", label: "Date of Termination", type: "date", required: true },
      { id: "visaValidityDate", label: "Visa Validity Date", type: "date", required: true },
      { id: "departureStatus", label: "Departure Status", type: "select", options: ["Planning to Depart", "Departure Blocked", "Awaiting Clearance", "Other"], required: true },
      { id: "ticketStatus", label: "Flight Ticket Status", type: "select", options: ["Have Ticket", "Need Ticket", "Ticket Cancelled"] },
      { id: "details", label: "Additional Information", type: "textarea", placeholder: "Any other relevant details..." },
    ],
  },
  "legal-support": {
    title: "Legal Support",
    commonFields: true,
    extraFields: [
      { id: "caseType", label: "Type of Legal Case", type: "select", options: ["Criminal", "Civil", "Labor Dispute", "Immigration", "Family", "Other"], required: true },
      { id: "caseNumber", label: "Case Number (if available)", type: "text", placeholder: "e.g. CASE-2024-XXXX" },
      { id: "courtHearingDate", label: "Date of Court Hearing", type: "date", required: true },
      { id: "seriousness", label: "Seriousness of Issue", type: "select", options: ["Low - Advisory Needed", "Medium - Active Dispute", "High - Detention/Arrest", "Critical - Life Threatening"], required: true },
      { id: "hasLawyer", label: "Do you have a lawyer?", type: "select", options: ["Yes", "No", "Need Assistance Finding One"] },
      { id: "details", label: "Case Details", type: "textarea", placeholder: "Describe your legal situation...", required: true },
    ],
  },
  "distress-relief": {
    title: "Distress Relief",
    commonFields: true,
    extraFields: [
      { id: "distressType", label: "Type of Distress", type: "select", options: ["Financial", "Medical", "Stranded", "Abuse/Violence", "Homelessness", "Other"], required: true },
      { id: "currentLocation", label: "Current Location", type: "text", placeholder: "City, area, or address", required: true },
      { id: "urgency", label: "Urgency Level", type: "select", options: ["Non-Urgent", "Urgent", "Emergency - Immediate Help Needed"], required: true },
      { id: "peopleAffected", label: "Number of People Affected", type: "number", placeholder: "1" },
      { id: "details", label: "Describe Your Situation", type: "textarea", placeholder: "Please describe your situation in detail...", required: true },
    ],
  },
  "calamities-support": {
    title: "Calamities Support",
    commonFields: true,
    extraFields: [
      { id: "calamityType", label: "Type of Calamity", type: "select", options: ["Earthquake", "Flood", "Fire", "Typhoon/Hurricane", "Pandemic", "War/Conflict", "Other"], required: true },
      { id: "severity", label: "Severity of Problem", type: "select", options: ["Minor - Property Damage Only", "Moderate - Displacement", "Severe - Injuries Involved", "Critical - Life Threatening"], required: true },
      { id: "location", label: "Affected Location", type: "text", placeholder: "City or area affected", required: true },
      { id: "peopleAffected", label: "Number of People Affected", type: "number", placeholder: "1" },
      { id: "needsEvacuation", label: "Need Evacuation?", type: "select", options: ["Yes", "No", "Already Evacuated"] },
      { id: "details", label: "Describe the Situation", type: "textarea", placeholder: "Provide details about the calamity and your needs...", required: true },
    ],
  },
  "cultural-events": {
    title: "Cultural Events",
    commonFields: true,
    extraFields: [
      { id: "eventType", label: "Event Type", type: "select", options: ["Festival", "Exhibition", "Concert", "Workshop", "Conference", "Community Gathering", "Other"], required: true },
      { id: "eventName", label: "Event Name", type: "text", placeholder: "Name of the event", required: true },
      { id: "eventDate", label: "Event Date", type: "date", required: true },
      { id: "eventExplanation", label: "Explain the Event", type: "textarea", placeholder: "Describe the event, its purpose, cultural significance, and what you need...", required: true },
      { id: "expectedAttendees", label: "Expected Number of Attendees", type: "number", placeholder: "50" },
      { id: "venueNeeded", label: "Need Venue Assistance?", type: "select", options: ["Yes", "No", "Already Have Venue"] },
    ],
  },
  "employment-help": {
    title: "Employment Help",
    commonFields: true,
    extraFields: [
      { id: "helpType", label: "Type of Help Needed", type: "select", options: ["Job Search", "Labor Dispute", "Unpaid Wages", "Work Permit Issues", "Employer Abuse", "Other"], required: true },
      { id: "currentEmployer", label: "Current/Previous Employer", type: "text", placeholder: "Company name" },
      { id: "occupation", label: "Occupation/Job Title", type: "text", placeholder: "e.g. Engineer, Nurse, etc." },
      { id: "linkedinProfile", label: "LinkedIn Profile URL", type: "text", placeholder: "https://linkedin.com/in/yourprofile" },
      { id: "details", label: "Describe Your Situation", type: "textarea", placeholder: "Explain the employment issue or help needed...", required: true },
    ],
  },
  "document-verification": {
    title: "Document Verification",
    commonFields: true,
    extraFields: [
      { id: "numberOfDocuments", label: "Number of Documents", type: "number", placeholder: "1", required: true },
      { id: "documentTypes", label: "Which Documents?", type: "select", options: ["Birth Certificate", "Marriage Certificate", "Educational Diploma", "Employment Contract", "Power of Attorney", "Affidavit", "Other"], required: true },
      { id: "documentList", label: "List All Documents (if multiple)", type: "textarea", placeholder: "e.g.\n1. Birth Certificate\n2. Marriage Certificate\n3. Diploma" },
      { id: "purpose", label: "Purpose of Verification", type: "select", options: ["Employment", "Immigration", "Legal Proceedings", "Education", "Personal", "Other"], required: true },
      { id: "urgency", label: "Urgency", type: "select", options: ["Normal (5-7 days)", "Urgent (2-3 days)", "Emergency (24 hours)"] },
      { id: "details", label: "Additional Notes", type: "textarea", placeholder: "Any special requirements..." },
    ],
  },
};

const SERVICE_WEIGHT: Record<string, number> = {
  LOST_PASSPORT: 100,
  PASSPORT_RENEWAL: 85,
  VISA: 85,
  TERMINATION: 90,
  LEGAL: 80,
  DISTRESS: 90,
  CULTURAL: 40,
  EMPLOYMENT: 50,
  DOCUMENT: 60,
  CALAMITY: 90,
};

const SERVICE_CODE: Record<string, string> = {
  "lost-passport": "LOST_PASSPORT",
  "passport-renewal": "PASSPORT_RENEWAL",
  "visa-issues": "VISA",
  "termination-departure": "TERMINATION",
  "legal-support": "LEGAL",
  "distress-relief": "DISTRESS",
  "cultural-events": "CULTURAL",
  "employment-help": "EMPLOYMENT",
  "document-verification": "DOCUMENT",
  "calamities-support": "CALAMITY",
};

const toNumber = (value?: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseJwt = (token: string) => {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded) as { id?: string };
  } catch {
    return {} as { id?: string };
  }
};

const calculatePriority = (request: {
  service: string;
  vulnerable?: boolean;
  flightHours?: number;
  type?: string;
  imp?: string;
  daysToExpiry?: number;
  severity?: string;
  hearingInDays?: number;
}) => {
  const Ws = SERVICE_WEIGHT[request.service] ?? 0;
  let Wu = 0;
  const Wr = request.vulnerable ? 15 : 0;

  switch (request.service) {
    case "LOST_PASSPORT":
      if (request.flightHours !== undefined) {
        if (request.flightHours <= 24) Wu += 60;
        else if (request.flightHours <= 72) Wu += 40;
        else Wu += 10;
      }
      if (request.type === "TOURIST") Wu += 20;
      else if (request.type) Wu += 5;
      break;
    case "CULTURAL":
      if (request.imp === "HIGH PROFILE") Wu += 25;
      else if (request.imp === "COMMUNITY") Wu += 15;
      else Wu += 5;
      break;
    case "VISA":
      Wu += 30;
      break;
    case "PASSPORT_RENEWAL":
      if (request.daysToExpiry !== undefined) {
        if (request.daysToExpiry <= 7) Wu += 60;
        else if (request.daysToExpiry <= 30) Wu += 50;
        else Wu += 30;
      }
      break;
    case "CALAMITY":
      if (request.severity === "HIGH") Wu += 60;
      else Wu += 50;
      break;
    case "LEGAL":
      if (request.hearingInDays !== undefined) {
        if (request.hearingInDays <= 7) Wu += 40;
        else Wu += 30;
      }
      break;
    case "EMPLOYMENT":
      Wu += 10;
      break;
    case "DISTRESS":
      Wu += 35;
      break;
    case "TERMINATION":
      Wu += 50;
      break;
    case "DOCUMENT":
      Wu += 20;
      break;
    default:
      break;
  }

  return Ws + Wu + Wr;
};

const ServiceForm = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [queueAhead, setQueueAhead] = useState<number | null>(null);
  const [queueLoading, setQueueLoading] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submissionKey, setSubmissionKey] = useState<string | null>(null);

  useEffect(() => {
    const userRaw = localStorage.getItem("user");
    if (!userRaw) {
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(userRaw) as { id?: string; email?: string };
      const key = `application_submitted_${user.id || user.email || "unknown"}`;
      setSubmissionKey(key);
      setAlreadySubmitted(localStorage.getItem(key) === "true");
    } catch {
      setSubmissionKey(null);
      setAlreadySubmitted(false);
    }
  }, [navigate]);

  const config = serviceId ? serviceConfigs[serviceId] : null;

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Service not found.</p>
      </div>
    );
  }

  const updateField = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadySubmitted) {
      toast.error("You already submitted an application");
      return;
    }
    // Validate required fields
    const missingFields = config.extraFields
      .filter((f) => f.required && !formData[f.id]?.trim())
      .map((f) => f.label);

    if (config.commonFields) {
      if (!formData.fullName?.trim()) missingFields.unshift("Full Name");
      if (!formData.email?.trim()) missingFields.unshift("Email Address");
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.slice(0, 3).join(", ")}${missingFields.length > 3 ? "..." : ""}`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to submit a request");
      navigate("/login");
      return;
    }

    try {
      const serviceCode = SERVICE_CODE[serviceId || ""] || "";
      const priorityScore = calculatePriority({
        service: serviceCode,
        vulnerable: formData.vulnerable === "Yes",
        flightHours: toNumber(formData.flightHours),
        type: formData.visitorStatus,
        imp: formData.eventProfile,
        daysToExpiry: toNumber(formData.daysToExpiry),
        severity: formData.severity,
        hearingInDays: toNumber(formData.hearingInDays),
      });

      const res = await fetch("http://localhost:3000/visa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.fullName?.trim(),
          email: formData.email?.trim(),
          nationality: formData.nationality?.trim(),
          current_location: formData.currentLocation?.trim(),
          priority_score: priorityScore,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit request");

      setSubmitted(true);
      if (submissionKey) {
        localStorage.setItem(submissionKey, "true");
        setAlreadySubmitted(true);
      }
      setQueueLoading(true);
      try {
        const queueRes = await fetch("http://localhost:3000/visa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const queueData = await queueRes.json();
        if (queueRes.ok && typeof queueData.queue_ahead === "number") {
          setQueueAhead(queueData.queue_ahead);
        } else {
          setQueueAhead(0);
        }
      } catch {
        setQueueAhead(0);
      } finally {
        setQueueLoading(false);
      }
      toast.success("Request submitted successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit request");
    }
  };

  if (submitted) {
    const token = localStorage.getItem("token");
    const userId = token ? parseJwt(token).id : undefined;
    const reference = userId ? `${userId}` : `${Date.now().toString(36).toUpperCase()}`;
    const queueCount = queueAhead ?? 0;
    const showQueue = !queueLoading;

    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Request Submitted</h2>
          <p className="text-muted-foreground mb-2">
            Your <strong>{config.title}</strong> request has been received.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Reference: <span className="font-mono text-foreground">{reference}</span>
          </p>

          <div className="bg-card border border-border rounded-lg p-5 mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Queue Status</p>
            {!showQueue && (
              <p className="text-sm text-muted-foreground">Loading queue status...</p>
            )}
            {showQueue && (
              <>
                <div className="flex items-center justify-center gap-1.5 mb-3">
                  {Array.from({ length: Math.min(queueCount, 8) }).map((_, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <Users className="w-3 h-3" />
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground ring-2 ring-accent/30 ring-offset-2 ring-offset-card flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1 ml-1">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-success/15 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <span className="font-semibold text-foreground">{queueCount}</span> requests ahead of you
                </p>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{
                      width: `${Math.max(5, Math.min(100, 100 - queueCount * 6))}%`,
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-warning/10 flex items-center justify-center">
            <Shield className="w-7 h-7 text-warning" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Application Limit Reached</h2>
          <p className="text-muted-foreground mb-6">
            You have already submitted an application. You can only submit once.
          </p>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const renderField = (field: ExtraField) => {
    switch (field.type) {
      case "select":
        return (
          <Select value={formData[field.id] || ""} onValueChange={(v) => updateField(field.id, v)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            value={formData[field.id] || ""}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            value={formData[field.id] || ""}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="h-11"
          />
        );
      case "number":
        return (
          <Input
            type="number"
            min="1"
            value={formData[field.id] || ""}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="h-11"
          />
        );
      default:
        return (
          <Input
            type="text"
            value={formData[field.id] || ""}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="h-11"
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="consular-gradient">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-accent" />
            </div>
            <h1 className="text-lg font-display font-bold text-primary-foreground">{config.title}</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common fields */}
          {config.commonFields && (
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h3 className="font-semibold text-foreground font-sans text-sm uppercase tracking-wider text-muted-foreground">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Full Name <span className="text-destructive">*</span></Label>
                  <Input value={formData.fullName || ""} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Your full name" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Email Address <span className="text-destructive">*</span></Label>
                  <Input type="email" value={formData.email || ""} onChange={(e) => updateField("email", e.target.value)} placeholder="you@email.com" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Nationality</Label>
                  <Input value={formData.nationality || ""} onChange={(e) => updateField("nationality", e.target.value)} placeholder="e.g. Filipino" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Current Location</Label>
                  <Input value={formData.currentLocation || ""} onChange={(e) => updateField("currentLocation", e.target.value)} placeholder="City, Country" className="h-11" />
                </div>
              </div>
            </div>
          )}

          {/* Service-specific fields */}
          <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            <h3 className="font-semibold font-sans text-sm uppercase tracking-wider text-muted-foreground">Service Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.extraFields.map((field) => (
                <div key={field.id} className={`space-y-2 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                  <Label className="text-foreground">
                    {field.label} {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" className="min-w-[140px]">
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
