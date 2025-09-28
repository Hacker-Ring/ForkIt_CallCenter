import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, XCircle, MonitorIcon } from "lucide-react";
import Vapi from "@vapi-ai/web";

// ✅ ShadCN Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const vapi = new Vapi("5483b67b-6cd6-4ae8-8dd6-bbda35e4e7eb");

const Agents = () => {
  const [inCall, setInCall] = useState<Record<string, boolean>>({});
  const [activeAssistant, setActiveAssistant] = useState<string | null>(null);

  // ✅ Modal State
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: "vapi" | "phone";
    assistantId?: string;
    phone?: string;
    name?: string;
  } | null>(null);

  const agents = [
    {
      id: "sales-pro",
      assistantId: "7224bb63-b279-4386-9620-80ddc36724e9",
      name: "Movie Ticket Booking",
      description: "High-converting sales calls with natural conversation flow",
      status: "active",
      callsToday: 47,
      successRate: 89,
      avgDuration: "4m 12s",
      category: "Sales",
      phone: "+13203727212",
    },
    {
      id: "support-helper",
      assistantId: "57ff077d-10f8-4b52-942c-19b105bf74dd",
      name: "Support Helper",
      description: "24/7 customer support with issue resolution capabilities",
      status: "active",
      callsToday: 23,
      successRate: 96,
      avgDuration: "2m 45s",
      category: "Support",
      phone: "+13194088330",
    },
    {
      id: "booking-assistant",
      assistantId: "847d04de-2ee1-4954-a573-17236b99f7b6",
      name: "Food Assistant",
      description: "Automated appointment scheduling and calendar management",
      status: "active",
      callsToday: 0,
      successRate: 92,
      avgDuration: "3m 18s",
      category: "Scheduling",
      phone: "+18449193274",
    },
    {
      id: "lead-qualifier",
      name: "Lead Qualifier",
      description: "Intelligent lead scoring and qualification system",
      status: "active",
      callsToday: 31,
      successRate: 78,
      avgDuration: "5m 33s",
      category: "Sales",
    },
    {
      id: "survey-collector",
      name: "Survey Collector",
      description: "Automated survey and feedback collection agent",
      status: "active",
      callsToday: 15,
      successRate: 85,
      avgDuration: "3m 42s",
      category: "Research",
    },
    {
      id: "appointment-reminder",
      name: "Appointment Reminder",
      description: "Proactive appointment confirmations and reminders",
      status: "active",
      callsToday: 12,
      successRate: 94,
      avgDuration: "1m 28s",
      category: "Scheduling",
    },
  ];

  useEffect(() => {
    vapi.on("call-start", () => {
      console.log("Call started 🎤");
    });
    vapi.on("call-end", () => {
      console.log("Call ended 📴");
      if (activeAssistant) {
        setInCall((prev) => ({ ...prev, [activeAssistant]: false }));
        setActiveAssistant(null);
      }
    });
  }, [activeAssistant]);

  // ✅ Call functions
  const startCall = (assistantId: string) => {
    vapi.start(assistantId);
    setActiveAssistant(assistantId);
    setInCall((prev) => ({ ...prev, [assistantId]: true }));
  };

  const endCall = () => {
    if (activeAssistant) {
      vapi.stop();
      setInCall((prev) => ({ ...prev, [activeAssistant]: false }));
      setActiveAssistant(null);
    }
  };

  // ✅ Confirm Action
  const confirmAction = () => {
    if (pendingAction?.type === "vapi" && pendingAction.assistantId) {
      startCall(pendingAction.assistantId);
    } else if (pendingAction?.type === "phone" && pendingAction.phone) {
      window.location.href = `tel:${pendingAction.phone}`;
    }
    setShowConfirm(false);
    setPendingAction(null);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 p-6">
        <h1 className="text-3xl font-bold mb-6">AI Agents</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="glass-card">
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Start Call Button */}
                {agent.assistantId ? (
                  !inCall[agent.assistantId] ? (
                    <Button
                      className="w-full"
                      onClick={() => {
                        setPendingAction({
                          type: "vapi",
                          assistantId: agent.assistantId,
                          name: agent.name,
                        });
                        setShowConfirm(true);
                      }}
                    >
                      <MonitorIcon className="h-4 w-4 mr-2" />
                      Start Call
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={endCall}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      End Call
                    </Button>
                  )
                ) : (
                  <Button className="w-full" disabled>
                    <MonitorIcon className="h-4 w-4 mr-2" />
                    Start Call (N/A)
                  </Button>
                )}

                {/* Call Now Button */}
                {agent.phone ? (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setPendingAction({
                        type: "phone",
                        phone: agent.phone,
                        name: agent.name,
                      });
                      setShowConfirm(true);
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-full" disabled>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now (N/A)
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ✅ Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Call</DialogTitle>
            <DialogDescription>
              {pendingAction?.type === "vapi" &&
                `Do you want to start a call with ${pendingAction.name}?`}
              {pendingAction?.type === "phone" &&
                `Do you want to call ${pendingAction.name} at ${pendingAction.phone}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agents;
