
import React from 'react';
import { Card } from '@/components/ui/card';

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
    <div className="grid grid-cols-2 gap-4">
      {nfts.map((nft) => (
        <Card key={nft.id} className="glass-card p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer group">
          <div className="aspect-square rounded-lg overflow-hidden mb-3">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-white text-sm truncate">{nft.name}</h3>
            <p className="text-gray-400 text-xs truncate">{nft.collection}</p>
            {nft.floorPrice && (
              <p className="text-cyan-400 text-xs font-medium">
                Floor: {nft.floorPrice} SOL
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NFTGallery;
