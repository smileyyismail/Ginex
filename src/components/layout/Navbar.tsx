import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tighter text-zinc-900">
          GINEX.
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 text-sm font-medium">
          <Link href="/" className="text-zinc-600 hover:text-black transition-colors">Home</Link>
          <Link href="/products" className="text-zinc-600 hover:text-black transition-colors">Products</Link>
          <Link href="/about" className="text-zinc-600 hover:text-black transition-colors">About Us</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="text-zinc-600 hover:text-black transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-zinc-600 hover:text-black transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          <button className="md:hidden text-zinc-600 hover:text-black transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
