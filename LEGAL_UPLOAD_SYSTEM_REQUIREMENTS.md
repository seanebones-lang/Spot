# Legal and Technical Setup for Direct Uploads
## Comprehensive Requirements for U.S.-Based Music Streaming Service

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Status:** Implementation Guide

---

## Executive Summary

This document outlines the precise requirements for implementing a legally compliant direct upload system for a U.S.-based music streaming service. As a Digital Service Provider (DSP) allowing direct artist uploads, your platform acts as both a DSP and an aggregator, requiring comprehensive content ingestion, metadata validation, and royalty reporting.

**Legal Framework:** Music Modernization Act (MMA) of 2018, administered via the Mechanical Licensing Collective (MLC), alongside Performance Rights Organizations (PROs): ASCAP, BMI, SESAC, and Global Music Rights (GMR).

**Risk:** Failure to comply can result in lawsuits, content takedowns, fines under U.S. copyright law (DMCA), and platform shutdown.

---

## 1. Frontend Upload System Requirements

### 1.1 Required Upload Form Fields

The upload system **MUST** mandate comprehensive metadata during upload. Incomplete submissions should be rejected automatically.

#### Basic Track/Album Information (Display & Search)
- ✅ **Track Title** (required; exact phrasing for PRO matching)
- ✅ **Album/EP Title** (if part of a release)
- ✅ **Artist Name(s)** (primary and featured; full legal names required per 2025 rules)
- ✅ **Release Date** (scheduled; must be future-dated for pre-releases)
- ✅ **Genre/Subgenre** (dropdown from standardized lists for playlisting)
- ✅ **Artwork** (JPEG/PNG, minimum 1400x1400px; users warrant rights)

#### Rights and Ownership Metadata (CRITICAL for Royalties)
- ✅ **Composer(s)/Songwriter(s) Full Legal Names** (first/last; multiple entries; required per MLC)
- ✅ **Lyricist(s) Full Legal Names** (separate from composers if different)
- ✅ **Roles for Each Contributor** (Composer, Lyricist, Composer & Lyricist; dropdown enforced)
- ✅ **Publisher Name(s) and Contact Info** (self-published if independent)
- ✅ **Ownership Percentages** (composition and master rights splits totaling 100%)
- ✅ **IPI/CAE Numbers** (unique IDs from PROs; optional but recommended for faster payouts)
- ✅ **ISRC Code** (International Standard Recording Code; auto-generate if none provided)
- ✅ **ISWC Code** (International Standard Musical Work Code; optional, aids MLC matching)
- ✅ **UPC/EAN** (for albums; auto-generate if needed)

#### Legal Warranties and Declarations (REQUIRED)
- ✅ **Master Recording Rights Ownership** (checkbox: 100% ownership or valid licenses)
- ✅ **Original Composition Warranty** (checkbox: composition is original, all samples cleared)
- ✅ **Sample/Cover Clearance** (checkbox: mechanical licenses for covers via HFA/MLC)
- ✅ **Explicit Content Flag** (yes/no for parental advisories)
- ✅ **Territory Rights** (worldwide or specific countries)
- ✅ **Indemnification Agreement** (checkbox: user agrees to indemnify platform against claims)

#### Data Storage for Audits
- ✅ **Timestamps** (stored for all legal declarations)
- ✅ **IP Addresses** (recorded for legal audits)
- ✅ **User Session Data** (stored for compliance verification)

### 1.2 Validation Requirements

**Mandatory Validations:**
- Composers must have both first and last legal names (no nicknames/initials)
- Ownership percentages must total exactly 100%
- At least one composer required
- ISRC format validation (if provided)
- ISWC format validation (if provided)
- Release date must be valid date (can be future-dated)
- Cover art dimensions validation (minimum 1400x1400px)
- Audio file format validation (WAV, FLAC, MP3, M4A, MP4)

**Rejection Criteria:**
- Missing required fields
- Invalid ownership percentages (not totaling 100%)
- Invalid date formats
- Unsupported file formats
- Missing legal warranties

### 1.3 Metadata Cross-Reference (Recommended)

