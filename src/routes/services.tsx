import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoVideoModal } from "@/components/demo-video-modal";
import { 
  Mic, 
  Video, 
  Brain, 
  Users, 
  Target,
  Clock,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive AI-powered interview preparation services designed to help you succeed 
            in today's competitive job market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg">
                <Sparkles className="mr-2" />
                Start Free Trial
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <DemoVideoModal 
              triggerButtonText="Watch Platform Demo"
              triggerButtonVariant="outline"
              triggerButtonSize="lg"
              triggerButtonClassName="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg"
            />
          </div>
        </div>

        {/* Main Services */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* AI Voice Interview */}
          <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mic className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-700">AI Voice Interview</CardTitle>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Most Popular</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-center">
                Experience realistic interview conversations with our advanced AI that adapts to your responses and provides intelligent follow-up questions.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Natural Conversation Flow</h4>
                    <p className="text-sm text-gray-600">AI speaks and listens like a real interviewer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Dynamic Question Generation</h4>
                    <p className="text-sm text-gray-600">Questions adapt based on your responses and skill level</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Real-time Feedback</h4>
                    <p className="text-sm text-gray-600">Instant analysis of your responses and suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Multiple Difficulty Levels</h4>
                    <p className="text-sm text-gray-600">Easy, Moderate, and Difficult interview scenarios</p>
                  </div>
                </div>
              </div>

              <Link to="/generate">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                  Try Voice Interview
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Traditional Video Interview */}
          <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Video className="w-10 h-10 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl text-emerald-700">Traditional Video Interview</CardTitle>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Self-Paced</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-center">
                Practice with video recording capabilities that let you review your performance, body language, and delivery at your own pace.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Video Recording & Playback</h4>
                    <p className="text-sm text-gray-600">Record yourself and review your performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Self-Paced Learning</h4>
                    <p className="text-sm text-gray-600">Take your time to think and respond thoughtfully</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Re-record Capability</h4>
                    <p className="text-sm text-gray-600">Practice until you're satisfied with your answers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Progress Tracking</h4>
                    <p className="text-sm text-gray-600">Monitor your improvement over time</p>
                  </div>
                </div>
              </div>

              <Link to="/generate">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6">
                  Start Video Practice
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Interview Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Specialized Interview Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-2 border-gray-200 hover:border-purple-300 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">DSA Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Data Structures and Algorithms interviews for technical positions with varying difficulty levels.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="outline" className="text-xs">Arrays</Badge>
                  <Badge variant="outline" className="text-xs">Algorithms</Badge>
                  <Badge variant="outline" className="text-xs">Big O</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Frontend Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Specialized questions for frontend developers covering modern frameworks and best practices.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="outline" className="text-xs">React</Badge>
                  <Badge variant="outline" className="text-xs">JavaScript</Badge>
                  <Badge variant="outline" className="text-xs">CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">QA Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Quality assurance interviews focusing on testing methodologies and automation frameworks.
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  <Badge variant="outline" className="text-xs">Manual Testing</Badge>
                  <Badge variant="outline" className="text-xs">Selenium</Badge>
                  <Badge variant="outline" className="text-xs">API Testing</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant AI Generation</h3>
              <p className="text-sm text-gray-600">Get personalized questions generated in real-time based on your profile</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Availability</h3>
              <p className="text-sm text-gray-600">Practice anytime, anywhere with our cloud-based platform</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">Your data is encrypted and protected with enterprise-grade security</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Progress Analytics</h3>
              <p className="text-sm text-gray-600">Track your improvement with detailed performance metrics</p>
            </div>
          </div>
        </div>

        {/* Pricing Plans Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Service Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-700">Free Tier</CardTitle>
                <div className="text-3xl font-bold text-gray-800 mt-2">$0</div>
                <p className="text-gray-600">Perfect for getting started</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">5 AI interviews per day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Basic feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Default interview templates</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Current Plan</Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="border-2 border-blue-400 shadow-xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-700">Premium</CardTitle>
                <div className="text-3xl font-bold text-blue-800 mt-2">$9.99<span className="text-sm font-normal">/month</span></div>
                <p className="text-gray-600">For serious job seekers</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Unlimited AI interviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Advanced feedback & analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Custom interview creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade Soon</Button>
              </CardContent>
            </Card>

            {/* Enterprise Tier */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-purple-700">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-purple-800 mt-2">Custom</div>
                <p className="text-gray-600">For organizations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">White-label solution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Bulk user management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">Dedicated support</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Transform Your Interview Skills?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the service that fits your needs and start practicing with our AI-powered interview platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg">
                <Sparkles className="mr-2" />
                Start Free Trial
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
