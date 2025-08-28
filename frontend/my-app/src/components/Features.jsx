export function Features() {
  const features = [
    {
      title: "Secure Bidding",
      description: "Advanced security measures protect every transaction and bid you place."
    },
    {
      title: "Global Marketplace", 
      description: "Access unique items from sellers and collectors worldwide."
    },
    {
      title: "Expert Authentication",
      description: "All high-value items are verified by our team of specialists."
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Why Choose AuctionHouse
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of online auctions with our secure, 
            user-friendly platform designed for serious collectors.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}