import { Package, CheckCircle, Truck, HeadphonesIcon } from 'lucide-react';

const stats = [
  { icon: <Package className="w-6 h-6" />, value: '10,000+', label: 'Products Delivered' },
  { icon: <CheckCircle className="w-6 h-6" />, value: '100%', label: 'Genuine Products' },
  { icon: <Truck className="w-6 h-6" />, value: 'Fast', label: 'Nationwide Delivery' },
  { icon: <HeadphonesIcon className="w-6 h-6" />, value: '24/7', label: 'Expert Support' },
];

export function BrandTrustBar() {
  return (
    <div
      className="border-y border-[rgba(212,175,55,0.1)] relative overflow-hidden"
      style={{ background: 'rgba(17,17,17,0.8)' }}
    >
      {/* Gold shimmer line at top */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[rgba(212,175,55,0.1)]">
          {stats.map(({ icon, value, label }) => (
            <div
              key={label}
              className="flex items-center justify-center md:justify-start gap-4 px-4 md:px-8 group"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  color: '#D4AF37',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                {icon}
              </div>
              <div>
                <div className="text-xl font-black font-heading text-white leading-none">
                  {value}
                </div>
                <div className="text-xs text-[#A1A1AA] font-medium tracking-wide mt-0.5">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