Integrate with external services for metadata validation:
- **MLC Portal API** (cross-check songwriter/composer metadata)
- **Songtrust API** (metadata validation and publisher matching)
- **BMI Songview API** (verify tracks in BMI repertory)
- **Revelator API** (automated metadata formatting for scale)

---

## 2. Backend System Obligations for Compliance

### 2.1 DSP Registration & Licensing

**Required Registrations:**
1. **U.S. Copyright Office** - Register as a Digital Service Provider (DSP)
2. **Mechanical Licensing Collective (MLC)** - Register for mechanical royalty reporting
3. **Performance Rights Organizations (PROs)** - Secure blanket licenses:
   - ASCAP (New Media License for digital streaming)
   - BMI (Online Service License tailored to DSPs)
   - SESAC (Digital Service License)
   - Global Music Rights (GMR) (Negotiated license)

**Initial Costs:**
- DSP application fees: $5,000-$20,000
- Legal setup and compliance: $10,000-$50,000
- PRO license applications: $5,000-$30,000
- **Total Estimated Initial:** $20,000-$100,000

**Ongoing Costs:**
- Mechanical royalties: ~15.35% of revenue (paid monthly to MLC)
- PRO license fees: 5-10% of music-related revenue (varies by PRO)
- Platform fees: 10-20% of revenue (your service fee)
- Metadata validation API costs: $500-$2,000/month

### 2.2 Content Ingestion & Storage

**File Storage Requirements:**
- Encrypted storage (AES-256) for all uploaded audio files
- S3-compatible storage (AWS S3, Google Cloud Storage, or Azure Blob)
- Lossless format support (WAV, FLAC) for premium tier
- Compressed formats (MP3 320kbps minimum) for standard tier
- CDN integration for streaming delivery

**Metadata Storage:**
- PostgreSQL database for structured metadata
- JSONB fields for flexible contributor/publisher arrays
- Full-text search indexes for track titles, artist names
- Timestamped audit logs for all legal declarations

**Database Schema Requirements:**
```sql
-- Tracks table should include:
- rights_metadata JSONB (composers, lyricists, publishers, ownership splits)
- legal_declarations JSONB (warranties, timestamps, IP addresses)
- pro_affiliation VARCHAR
- explicit_content BOOLEAN
- territory_rights JSONB
- isrc VARCHAR UNIQUE
- iswc VARCHAR
- upc VARCHAR
```

### 2.3 Content ID & Infringement Detection

**Required Systems:**
- **Content ID Scanning** - Integrate with services like:
  - Audible Magic (audio fingerprinting)
  - YouTube Content ID API
  - Gracenote (metadata matching)
  
- **Automated Takedown Process** - If upload matches licensed repertory:
  - Flag for manual review
  - Verify PRO blanket license coverage
  - If not covered, reject upload or notify user

**DMCA Compliance:**
- Implement DMCA takedown notification system
- Designate DMCA agent (register with U.S. Copyright Office)
- Process takedown requests within 48 hours
- Counter-notification process for disputes

### 2.4 Royalty Accounting & Reporting

**Stream Tracking Requirements:**
- Precise play counts per track (use analytics: AWS CloudWatch, Google Analytics)
- User session tracking (unique listeners per track)
- Geographic distribution data (for territory rights enforcement)
- Subscription tier tracking (premium vs. free for royalty calculations)

**MLC Reporting (Quarterly):**
- Submit usage data to MLC portal (CSV/XML format per DDEX standards)
- Include play counts per ISRC/ISWC
- Report mechanical royalties (calculated at ~15.35% of revenue)
- Deadline: 45 days after end of quarter

**PRO Reporting (Annually/Bi-Annually):**
- ASCAP: Annual usage report with play counts
- BMI: Bi-annual reports with stream counts
- SESAC: Negotiated reporting schedule
- GMR: Negotiated reporting schedule

**Royalty Distribution:**
- Calculate royalties per track based on:
  - Total streams × per-stream rate ($0.004-$0.008 typical)
  - Deduct platform fees (10-20%)
  - Distribute to artists monthly/quarterly
  - Provide transparent payout dashboard

