/**
 * Validation Utilities for RAG/Pipeline System
 * Input validation for embeddings, features, and other pipeline data
 */

/**
 * Validate embedding vector
 */
export function validateEmbedding(
  embedding: number[] | undefined | null,
  options: {
    minDimensions?: number;
    maxDimensions?: number;
    required?: boolean;
    name?: string;
<<<<<<< HEAD
  } = {},
=======
  } = {}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
): void {
  const {
    minDimensions,
    maxDimensions,
    required = true,
<<<<<<< HEAD
    name = "Embedding",
=======
    name = 'Embedding',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  } = options;

  if (embedding === null || embedding === undefined) {
    if (required) {
      throw new Error(`${name} is required but was null or undefined`);
    }
    return;
  }

  if (!Array.isArray(embedding)) {
    throw new Error(`${name} must be an array, got ${typeof embedding}`);
  }

  if (embedding.length === 0 && required) {
    throw new Error(`${name} is required but is empty`);
  }

  // Check for invalid values (NaN, Infinity)
  const invalidIndices: number[] = [];
  for (let i = 0; i < embedding.length; i++) {
    const value = embedding[i];
<<<<<<< HEAD
    if (typeof value !== "number" || !isFinite(value)) {
=======
    if (typeof value !== 'number' || !isFinite(value)) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      invalidIndices.push(i);
    }
  }

  if (invalidIndices.length > 0) {
    throw new Error(
<<<<<<< HEAD
      `${name} contains invalid values (NaN or Infinity) at indices: ${invalidIndices.slice(0, 10).join(", ")}${invalidIndices.length > 10 ? "..." : ""}`,
=======
      `${name} contains invalid values (NaN or Infinity) at indices: ${invalidIndices.slice(0, 10).join(', ')}${invalidIndices.length > 10 ? '...' : ''}`
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }

  if (minDimensions !== undefined && embedding.length < minDimensions) {
    throw new Error(
<<<<<<< HEAD
      `${name} has ${embedding.length} dimensions, but minimum is ${minDimensions}`,
=======
      `${name} has ${embedding.length} dimensions, but minimum is ${minDimensions}`
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }

  if (maxDimensions !== undefined && embedding.length > maxDimensions) {
    throw new Error(
<<<<<<< HEAD
      `${name} has ${embedding.length} dimensions, but maximum is ${maxDimensions}`,
=======
      `${name} has ${embedding.length} dimensions, but maximum is ${maxDimensions}`
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}

/**
 * Validate embedding dimensions match expected size
 */
export function validateEmbeddingDimensions(
  embedding: number[],
  expectedDimensions: number,
<<<<<<< HEAD
  name: string = "Embedding",
): void {
  if (embedding.length !== expectedDimensions) {
    throw new Error(
      `${name} dimension mismatch: expected ${expectedDimensions}, got ${embedding.length}`,
=======
  name: string = 'Embedding'
): void {
  if (embedding.length !== expectedDimensions) {
    throw new Error(
      `${name} dimension mismatch: expected ${expectedDimensions}, got ${embedding.length}`
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}

/**
 * Validate audio features
 */
export function validateAudioFeatures(features: any): void {
<<<<<<< HEAD
  if (!features || typeof features !== "object") {
    throw new Error("Audio features must be an object");
  }

  const requiredFields = ["tempo", "duration", "beatStrength", "mfcc"];
=======
  if (!features || typeof features !== 'object') {
    throw new Error('Audio features must be an object');
  }

  const requiredFields = ['tempo', 'duration', 'beatStrength', 'mfcc'];
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  for (const field of requiredFields) {
    if (!(field in features)) {
      throw new Error(`Audio features missing required field: ${field}`);
    }
  }

  // Validate MFCC is an array
  if (!Array.isArray(features.mfcc)) {
<<<<<<< HEAD
    throw new Error("Audio features.mfcc must be an array");
  }

  // Validate numeric fields are finite
  const numericFields = ["tempo", "duration", "beatStrength"];
  for (const field of numericFields) {
    const value = features[field];
    if (typeof value !== "number" || !isFinite(value)) {
      throw new Error(
        `Audio features.${field} must be a finite number, got ${value}`,
      );
=======
    throw new Error('Audio features.mfcc must be an array');
  }

  // Validate numeric fields are finite
  const numericFields = ['tempo', 'duration', 'beatStrength'];
  for (const field of numericFields) {
    const value = features[field];
    if (typeof value !== 'number' || !isFinite(value)) {
      throw new Error(`Audio features.${field} must be a finite number, got ${value}`);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
  }
}

/**
 * Validate track ID format
 */
export function validateTrackId(trackId: string): void {
<<<<<<< HEAD
  if (!trackId || typeof trackId !== "string") {
    throw new Error("Track ID must be a non-empty string");
  }

  if (trackId.trim().length === 0) {
    throw new Error("Track ID cannot be empty or whitespace");
=======
  if (!trackId || typeof trackId !== 'string') {
    throw new Error('Track ID must be a non-empty string');
  }

  if (trackId.trim().length === 0) {
    throw new Error('Track ID cannot be empty or whitespace');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  // Basic validation: no special characters that could cause issues
  if (/[<>"']/.test(trackId)) {
<<<<<<< HEAD
    throw new Error("Track ID contains invalid characters");
=======
    throw new Error('Track ID contains invalid characters');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}

/**
 * Validate vector DB configuration
 */
export function validateVectorDBConfig(config: any): void {
<<<<<<< HEAD
  if (!config || typeof config !== "object") {
    throw new Error("Vector DB configuration must be an object");
  }

  if (config.type === "pinecone") {
    if (!config.apiKey || typeof config.apiKey !== "string") {
      throw new Error("Pinecone configuration requires apiKey");
    }
    if (!config.indexName || typeof config.indexName !== "string") {
      throw new Error("Pinecone configuration requires indexName");
    }
  } else if (config.type === "faiss") {
    if (!config.indexPath || typeof config.indexPath !== "string") {
      throw new Error("FAISS configuration requires indexPath");
    }
  } else {
    throw new Error(
      `Unknown vector DB type: ${config.type}. Must be 'pinecone' or 'faiss'`,
    );
=======
  if (!config || typeof config !== 'object') {
    throw new Error('Vector DB configuration must be an object');
  }

  if (config.type === 'pinecone') {
    if (!config.apiKey || typeof config.apiKey !== 'string') {
      throw new Error('Pinecone configuration requires apiKey');
    }
    if (!config.indexName || typeof config.indexName !== 'string') {
      throw new Error('Pinecone configuration requires indexName');
    }
  } else if (config.type === 'faiss') {
    if (!config.indexPath || typeof config.indexPath !== 'string') {
      throw new Error('FAISS configuration requires indexPath');
    }
  } else {
    throw new Error(`Unknown vector DB type: ${config.type}. Must be 'pinecone' or 'faiss'`);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}

/**
 * Validate Neo4j configuration
 */
export function validateNeo4jConfig(config: any): void {
<<<<<<< HEAD
  if (!config || typeof config !== "object") {
    throw new Error("Neo4j configuration must be an object");
  }

  if (!config.uri || typeof config.uri !== "string") {
    throw new Error("Neo4j configuration requires uri");
  }

  if (!config.user || typeof config.user !== "string") {
    throw new Error("Neo4j configuration requires user");
  }

  if (!config.password || typeof config.password !== "string") {
    throw new Error("Neo4j configuration requires password");
=======
  if (!config || typeof config !== 'object') {
    throw new Error('Neo4j configuration must be an object');
  }

  if (!config.uri || typeof config.uri !== 'string') {
    throw new Error('Neo4j configuration requires uri');
  }

  if (!config.user || typeof config.user !== 'string') {
    throw new Error('Neo4j configuration requires user');
  }

  if (!config.password || typeof config.password !== 'string') {
    throw new Error('Neo4j configuration requires password');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}
