import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Clock, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AuctionCard({ 
  title, 
  image, 
  currentBid, 
  estimatedValue, 
  timeLeft, 
  bidCount, 
  status 
}) {
  const getStatusBadge = () => {
    switch (status) {
      case "live":
        return <Badge className="bg-green-500 text-white">Live</Badge>;
      case "ending-soon":
        return <Badge className="bg-red-500 text-white">Ending Soon</Badge>;
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge()}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-2 line-clamp-2">{title}</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current bid</span>
            <span className="font-medium">${currentBid.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Estimate</span>
            <span className="text-sm">{estimatedValue}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {timeLeft}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              {bidCount} bids
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          {status === "upcoming" ? "Watch" : "Place Bid"}
        </Button>
      </CardFooter>
    </Card>
  );
}
