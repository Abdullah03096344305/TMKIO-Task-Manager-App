"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Calendar,
  Users,
  CheckCircle2,
  BarChart3,
  Trello,
  Mail,
  Cloud,
  Star,
  ArrowRight,
  Check,
  Layers,
  Github,
  Twitter,
  ChevronRight,
  User,
  Palette,
  Bug,
  CalendarDays,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Fintask
                </span>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Download
                </a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Integrations
                </a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Blog
                </a>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Hi, Mostafa</span>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                Try Now - Free
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Pricing</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Download</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Integrations</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Blog</a>
              <button className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Try Now - Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm mb-6">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Excellent 4.9 out of 5</span>
              <span className="text-amber-600">Sitejabber</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              A task manager you can
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> trust for teams</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Plan projects, stay on track, and deliver on time without overworking your team.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                Try Now - Free
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-50 transition">
                Watch Demo
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">✓ No credit card required ✓ Free 14-day trial</p>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">Calendar view</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ChevronRight className="w-4 h-4" />
                  <span>November 15</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-xl">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">08:00 AM</span>
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Development</span>
                    </div>
                    <p className="text-gray-700 mt-1">Fintask Web Development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                  <div className="w-2 h-2 mt-2 rounded-full bg-purple-600"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">12:00 PM</span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Web Visual Design</span>
                    </div>
                    <p className="text-gray-700 mt-1">Fintask UI/UX Design</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-600"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">03:00 PM</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Bug Fix</span>
                    </div>
                    <p className="text-gray-700 mt-1">Critical issue resolved</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Mon 12</span>
                    <span className="font-medium text-indigo-600">Tue 23</span>
                    <span>Wed 31</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-60 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Logos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-y border-gray-100">
        <p className="text-center text-gray-500 text-sm mb-6">Trusted by teams using</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="flex items-center gap-2 text-gray-600"><Cloud className="w-5 h-5" /> Slack</div>
          <div className="flex items-center gap-2 text-gray-600"><Trello className="w-5 h-5" /> Trello</div>
          <div className="flex items-center gap-2 text-gray-600"><Mail className="w-5 h-5" /> Outlook</div>
          <div className="flex items-center gap-2 text-gray-600"><Cloud className="w-5 h-5" /> Dropbox</div>

        </div>
        <p className="text-center text-gray-400 text-sm mt-6">Both familiar and new.</p>
      </section>

      {/* Three Column Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Task Progress</h3>
            <p className="text-gray-600">Send scheduling links guests love — track every milestone with visual progress bars.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <CalendarDays className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Plan Calendar</h3>
            <p className="text-gray-600">Send scheduling links guests love — intuitive calendar for team planning.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborations</h3>
            <p className="text-gray-600">Send scheduling links guests love — real-time collaboration with comments and file sharing.</p>
          </div>
        </div>
      </section>

      {/* Complex Projects Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Take complex projects with ease</h2>
              <p className="mt-4 text-lg text-gray-600">
                Use status features updates to see how your project is progressing and what's left to do. Keep everyone accountable.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Real-time status tracking</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Team accountability dashboard</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Automated progress reports</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Project Status</h4>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">75% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full w-3/4"></div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm"><span>Development</span><span>8/10 tasks</span></div>
                <div className="flex justify-between text-sm"><span>Design</span><span>5/6 tasks</span></div>
                <div className="flex justify-between text-sm"><span>Testing</span><span>3/8 tasks</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Create calm with integrations</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Connect Fintask with all the favorite tools you've already use.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Slack", icon: Layers, color: "text-red-500" },
            { name: "Trello", icon: Trello, color: "text-blue-500" },
            { name: "Outlook", icon: Mail, color: "text-indigo-500" },
            { name: "Dropbox", icon: Cloud, color: "text-sky-500" },
            { name: "Notion", icon: Layers, color: "text-gray-700" },
            { name: "Figma", icon: Palette, color: "text-purple-500" },
            { name: "Jira", icon: Bug, color: "text-blue-600" },
          ].map((integration, idx) => (
            <div key={idx} className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition border border-gray-100">
              <integration.icon className={`w-8 h-8 ${integration.color}`} />
              <span className="mt-3 font-medium">{integration.name}</span>
              <button className="mt-2 text-xs text-indigo-600 hover:underline">Connect</button>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="text-indigo-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
            Explore integrations <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Choose a plan that fits your team</h2>
            <p className="mt-4 text-gray-600">15 days free trial on all plans. No commitment.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold">Individuals</h3>
              <p className="text-4xl font-bold mt-4">$9.99<span className="text-base font-normal text-gray-500">/month</span></p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Unlimited projects, clients</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Personal desktop activity tracking</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Up to 5 members on your project</li>
              </ul>
              <button className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition">
                Start Free Trial
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-indigo-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold">Startup</h3>
              <p className="text-gray-500 mt-2">Contact us for custom pricing</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Everything in Individual +</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Manage multiple workspaces</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Expert training and assistance</li>
              </ul>
              <button className="mt-8 w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 transition">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Loved by product people</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: "Fintask The best!", name: "Jillian Benbow", role: "Senior Community Manager", rating: 5 },
            { quote: "Hey Fintask you all did an amazing job. It's seriously saving me so much time.", name: "Montes Kei", role: "Developer at CBN", rating: 5 },
            { quote: "Fintask: One of *the* nicest, most wonderful, amazing, perfect Mac apps I use fifty+ times a day. Worth every penny.", name: "Jillian", role: "Product Designer", rating: 5 },
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-gray-700 italic">{testimonial.quote}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold">Still have questions?</h2>
          <p className="mt-4 text-indigo-100">
            If you can't find answer to your question in our FAQ, you can always contact us. We'll answer to you shortly!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
              Try FREE for 14 days
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition">
              Contact Support
            </button>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="flex bg-white/10 rounded-full p-1">
              <input
                type="email"
                placeholder="email address"
                className="bg-transparent px-4 py-2 text-white placeholder:text-indigo-200 focus:outline-none"
              />
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-medium text-sm">
                Get updates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Productive Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Get more productive team</h3>
          <p className="mt-2 text-gray-600">Start now - Free • No credit card required • No switching banks</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <input type="email" placeholder="Work email" className="px-4 py-3 rounded-xl border border-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition">
              Start Now - Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Fintask</h3>
              <p className="text-sm">Stay organized and productive with Fintask.io</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integration</a></li>
                <li><a href="#" className="hover:text-white">Download</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features — Soon!</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
                <li><a href="#" className="hover:text-white">Privacy policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Keep in touch</h4>
              
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>Copyright © Webuir 2022. All Rights Reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="hover:text-white">Privacy policy</a>
              <a href="#" className="hover:text-white">Security</a>
              <a href="#" className="hover:text-white">Legal documents</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}