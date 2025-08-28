import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Gavel, User, LogOut, Bell, Plus, Settings } from "lucide-react";
import { useState } from "react";

export function AuctionHeader({ user, onNavigate, onLogout }) {
  const [notifications] = useState([
    { id: 1, message: "You were outbid on Vintage Watch", time: "2 min ago", read: false },
    { id: 2, message: "Your item 'Antique Vase' was approved", time: "1 hour ago", read: false },
    { id: 3, message: "Auction ending soon: Classic Car", time: "3 hours ago", read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-xl text-primary hover:text-primary/80 transition-colors"
          >
            <Gavel className="h-6 w-6" />
            <span>AuctionHub</span>
          </button>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Browse Items
          </button>
          {user.role === 'seller' && (
            <button
              onClick={() => onNavigate('seller')}
              className="text-foreground hover:text-primary transition-colors"
            >
              My Dashboard
            </button>
          )}
          {user.role === 'admin' && (
            <button
              onClick={() => onNavigate('admin')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Admin Panel
            </button>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user.role === 'seller' && (
            <Button onClick={() => onNavigate('upload')} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Upload Item
            </Button>
          )}
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-2 py-1.5 border-b">
                <p className="font-medium">Notifications</p>
              </div>
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                  <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium">{user.username}</p>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
              <DropdownMenuItem onClick={() => onNavigate('profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
