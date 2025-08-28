import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Upload, Eye, Edit, Trash2, Clock, DollarSign } from "lucide-react";

export function SellerDashboard({ currentUser, onNavigate }) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    category: "",
    images: [],
    documents: []
  });

  // Mock seller's items
  const [sellerItems] = useState([
    {
      id: "1",
      title: "Vintage Guitar Collection",
      category: "Musical Instruments",
      startingPrice: 2500,
      currentBid: 3200,
      status: "approved",
      endDate: "2024-01-28T20:00:00Z",
      bidCount: 8
    },
    {
      id: "2", 
      title: "Antique Chess Set",
      category: "Collectibles",
      startingPrice: 800,
      currentBid: 0,
      status: "pending",
      endDate: "2024-02-01T18:00:00Z",
      bidCount: 0
    },
    {
      id: "3",
      title: "Art Deco Vase",
      category: "Home & Decor", 
      startingPrice: 1200,
      currentBid: 0,
      status: "rejected",
      rejectionReason: "Insufficient documentation provided",
      endDate: "",
      bidCount: 0
    }
  ]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log("Uploading item:", uploadData);
    setUploadData({
      title: "",
      description: "",
      startingPrice: "",
      category: "",
      images: [],
      documents: []
    });
    setShowUploadForm(false);
  };

  const formatPrice = (price) => `$${price.toLocaleString()}`;

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your auction items and track performance</p>
        </div>
        <Button onClick={() => setShowUploadForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload New Item
        </Button>
      </div>

      {showUploadForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload New Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter item title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="starting-price">Starting Price ($)</Label>
                  <Input
                    id="starting-price"
                    type="number"
                    placeholder="0.00"
                    value={uploadData.startingPrice}
                    onChange={(e) => setUploadData(prev => ({ ...prev, startingPrice: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={uploadData.category} onValueChange={(value) => setUploadData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="collectibles">Collectibles</SelectItem>
                    <SelectItem value="musical-instruments">Musical Instruments</SelectItem>
                    <SelectItem value="watches">Watches</SelectItem>
                    <SelectItem value="home-decor">Home & Decor</SelectItem>
                    <SelectItem value="automobiles">Automobiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of your item..."
                  className="min-h-32"
                  value={uploadData.description}
                  onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload images (max 5)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          setUploadData(prev => ({ ...prev, images: Array.from(e.target.files) }));
                        }
                      }}
                    />
                  </div>
                  {uploadData.images.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {uploadData.images.length} image(s) selected
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Documents (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Upload certificates, receipts, etc.
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          setUploadData(prev => ({ ...prev, documents: Array.from(e.target.files) }));
                        }
                      }}
                    />
                  </div>
                  {uploadData.documents.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {uploadData.documents.length} document(s) selected
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">Upload Item</Button>
                <Button type="button" variant="outline" onClick={() => setShowUploadForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="items" className="space-y-6">
        <TabsList>
          <TabsTrigger value="items">My Items</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Your Listed Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sellerItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting Price</p>
                        <p className="font-medium">{formatPrice(item.startingPrice)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Current Bid</p>
                        <p className="font-medium text-primary">
                          {item.currentBid > 0 ? formatPrice(item.currentBid) : "No bids"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bids</p>
                        <p className="font-medium">{item.bidCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="font-medium">{item.status}</p>
                      </div>
                    </div>

                    {item.status === "rejected" && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                        <p className="text-sm text-red-800">
                          <strong>Rejection Reason:</strong> {item.rejectionReason}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Total Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-medium">$12,450</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Active Auctions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-medium">3</p>
                <p className="text-sm text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-medium">85%</p>
                <p className="text-sm text-muted-foreground">Items sold vs listed</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}