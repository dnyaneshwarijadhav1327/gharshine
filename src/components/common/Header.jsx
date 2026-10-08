import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Package,
  Layers,
  HelpCircle,
  Phone,
  SlidersHorizontal
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSearch } from '../../context/SearchContext';
import { surfaces, concerns } from '../../data/categories';
import { brandConfig } from '../../data/config';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [surfaceDropdownOpen, setSurfaceDropdownOpen] = useState(false);
  const [concernDropdownOpen, setConcernDropdownOpen] = useState(false);

  const { totalItemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch } = useSearch();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSurfaceDropdownOpen(false);
    setConcernDropdownOpen(false);
  }, [location.pathname]);

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `relative text-[14px] font-medium transition-colors duration-200 py-1 ${
      isActive
        ? 'text-[#087F8C] font-semibold'
        : 'text-slate-700 hover:text-[#087F8C]'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
            : 'bg-white border-b border-slate-100/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* BRAND LOGO (Invisel Style) */}
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="group flex items-center gap-1.5 focus:outline-none"
              >
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#087F8C]">
                  Ghar<span className="text-slate-900">Shine</span>
                </span>
                <Sparkles size={16} className="text-[#65D5D8] fill-[#65D5D8] -mt-2" />
              </Link>
            </div>

            {/* DESKTOP NAVIGATION (Invisel Style) */}
            <nav className="hidden lg:flex items-center gap-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-sm font-bold transition-all px-4 py-1.5 rounded-full ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                Home
              </NavLink>
              
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-[#087F8C] font-bold' : 'text-slate-700 hover:text-[#087F8C]'
                  }`
                }
              >
                Shop All
              </NavLink>

              {/* Shop By Concerns Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setConcernDropdownOpen(true)}
                onMouseLeave={() => setConcernDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-[#087F8C] py-1 transition-colors cursor-pointer"
                  aria-expanded={concernDropdownOpen}
                >
                  <span>Shop By Concerns</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      concernDropdownOpen ? 'rotate-180 text-[#087F8C]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {concernDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] pt-3 animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-2 gap-2">
                      {concerns.map((c) => (
                        <Link
                          key={c.id}
                          to={`/shop?concern=${c.slug}`}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition group/item"
                          onClick={() => setConcernDropdownOpen(false)}
                        >
                          <div className="w-2 h-2 rounded-full bg-[#087F8C] mt-1.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-800 group-hover/item:text-[#087F8C]">
                              {c.title}
                            </span>
                            <span className="text-[11px] text-slate-400 line-clamp-1">
                              {c.subtitle}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* How To Use Dropdown */}
              <NavLink
                to="/how-to-use"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-[#087F8C] font-bold' : 'text-slate-700 hover:text-[#087F8C]'
                  }`
                }
              >
                How To Use ⌵
              </NavLink>

              <NavLink
                to="/combo-builder"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-[#087F8C] font-bold' : 'text-slate-700 hover:text-[#087F8C]'
                  }`
                }
              >
                Get Service
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-[#087F8C] font-bold' : 'text-slate-700 hover:text-[#087F8C]'
                  }`
                }
              >
                Our Story
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-[#087F8C] font-bold' : 'text-slate-700 hover:text-[#087F8C]'
                  }`
                }
              >
                Contact Us
              </NavLink>
            </nav>

            {/* ACTION ICONS (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => openSearch()}
                aria-label="Search products"
                className="p-2 text-slate-700 hover:text-[#087F8C] hover:bg-[#F4F8F7] rounded-full transition-colors"
                title="Search products"
              >
                <Search size={20} />
              </button>

              {/* Wishlist Button */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative p-2 text-slate-700 hover:text-[#087F8C] hover:bg-[#F4F8F7] rounded-full transition-colors hidden sm:inline-flex"
                title="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#E05A47] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Button */}
              <Link
                to="/login"
                aria-label="Account Login"
                className="p-2 text-slate-700 hover:text-[#087F8C] hover:bg-[#F4F8F7] rounded-full transition-colors hidden sm:inline-flex"
                title="Account"
              >
                <User size={20} />
              </Link>

              {/* Cart Button with Count */}
              <button
                type="button"
                onClick={openCart}
                aria-label="Shopping Cart"
                className="relative p-2 text-slate-800 hover:text-[#087F8C] hover:bg-[#F4F8F7] rounded-full transition-colors group"
                title="View cart"
              >
                <ShoppingBag size={21} className="group-hover:scale-105 transition-transform" />
                {totalItemCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#087F8C] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="lg:hidden p-2 text-slate-800 hover:text-[#087F8C] hover:bg-[#F4F8F7] rounded-full transition-colors"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE FULL-HEIGHT DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFA]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#087F8C] flex items-center justify-center text-white">
                  <Sparkles size={16} className="text-[#65D5D8]" />
                </div>
                <span className="font-bold text-slate-900">GharShine</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white transition"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 text-slate-700 text-sm font-medium">
              <Link
                to="/"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
              >
                <span className="text-slate-900 font-semibold">Home</span>
              </Link>

              <Link
                to="/shop"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
              >
                <Package size={18} className="text-[#087F8C]" />
                <span>Shop All Products</span>
              </Link>

              <Link
                to="/combo-builder"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#E8F8F8]/50 text-[#087F8C] font-semibold"
              >
                <div className="flex items-center gap-3">
                  <SlidersHorizontal size={18} />
                  <span>Build Your Own Kit</span>
                </div>
                <span className="text-[10px] bg-[#087F8C] text-white px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </Link>

              {/* Surfaces Section */}
              <div className="pt-3 pb-1 px-2.5">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  Shop By Surface
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 px-1 pb-2">
                {surfaces.slice(0, 6).map((s) => (
                  <Link
                    key={s.id}
                    to={`/shop?surface=${s.slug}`}
                    className="p-2 rounded-lg text-xs bg-slate-50 hover:bg-[#E8F8F8] text-slate-700 hover:text-[#087F8C] transition truncate"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>

              {/* Other Pages */}
              <Link
                to="/how-to-use"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
              >
                <Layers size={18} className="text-slate-500" />
                <span>How To Use Guide</span>
              </Link>

              <Link
                to="/about"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
              >
                <ShieldCheck size={18} className="text-slate-500" />
                <span>Our Story & Science</span>
              </Link>

              <Link
                to="/track-order"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
              >
                <Package size={18} className="text-slate-500" />
                <span>Track Your Order</span>
              </Link>

              <Link
                to="/faq"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
              >
                <HelpCircle size={18} className="text-slate-500" />
                <span>FAQs</span>
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
              >
                <Phone size={18} className="text-slate-500" />
                <span>Contact & Support</span>
              </Link>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-around">
                <Link
                  to="/wishlist"
                  className="flex flex-col items-center text-xs text-slate-600 hover:text-[#087F8C]"
                >
                  <Heart size={20} className="mb-1" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
                <Link
                  to="/login"
                  className="flex flex-col items-center text-xs text-slate-600 hover:text-[#087F8C]"
                >
                  <User size={20} className="mb-1" />
                  <span>Account</span>
                </Link>
              </div>
            </div>

            {/* Mobile Footer Help */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 text-center">
              <span>Customer Care: </span>
              <a href={`tel:${brandConfig.supportPhone}`} className="font-semibold text-[#087F8C]">
                {brandConfig.supportPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
