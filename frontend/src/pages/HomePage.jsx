import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  User,
  Award,
  ChevronRight,
  Brain,
  Zap,
  Target,
  Shield,
  LineChart,
  Users,
  FileText,
  TrendingUp,
  FileText as FileTextIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">PredictEdu</h1>
                <p className="text-xs text-gray-500">ML-Powered Analytics</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            </div>

            {/* Login + Signup */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => navigate("/login", { state: { userType: "student" } })}
                className="px-5 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup", { state: { userType: "student" } })}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600 font-medium">About</a>
              <button
                onClick={() => navigate("/login", { state: { userType: "student" } })}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup", { state: { userType: "student" } })}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">AI-Powered Student Performance Prediction</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Predict Academic Success
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Before It Happens
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Harness the power of machine learning to identify at-risk students early, 
            personalize learning interventions, and maximize academic outcomes with intelligent data-driven insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/login", { state: { userType: "student" } })}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center space-x-2"
            >
              <User className="w-5 h-5" />
              <span>Student Login</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/login", { state: { userType: "faculty" } })}
              className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center space-x-2"
            >
              <Award className="w-5 h-5" />
              <span>Faculty Login</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            <Stat label="Prediction Accuracy" value="95%" />
            <Stat label="Students Tracked" value="10K+" />
            <Stat label="Institutions" value="50+" />
            <Stat label="Real-Time Monitoring" value="24/7" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Your Insights with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Machine Learning</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced algorithms that transform raw data into actionable intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon={<Brain className="w-8 h-8 text-white" />} title="Predictive Analytics" text="ML algorithms analyze historical patterns to forecast student performance with high accuracy" />
          <FeatureCard icon={<Zap className="w-8 h-8 text-white" />} title="Real-Time Insights" text="Instant performance predictions and risk assessments updated continuously as new data arrives" />
          <FeatureCard icon={<Target className="w-8 h-8 text-white" />} title="Personalized Interventions" text="AI-driven recommendations tailored to each student's unique learning profile" />
          <FeatureCard icon={<Shield className="w-8 h-8 text-white" />} title="Early Risk Detection" text="Identify struggling students weeks in advance with multi-factor risk assessment models" />
          <FeatureCard icon={<LineChart className="w-8 h-8 text-white" />} title="Performance Tracking" text="Comprehensive dashboards visualize trends, patterns, and progress over time" />
          <FeatureCard icon={<Users className="w-8 h-8 text-white" />} title="Class Analytics" text="Aggregate insights help faculty understand class-wide patterns and optimize teaching strategies" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, powerful, and intelligent in three steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard step="01" icon={<FileTextIcon />} title="Input Student Data" desc="Securely upload attendance, grades, study hours, and behavioral metrics through our intuitive interface" />
            <StepCard step="02" icon={<Brain />} title="ML Processing" desc="Our neural networks analyze patterns, correlations, and trends across multiple dimensions to generate predictions" />
            <StepCard step="03" icon={<TrendingUp />} title="Get Predictions" desc="Receive detailed performance forecasts, risk scores, and personalized intervention recommendations instantly" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Our Platform</h2>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              PredictEdu leverages cutting-edge machine learning algorithms to revolutionize student performance tracking and prediction. 
              Our platform uses advanced neural networks trained on thousands of student records to identify patterns invisible to traditional analysis.
            </p>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              By combining multiple data points—attendance, study habits, assessment scores, and engagement metrics—our AI models 
              provide unprecedented accuracy in forecasting academic outcomes and identifying students who need support before they fall behind.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <Brain className="w-6 h-6" />
                <span className="font-semibold">Deep Learning Models</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <Shield className="w-6 h-6" />
                <span className="font-semibold">Data Privacy First</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <Zap className="w-6 h-6" />
                <span className="font-semibold">Real-Time Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl p-12 md:p-16 text-center border-2 border-gray-200 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of institutions using AI to improve student outcomes and maximize academic success
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/signup", { state: { userType: "student" } })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center space-x-2"
            >
              <User className="w-5 h-5" />
              <span>Student Sign Up</span>
            </button>
            <button
              onClick={() => navigate("/signup", { state: { userType: "faculty" } })}
              className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center space-x-2"
            >
              <Award className="w-5 h-5" />
              <span>Faculty Sign Up</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">PredictEdu</h3>
                <p className="text-xs text-gray-500">ML-Powered Analytics</p>
              </div>
            </div>
            <div className="text-gray-600 text-sm">© 2025 PredictEdu. All rights reserved.</div>
            <div className="flex space-x-6">
              <a className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
              <a className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------- Reusable Components -------- */

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function SectionTitle({ title, highlight }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all group">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function StepCard({ step, icon, title, desc }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all">
      <div className="text-6xl font-bold text-blue-200 mb-4">{step}</div>
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      {desc && <p className="text-gray-600 leading-relaxed">{desc}</p>}
    </div>
  );
}
