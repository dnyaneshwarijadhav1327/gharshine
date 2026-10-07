import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100/80 shadow-xs animate-pulse flex flex-col">
      <div className="w-full aspect-square bg-slate-100 rounded-2xl mb-4" />
      <div className="h-4 bg-slate-100 rounded w-1/3 mb-2" />
      <div className="h-5 bg-slate-100 rounded w-3/4 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-full mb-3" />
      <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
        <div className="h-6 bg-slate-100 rounded w-1/3" />
        <div className="h-9 bg-slate-100 rounded-xl w-1/3" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
