import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  TrendingUp, 
  AlertTriangle, 
  Heart, 
  BarChart3,
  Phone,
  LogOut,
  User,
  Headphones,
  Activity
} from "lucide-react";

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

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Performance", active: false },
  { icon: AlertTriangle, label: "Escalations", active: false },
  { icon: Heart, label: "Sentiment", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleAgentClick = (agentId: string) => {
    navigate(`/agent/${agentId}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "busy": return "bg-yellow-500";
      case "idle": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Sidebar */}
      <div className="w-64 bg-card/80 backdrop-blur-sm border-r border-border/50 shadow-lg">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-fork-blue to-fork-blue-dark rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-fork-blue to-fork-teal bg-clip-text text-transparent">Fork It</h1>
              <p className="text-xs text-muted-foreground">Call Center AI</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                item.active 
                  ? "bg-gradient-to-r from-fork-blue to-fork-blue-dark text-white shadow-lg" 
                  : "hover:bg-muted/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:border-destructive/50"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">Live Agents</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  System Online
                </Badge>
                <div className="w-10 h-10 bg-gradient-to-br from-fork-purple to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {agents.map((agent) => (
              <Card 
                key={agent.id}
                className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-0 bg-card/60 backdrop-blur-sm"
                onClick={() => handleAgentClick(agent.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.bgColor} opacity-90`} />
                
                <CardContent className="relative p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                        {agent.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{agent.name}</h3>
                        <p className="text-white/80 text-sm">{agent.service}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {agent.version}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Status</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                        <span className="text-sm font-medium capitalize">{agent.status}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Active Calls</span>
                      <span className="text-sm font-semibold">{agent.calls}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Uptime</span>
                      <span className="text-sm font-semibold">{agent.uptime}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/90">
                      <Headphones className="w-4 h-4" />
                      <span className="text-sm">Click to monitor calls</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card/60 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-fork-blue/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-fork-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Calls</p>
                    <p className="text-2xl font-bold">72</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-fork-teal/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-fork-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-fork-orange/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-fork-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Duration</p>
                    <p className="text-2xl font-bold">4:32</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-fork-purple/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-fork-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                    <p className="text-2xl font-bold">4.8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;