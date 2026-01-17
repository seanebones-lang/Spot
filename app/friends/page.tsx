'use client';

import Image from 'next/image';

export default function FriendsPage() {
  // Mock friends activity data
  const friendsActivity = [
    { id: '1', name: 'Alex', avatar: '', track: 'Echos of choices', artist: 'NextEleven Label Showcase', time: 'now' },
    { id: '2', name: 'Sarah', avatar: '', track: 'Digital Goldrush', artist: 'NextEleven Label Showcase', time: '5 min ago' },
    { id: '3', name: 'Mike', avatar: '', track: 'Storm Chant', artist: 'Ash Reed', time: '10 min ago' },
  ];

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Friends Activity</h1>

      {friendsActivity.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-spotify-text-gray text-xl font-medium mb-2">No friends activity yet</p>
          <p className="text-spotify-text-gray text-sm">Connect with friends to see what they're listening to</p>
        </div>
      ) : (
        <div className="space-y-4">
          {friendsActivity.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-4 p-4 bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium">{friend.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white">
                  <span className="font-medium">{friend.name}</span>
                  {' is listening to '}
                  <span className="font-medium hover:underline cursor-pointer">{friend.track}</span>
                  {' by '}
                  <span className="hover:underline cursor-pointer">{friend.artist}</span>
                </p>
                <p className="text-sm text-spotify-text-gray">{friend.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}