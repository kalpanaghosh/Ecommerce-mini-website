import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Share2, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-indigo-100 pt-16 pb-8 border-t border-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">LuxeStore</span>
            </Link>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-xs">
              Your ultimate destination for premium gadgets and accessories. We deliver quality and excellence directly to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-indigo-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/?category=All" className="text-indigo-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-indigo-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  Cart
                </Link>
              </li>
              <li>
                <a href="mailto:support@luxestore.com" className="text-indigo-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Top Categories</h3>
            <ul className="space-y-3">
              {['Smartphones', 'Laptops', 'Headphones', 'Smartwatches', 'Gaming'].map((category) => (
                <li key={category}>
                  <Link to={`/?category=${category}`} className="text-indigo-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-indigo-200">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>123 Innovation Drive,<br />Tech City, TC 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>support@luxestore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-indigo-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-indigo-300">
          <p>© {new Date().getFullYear()} LuxeStore. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by LuxeStore Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
