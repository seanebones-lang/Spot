'use client';

import { usePointsStore } from '@/stores/pointsStore';
import { useCheckInStore } from '@/stores/checkInStore';
import { Award, Ticket, Gift, Star } from 'lucide-react';

const rewards = [
  { id: '1', name: 'EmPulse Music T-Shirt', points: 500, type: 'merch', icon: Gift },
  { id: '2', name: 'Concert Tickets', points: 1000, type: 'tickets', icon: Ticket },
  { id: '3', name: 'Extended Free Trial (90 days)', points: 750, type: 'trial', icon: Star },
  { id: '4', name: 'Exclusive Content Access', points: 300, type: 'content', icon: Award },
];

export default function RewardsPage() {
  const { totalPoints } = usePointsStore();
  const { getStreak } = useCheckInStore();
  const streak = getStreak();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Points & Rewards</h1>

      {/* Points Dashboard */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg p-6 text-white">
          <div className="text-sm opacity-80 mb-1">Total Points</div>
          <div className="text-3xl font-bold">{totalPoints}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white">
          <div className="text-sm opacity-80 mb-1">Current Streak</div>
          <div className="text-3xl font-bold">🔥 {streak} days</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white">
          <div className="text-sm opacity-80 mb-1">Available</div>
          <div className="text-3xl font-bold">{totalPoints} pts</div>
        </div>
      </div>

      {/* Badges */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
        <div className="flex flex-wrap gap-4">
          {streak >= 7 && (
            <div className="bg-spotify-light-gray rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-sm font-medium">7-Day Streak</div>
            </div>
          )}
          {streak >= 30 && (
            <div className="bg-spotify-light-gray rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-sm font-medium">30-Day Streak</div>
            </div>
          )}
          {totalPoints >= 500 && (
            <div className="bg-spotify-light-gray rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-sm font-medium">500 Points</div>
            </div>
          )}
        </div>
      </section>

      {/* Rewards Catalog */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Rewards Catalog</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            const canAfford = totalPoints >= reward.points;
            return (
              <div
                key={reward.id}
                className={`bg-spotify-light-gray rounded-lg p-6 ${
                  canAfford ? 'hover:bg-spotify-light-gray/80' : 'opacity-60'
                } transition-colors`}
              >
                <Icon size={32} className="mb-3 text-spotify-green" />
                <h3 className="font-bold mb-2">{reward.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-spotify-text-gray">{reward.points} points</span>
                  <button
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      canAfford
                        ? 'bg-spotify-green text-black hover:bg-spotify-green/80'
                        : 'bg-spotify-dark-gray text-spotify-text-gray cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Not Enough Points'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
