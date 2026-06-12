export function FormatPrice({ ngn, usd, className }: { ngn: number; usd?: number; className?: string }) {
  return (
    <div className={`flex flex-col ${className || ""}`}>
      <span className="font-bold tracking-tight text-foreground">
        {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(ngn)}
      </span>
      {usd !== undefined && usd !== null && (
        <span className="text-sm font-medium text-muted-foreground">
          ~{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd)}
        </span>
      )}
    </div>
  );
}
