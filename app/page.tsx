'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Code, Zap, TrendingUp, Clock, X, AlertCircle } from 'lucide-react';

export default function FreeWebsiteOffer() {
  const [spotsLeft, setSpotsLeft] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    email: '',
    currentSituation: '',
    goal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setNotification({
        type: 'success',
        message: 'Application received! I\'ll review and get back to you within 24 hours.'
      });


    } catch (error) {
      console.error('Error submitting application:', error);
      setNotification({
        type: 'error',
        message: 'Failed to submit application. Please try again or contact support.'
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Spots remaining badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 font-semibold text-sm">
              Only {spotsLeft} Spots Remaining
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Get a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Professional Website</span>
            <br />
            <span className="text-4xl md:text-6xl">Completely Free</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            I'm building my portfolio and giving away <span className="text-purple-400 font-semibold">10 custom-designed websites</span> to qualified businesses.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Get found online, build credibility, and turn visitors into customers. No strings attached.
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            Claim Your Free Website
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-500 text-sm mt-4"
          >
            ⏱️ Average response time: 24 hours
          </motion.p>
        </div>
      </motion.section>

      {/* What's Included Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What You Get (Free)
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to establish your online presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Make Great First Impressions",
                description: "Professional design that builds trust and credibility with potential customers"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Get Found Online",
                description: "SEO-optimized structure so customers can discover your business on Google"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Turn Visitors Into Customers",
                description: "Clear calls-to-action and contact forms designed to generate leads"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Also Included</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Works perfectly on all devices (phone, tablet, desktop)",
                "Contact form so customers can reach you easily",
                "3 months free hosting included",
                "Optimized to rank on Google search",
                "Lightning-fast loading (under 2 seconds)",
                "Professional, polished appearance"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What You Need to Provide
            </h2>
            <p className="text-gray-400 text-lg">
              To keep this free, you'll need to have these ready
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-4"
          >
            {[
              "All website copy and content (text for each page)",
              "Logo and brand images (in high quality)",
              "Any photos or graphics you want included",
              "Your brand colors and style preferences"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 text-gray-300"
              >
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-400 text-sm font-bold">{index + 1}</span>
                </div>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-base">
              💡 Don't have content ready?
              <a href="https://kevportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors ml-1 font-semibold">
                I offer professional copywriting and branding services
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upgrade Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Want More? Easy Upgrades Available
            </h2>
            <p className="text-gray-400 text-lg">
              Once your site is live, you can add these features anytime
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "AI Chat Support", desc: "24/7 customer service agent" },
              { title: "Custom Domain", desc: "yourcompany.com setup" },
              { title: "Blog/CMS", desc: "Manage your own content" },
              { title: "E-commerce", desc: "Accept payments online" }
            ].map((upgrade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{upgrade.title}</h3>
                <p className="text-gray-400 text-sm">{upgrade.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              From Application to Launch
            </h2>
            <p className="text-gray-400 text-lg">
              Here's what happens after you apply
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { day: "Day 1", title: "Apply & Get Approved", desc: "Fill out the form below. I'll review and respond within 24 hours." },
              { day: "Day 2-3", title: "Discovery Call", desc: "15-minute call to discuss your vision, goals, and gather requirements." },
              { day: "Day 4-7", title: "Design & Development", desc: "I build your site while keeping you updated on progress." },
              { day: "Day 8", title: "Review & Launch", desc: "You review, request changes, then we launch your site live." }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="text-purple-400 font-semibold mb-2">{step.day}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Your Free Website?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the {10 - spotsLeft} businesses already building their online presence
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            Apply Now (Free)
          </motion.button>
          <p className="text-gray-500 text-sm mt-4">
            ⚡ Limited to 10 businesses • No credit card required
          </p>
        </motion.div>
      </section>

      {/* Application Form Modal */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setIsFormOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-purple-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">Apply for Your Free Website</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Industry *</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="E-commerce, Consulting, Restaurant, etc."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Current Website Situation *</label>
                <textarea
                  name="currentSituation"
                  value={formData.currentSituation}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Do you have a website? Is it outdated? Using social media only?"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Primary Goal for Your Website *</label>
                <textarea
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Generate leads, showcase portfolio, book appointments, etc."
                />
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <p className="text-gray-300 text-sm">
                  ✅ By submitting, you confirm you can provide all content (copy, images, branding) for your website.
                </p>
              </div>

              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    notification.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/50'
                      : 'bg-red-500/20 border border-red-500/50'
                  }`}
                >
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm ${
                    notification.type === 'success' ? 'text-green-200' : 'text-red-200'
                  }`}>
                    {notification.message}
                  </p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>

              <p className="text-gray-500 text-sm text-center">
                I'll review your application and respond within 24 hours
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Need More? Consultation CTA */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-500/40 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need More Than Just a Website?
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Looking for custom solutions, AI integration, or technical consultation? Let's discuss how I can help scale your business.
            </p>
            <motion.a
              href="https://kevportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-purple-900 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
            >
              View My Portfolio & Services
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            Built by <a href="https://kevportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">Kevon</a> - Full-Stack Developer & AI Engineer
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Based in Guyana 🇬🇾 • Serving businesses globally
          </p>
        </div>
      </footer>
    </div>
  );
}
