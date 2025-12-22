import { Instagram, Facebook, Youtube } from "lucide-react";

interface SocialLinksProps {
  variant?: "light" | "dark";
  size?: "sm" | "md";
}

const SocialLinks = ({ variant = "light", size = "md" }: SocialLinksProps) => {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/pinetreedalmatia",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/pinetreedalmatia",
      label: "Facebook",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@pinetreedalmatia",
      label: "YouTube",
    },
  ];

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const buttonSize = size === "sm" ? "p-2" : "p-2.5";
  
  const baseClasses = variant === "light" 
    ? "text-muted-foreground hover:text-primary hover:bg-primary/10"
    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10";

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={`${buttonSize} rounded-full transition-colors ${baseClasses}`}
        >
          <social.icon className={iconSize} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
