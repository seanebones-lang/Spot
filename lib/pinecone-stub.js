// Stub for Pinecone when package is not installed
// This allows the build to succeed even without Pinecone installed
module.exports = {
  Pinecone: class PineconeStub {
    constructor() {
      throw new Error('Pinecone package not installed. Install with: npm install @pinecone-database/pinecone');
    }
  }
};
