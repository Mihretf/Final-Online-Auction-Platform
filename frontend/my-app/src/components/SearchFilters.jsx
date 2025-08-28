import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

export function SearchFilters() {
  const categories = [
    "Art & Collectibles",
    "Jewelry & Watches", 
    "Antiques",
    "Classic Cars",
    "Coins & Currency",
    "Books & Manuscripts",
    "Wine & Spirits"
  ];

  return (
    <div className="bg-muted/30 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              All Categories
            </Button>
            {categories.slice(0, 5).map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
              >
                {category}
              </Badge>
            ))}
            <Button variant="ghost" size="sm">
              +2 more
            </Button>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="ending-soon">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="newly-listed">Newly Listed</SelectItem>
                <SelectItem value="highest-bid">Highest Bid</SelectItem>
                <SelectItem value="lowest-bid">Lowest Bid</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="live">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}