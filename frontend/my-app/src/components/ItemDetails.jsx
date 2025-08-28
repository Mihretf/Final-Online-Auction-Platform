import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { ArrowLeft, Clock, DollarSign, User, FileText } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ItemDetails({ itemId, currentUser, onBack }) {
  const [bidAmount, setBidAmount] = useState("");
  const [maxBidAmount, setMaxBidAmount] = useState("");
  const [useAutoBid, setUseAutoBid] = useState(false);

  const item = {
    id: itemId,
    title: "Vintage Rolex Submariner",
    description: "This classic 1960s Rolex Submariner is in excellent condition with original box and papers. The watch has been carefully maintained and shows minimal wear. Features include:\n\n• Automatic movement\n• Water resistance to 200m\n• Original bracelet and crown\n• Certificate of authenticity\n• Recent service documentation\n\nA rare find for serious collectors.",
    startingPrice: 5000,
    currentBid: 8500,
    endDate: "2024-01-25T18:00:00Z",
    category: "Watches",
    seller: "watchcollector",
    bidCount: 12,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585123334904-845d60e97b78?w=800&h=600&fit=crop"
    ],
    documents: [
      "Certificate of Authenticity.pdf",
      "Service Records.pdf", 
      "Original Receipt.pdf"
    ]
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const formatPrice = (price) => `$${price.toLocaleString()}`;

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffTime <= 0) return "Auction ended";
    if (diffDays > 0) return `${diffDays} days, ${diffHours} hours`;
    if (diffHours > 0) return `${diffHours} hours, ${diffMinutes} minutes`;
    return `${diffMinutes} minutes`;
  };

  const handlePlaceBid = () => {
    const amount = useAutoBid ? maxBidAmount : bidAmount;
    if (amount && parseFloat(amount) > item.currentBid) {
      console.log(`Placing ${useAutoBid ? 'auto ' : ''}bid of $${amount}`);
      setBidAmount("");
      setMaxBidAmount("");
    }
  };

  const minimumBid = item.currentBid + 50;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images and Documents */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <ImageWithFallback
              src={item.images[selectedImage]}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-2">
            {item.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square w-20 overflow-hidden rounded border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-border'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${item.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {item.documents.map((doc, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    {doc}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Item Details and Bidding */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{item.category}</Badge>
            <h1 className="text-3xl mb-4">{item.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Seller: {item.seller}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{getTimeRemaining(item.endDate)}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              {item.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0">{paragraph}</p>
              ))}
            </div>
          </div>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Bidding Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Starting Price</p>
                  <p className="text-lg">{formatPrice(item.startingPrice)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Bid</p>
                  <p className="text-2xl text-primary">{formatPrice(item.currentBid)}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{item.bidCount} bids • Minimum next bid: {formatPrice(minimumBid)}</p>
              </div>
            </CardContent>
          </Card>

          {currentUser.role === 'buyer' && (
            <Card>
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-bid"
                    checked={useAutoBid}
                    onCheckedChange={setUseAutoBid}
                  />
                  <Label htmlFor="auto-bid">Enable Auto-bid</Label>
                </div>

                {useAutoBid ? (
                  <div className="space-y-2">
                    <Label htmlFor="max-bid">Maximum Bid Amount</Label>
                    <Input
                      id="max-bid"
                      type="number"
                      placeholder={`Minimum ${formatPrice(minimumBid)}`}
                      value={maxBidAmount}
                      onChange={(e) => setMaxBidAmount(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Auto-bid will automatically place the minimum required bid up to your maximum amount.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="bid-amount">Bid Amount</Label>
                    <Input
                      id="bid-amount"
                      type="number"
                      placeholder={`Minimum ${formatPrice(minimumBid)}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>
                )}

                <Button 
                  onClick={handlePlaceBid} 
                  className="w-full"
                  disabled={!((useAutoBid && maxBidAmount) || (!useAutoBid && bidAmount))}
                >
                  {useAutoBid ? 'Set Auto-bid' : 'Place Bid'}
                </Button>
              </CardContent>
            </Card>
          )}

          {currentUser.role !== 'buyer' && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Only registered buyers can place bids.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
