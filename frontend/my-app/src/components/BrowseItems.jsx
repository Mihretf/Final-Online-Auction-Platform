import { useState } from "react";
import { ItemCard } from "./ItemCard";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Search, Filter } from "lucide-react";

export function BrowseItems({ onViewItem, onPlaceBid }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [items] = useState([
    {
      id: "1",
      title: "Vintage Rolex Submariner",
      description: "Classic 1960s Rolex Submariner in excellent condition with original box and papers.",
      startingPrice: 5000,
      currentBid: 8500,
      endDate: "2024-01-25T18:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      category: "Watches",
      seller: "watchcollector",
      bidCount: 12
    },
    {
      id: "2",
      title: "Abstract Art Painting",
      description: "Original abstract painting by emerging artist. Mixed media on canvas, 24x36 inches.",
      startingPrice: 800,
      currentBid: 1200,
      endDate: "2024-01-26T20:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
      category: "Art",
      seller: "artdealer",
      bidCount: 8
    },
    {
      id: "3",
      title: "1957 Fender Stratocaster",
      description: "Rare vintage Fender Stratocaster guitar in original sunburst finish. Some wear but excellent tone.",
      startingPrice: 15000,
      currentBid: 18500,
      endDate: "2024-01-27T16:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      category: "Musical Instruments",
      seller: "vintageguitars",
      bidCount: 24
    },
    {
      id: "4",
      title: "Antique Persian Rug",
      description: "Handwoven Persian rug from the 1920s. Beautiful intricate patterns with rich colors.",
      startingPrice: 2000,
      currentBid: 3200,
      endDate: "2024-01-28T14:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      category: "Home & Decor",
      seller: "antiquerugs",
      bidCount: 15
    },
    {
      id: "5",
      title: "Rare Baseball Card Collection",
      description: "Complete set of 1952 Topps baseball cards including Mickey Mantle rookie card.",
      startingPrice: 25000,
      currentBid: 32000,
      endDate: "2024-01-29T19:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Collectibles",
      seller: "sportscards",
      bidCount: 18
    },
    {
      id: "6",
      title: "Classic Porsche 911",
      description: "1973 Porsche 911 Carrera in excellent restored condition. Low mileage, original engine.",
      startingPrice: 85000,
      currentBid: 95000,
      endDate: "2024-01-30T17:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      category: "Automobiles",
      seller: "classicars",
      bidCount: 31
    }
  ]);

  const categories = ["all", "Watches", "Art", "Musical Instruments", "Home & Decor", "Collectibles", "Automobiles"];

  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesPrice = (!priceRange.min || item.currentBid >= parseInt(priceRange.min)) &&
                          (!priceRange.max || item.currentBid <= parseInt(priceRange.max));
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.currentBid - b.currentBid;
        case "price-high":
          return b.currentBid - a.currentBid;
        case "ending-soon":
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Browse Auction Items</h1>
        <p className="text-muted-foreground mb-6">
          Discover unique items and place your bids
        </p>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search items..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="md:col-span-1">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex gap-2 mt-4 max-w-sm">
          <Input
            placeholder="Min price"
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
          />
          <Input
            placeholder="Max price"
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredItems.length} of {items.length} items
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onViewDetails={onViewItem}
            onPlaceBid={onPlaceBid}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
