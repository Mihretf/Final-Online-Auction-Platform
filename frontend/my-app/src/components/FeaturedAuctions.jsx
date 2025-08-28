import { AuctionCard } from "./AuctionCard";

export function FeaturedAuctions() {
  const featuredAuctions = [
    {
      id: "1",
      title: "Rare Victorian Antique Collection - Sterling Silver Tea Set",
      image: "https://images.unsplash.com/photo-1721736737616-5b5f7259c2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYW50aXF1ZSUyMGl0ZW1zfGVufDF8fHx8MTc1NTY3Nzc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 2450,
      estimatedValue: "$3,000 - $4,500",
      timeLeft: "2h 15m",
      bidCount: 23,
      status: "ending-soon"
    },
    {
      id: "2", 
      title: "Luxury Swiss Watch - Vintage Rolex Submariner 1960s",
      image: "https://images.unsplash.com/photo-1636639821444-479368c96514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGpld2Vscnl8ZW58MXx8fHwxNzU1NjYzMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 15600,
      estimatedValue: "$18,000 - $25,000",
      timeLeft: "1d 8h",
      bidCount: 47,
      status: "live"
    },
    {
      id: "3",
      title: "Classic 1965 Ford Mustang Convertible - Original Condition",
      image: "https://images.unsplash.com/photo-1652727743972-5fd1483a23ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2FyJTIwdmludGFnZXxlbnwxfHx8fDE3NTU2Nzc3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 28500,
      estimatedValue: "$35,000 - $45,000",
      timeLeft: "3d 12h",
      bidCount: 12,
      status: "live"
    },
    {
      id: "4",
      title: "Original Oil Painting - Abstract Expressionist Masterpiece",
      image: "https://images.unsplash.com/photo-1696862048447-3ab8435ce5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMGNvbGxlY3RpYmxlfGVufDF8fHx8MTc1NTY3Nzc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      currentBid: 0,
      estimatedValue: "$8,000 - $12,000",
      timeLeft: "Starts in 2h",
      bidCount: 0,
      status: "upcoming"
    }
  ];

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-medium mb-2">Featured Auctions</h2>
            <p className="text-muted-foreground">Don't miss these premium items ending soon</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">247 lots available</p>
            <p className="text-sm text-muted-foreground">$2.4M total value</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </div>
    </section>
  );
}
