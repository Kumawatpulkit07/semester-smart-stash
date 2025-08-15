import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Receipt, 
  Share, 
  Check, 
  X,
  DollarSign,
  UserPlus,
  Send,
  QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BillSplit = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: Create, 2: Add people, 3: Split, 4: Summary
  const [bill, setBill] = useState({
    title: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  const [participants, setParticipants] = useState([
    { id: 1, name: "You", email: "you@student.edu", amount: 0, paid: true, avatar: "Y" },
  ]);

  const [newParticipant, setNewParticipant] = useState({ name: "", email: "" });
  const [splitType, setSplitType] = useState("equal"); // equal, custom, percentage

  const activeBills = [
    {
      id: 1,
      title: "Pizza Night",
      amount: 45.60,
      participants: 4,
      youOwe: 11.40,
      status: "pending",
      creator: "Sarah M."
    },
    {
      id: 2,
      title: "Uber to Mall",
      amount: 18.50,
      participants: 3,
      youOwe: 6.17,
      status: "pending",
      creator: "Mike K."
    },
    {
      id: 3,
      title: "Grocery Shopping",
      amount: 127.80,
      participants: 5,
      youOwed: 25.56,
      status: "settled",
      creator: "You"
    }
  ];

  const addParticipant = () => {
    if (!newParticipant.name) return;
    
    const newPerson = {
      id: participants.length + 1,
      name: newParticipant.name,
      email: newParticipant.email,
      amount: 0,
      paid: false,
      avatar: newParticipant.name.charAt(0).toUpperCase()
    };
    
    setParticipants([...participants, newPerson]);
    setNewParticipant({ name: "", email: "" });
  };

  const calculateSplit = () => {
    const totalAmount = parseFloat(bill.amount);
    const equalAmount = totalAmount / participants.length;
    
    setParticipants(prev => prev.map(p => ({
      ...p,
      amount: splitType === "equal" ? equalAmount : p.amount
    })));
  };

  const handleCreateBill = () => {
    if (!bill.title || !bill.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in the bill title and amount.",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const sendInvites = () => {
    calculateSplit();
    toast({
      title: "Invites Sent!",
      description: `Sent bill split invites to ${participants.length - 1} people`,
    });
    setStep(4);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Split Bills</h1>
              <p className="text-muted-foreground">Share expenses with friends</p>
            </div>
          </div>

          {/* Active Bills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Your Bills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeBills.map((activeBill) => (
                <div key={activeBill.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{activeBill.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activeBill.participants} people • by {activeBill.creator}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={activeBill.status === "pending" ? "default" : "secondary"}>
                      {activeBill.status === "pending" ? (
                        <>You owe ${activeBill.youOwe?.toFixed(2)}</>
                      ) : (
                        <>Settled</>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Create New Bill */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Bill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Bill Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Dinner at Pizza Hut"
                    value={bill.title}
                    onChange={(e) => setBill({ ...bill, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Total Amount</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      $
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                      value={bill.amount}
                      onChange={(e) => setBill({ ...bill, amount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="What was this expense for?"
                    value={bill.description}
                    onChange={(e) => setBill({ ...bill, description: e.target.value })}
                  />
                </div>

                <Button onClick={handleCreateBill} className="w-full" variant="gradient">
                  <Users className="w-4 h-4 mr-2" />
                  Add People & Split
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Add People</h1>
              <p className="text-muted-foreground">{bill.title} • ${bill.amount}</p>
            </div>
          </div>

          {/* Current Participants */}
          <Card>
            <CardHeader>
              <CardTitle>Participants ({participants.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {participant.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{participant.name}</p>
                      {participant.email && (
                        <p className="text-xs text-muted-foreground">{participant.email}</p>
                      )}
                    </div>
                  </div>
                  {participant.paid && (
                    <Badge variant="secondary" className="text-xs">Paid</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Add New Person */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add Friend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="Friend's name"
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email/Phone (Optional)</Label>
                  <Input
                    placeholder="For UPI/notifications"
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={addParticipant} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Person
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={() => setStep(3)} className="flex-1" variant="gradient">
              Continue to Split
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3 || step === 4) {
    const totalAmount = parseFloat(bill.amount);
    const perPersonAmount = totalAmount / participants.length;

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setStep(2)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {step === 3 ? "Split Amount" : "Bill Created!"}
              </h1>
              <p className="text-muted-foreground">{bill.title} • ${bill.amount}</p>
            </div>
          </div>

          {/* Split Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Split Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {participants.map((participant, index) => (
                <div key={participant.id}>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {participant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{participant.name}</p>
                        {participant.paid && (
                          <Badge variant="secondary" className="text-xs mt-1">Already Paid</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${perPersonAmount.toFixed(2)}</p>
                      {step === 4 && !participant.paid && (
                        <Button size="sm" variant="outline" className="mt-2">
                          <Send className="w-3 h-3 mr-1" />
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < participants.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {step === 3 && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Split Type</span>
                    <Badge variant="secondary">Equal Split</Badge>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={sendInvites} className="w-full" variant="gradient">
                <Share className="w-4 h-4 mr-2" />
                Send Split Invites
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Card className="bg-success/5 border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-success">Bill Split Created!</p>
                      <p className="text-sm text-muted-foreground">
                        Invites sent to {participants.length - 1} people
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  Share QR
                </Button>
                <Button variant="gradient" onClick={() => window.history.back()}>
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default BillSplit;