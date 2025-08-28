import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, DollarSign, Eye } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ItemCard({ item, onViewDetails, onPlaceBid }) {
  const formatPrice = (price) => `$${price.toLocaleString()}`;
  
  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffTime <= 0) return "Auction ended";
    if (diffDays > 0) return `${diffDays}d ${diffHours}h`;
    return `${diffHours}h ${Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))}m`;
  };

  const isEnded = new Date(item.endDate) <= new Date();
  const timeRemaining = getTimeRemaining(item.endDate);
  const isEndingSoon = !isEnded && new Date(item.endDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
      <div className="relative" onClick={() => onViewDetails(item.id)}>
        <div className="aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {item.category}
          </Badge>
        </div>
        {isEndingSoon && !isEnded && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-sm">
              Ending Soon
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4" onClick={() => onViewDetails(item.id)}>
        <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Starting Price</p>
              <p className="text-sm">{formatPrice(item.startingPrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current Bid</p>
              <p className="font-medium text-primary">{formatPrice(item.currentBid)}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{timeRemaining}</span>
            </div>
            <span>{item.bidCount} bids</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(item.id);
          }}
          className="flex-1"
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onPlaceBid(item.id);
          }}
          disabled={isEnded}
          className="flex-1"
        >
          <DollarSign className="mr-2 h-4 w-4" />
          {isEnded ? 'Ended' : 'Bid'}
        </Button>
      </CardFooter>
    </Card>
  );
}
