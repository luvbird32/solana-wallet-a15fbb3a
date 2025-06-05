
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  floorPrice?: number;
}

const NFTGallery = () => {
  // Mock NFT data - in real app this would come from Solana NFT accounts
  const nfts: NFT[] = [
    {
      id: '1',
      name: 'Degenerate Ape #4321',
      collection: 'Degenerate Ape Academy',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&crop=center',
      floorPrice: 12.5
    },
    {
      id: '2',
      name: 'Solana Monkey #8765',
      collection: 'Solana Monkey Business',
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop&crop=center',
      floorPrice: 8.2
    },
    {
      id: '3',
      name: 'Okay Bear #2468',
      collection: 'Okay Bears',
      image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=400&h=400&fit=crop&crop=center',
      floorPrice: 15.7
    },
    {
      id: '4',
      name: 'Famous Fox #1357',
      collection: 'Famous Fox Federation',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&crop=center',
      floorPrice: 6.9
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {nfts.map((nft) => (
        <Card key={nft.id} className="nft-card group p-6 hover:scale-[1.02] transition-all duration-300">
          <div className="aspect-square rounded-2xl overflow-hidden mb-6 border-2 border-slate-100 shadow-md group-hover:shadow-xl transition-all duration-300">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-lg truncate">{nft.name}</h3>
            <p className="text-slate-500 text-sm truncate font-medium">{nft.collection}</p>
            <div className="flex items-center justify-between">
              {nft.floorPrice && (
                <div className="bg-blue-50 px-3 py-2 rounded-lg">
                  <p className="text-blue-600 text-sm font-bold">
                    {nft.floorPrice} SOL
                  </p>
                </div>
              )}
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors duration-200">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NFTGallery;
