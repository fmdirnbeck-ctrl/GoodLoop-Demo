import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Star, Trophy, Users, Calendar, Phone, Clock, Gift, Award, User, Menu, X, Plus, Check, Zap, Sparkles, TrendingUp, Lock, Eye, EyeOff } from 'lucide-react';

const ProtectedGoodLoopPlatform = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated in this session
  useEffect(() => {
    const isAuth = sessionStorage.getItem('goodloop_authenticated');
    if (isAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      if (password === 'goodloop2024' || password === 'demo123') {
        setAuthenticated(true);
        sessionStorage.setItem('goodloop_authenticated', 'true');
      } else {
        setAttempts(prev => prev + 1);
        setPassword('');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Login Screen Component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-pink-500/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <Lock className="h-4 w-4 text-yellow-900" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Good Loop</h1>
          <p className="text-blue-200">Community Platform Demo</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Access Code</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin(e);
                  }
                }}
                placeholder="Enter demo access code"
                className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {attempts > 0 && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3">
              <p className="text-red-200 text-sm">
                Invalid access code. Please try again. ({attempts}/3 attempts)
              </p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={!password || isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Authenticating...
              </>
            ) : (
              'Access Demo'
            )}
          </button>
        </div>

        <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <p className="text-white/80 text-sm text-center">
            <strong>For Authorized Viewers Only</strong><br/>
            This demo contains confidential business information.
          </p>
        </div>

        {/* Hint for demo purposes */}
        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-xl">
          <p className="text-blue-200 text-xs text-center">
            Demo access codes: <code className="bg-blue-900/50 px-2 py-1 rounded">goodloop2024</code> or <code className="bg-blue-900/50 px-2 py-1 rounded">demo123</code>
          </p>
        </div>
      </div>
    </div>
  );

  // Main App Components
  const [currentView, setCurrentView] = useState('dashboard');
  const [userType, setUserType] = useState('helper');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data (sanitized for demo)
  const [communityHeroes] = useState([
    { name: 'Sarah C.', helps: 23, area: 'Downtown', badge: 'gold', avatar: '👩‍⚕️' },
    { name: 'Mike T.', helps: 18, area: 'Market Area', badge: 'silver', avatar: '👨‍🔧' },
    { name: 'Lisa R.', helps: 15, area: 'Central District', badge: 'bronze', avatar: '👩‍🏫' }
  ]);

  const [helpRequests, setHelpRequests] = useState([
    {
      id: 1,
      title: 'Snow clearing for elderly neighbor',
      description: 'Elderly resident needs help clearing walkway after snowstorm',
      location: 'Downtown Area',
      tier: 'Essential Care',
      urgency: 'high',
      timeAgo: '2 hours ago',
      requester: 'Community Member',
      type: 'snow-clearing',
      status: 'open'
    },
    {
      id: 2,
      title: 'Grocery pickup needed',
      description: 'Weekly grocery run for family with newborn',
      location: 'Market District',
      tier: 'Mutual Aid',
      urgency: 'medium',
      timeAgo: '4 hours ago',
      requester: 'Local Family',
      type: 'groceries',
      status: 'open'
    },
    {
      id: 3,
      title: 'Pet walking service',
      description: 'Daily walk for friendly dog while owner recovers',
      location: 'Central Area',
      tier: 'Enhanced Service',
      urgency: 'low',
      timeAgo: '1 day ago',
      requester: 'Pet Owner',
      type: 'pet-care',
      status: 'open'
    }
  ]);

  const [businessPartners] = useState([
    { name: 'Local Coffee Shop', discount: '15% off', category: 'food' },
    { name: 'Community Market', discount: 'Free coffee', category: 'local' },
    { name: 'Local Bookstore', discount: '10% off books', category: 'retail' },
    { name: 'Parking Solutions', discount: '2 hours free', category: 'parking' }
  ]);

  const [userStats] = useState({
    helpsCompleted: 12,
    rating: 4.9,
    neighborhoodRank: 3,
    joinDate: 'September 2024',
    badges: ['Reliable Helper', 'Winter Hero', 'Community Champion']
  });

  const handleOfferHelp = (requestId) => {
    setHelpRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted', helper: 'You' }
          : req
      )
    );
    setSelectedRequest(null);
  };

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900 text-white shadow-2xl relative overflow-hidden">
      {/* Logout button */}
      <button
        onClick={() => {
          setAuthenticated(false);
          sessionStorage.removeItem('goodloop_authenticated');
        }}
        className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 text-xs hover:bg-white/20 transition-all duration-200 flex items-center"
      >
        <Lock className="h-3 w-3 mr-1" />
        Logout
      </button>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-20">
          <div className="flex items-center group">
            <div className="relative">
              <Heart className="h-10 w-10 mr-4 text-pink-400 group-hover:text-pink-300 transition-all duration-300 transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <span className="font-bold text-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Good Loop</span>
              <div className="flex items-center mt-1">
                <span className="text-sm bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full text-white font-medium shadow-lg">
                  Demo Version
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {['dashboard', 'requests', 'heroes', 'rewards'].map((view) => (
              <button 
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  currentView === view 
                    ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg' 
                    : 'hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
            <div className="flex items-center space-x-3 ml-6 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold">Demo User</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span className="text-xs text-blue-200">4.9 rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/20 backdrop-blur-lg border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['dashboard', 'requests', 'heroes', 'rewards'].map((view) => (
              <button 
                key={view}
                onClick={() => { setCurrentView(view); setMobileMenuOpen(false); }} 
                className="block w-full text-left px-4 py-3 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                {view.charAt(0).toUpperCase() + view.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo watermark */}
        <div className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs z-50">
          DEMO VERSION
        </div>
        
        {/* Hero Welcome Banner */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-8 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-pulse"></div>
          <div className="absolute top-4 right-4">
            <Sparkles className="h-8 w-8 text-yellow-300 animate-spin" />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Welcome to Good Loop! 🌟
            </h1>
            <p className="text-xl text-blue-100 mb-6">You've helped 12 neighbors this month. Your community impact is growing!</p>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <span className="text-sm font-semibold">Community Champion</span>
              </div>
              <div className="bg-yellow-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-300/30">
                <span className="text-sm font-semibold">Level 3 Helper</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {userStats.helpsCompleted}
                </p>
                <p className="text-gray-600 font-medium">Helps Completed</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Check className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {userStats.rating}
                </p>
                <p className="text-gray-600 font-medium">Community Rating</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  #{userStats.neighborhoodRank}
                </p>
                <p className="text-gray-600 font-medium">Neighborhood Rank</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Demo content area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Interactive Demo Platform</h2>
          <p className="text-gray-600 mb-6">Navigate through the menu to explore different sections of the Good Loop platform.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Dashboard', 'Requests', 'Heroes', 'Rewards'].map((section, index) => (
              <button
                key={section}
                onClick={() => setCurrentView(section.toLowerCase())}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Return login screen if not authenticated, otherwise show the main app
  if (!authenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      <Dashboard />
    </div>
  );
};

export default ProtectedGoodLoopPlatform;