**Payout Processing:**
- Integrate with payment processors (Stripe, PayPal, ACH)
- Handle tax forms (W-9 for U.S. artists, international equivalents)
- Track recoupment (if Artist-Investor model)

### 2.5 Data Security & Privacy Compliance

**Required Security Measures:**
- **Encryption at Rest:** AES-256 for all stored files
- **Encryption in Transit:** TLS 1.3 for all API/streaming connections
- **Access Controls:** Role-based access control (RBAC) for admin/user data
- **Audit Logging:** Log all metadata changes, uploads, and royalty calculations

**Privacy Compliance:**
- **GDPR Compliance:** If serving EU users, implement data portability and right to deletion
- **CCPA Compliance:** California privacy rights (data access, deletion requests)
- **User Data Retention:** Retain legal declarations for 7+ years (statute of limitations)

### 2.6 Timeline & Development Estimates

**MVP Upload System Development:**
- **Phase 1:** Upload form with legal metadata (4-6 weeks)
- **Phase 2:** Backend ingestion & validation (4-6 weeks)
- **Phase 3:** PRO/MLC integration & reporting (8-12 weeks)
- **Phase 4:** Content ID scanning integration (4-6 weeks)
- **Phase 5:** Beta testing with real artists (4-8 weeks)
- **Total Estimated Timeline:** 3-6 months for MVP

**Scaling Considerations:**
- Implement queue-based processing (AWS SQS, RabbitMQ) for high-volume uploads
- Use caching (Redis) for metadata lookups
- Implement batch processing for royalty calculations

---

## 3. PRO Integration Guidance

### 3.1 ASCAP (American Society of Composers, Authors and Publishers)

**Coverage:** ~20 million musical works

**Application Process:**
1. Apply for "New Media License" at ascap.com
2. Complete online application (5-7 business days approval typical)
3. Provide platform revenue estimates and usage metrics
4. License covers digital streaming services

**Fee Structure:**
- Revenue-based: 5-10% of music-related income
- Usage metrics: Based on streams/sessions
- Minimum annual fee: $500-$2,000 (varies by service size)

**For Direct Uploads:**
- Your ASCAP license covers **performances** of ASCAP-licensed works
- **Users must register their own works with ASCAP** to receive performance royalties
- Provide guidance: Link to ascap.com/join in upload flow
- During upload: Require users to confirm ASCAP affiliation (if applicable)

**Client Recommendation:**
- Apply for ASCAP license **before launch**
- Educate users in ToS/upload flow about ASCAP registration benefits
- Provide resources: "Register with ASCAP to collect performance royalties"

### 3.2 BMI (Broadcast Music, Inc.)

**Coverage:** ~22 million musical works

**Application Process:**
1. Apply via bmi.com/licensing for "Online Service License"
2. DSP-specific license tailored to streaming services
3. Approval: 5-10 business days typical

**Fee Structure:**
- Revenue-based with flexible payment plans
- Similar to ASCAP: 5-10% of music-related revenue
- Negotiated based on service size and usage

**For Direct Uploads:**
- License covers performances; users handle their own BMI registration
- **Integration Tip:** Use BMI's Songview API during upload to verify if track is in BMI repertory
- Provide BMI registration link: bmi.com

**Client Recommendation:**
- Secure BMI license alongside ASCAP (blanket coverage)
- Integrate Songview API for upload-time metadata validation

### 3.3 SESAC

**Coverage:** ~1 million works (smaller but essential)

**Application Process:**
1. Apply at sesac.com/licensing for "Digital Service License"
2. Negotiated terms (often flat fee or percentage)
3. Approval: 10-15 business days typical

**Fee Structure:**
- Negotiated: Often flat annual fee or percentage of revenue
- Typically lower than ASCAP/BMI due to smaller catalog

**For Direct Uploads:**
- Similar to ASCAP/BMI: License covers performances; users register separately

### 3.4 Global Music Rights (GMR)

**Coverage:** High-profile artists and publishers (essential for major catalogs)

