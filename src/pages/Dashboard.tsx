import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Phone, 
  TrendingUp, 
  Clock, 
  Users, 
  Search,
  Filter,
  MoreHorizontal,
  Play,
  CheckCircle,
  XCircle 
} from "lucide-react";
import dashboardBackground from "@/assets/dashboard-bg.jpg";

const Dashboard = () => {
  const stats = [
    { title: "Total Calls", value: "12,847", change: "+12%", icon: Phone },
    { title: "Success Rate", value: "94.2%", change: "+2.1%", icon: CheckCircle },
    { title: "Avg Duration", value: "3m 42s", change: "-8s", icon: Clock },
    { title: "Active Agents", value: "24", change: "+3", icon: Users }
  ];

  const recentCalls = [
    {
      id: "1",
      time: "2 mins ago",
      agent: "Sales Agent Pro",
      caller: "+1 (555) 123-4567",
      duration: "4m 23s",
      status: "completed",
      outcome: "Lead Qualified"
    },
    {
      id: "2", 
      time: "5 mins ago",
      agent: "Support Agent",
      caller: "+1 (555) 987-6543",
      duration: "2m 15s",
      status: "completed",
      outcome: "Issue Resolved"
    },
    {
      id: "3",
      time: "8 mins ago", 
      agent: "Sales Agent Pro",
      caller: "+1 (555) 456-7890",
      duration: "6m 12s",
      status: "failed",
      outcome: "No Answer"
    },
    {
      id: "4",
      time: "12 mins ago",
      agent: "Booking Agent",
      caller: "+1 (555) 321-9876",
      duration: "3m 45s", 
      status: "completed",
      outcome: "Appointment Set"
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: `url(${dashboardBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your AI agents in real-time
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass-card">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="btn-hero" asChild>
              <Link to="/agents">Manage Agents</Link>
            </Button>
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

        {/* Recent Calls Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="glass-card shadow-elevated">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Recent Calls
                  </CardTitle>
                  <CardDescription>
                    Latest activity from your AI agents
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search calls..." 
                      className="pl-10 glass-card"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Caller</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCalls.map((call, index) => (
                    <motion.tr
                      key={call.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="group hover:bg-muted/5 transition-colors"
                    >
                      <TableCell className="text-muted-foreground">
                        {call.time}
                      </TableCell>
                      <TableCell className="font-medium">
                        {call.agent}
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
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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

export default Dashboard;