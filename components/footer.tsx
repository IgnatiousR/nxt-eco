import { APP_NAME } from "@/lib/constants";
import { Copyright } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (<footer className="border-t">
    <div className="p-5 flex-center">
      <Copyright/> {currentYear} {APP_NAME}. All Rights Reserved
    </div>
  </footer>);
}
 
export default Footer;