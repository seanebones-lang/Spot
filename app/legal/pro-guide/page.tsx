<<<<<<< HEAD
"use client";

import { ExternalLink, CheckCircle, Info } from "lucide-react";
=======
'use client';

import { ExternalLink, CheckCircle, Info } from 'lucide-react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function PROGuidePage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">PRO Registration Guide</h1>
<<<<<<< HEAD

=======
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        <div className="bg-spotify-light-gray rounded-lg p-8 space-y-6">
          <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
<<<<<<< HEAD
                <h3 className="font-bold text-blue-400 mb-1">
                  Why Register with a PRO?
                </h3>
                <p className="text-sm text-white/80">
                  Performance Rights Organizations (PROs) collect and distribute{" "}
                  <strong>performance royalties</strong>
                  when your music is streamed, played on radio, or performed
                  publicly. While our platform holds blanket licenses with PROs
                  for legal streaming,{" "}
                  <strong>
                    you must register your own works with a PRO to receive
                    performance royalty distributions.
                  </strong>
=======
                <h3 className="font-bold text-blue-400 mb-1">Why Register with a PRO?</h3>
                <p className="text-sm text-white/80">
                  Performance Rights Organizations (PROs) collect and distribute <strong>performance royalties</strong> 
                  when your music is streamed, played on radio, or performed publicly. While our platform holds blanket 
                  licenses with PROs for legal streaming, <strong>you must register your own works with a PRO to receive 
                  performance royalty distributions.</strong>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                Understanding PROs vs. MLC
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-spotify-dark-gray rounded-lg p-4">
                  <h3 className="font-bold text-spotify-green mb-2">
                    PROs (Performance Rights)
                  </h3>
                  <p className="text-sm text-white/80">
                    Collect <strong>performance royalties</strong> when music is
                    "performed" via streams, radio, TV, or live venues. You
                    register with ASCAP, BMI, SESAC, or GMR to collect these
                    royalties.
                  </p>
                </div>
                <div className="bg-spotify-dark-gray rounded-lg p-4">
                  <h3 className="font-bold text-spotify-green mb-2">
                    MLC (Mechanical Rights)
                  </h3>
                  <p className="text-sm text-white/80">
                    Handles <strong>mechanical royalties</strong> for
                    composition rights in streaming. Our platform pays
                    mechanical royalties to MLC (~15.35% of revenue), which
                    distributes to composers/songwriters based on metadata.
=======
              <h2 className="text-2xl font-bold mb-4">Understanding PROs vs. MLC</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-spotify-dark-gray rounded-lg p-4">
                  <h3 className="font-bold text-spotify-green mb-2">PROs (Performance Rights)</h3>
                  <p className="text-sm text-white/80">
                    Collect <strong>performance royalties</strong> when music is "performed" via streams, radio, TV, or live venues. 
                    You register with ASCAP, BMI, SESAC, or GMR to collect these royalties.
                  </p>
                </div>
                <div className="bg-spotify-dark-gray rounded-lg p-4">
                  <h3 className="font-bold text-spotify-green mb-2">MLC (Mechanical Rights)</h3>
                  <p className="text-sm text-white/80">
                    Handles <strong>mechanical royalties</strong> for composition rights in streaming. Our platform pays mechanical 
                    royalties to MLC (~15.35% of revenue), which distributes to composers/songwriters based on metadata.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </p>
                </div>
              </div>
            </section>

            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                Major PROs in the United States
              </h2>
=======
              <h2 className="text-2xl font-bold mb-4">Major PROs in the United States</h2>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

              <div className="space-y-6">
                {/* ASCAP */}
                <div className="bg-spotify-dark-gray rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">ASCAP</h3>
<<<<<<< HEAD
                    <a
                      href="https://www.ascap.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spotify-green hover:underline flex items-center gap-1 text-sm"
                    >
=======
                    <a href="https://www.ascap.com" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline flex items-center gap-1 text-sm">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      Visit Website <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-white/80 mb-3">
