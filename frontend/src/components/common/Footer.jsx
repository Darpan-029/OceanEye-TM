import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart, Waves } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ocean-darkest border-t border-ocean-cyan/10">
      {/* Subtle wave pattern at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ocean-cyan/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Waves className="w-6 h-6 text-ocean-cyan" />
              <span className="font-heading text-xl font-bold text-white">
                Ocean<span className="text-ocean-cyan">Eye</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered marine intelligence platform for monitoring, analyzing, and protecting our oceans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/mission-control" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Mission Control
                </a>
              </li>
              <li>
                <a href="/vision" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Vision AI
                </a>
              </li>
              <li>
                <a href="/coral" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Coral Scan
                </a>
              </li>
              <li>
                <a href="/census" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Marine Census
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/atlas" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Ocean Atlas
                </a>
              </li>
              <li>
                <a href="/fleet" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Fleet Monitor
                </a>
              </li>
              <li>
                <a href="/analytics" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Analytics
                </a>
              </li>
              <li>
                <a href="/risk" className="text-slate-400 hover:text-ocean-cyan text-sm transition-colors">
                  Risk Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-3 mb-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-ocean-navy border border-ocean-cyan/20 flex items-center justify-center text-slate-400 hover:text-ocean-cyan hover:border-ocean-cyan/50 transition-all"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-ocean-navy border border-ocean-cyan/20 flex items-center justify-center text-slate-400 hover:text-ocean-cyan hover:border-ocean-cyan/50 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-ocean-navy border border-ocean-cyan/20 flex items-center justify-center text-slate-400 hover:text-ocean-cyan hover:border-ocean-cyan/50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-ocean-navy border border-ocean-cyan/20 flex items-center justify-center text-slate-400 hover:text-ocean-cyan hover:border-ocean-cyan/50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
            <p className="text-slate-500 text-xs">
              Contact us for partnerships and research collaborations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ocean-cyan/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-2">
            © {currentYear} OceanEye. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            Built with <Heart className="w-4 h-4 text-ocean-coral fill-ocean-coral" /> for ocean conservation
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-ocean-cyan text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-ocean-cyan text-xs transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
