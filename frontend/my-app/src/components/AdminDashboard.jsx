import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CheckCircle, XCircle, Eye, FileText, Clock } from "lucide-react";

export function AdminDashboard({ currentUser }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const [pendingItems, setPendingItems] = useState([
    {
      id: "pending_1",
      title: "Vintage Camera Collection",
      seller: "photoenthusiast",
      category: "Electronics",
      startingPrice: 1500,
      submittedDate: "2024-01-22T10:30:00Z",
      description: "Collection of vintage film cameras from the 1960s-1980s...",
      images: ["camera1.jpg", "camera2.jpg"],
      documents: ["purchase_receipts.pdf"]
    },
    {
      id: "pending_2", 
      title: "Ancient Roman Coin",
      seller: "antiquecollector",
      category: "Collectibles",
      startingPrice: 3000,
      submittedDate: "2024-01-22T14:15:00Z",
      description: "Authentic Roman coin from 1st century AD...",
      images: ["coin1.jpg", "coin2.jpg"],
      documents: ["authenticity_certificate.pdf", "appraisal.pdf"]
    }
  ]);

  const auditLogs = [
    {
      id: "audit_1",
      actionId: "ACT_001",
      actor: "admin_john",
      action: "Approved item 'Vintage Guitar'",
      timestamp: "2024-01-22T16:45:00Z"
    },
    {
      id: "audit_2",
      actionId: "ACT_002", 
      actor: "admin_sarah",
      action: "Rejected item 'Suspicious Watch' - Reason: Incomplete documentation",
      timestamp: "2024-01-22T15:30:00Z"
    },
    {
      id: "audit_3",
      actionId: "ACT_003",
      actor: "admin_john", 
      action: "Updated user permissions for seller 'vintagecars'",
      timestamp: "2024-01-22T14:20:00Z"
    },
    {
      id: "audit_4",
      actionId: "ACT_004",
      actor: "system",
      action: "Automated bid placed for auction item #456",
      timestamp: "2024-01-22T13:15:00Z"
    }
  ];

  const handleApprove = (itemId) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    console.log(`Approved item ${itemId}`);
  };

  const handleReject = (itemId) => {
    if (rejectionReason.trim()) {
      setPendingItems(prev => prev.filter(item => item.id !== itemId));
      console.log(`Rejected item ${itemId} with reason: ${rejectionReason}`);
      setRejectionReason("");
      setSelectedItem(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage item approvals and monitor system activity</p>
      </div>

      <Tabs defaultValue="approvals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="approvals">Item Approvals</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Item Approvals ({pendingItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No items pending approval</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl mb-2">{item.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Seller: {item.seller}</span>
                            <span>Category: {item.category}</span>
                            <span>Starting Price: ${item.startingPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>

                      <p className="text-muted-foreground mb-4">{item.description}</p>

                      <div className="grid gap-4 md:grid-cols-2 mb-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Images ({item.images.length})</p>
                          <div className="flex gap-2">
                            {item.images.map((image, index) => (
                              <div key={index} className="w-16 h-16 bg-muted rounded border flex items-center justify-center">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Documents ({item.documents.length})</p>
                          <div className="space-y-1">
                            {item.documents.map((doc, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <FileText className="h-4 w-4" />
                                {doc}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleApprove(item.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="destructive"
                              onClick={() => setSelectedItem(item)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Item</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Please provide a reason for rejecting "{selectedItem?.title}"</p>
                              <Textarea
                                placeholder="Enter rejection reason..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                              />
                              <div className="flex gap-2">
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleReject(selectedItem?.id)}
                                  disabled={!rejectionReason.trim()}
                                >
                                  Reject Item
                                </Button>
                                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>

                      <div className="mt-4 text-xs text-muted-foreground">
                        Submitted: {formatDate(item.submittedDate)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action ID</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.actionId}</TableCell>
                      <TableCell>
                        <Badge variant={log.actor === 'system' ? 'secondary' : 'outline'}>
                          {log.actor}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(log.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