<<<<<<< HEAD
                    <strong>
                      American Society of Composers, Authors and Publishers
                    </strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
                    <li>
                      <strong>Coverage:</strong> ~20 million musical works
                    </li>
                    <li>
                      <strong>Membership:</strong> Free to join (one-time $50
                      registration fee for writers)
                    </li>
                    <li>
                      <strong>Royalties:</strong> ~$0.005 per stream for
                      performance rights
                    </li>
                    <li>
                      <strong>How to Join:</strong> Visit{" "}
                      <a
                        href="https://www.ascap.com/join"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-spotify-green hover:underline"
                      >
                        ascap.com/join
                      </a>{" "}
                      to register
                    </li>
                    <li>
                      <strong>Benefits:</strong> Collects performance royalties
                      from streaming, radio, TV, and live performances
                    </li>
                  </ul>
                  <div className="mt-4 bg-blue-600/20 border border-blue-600/50 rounded-lg p-3">
                    <p className="text-xs text-white/80">
                      <strong>Tip:</strong> ASCAP has partnerships with foreign
                      PROs (e.g., PRS for UK) for international royalty
                      collection.
=======
                    <strong>American Society of Composers, Authors and Publishers</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
                    <li><strong>Coverage:</strong> ~20 million musical works</li>
                    <li><strong>Membership:</strong> Free to join (one-time $50 registration fee for writers)</li>
                    <li><strong>Royalties:</strong> ~$0.005 per stream for performance rights</li>
                    <li><strong>How to Join:</strong> Visit <a href="https://www.ascap.com/join" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline">ascap.com/join</a> to register</li>
                    <li><strong>Benefits:</strong> Collects performance royalties from streaming, radio, TV, and live performances</li>
                  </ul>
                  <div className="mt-4 bg-blue-600/20 border border-blue-600/50 rounded-lg p-3">
                    <p className="text-xs text-white/80">
                      <strong>Tip:</strong> ASCAP has partnerships with foreign PROs (e.g., PRS for UK) for international royalty collection.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    </p>
                  </div>
                </div>

                {/* BMI */}
                <div className="bg-spotify-dark-gray rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">BMI</h3>
<<<<<<< HEAD
                    <a
                      href="https://www.bmi.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spotify-green hover:underline flex items-center gap-1 text-sm"
                    >
=======
                    <a href="https://www.bmi.com" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline flex items-center gap-1 text-sm">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      Visit Website <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-white/80 mb-3">
                    <strong>Broadcast Music, Inc.</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
<<<<<<< HEAD
                    <li>
                      <strong>Coverage:</strong> ~22 million musical works
                    </li>
                    <li>
                      <strong>Membership:</strong> Free to join (no registration
                      fee)
                    </li>
                    <li>
                      <strong>Royalties:</strong> ~$0.005 per stream for
                      performance rights
                    </li>
                    <li>
                      <strong>How to Join:</strong> Visit{" "}
                      <a
                        href="https://www.bmi.com/join"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-spotify-green hover:underline"
                      >
                        bmi.com/join
                      </a>{" "}
                      to register
                    </li>
                    <li>
                      <strong>Benefits:</strong> Similar to ASCAP - collects
                      performance royalties from streaming, radio, TV, live
                      performances
                    </li>
                    <li>
                      <strong>API Integration:</strong> BMI's Songview API can
                      verify if your track is in their repertory
                    </li>
=======
                    <li><strong>Coverage:</strong> ~22 million musical works</li>
                    <li><strong>Membership:</strong> Free to join (no registration fee)</li>
                    <li><strong>Royalties:</strong> ~$0.005 per stream for performance rights</li>
                    <li><strong>How to Join:</strong> Visit <a href="https://www.bmi.com/join" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline">bmi.com/join</a> to register</li>
                    <li><strong>Benefits:</strong> Similar to ASCAP - collects performance royalties from streaming, radio, TV, live performances</li>
                    <li><strong>API Integration:</strong> BMI's Songview API can verify if your track is in their repertory</li>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </ul>
                </div>

                {/* SESAC */}
                <div className="bg-spotify-dark-gray rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">SESAC</h3>
