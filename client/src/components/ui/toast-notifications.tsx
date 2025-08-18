import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastNotificationProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
  onDismiss?: () => void;
}

const variantStyles = {
  default: "bg-background border-border text-foreground",
  destructive: "bg-destructive border-destructive text-destructive-foreground",
  success: "bg-green-500 border-green-500 text-white",
  warning: "bg-yellow-500 border-yellow-500 text-white"
};

const variantIcons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertCircle
};

export function ToastNotification({
  id,
  title,
  description,
  variant = 'default',
  onDismiss
}: ToastNotificationProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        variantStyles[variant]
      )}
      data-testid={`toast-${id}`}
    >
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="grid gap-1">
          {title && (
            <div className="text-sm font-semibold" data-testid={`toast-title-${id}`}>
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm opacity-90" data-testid={`toast-description-${id}`}>
              {description}
            </div>
          )}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 h-6 w-6 p-0 opacity-70 hover:opacity-100"
        onClick={onDismiss}
        data-testid={`toast-dismiss-${id}`}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex max-h-screen w-full flex-col-reverse space-y-2 space-y-reverse sm:bottom-4 sm:right-4 sm:top-auto sm:flex-col sm:space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          id={toast.id}
          title={toast.title as string}
          description={toast.description as string}
          variant={toast.variant as any}
          onDismiss={() => dismiss(toast.id)}
        />
      ))}
    </div>
  );
}

// Utility functions for easy toast creation
export function showSuccessToast(title: string, description?: string) {
  const { toast } = useToast();
  return toast({
    title,
    description,
    variant: 'default',
    className: 'bg-green-500 border-green-500 text-white'
  });
}

export function showErrorToast(title: string, description?: string) {
  const { toast } = useToast();
  return toast({
    title,
    description,
    variant: 'destructive'
  });
}

export function showWarningToast(title: string, description?: string) {
  const { toast } = useToast();
  return toast({
    title,
    description,
    variant: 'default',
    className: 'bg-yellow-500 border-yellow-500 text-white'
  });
}

export function showInfoToast(title: string, description?: string) {
  const { toast } = useToast();
  return toast({
    title,
    description,
    variant: 'default'
  });
}
