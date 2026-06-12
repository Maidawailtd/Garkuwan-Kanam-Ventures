import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetProduct, useCreateOrder, getGetProductQueryKey } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { FormatPrice } from "@/components/shared/format-price";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  shippingAddress: z.string().min(10, "Complete delivery address is required"),
  quantity: z.coerce.number().min(1).default(1),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Checkout() {
  const searchParams = new URLSearchParams(window.location.search);
  const productId = parseInt(searchParams.get("productId") || "0", 10);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: product, isLoading: isLoadingProduct } = useGetProduct(productId, {
    query: {
      enabled: !!productId,
      queryKey: getGetProductQueryKey(productId)
    }
  });

  const createOrder = useCreateOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
      quantity: 1,
      notes: "",
    },
  });

  const quantity = form.watch("quantity");
  const totalNgn = (product?.priceNgn || 0) * (isNaN(quantity) ? 1 : quantity);

  const onSubmit = (data: FormValues) => {
    if (!product) return;

    createOrder.mutate({
      data: {
        productId: product.id,
        quantity: data.quantity,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        notes: data.notes,
      }
    }, {
      onSuccess: (result) => {
        // Redirect to Flutterwave payment link
        window.location.href = result.paymentLink;
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Transaction Error",
          description: error?.response?.data?.error || "Failed to initialize order. Please try again.",
        });
      }
    });
  };

  if (isLoadingProduct) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl py-20">
          <Skeleton className="h-12 w-1/2 mb-12 rounded-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-16 w-full rounded-none" />
              <Skeleton className="h-16 w-full rounded-none" />
              <Skeleton className="h-32 w-full rounded-none" />
            </div>
            <div>
              <Skeleton className="h-64 w-full rounded-none" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-8 py-24 text-center">
          <h1 className="text-3xl font-display uppercase mb-4">Invalid Request</h1>
          <p className="text-muted-foreground mb-8">No equipment specified for purchase.</p>
          <button onClick={() => setLocation('/products')} className="text-primary font-bold uppercase underline">
            Return to Inventory
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-12 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <button 
            onClick={() => setLocation(`/products/${product.id}`)}
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors flex items-center mb-6"
          >
            <ArrowLeft className="mr-2" size={14} /> Back to specifications
          </button>
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tighter text-white">Purchase Order</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h2 className="text-2xl font-display uppercase tracking-tighter mb-8 border-b border-border pb-4">Client Details</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-xs uppercase tracking-wider font-bold">Company / Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Garkuwan Mining Corp" className="h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-bold">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="procurement@company.com" className="h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-bold">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 800 000 0000" className="h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="shippingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider font-bold">Delivery / Site Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Full address for equipment delivery..." className="min-h-[100px] rounded-none border-border focus-visible:ring-primary focus-visible:border-primary resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border mt-8">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider font-bold">Units</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} className="h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary text-center font-display text-lg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-xs uppercase tracking-wider font-bold">Additional Requirements</FormLabel>
                        <FormControl>
                          <Input placeholder="Custom modifications, delivery specifics..." className="h-12 rounded-none border-border focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={createOrder.isPending}
                    className="w-full py-5 flex items-center justify-center gap-3 text-lg font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
                  >
                    {createOrder.isPending ? "Initializing..." : "Proceed to Payment"}
                    <Lock size={18} />
                  </button>
                  <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mt-4">
                    You will be redirected to Flutterwave to complete the transaction securely.
                  </p>
                </div>
              </form>
            </Form>
          </div>

          {/* Order Summary Summary */}
          <div className="lg:col-span-5 order-1 lg:order-2 sticky top-24">
            <div className="bg-card border border-border p-6 md:p-8">
              <h2 className="text-xl font-display uppercase tracking-tighter mb-6 pb-4 border-b border-border">Order Summary</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                {product.imageUrl && (
                  <div className="w-24 h-24 bg-muted border border-border shrink-0">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{product.brand}</span>
                  <h3 className="font-display leading-tight uppercase text-lg mb-2">{product.name}</h3>
                  <FormatPrice ngn={product.priceNgn} className="text-sm" />
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span className="uppercase tracking-wider">Base Price</span>
                  <FormatPrice ngn={product.priceNgn} />
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="uppercase tracking-wider">Quantity</span>
                  <span className="font-medium text-foreground">{quantity} Unit(s)</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="uppercase tracking-wider">Taxes & Fees</span>
                  <span className="font-medium text-foreground">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-widest">Total Due</span>
                <FormatPrice ngn={totalNgn} className="text-2xl md:text-3xl text-right" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