<<<<<<< HEAD
                    <a
                      href="https://www.sesac.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spotify-green hover:underline flex items-center gap-1 text-sm"
                    >
=======
                    <a href="https://www.sesac.com" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline flex items-center gap-1 text-sm">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      Visit Website <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-white/80 mb-3">
                    <strong>Performing Rights Organization</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
<<<<<<< HEAD
                    <li>
                      <strong>Coverage:</strong> ~1 million musical works
                      (smaller but essential)
                    </li>
                    <li>
                      <strong>Membership:</strong> Invitation-based or apply via{" "}
                      <a
                        href="https://www.sesac.com/licensing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-spotify-green hover:underline"
                      >
                        sesac.com/licensing
                      </a>
                    </li>
                    <li>
                      <strong>Royalties:</strong> Negotiated rates (often
                      comparable to ASCAP/BMI)
                    </li>
                    <li>
                      <strong>Benefits:</strong> Collects performance royalties;
                      smaller but selective catalog
                    </li>
=======
                    <li><strong>Coverage:</strong> ~1 million musical works (smaller but essential)</li>
                    <li><strong>Membership:</strong> Invitation-based or apply via <a href="https://www.sesac.com/licensing" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline">sesac.com/licensing</a></li>
                    <li><strong>Royalties:</strong> Negotiated rates (often comparable to ASCAP/BMI)</li>
                    <li><strong>Benefits:</strong> Collects performance royalties; smaller but selective catalog</li>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </ul>
                </div>

                {/* GMR */}
                <div className="bg-spotify-dark-gray rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
<<<<<<< HEAD
                    <h3 className="text-xl font-bold text-white">
                      Global Music Rights (GMR)
                    </h3>
                    <a
                      href="https://www.globalmusicrights.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spotify-green hover:underline flex items-center gap-1 text-sm"
                    >
=======
                    <h3 className="text-xl font-bold text-white">Global Music Rights (GMR)</h3>
                    <a href="https://www.globalmusicrights.com" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline flex items-center gap-1 text-sm">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      Visit Website <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-white/80 mb-3">
                    <strong>Performance Rights Organization</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
<<<<<<< HEAD
                    <li>
                      <strong>Coverage:</strong> High-profile artists and major
                      catalogs
                    </li>
                    <li>
                      <strong>Membership:</strong> Negotiated license (apply via{" "}
                      <a
                        href="https://www.globalmusicrights.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-spotify-green hover:underline"
                      >
                        globalmusicrights.com
                      </a>
                      )
                    </li>
                    <li>
                      <strong>Royalties:</strong> Negotiated rates (often higher
                      due to premium catalog)
                    </li>
                    <li>
                      <strong>Benefits:</strong> Essential for major artists;
                      collects performance royalties for premium catalog
                    </li>
=======
                    <li><strong>Coverage:</strong> High-profile artists and major catalogs</li>
                    <li><strong>Membership:</strong> Negotiated license (apply via <a href="https://www.globalmusicrights.com" target="_blank" rel="noopener noreferrer" 
                       className="text-spotify-green hover:underline">globalmusicrights.com</a>)</li>
                    <li><strong>Royalties:</strong> Negotiated rates (often higher due to premium catalog)</li>
                    <li><strong>Benefits:</strong> Essential for major artists; collects performance royalties for premium catalog</li>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </ul>
                </div>
              </div>
            </section>

            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                Which PRO Should You Choose?
              </h2>
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-yellow-400 mb-2">
                  Important Considerations:
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
                  <li>
                    <strong>You can only join ONE PRO at a time</strong> as a
                    songwriter/composer (ASCAP or BMI typically)
                  </li>
                  <li>
                    ASCAP and BMI are the largest and most accessible (both free
                    to join)
                  </li>
                  <li>
                    SESAC is invitation-based but covers many independent
                    artists
                  </li>
                  <li>GMR is for high-profile artists with negotiated deals</li>
                  <li>
                    <strong>Register BEFORE uploading content</strong> to ensure
                    royalties are collected from day one
                  </li>
                </ul>
              </div>
              <p className="text-sm text-white/80">
                <strong>Recommendation:</strong> Most independent artists start
                with ASCAP or BMI (both free). You can always switch PROs later,
                but you cannot collect royalties from multiple PROs
                simultaneously for the same work.
