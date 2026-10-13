import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { peso, yarnOf } from "@/lib/shopify";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Shopping cart">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Basket ♡</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your basket is empty" : `${totalItems} cuddly item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <ShoppingBag className="mx-auto mb-3 h-10 w-10" />
              No little friends yet
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3 rounded-2xl bg-card p-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    {item.product.node.images.edges[0] && (
                      <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-semibold">{item.product.node.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.selectedOptions.map((o) => o.value).join(" • ")} · {yarnOf(item.product)}
                    </p>
                    <p className="text-sm font-bold">{peso(item.price.amount)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.variantId)} aria-label="Remove">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t p-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="text-xl font-bold">{peso(subtotal)}</span>
              </div>
              <Button onClick={checkout} className="w-full rounded-full" size="lg" disabled={isLoading || isSyncing}>
                {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ExternalLink className="mr-2 h-4 w-4" />Checkout</>}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
