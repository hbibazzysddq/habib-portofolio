import Link from "next/link";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";

interface SocialProps {
  containerStyles?: string; // Opsional, untuk kelas Tailwind CSS
  iconStyles?: string; // Opsional, untuk kelas Tailwind CSS
}

const socials = [
  { icon: <FaGithub />, path: "https://github.com/hbibazzysddq" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/habibazizysiddiq_/" },
  { icon: <FaTiktok/>, path: "https://www.tiktok.com/@xmodra_?is_from_webapp=1&sender_device=pc"}
];

const Social: React.FC<SocialProps> = ({ containerStyles = '', iconStyles = '' }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link key={index} href={item.path} className={iconStyles}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;
