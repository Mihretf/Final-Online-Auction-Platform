import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-medium mb-6 leading-tight">
          Discover Unique Items at Auction
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of collectors and enthusiasts bidding on rare finds, 
          vintage treasures, and exclusive items from around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8">
            Start Bidding
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            Sell Your Items
          </Button>
        </div>
      </div>
    </section>
  );
}