=======
              <h2 className="text-2xl font-bold mb-4">Which PRO Should You Choose?</h2>
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-yellow-400 mb-2">Important Considerations:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-white/80">
                  <li><strong>You can only join ONE PRO at a time</strong> as a songwriter/composer (ASCAP or BMI typically)</li>
                  <li>ASCAP and BMI are the largest and most accessible (both free to join)</li>
                  <li>SESAC is invitation-based but covers many independent artists</li>
                  <li>GMR is for high-profile artists with negotiated deals</li>
                  <li><strong>Register BEFORE uploading content</strong> to ensure royalties are collected from day one</li>
                </ul>
              </div>
              <p className="text-sm text-white/80">
                <strong>Recommendation:</strong> Most independent artists start with ASCAP or BMI (both free). You can always 
                switch PROs later, but you cannot collect royalties from multiple PROs simultaneously for the same work.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              </p>
            </section>

            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                How to Register Your Works
              </h2>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Join a PRO:</strong> Register as a songwriter/composer
                  with ASCAP, BMI, or SESAC (choose one)
                </li>
                <li>
                  <strong>Register Your Works:</strong> After joining, register
                  each of your compositions with your PRO. You'll need song
                  titles, ISWC codes (if available), composer names, and
                  ownership splits.
                </li>
                <li>
                  <strong>Provide IPI/CAE Numbers:</strong> Your PRO will assign
                  you an IPI (Interested Party Information) or CAE number. Use
                  this number when uploading to our platform for faster royalty
                  matching.
                </li>
                <li>
                  <strong>Keep Metadata Accurate:</strong> Ensure all metadata
                  (composer names, ISWC codes, ownership percentages) matches
                  between our platform and your PRO registration for accurate
                  royalty distribution.
=======
              <h2 className="text-2xl font-bold mb-4">How to Register Your Works</h2>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Join a PRO:</strong> Register as a songwriter/composer with ASCAP, BMI, or SESAC (choose one)
                </li>
                <li>
                  <strong>Register Your Works:</strong> After joining, register each of your compositions with your PRO. 
                  You'll need song titles, ISWC codes (if available), composer names, and ownership splits.
                </li>
                <li>
                  <strong>Provide IPI/CAE Numbers:</strong> Your PRO will assign you an IPI (Interested Party Information) 
                  or CAE number. Use this number when uploading to our platform for faster royalty matching.
                </li>
                <li>
                  <strong>Keep Metadata Accurate:</strong> Ensure all metadata (composer names, ISWC codes, ownership percentages) 
                  matches between our platform and your PRO registration for accurate royalty distribution.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </li>
              </ol>
            </section>

            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                Mechanical Licensing Collective (MLC)
              </h2>
              <p>
                Our platform pays <strong>mechanical royalties</strong> (~15.35%
                of revenue) to the Mechanical Licensing Collective (MLC), which
                distributes to composers/songwriters based on metadata. While
                you don't need to register separately for mechanical royalties
                (we report usage to MLC), you can connect your account with MLC
=======
              <h2 className="text-2xl font-bold mb-4">Mechanical Licensing Collective (MLC)</h2>
              <p>
                Our platform pays <strong>mechanical royalties</strong> (~15.35% of revenue) to the Mechanical Licensing 
                Collective (MLC), which distributes to composers/songwriters based on metadata. While you don't need to 
                register separately for mechanical royalties (we report usage to MLC), you can connect your account with MLC 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                to ensure accurate distribution:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>
