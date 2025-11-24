'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Code, Zap, TrendingUp, Clock, X, AlertCircle, Calendar } from 'lucide-react';
import { PopupButton } from 'react-calendly';

export default function FreeWebsiteOffer() {
  const [spotsLeft, setSpotsLeft] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    email: '',
    phoneNumber: '',
    currentSituation: '',
    goal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [showBookingButton, setShowBookingButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    setIsMounted(true);

    // Fetch approved applications count
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/applications/count');
        const data = await response.json();
        console.log("🚀 ~ fetchCount ~ data:", data)

        if (data.success) {
          setSpotsLeft(data.spotsLeft);
        }
      } catch (error) {
        console.error('Error fetching approved count:', error);
      }
    };

    fetchCount();

    // Countdown timer
    const targetDate = new Date('November 30, 2025 23:59:59').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

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

      setShowBookingButton(true);
      setFormData({
        businessName: '',
        industry: '',
        email: '',
        phoneNumber: '',
        currentSituation: '',
        goal: ''
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/30">
      {/* Hero Section */}
      <motion.section
        style={{ y: heroY }}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Animated background elements - subtle and light */}
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
            className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Spots remaining badge - Apple glass style */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-red-200/50 rounded-full px-6 py-3 mb-8 shadow-lg shadow-red-100/50"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-600 font-semibold text-sm">
              Only {spotsLeft} Spots Remaining
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Completely Free</span>
            <br />
            <span className="text-4xl md:text-6xl text-gray-800">Static Website</span>
          </motion.h1>

          {/* Countdown Clock - Apple glass style */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col items-center gap-4 md:gap-5 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl px-10 md:px-12 py-6 md:py-8 shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 md:w-7 md:h-7 text-blue-600 animate-pulse" />
                <span className="text-gray-700 font-semibold text-base md:text-lg">Offer ends in:</span>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="text-center"
                  >
                    <motion.div
                      key={item.value}
                      // initial={{ scale: 1.2, opacity: 0 }}
                      // animate={{ scale: 1, opacity: 1 }}
                      // transition={{ 
                      //   duration: 0.8,
                      //   ease: [0.25, 0.1, 0.25, 1]
                      // }}
                      className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-3xl md:text-4xl lg:text-5xl px-5 md:px-6 py-4 md:py-5 rounded-2xl w-[4.5rem] md:w-[5.5rem] lg:w-[6rem] shadow-lg shadow-blue-200/50 flex items-center justify-center"
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.div>
                    <div className="text-gray-600 text-sm md:text-base mt-3 font-semibold">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto"
          >
            I'm building my portfolio and giving away <span className="text-blue-600 font-semibold">10 static websites</span> to qualified businesses.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Perfect for businesses that need a simple, professional online presence. Get found online, build credibility, and turn visitors into customers. No strings attached.
          </motion.p>

            <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/50 transition-all duration-300"
          >
            Claim Your Free Static Website
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-500 text-sm mt-4"
          >
            ⏱️ Average response time: 24 hours
          </motion.p>
        </div>
      </motion.section>

      {/* What's Included Section */}
      <section className="py-20 px-6 relative bg-gradient-to-b from-transparent to-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What You Get (Free)
            </h2>
            <p className="text-gray-600 text-lg">
              A static website - everything you need to establish your online presence
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 hover:border-blue-300/50 transition-all duration-300 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-gray-300/40"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-200/30"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Also Included</h3>
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
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Need to Provide
            </h2>
            <p className="text-gray-600 text-lg">
              To keep this free, you'll need to have these ready
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 space-y-4 shadow-xl shadow-gray-200/30"
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
                className="flex items-start gap-3 text-gray-700"
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
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
            <p className="text-gray-600 text-base">
              💡 Don't have content ready?
              <a href="https://kevportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors ml-1 font-semibold">
                I offer professional copywriting and branding services
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upgrade Options */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Want More? Easy Upgrades Available
            </h2>
            <p className="text-gray-600 text-lg">
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:border-blue-300/50 transition-all duration-300 shadow-lg shadow-gray-200/30 hover:shadow-xl hover:shadow-gray-300/40"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{upgrade.title}</h3>
                <p className="text-gray-600 text-sm">{upgrade.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              From Application to Launch
            </h2>
            <p className="text-gray-600 text-lg">
              Here's what happens after you apply
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { day: "Day 1", title: "Apply & Get Approved", desc: "Fill out the form below. I'll review and respond within 24 hours." },
              { day: "Day 2-3", title: "Discovery Call", desc: "15-minute call to discuss your vision, goals, and gather requirements." },
              { day: "Day 4-7", title: "Design & Development", desc: "I build your static website while keeping you updated on progress." },
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-lg shadow-gray-200/30">
                  <div className="text-blue-600 font-semibold mb-2">{step.day}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule a Call Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Want to Discuss Your Project First?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Schedule a free 30-minute discovery call to discuss your needs and see if we're a good fit
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-xl shadow-gray-200/30"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-6">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Discovery Call</h3>
                  <p className="text-gray-600 text-sm">
                    30 minutes • No commitment required • Learn about your project goals
                  </p>
                </div>
              </div>
              {isMounted && (
                <PopupButton
                  url="https://calendly.com/kev-cadogan300/30min"
                  rootElement={document.body}
                  text="Schedule Call"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300 whitespace-nowrap"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50/50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-12 shadow-2xl shadow-gray-200/40"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get Your Free Static Website?
          </h2>
          {/* <p className="text-xl text-gray-600 mb-8">
            Join the {10 - spotsLeft} businesses already building their online presence
          </p> */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/50 transition-all duration-300"
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
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setIsFormOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-2xl border border-gray-200/50 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-gray-300/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-gray-900">Apply for Your Free Static Website</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Industry *</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="E-commerce, Consulting, Restaurant, etc."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Current Website Situation *</label>
                <textarea
                  name="currentSituation"
                  value={formData.currentSituation}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  placeholder="Do you have a website? Is it outdated? Using social media only?"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Primary Goal for Your Website *</label>
                <textarea
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  placeholder="Generate leads, showcase portfolio, book appointments, etc."
                />
              </div>

              <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4">
                <p className="text-gray-700 text-sm mb-2">
                  ✅ By submitting, you confirm you can provide all content (copy, images, branding) for your website.
                </p>
                <p className="text-gray-700 text-sm font-semibold">
                  📌 Note: This offer is for a <span className="text-blue-600">Static Website</span> - perfect for showcasing your business with fixed content pages.
                </p>
              </div>

              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl backdrop-blur-sm ${
                    notification.type === 'success'
                      ? 'bg-green-50/80 border border-green-200/50'
                      : 'bg-red-50/80 border border-red-200/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {notification.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`text-sm ${
                      notification.type === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {notification.message}
                    </p>
                  </div>

                  {notification.type === 'success' && showBookingButton && isMounted && (
                    <div className="mt-4">
                      <PopupButton
                        url="https://calendly.com/kev-cadogan300/30min"
                        rootElement={document.body}
                        text="Schedule Discovery Call Now"
                        className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-blue-200 shadow-sm"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-12 text-center shadow-xl shadow-gray-200/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need More Than Just a Website?
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Looking for custom solutions, AI integration, or technical consultation? Let's discuss how I can help scale your business.
            </p>
            <motion.a
              href="https://kevportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-300"
            >
              View My Portfolio & Services
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            Built by <a href="https://kevportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Kevon</a> - Full-Stack Developer & AI Engineer
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Based in Guyana 🇬🇾 • Serving businesses globally
          </p>
        </div>
      </footer>
    </div>
  );
}
