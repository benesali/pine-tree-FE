import { TreePine, Menu, X, HomeIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavLink, useParams } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { lang } = useParams<{ lang: string }>();


const navLinks = [
  { to: `/${lang}/apartments`, label: t.nav.apartments },
  { to: `/${lang}/reviews`, label: t.nav.reviews },
  { to: `/${lang}/travel-tips`, label: t.nav.travelTips },
  { to: `/${lang}/faq`, label: t.nav.faq },
  { to: `/${lang}/contact`, label: t.nav.contact },
];




   return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <TreePine className="h-8 w-8 text-pine transition-transform group-hover:scale-110" />
            <span className="font-heading text-xl font-semibold text-foreground">
              Pine Tree Dalmatia
            </span>
          </a>
          <NavLink to="/" aria-label="Home">
        <HomeIcon className="w-5 h-5" />
          </NavLink>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="h-6 w-px bg-border" />
            <SocialLinks size="sm" />
            <LanguageSwitcher />
            <Button variant="default" size="sm">
              {t.nav.bookNow}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <SocialLinks size="sm" />
              </div>
              <Button variant="default" className="mt-2">
                {t.nav.bookNow}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
