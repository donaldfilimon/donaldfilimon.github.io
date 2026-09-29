import { TooltipProvider } from '@/components/ui/tooltip';

export default function BlocksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
