import { TreePine, Mail, Phone, MapPin } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <TreePine className="h-8 w-8 text-sea" />
              <span className="font-heading text-2xl font-semibold">
                Pine Tree Dalmatia
              </span>
            </div>
            <p className="text-primary-foreground/70 max-w-md mb-6">
              Experience the magic of the Croatian coastline from our beautiful 
              apartments. Your perfect vacation awaits among the pine trees and 
              crystal-clear waters of Dalmatia.
            </p>
            {/* Social Links */}
            <SocialLinks variant="dark" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#apartments" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t.nav.apartments}
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="/travel-tips" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t.nav.travelTips}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t.nav.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="h-5 w-5 text-sea" />
                <a href="mailto:info@pinetreedalmatia.cz" className="hover:text-primary-foreground transition-colors">
                  info@pinetreedalmatia.cz
                </a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="h-5 w-5 text-sea" />
                <a href="tel:+385123456789" className="hover:text-primary-foreground transition-colors">
                  +385 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="h-5 w-5 text-sea flex-shrink-0 mt-0.5" />
                <span>Dalmatia, Croatia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} Pine Tree Dalmatia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