**Application Process:**
1. Apply at globalmusicrights.com
2. Negotiated license (often case-by-case)
3. Approval: 2-4 weeks typical

**Fee Structure:**
- Negotiated: Often flat fee or revenue percentage
- Can be higher than other PROs due to premium catalog

**For Direct Uploads:**
- Critical for major artists: Secure GMR license to avoid blocking major catalogs

### 3.5 PRO Integration Strategy

**Recommended Approach:**
1. **Secure all four PRO licenses before launch** (ASCAP, BMI, SESAC, GMR)
   - Total initial cost: $20,000-$100,000
   - Creates "blanket" legal coverage for streaming

2. **User Education in Upload Flow:**
   - In upload form: Include PRO affiliation dropdown
   - Provide links: ASCAP (ascap.com), BMI (bmi.com), SESAC (sesac.com), MLC (themlc.com/connect-to-collect)
   - Add ToS clause: "Artists are encouraged to register with a PRO to collect performance royalties"

3. **Royalty Flow Explanation:**
   - Performance royalties: ~$0.005 per stream via PRO (user collects directly from PRO)
   - Mechanical royalties: ~15.35% of revenue via MLC (your platform pays; MLC distributes)
   - Platform fees: 10-20% deducted before artist payouts

4. **International Considerations:**
   - For global reach: Affiliate with foreign PROs via ASCAP partnerships (e.g., PRS for UK)
   - Consider SOCAN (Canada), APRA (Australia) for international markets

5. **Risks Without PRO Licenses:**
   - DMCA takedown notices for unlicensed works
   - Lawsuits from PROs for unauthorized streaming
   - Platform shutdown by court order
   - **Bottom Line:** Cannot legally stream any PRO-affiliated track without blanket license

### 3.6 MLC (Mechanical Licensing Collective) Integration

**Purpose:** Handles mechanical royalties (composition rights for streaming)

**Registration:**
1. Register as DSP at themlc.com
2. Submit usage data quarterly via MLC portal
3. Pay mechanical royalties monthly (~15.35% of revenue)

**For Direct Uploads:**
- Your platform pays mechanical royalties to MLC
- MLC distributes to composers/songwriters based on metadata
- **Critical:** Accurate composer/songwriter metadata is essential for matching

**User Guidance:**
- Link to themlc.com/connect-to-collect in upload flow
- Encourage self-administered creators to register with MLC
- Provide ISWC code field (aids MLC matching)

---

## 4. Implementation Recommendations

### 4.1 Development Priorities

**Phase 1: MVP Upload System (Weeks 1-8)**
1. Implement comprehensive upload form with all legal metadata fields ✅ (COMPLETE)
2. Add validation for required fields and ownership percentages ✅ (COMPLETE)
3. Backend ingestion pipeline (file storage, metadata persistence)
4. Basic royalty calculation system

**Phase 2: PRO/MLC Integration (Weeks 9-16)**
1. Secure PRO licenses (ASCAP, BMI, SESAC, GMR)
2. Register with MLC as DSP
3. Implement quarterly reporting to MLC
4. Integrate BMI Songview API for metadata validation

**Phase 3: Content ID & Security (Weeks 17-24)**
1. Integrate Audible Magic or YouTube Content ID
2. Implement DMCA takedown system
3. Add encryption for file storage
4. Audit logging for legal compliance

**Phase 4: Beta Testing (Weeks 25-32)**
1. Test with real artists (10-20 beta users)
2. Verify metadata flows to MLC correctly
3. Test PRO license coverage
4. Refine royalty calculation accuracy

### 4.2 Technology Stack Recommendations

**Backend:**
- **Database:** PostgreSQL with JSONB for flexible metadata storage
- **File Storage:** AWS S3 (encrypted) or Google Cloud Storage
- **Queue Processing:** AWS SQS or RabbitMQ for async upload processing
- **Streaming Analytics:** AWS CloudWatch or Google Analytics for play counts

