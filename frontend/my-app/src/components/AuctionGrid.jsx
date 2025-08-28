import { AuctionCard } from "./AuctionCard";
import { Button } from "./ui/button";

export function AuctionGrid() {
  const auctions = [
    {
      id: "5",
      title: "Vintage Camera Collection - Leica M3 with Original Lens",
      image: "https://images.unsplash.com/photo-1721736737616-5b5f7259c2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMGl0ZW1zfGVufDF8fHx8MTc1NTY3Nzc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 1850,
      estimatedValue: "$2,200 - $3,000",
      timeLeft: "5h 32m",
      bidCount: 18,
      status: "live"
    },
    {
      id: "6",
      title: "Diamond Necklace - Art Deco Style 1920s Estate Jewelry",
      image: "https://images.unsplash.com/photo-1636639821444-479368c96514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGpld2Vscnl8ZW58MXx8fHwxNzU1NjYzMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 5200,
      estimatedValue: "$6,500 - $8,000",
      timeLeft: "12h 45m", 
      bidCount: 31,
      status: "live"
    },
    {
      id: "7",
      title: "Rare Coin Collection - Morgan Silver Dollars Complete Set",
      image: "https://images.unsplash.com/photo-1652727743972-5fd1483a23ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2FyJTIwdmludGFnZXxlbnwxfHx8fDE3NTU2Nzc3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 950,
      estimatedValue: "$1,200 - $1,800",
      timeLeft: "1d 3h",
      bidCount: 9,
      status: "live"
    },
    {
      id: "8",
      title: "Signed First Edition Books - Complete Hemingway Collection",
      image: "https://images.unsplash.com/photo-1696862048447-3ab8435ce5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMGNvbGxlY3RpYmxlfGVufDF8fHx8MTc1NTY3Nzc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 3400,
      estimatedValue: "$4,000 - $6,000",
      timeLeft: "2d 18h",
      bidCount: 14,
      status: "live"
    },
    {
      id: "9",
      title: "Mid-Century Modern Furniture - Eames Lounge Chair Original",
      image: "https://images.unsplash.com/photo-1721736737616-5b5f7259c2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMGl0ZW1zfGVufDF8fHx8MTc1NTY3Nzc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 0,
      estimatedValue: "$5,000 - $7,500",
      timeLeft: "Starts in 4h",
      bidCount: 0,
      status: "upcoming"
    },
    {
      id: "10",
      title: "Sports Memorabilia - Signed Baseball Hall of Fame Collection",
      image: "https://images.unsplash.com/photo-1636639821444-479368c96514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGpld2Vscnl8ZW58MXx8fHwxNzU1NjYzMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 780,
      estimatedValue: "$1,000 - $1,500",
      timeLeft: "4h 12m",
      bidCount: 7,
      status: "ending-soon"
    }
  ];

  return (
    <section className="py-12 px-6 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-medium">Current Auctions</h2>
          <Button variant="outline">View All Auctions</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" className="px-8">Load More Auctions</Button>
        </div>
      </div>
    </section>
  );
}
