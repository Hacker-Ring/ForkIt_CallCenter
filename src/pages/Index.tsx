import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, BarChart3, Users, Users2Icon, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.jpg";
import forkLogo from "@/assets/fork.png"; // <-- Fork logo import
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

const Index = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Process 10+ number of calls with ultra-low latency AI agents" },
   { icon: Settings, title: "Seamless Integration", description: "Connect effortlessly with your existing tools and systems" },
    { icon: BarChart3, title: "Advanced Analytics", description: "Real-time insights and performance metrics" },
    { icon: Users, title: "Multi-Agent Support", description: "Deploy and manage multiple AI agents seamlessly" }
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Dynamic Logo */}
          {/* Dynamic Logo */}
          {/* Dynamic Logo */}
          <motion.div 
          className="flex items-start gap-2 cursor-pointer"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => navigate("/")}
>
  <div className="flex flex-col leading-tight">
    <div className="flex items-center gap-2">
      <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Fork It
      </span>
      {/* Fork Logo with white bg */}
      <motion.div 
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="p-1 bg-white rounded-full shadow-md"
      >
        <img src={forkLogo} alt="Fork Logo" className="h-5 w-5" />
      </motion.div>
    </div>
    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
      An AI Agent Hub
    </span>
  </div>
</motion.div>



          {/* Greeting + Auth Buttons */}
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                {/* Greeting with motion */}
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg font-medium text-primary"
                >
                  Hi, {user.displayName || user.email} 👋
                </motion.span>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn-hero" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            The Future of
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
              AI Agents
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Deploy, use, and scale intelligent AI agents that handle calls, 
            analyze conversations, and deliver insights in real-time.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="btn-hero group" 
              asChild
              onClick={() => {
                if (user) navigate("/dashboard");
                else navigate("/login");
              }}
            >
              <span>
                Admin Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button size="lg" variant="outline" className="glass-card" asChild>
              <Link to="/agents">Use Agents</Link>
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="glass-card p-6 h-full hover:shadow-glow-primary transition-all duration-300">
                <feature.icon className="h-12 w-12 text-primary mb-4 animate-float" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