**APIs & Integrations:**
- **Metadata Validation:** Revelator API, Songtrust API
- **Content ID:** Audible Magic API, YouTube Content ID API
- **Payment Processing:** Stripe, PayPal for artist payouts
- **MLC Reporting:** MLC Portal API (quarterly CSV/XML uploads)

**Security:**
- **Encryption:** AWS KMS or Google Cloud KMS for key management
- **TLS:** Let's Encrypt for SSL certificates
- **Access Control:** OAuth 2.0, JWT for authentication

### 4.3 Cost Estimates

**Initial Setup:**
- DSP registration & legal: $20,000-$100,000
- PRO licenses: $20,000-$100,000 (one-time + ongoing)
- Development (3-6 months): $50,000-$200,000 (depends on team size)
- **Total Initial:** $90,000-$400,000

**Ongoing Monthly:**
- Mechanical royalties (15.35% of revenue): Variable
- PRO license fees (5-10% of revenue): Variable
- Infrastructure (AWS/S3, database): $500-$5,000/month
- API costs (metadata validation, content ID): $500-$2,000/month
- **Total Ongoing:** Revenue-dependent + $1,000-$7,000/month fixed

### 4.4 Risk Mitigation

**Legal Risks:**
- ✅ Require all legal warranties in upload form
- ✅ Store timestamps/IP addresses for audits
- ✅ Secure all PRO licenses before launch
- ✅ Implement DMCA takedown system
- ✅ Designate DMCA agent with U.S. Copyright Office

**Technical Risks:**
- ✅ Validate metadata at upload time (prevent incomplete submissions)
- ✅ Encrypt all stored files (AES-256)
- ✅ Implement audit logging for compliance
- ✅ Test metadata flows to MLC before launch

**Financial Risks:**
- ✅ Calculate royalties accurately (use precise stream counts)
- ✅ Transparent payout dashboard for artists
- ✅ Reserve funds for PRO license fees (based on revenue projections)

---

## 5. Resources & Documentation Links

**PRO Registration:**
- ASCAP: https://www.ascap.com
- BMI: https://www.bmi.com
- SESAC: https://www.sesac.com
- GMR: https://www.globalmusicrights.com

**MLC Resources:**
- MLC Portal: https://www.themlc.com
- MLC Connect: https://www.themlc.com/connect-to-collect
- DDEX Standards: https://www.ddex.net (metadata formatting)

**Legal Resources:**
- U.S. Copyright Office: https://www.copyright.gov
- DMCA Agent Registration: https://www.copyright.gov/dmca-directory/
- Music Modernization Act: https://www.copyright.gov/music-modernization/

**Technical Resources:**
- Revelator API: https://www.revelator.com (metadata automation)
- Songtrust: https://www.songtrust.com (publisher services)
- Audible Magic: https://www.audiblemagic.com (content ID)

---

## 6. Summary Checklist

### Frontend Requirements ✅
- [x] Comprehensive upload form with legal metadata fields
- [x] Validation for required fields (composers, ownership percentages)
- [x] Legal warranties and declarations section
- [x] PRO affiliation dropdown and guidance
- [x] Review step showing all metadata before submission

### Backend Requirements (To Be Implemented)
- [ ] DSP registration with U.S. Copyright Office and MLC
- [ ] PRO license applications (ASCAP, BMI, SESAC, GMR)
- [ ] Content ID scanning integration (Audible Magic/YouTube)
- [ ] Royalty calculation and reporting system
- [ ] Quarterly MLC reporting automation
- [ ] DMCA takedown system
- [ ] Encrypted file storage (AES-256)
- [ ] Audit logging for legal declarations

### Documentation ✅
- [x] Legal requirements documentation
- [x] PRO integration guidance
- [x] Backend system obligations
- [x] Cost estimates and timelines

---

**Next Steps:**
1. Review and approve this documentation
2. Begin backend development (file ingestion, metadata persistence)
3. Initiate PRO license applications (ASCAP, BMI, SESAC, GMR)
4. Register with MLC as DSP
5. Begin beta testing with real artists

---

**Document Owner:** Engineering & Development Team  
**Last Reviewed:** December 2025  
**Next Review:** Before MVP Launch
