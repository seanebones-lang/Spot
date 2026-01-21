// Stub for Pinecone when package is not installed
// This allows the build to succeed even without Pinecone installed
module.exports = {
  Pinecone: class PineconeStub {
    constructor() {
<<<<<<< HEAD
      throw new Error(
        "Pinecone package not installed. Install with: npm install @pinecone-database/pinecone",
      );
    }
  },
=======
      throw new Error('Pinecone package not installed. Install with: npm install @pinecone-database/pinecone');
    }
  }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
};
