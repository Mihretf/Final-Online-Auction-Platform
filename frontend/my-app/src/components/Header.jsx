import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-medium text-primary">AuctionHouse</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Live Auctions
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Categories
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Sell
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                My Bids
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search auctions..." 
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline">Sign In</Button>
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </header>
  );
}