<<<<<<< HEAD
                  <a
                    href="https://www.themlc.com/connect-to-collect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-spotify-green hover:underline flex items-center gap-1"
                  >
=======
                  <a href="https://www.themlc.com/connect-to-collect" target="_blank" rel="noopener noreferrer" 
                     className="text-spotify-green hover:underline flex items-center gap-1">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    MLC Connect to Collect <ExternalLink size={16} />
                  </a>
                </li>
                <li>
<<<<<<< HEAD
                  <strong>Self-Administered Creators:</strong> Register with MLC
                  if you're self-administered to collect mechanical royalties
                  directly (free for self-administered creators)
                </li>
                <li>
                  <strong>Publishers:</strong> If you have a publisher, they
                  handle mechanical royalty collection on your behalf
=======
                  <strong>Self-Administered Creators:</strong> Register with MLC if you're self-administered to collect mechanical 
                  royalties directly (free for self-administered creators)
                </li>
                <li>
                  <strong>Publishers:</strong> If you have a publisher, they handle mechanical royalty collection on your behalf
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Royalty Flow Summary</h2>
              <div className="bg-spotify-dark-gray rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
<<<<<<< HEAD
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Performance Royalties:
                    </strong>
                    <p className="text-sm text-white/80">
                      ~$0.005 per stream → Collected by PRO → Paid to you (if
                      you're registered)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Mechanical Royalties:
                    </strong>
                    <p className="text-sm text-white/80">
                      ~15.35% of revenue → Paid to MLC → Distributed to
                      composers/songwriters based on metadata
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">Platform Fees:</strong>
                    <p className="text-sm text-white/80">
                      10-20% deducted before artist payouts (transparent
                      tracking in your dashboard)
                    </p>
=======
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Performance Royalties:</strong>
                    <p className="text-sm text-white/80">~$0.005 per stream → Collected by PRO → Paid to you (if you're registered)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Mechanical Royalties:</strong>
                    <p className="text-sm text-white/80">~15.35% of revenue → Paid to MLC → Distributed to composers/songwriters based on metadata</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Platform Fees:</strong>
                    <p className="text-sm text-white/80">10-20% deducted before artist payouts (transparent tracking in your dashboard)</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
<<<<<<< HEAD
                  <a
                    href="/help/upload-guidelines"
                    className="text-spotify-green hover:underline"
                  >
                    Upload Guidelines
                  </a>{" "}
                  - How to provide accurate metadata for PRO matching
                </li>
                <li>
                  <a
                    href="/legal/royalty-policy"
                    className="text-spotify-green hover:underline"
                  >
                    Royalty Policy
                  </a>{" "}
                  - Detailed explanation of how royalties work on our platform
                </li>
                <li>
                  See our{" "}
                  <a
                    href="/legal/terms"
                    className="text-spotify-green hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  for additional information about PRO requirements
=======
                  <a href="/help/upload-guidelines" className="text-spotify-green hover:underline">
                    Upload Guidelines
                  </a> - How to provide accurate metadata for PRO matching
                </li>
                <li>
                  <a href="/legal/royalty-policy" className="text-spotify-green hover:underline">
                    Royalty Policy
                  </a> - Detailed explanation of how royalties work on our platform
                </li>
                <li>
                  See our <a href="/legal/terms" className="text-spotify-green hover:underline">Terms of Service</a> for 
                  additional information about PRO requirements
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-spotify-text-gray/30 bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-white/80">
<<<<<<< HEAD
              Register with a PRO <strong>before</strong> uploading your first
              track to ensure you collect performance royalties from day one.
              Accurate metadata (ISWC codes, IPI/CAE numbers, full legal names)
              ensures faster and more accurate royalty matching.
=======
              Register with a PRO <strong>before</strong> uploading your first track to ensure you collect performance royalties 
              from day one. Accurate metadata (ISWC codes, IPI/CAE numbers, full legal names) ensures faster and more accurate 
              royalty matching.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
