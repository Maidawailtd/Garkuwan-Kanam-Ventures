import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useVerifyPayment, useGetOrder, getGetOrderQueryKey } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { FormatPrice } from "@/components/shared/format-price";
import { ShieldCheck, XCircle, ArrowRight, Loader2, Printer, Star, MessageSquareText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function OrderConfirmation() {
  const searchParams = new URLSearchParams(window.location.search);
  const orderIdParam = searchParams.get("orderId");
  const transactionId = searchParams.get("transaction_id");
  const txRef = searchParams.get("tx_ref");
  
  const orderId = orderIdParam ? parseInt(orderIdParam, 10) : 0;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const verifyPayment = useVerifyPayment();
  const hasAttemptedVerification = useRef(false);
  
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (orderId && transactionId && txRef && !hasAttemptedVerification.current) {
      hasAttemptedVerification.current = true;
      verifyPayment.mutate({
        id: orderId,
        data: {
          txRef: txRef,
          transactionId: transactionId
        }
      });
    }
  }, [orderId, transactionId, txRef]);

  const { data: order, isLoading: isOrderLoading } = useGetOrder(orderId, {
    query: {
      enabled: !!orderId,
      queryKey: getGetOrderQueryKey(orderId)
    }
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating Required",
        description: "Please select a rating before submitting.",
      });
      return;
    }
    
    setIsSubmittingFeedback(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmittingFeedback(false);
      setFeedbackSubmitted(true);
      toast({
        title: "Feedback Received",
        description: "Thank you for your valuable feedback!",
      });
    }, 1500);
  };

  if (!orderId) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-display uppercase mb-4">Invalid Link</h1>
          <p className="text-muted-foreground mb-8">No order ID found in the URL.</p>
          <button onClick={() => setLocation('/')} className="text-primary font-bold uppercase underline">
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[70vh] bg-secondary flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl bg-card border border-border shadow-2xl">
          
          <div className="p-8 text-center border-b border-border bg-background">
            {verifyPayment.isPending || isOrderLoading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
                <h1 className="text-3xl font-display uppercase tracking-tighter mb-2">Verifying Transaction</h1>
                <p className="text-muted-foreground font-mono text-xs uppercase">Communicating with Flutterwave...</p>
              </div>
            ) : verifyPayment.isError || order?.paymentStatus === "failed" ? (
              <div className="flex flex-col items-center">
                <XCircle className="w-16 h-16 text-destructive mb-6" />
                <h1 className="text-3xl font-display uppercase tracking-tighter mb-2">Payment Failed</h1>
                <p className="text-muted-foreground">The transaction could not be verified or was declined.</p>
              </div>
            ) : order?.paymentStatus === "paid" ? (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-3xl font-display uppercase tracking-tighter mb-2">Order Confirmed</h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Ref: {order.flwRef || txRef}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-display uppercase tracking-tighter mb-2">Order Status: {order?.status}</h1>
                <p className="text-muted-foreground">Payment status: {order?.paymentStatus}</p>
              </div>
            )}
          </div>

          <div className="p-8">
            {isOrderLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ) : order ? (
              <>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm mb-8">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Date</span>
                    <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Order Number</span>
                    <span className="font-mono text-primary font-bold">GKC-{order.id.toString().padStart(6, '0')}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold mb-1">Billed To</span>
                    <span className="font-medium block">{order.customerName}</span>
                    <span className="text-muted-foreground block">{order.customerEmail}</span>
                  </div>
                </div>

                <div className="border border-border bg-background p-4 mb-8">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-border/50">
                    <div className="flex flex-col">
                      <span className="font-display uppercase text-lg">{order.productName}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Unit ID: {order.productId} &times; {order.quantity}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Total Settled</span>
                    <FormatPrice ngn={order.totalAmountNgn} className="text-2xl text-right" />
                  </div>
                </div>

                {/* Post-Purchase Feedback Section */}
                {order?.paymentStatus === "paid" && !feedbackSubmitted && (
                  <div className="mt-12 pt-12 border-t border-border">
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquareText className="text-primary" size={24} />
                      <h3 className="text-xl font-display uppercase tracking-tighter">Your Experience Matters</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-8">How was your acquisition process today? Your feedback helps us maintain our industrial standards.</p>
                    
                    <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                      <div className="flex gap-4 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`transition-all ${rating >= star ? "text-primary scale-110" : "text-muted-foreground opacity-30 hover:opacity-100"}`}
                          >
                            <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                      
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your thoughts on the service..."
                        className="w-full bg-background border border-border p-4 text-sm outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                      />
                      
                      <button
                        type="submit"
                        disabled={isSubmittingFeedback}
                        className="w-full bg-foreground text-background py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50"
                      >
                        {isSubmittingFeedback ? "Submitting..." : "Submit Feedback"}
                      </button>
                    </form>
                  </div>
                )}

                {feedbackSubmitted && (
                  <div className="mt-12 pt-12 border-t border-border text-center animate-in fade-in slide-in-from-bottom-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      <ShieldCheck className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-display uppercase tracking-tighter mb-2">Thank You</h3>
                    <p className="text-sm text-muted-foreground">Your feedback has been recorded in our quality control system.</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 py-4 border border-border text-foreground font-bold uppercase tracking-widest text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer size={16} /> Print Receipt
                  </button>
                  <button 
                    onClick={() => setLocation('/products')}
                    className="flex-1 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
                  >
                    Return to Catalog <ArrowRight size={16} />
                  </button>
                </div>
              </>
            ) : null}
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
