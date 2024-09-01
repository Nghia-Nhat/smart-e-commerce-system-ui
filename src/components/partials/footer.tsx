import Logo from "../common/logo";
import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  QrCodeIcon,
} from "../icons/common";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="bg-secondary p-10 pb-32 md:pb-5 md:mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-bold text-lg mb-4">
            <Logo />
          </div>
          <p className="mb-4">Subscribe</p>
          <p className="mb-6">Get 10% off your first order</p>
          <div className="flex items-center space-x-4">
            <FacebookIcon className="" />
            <QrCodeIcon className="" />
            <InstagramIcon className="" />
            <LinkedinIcon className="" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <p className="mb-2">111 Main Street, US.</p>
          <p className="mb-2">help@triplee.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Account</h3>
          <ul>
            <li className="mb-2">My Account</li>
            <li className="mb-2">Login / Register</li>
            <li className="mb-2">Cart</li>
            <li>Shop</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Link</h3>
          <ul>
            <li className="mb-2">Privacy Policy</li>
            <li className="mb-2">Terms Of Use</li>
            <li className="mb-2">FAQ</li>
            <li>
              <div className="flex items-center space-x-2">
                <input
                  className="dark:bg-gray-800  p-2 rounded-l-md focus:outline-none"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button
                  size="icon"
                  className="dark:bg-gray-700 p-2 border rounded-r-md"
                >
                  <ArrowRightIcon className="" />
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10">
        <p>© Copyright Triplee E-commerce 2024. All right reserved</p>
      </div>
    </div>
  );
}
