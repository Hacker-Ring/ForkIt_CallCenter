import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Phone, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Clock,
  User,
  Bot,
  Activity,
  Pause,
  Play
} from "lucide-react";
import { WaveformComponent } from "@/components/WaveformComponent";

interface Agent {
  id: string;
  name: string;
  service: string;
  version: string;
  status: "active" | "idle" | "busy";
  avatar: string;
  bgColor: string;
  calls: number;
  uptime: string;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "ByteBurger",
    service: "Food Delivery",
    version: "v1.0",
    status: "active",
    avatar: "👨‍💼",
    bgColor: "from-fork-orange to-orange-500",
    calls: 23,
    uptime: "2h 34m"
  },
  {
    id: "2", 
    name: "MediCall",
    service: "General Medical",
    version: "v2.1",
    status: "active",
    avatar: "👩‍⚕️",
    bgColor: "from-fork-teal to-emerald-500",
    calls: 18,
    uptime: "1h 52m"
  },
  {
    id: "3",
    name: "ShopAssist", 
    service: "Shopping",
    version: "v3.4",
    status: "busy",
    avatar: "👨‍💻",
    bgColor: "from-fork-blue to-blue-600",
    calls: 31,
    uptime: "3h 15m"
  }
];

const AgentDetail = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [aiMuted, setAiMuted] = useState(false);
  const [humanMuted, setHumanMuted] = useState(false);

  const agent = agents.find(a => a.id === agentId);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Agent Monitor</h1>
              <p className="text-muted-foreground">Real-time call analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              Live Call
            </Badge>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Call Duration</p>
              <p className="text-2xl font-bold font-mono">{formatTime(callDuration)}</p>
            </div>
          </div>
        </div>

        {/* Agent Info Card */}
        <Card className="mb-8 border-0 bg-card/60 backdrop-blur-sm overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${agent.bgColor}`} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${agent.bgColor} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {agent.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{agent.name}</h2>
                  <p className="text-muted-foreground">{agent.service}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{agent.version}</Badge>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Active Call</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Uptime: {agent.uptime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Total Calls: {agent.calls}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Assistant Section */}
        <Card className="border-0 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Voice Assistant Monitor</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                  className={isRecording ? "text-red-500 border-red-200" : ""}
                >
                  {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRecording ? "Pause" : "Resume"}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* AI Voice Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-fork-blue to-fork-blue-dark rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Voice</h3>
                    <p className="text-sm text-muted-foreground">Assistant speaking</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-fork-blue border-fork-blue/30">
                    Active
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setAiMuted(!aiMuted)}
                    className={aiMuted ? "text-red-500" : "text-muted-foreground"}
                  >
                    {aiMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="h-32 bg-muted/30 rounded-lg p-4">
                <WaveformComponent 
                  type="ai" 
                  isActive={isRecording && !aiMuted}
                  color="fork-blue"
                />
              </div>
            </div>

            {/* Customer Voice Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-fork-teal to-emerald-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Customer Voice</h3>
                    <p className="text-sm text-muted-foreground">Human speaking</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-fork-teal border-fork-teal/30">
                    Listening
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setHumanMuted(!humanMuted)}
                    className={humanMuted ? "text-red-500" : "text-muted-foreground"}
                  >
                    {humanMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="h-32 bg-muted/30 rounded-lg p-4">
                <WaveformComponent 
                  type="human" 
                  isActive={isRecording && !humanMuted}
                  color="fork-teal"
                />
              </div>
            </div>

            {/* Current Conversation Context */}
            <div className="mt-8 p-6 bg-muted/20 rounded-lg">
              <h4 className="font-semibold mb-4">Current Conversation Context</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-fork-teal/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3 h-3 text-fork-teal" />
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Customer:</span> "Hi, I'd like to place an order for delivery..."
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-fork-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-fork-blue" />
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-medium">AI:</span> "Of course! I'd be happy to help you with your order. What would you like to have today?"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDetail;