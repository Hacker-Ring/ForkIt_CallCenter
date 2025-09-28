import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft,
  Bot, 
  Play,
  Pause,
  Settings,
  Phone,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar
} from "lucide-react";

const AgentDetail = () => {
  const { id } = useParams();
  
  // Mock data - would come from API
  const agent = {
    id: "sales-pro",
    name: "Sales Agent Pro", 
    description: "High-converting sales calls with natural conversation flow",
    status: "active",
    category: "Sales",
    created: "2024-01-15",
    lastCall: "2 mins ago"
  };

  const stats = [
    { title: "Total Calls", value: "1,247", change: "+12%", icon: Phone },
    { title: "Success Rate", value: "89.2%", change: "+2.1%", icon: CheckCircle },
    { title: "Avg Duration", value: "4m 12s", change: "-15s", icon: Clock },
    { title: "Conversion Rate", value: "34.7%", change: "+5.2%", icon: TrendingUp }
  ];

  const recentCalls = [
    {
      id: "1",
      time: "2 mins ago",
      caller: "+1 (555) 123-4567",
      duration: "4m 23s", 
      status: "completed",
      outcome: "Lead Qualified",
      sentiment: "positive"
    },
    {
      id: "2",
      time: "8 mins ago",
      caller: "+1 (555) 987-6543", 
      duration: "3m 45s",
      status: "completed",
      outcome: "Demo Scheduled",
      sentiment: "positive"
    },
    {
      id: "3",
      time: "15 mins ago",
      caller: "+1 (555) 456-7890",
      duration: "2m 12s",
      status: "failed", 
      outcome: "Not Interested",
      sentiment: "neutral"
    },
    {
      id: "4", 
      time: "23 mins ago",
      caller: "+1 (555) 321-9876",
      duration: "6m 33s",
      status: "completed",
      outcome: "Follow-up Required", 
      sentiment: "positive"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/agents">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Agents
              </Link>
            </Button>
          </div>
          
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-primary rounded-xl">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {agent.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {agent.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge 
                    variant={agent.status === "active" ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {agent.status === "active" ? (
                      <Play className="h-3 w-3" />
                    ) : (
                      <Pause className="h-3 w-3" />
                    )}
                    {agent.status}
                  </Badge>
                  <Badge variant="outline">{agent.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Last call: {agent.lastCall}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="glass-card">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button 
                variant={agent.status === "active" ? "outline" : "default"}
                className={agent.status === "active" ? "glass-card" : "btn-hero"}
              >
                {agent.status === "active" ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Agent
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Agent
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <Card className="glass-card hover:shadow-glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-500">{stat.change}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-primary animate-glow-pulse" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="glass-card shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Over Time
              </CardTitle>
              <CardDescription>
                Call volume and success rates for the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/5 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                  <p className="text-sm text-muted-foreground">
                    Integration with charting library (Recharts)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Calls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="glass-card shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Recent Calls
              </CardTitle>
              <CardDescription>
                Latest activity from this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Caller</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Sentiment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCalls.map((call, index) => (
                    <motion.tr
                      key={call.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                      className="group hover:bg-muted/5 transition-colors"
                    >
                      <TableCell className="text-muted-foreground">
                        {call.time}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {call.caller}
                      </TableCell>
                      <TableCell>{call.duration}</TableCell> 
                      <TableCell>
                        <Badge 
                          variant={call.status === "completed" ? "default" : "destructive"}
                          className="flex items-center gap-1 w-fit"
                        >
                          {call.status === "completed" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {call.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{call.outcome}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            call.sentiment === "positive" ? "border-green-500 text-green-500" :
                            call.sentiment === "negative" ? "border-red-500 text-red-500" :
                            "border-yellow-500 text-yellow-500"
                          }
                        >
                          {call.sentiment}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentDetail;