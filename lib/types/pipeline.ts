/**
 * Type Definitions for Pipeline System
 * Proper types for external libraries and pipeline components
 */

/**
 * Neo4j Driver Types
 */
export interface Neo4jDriver {
  session(): Neo4jSession;
  verifyConnectivity(): Promise<void>;
  close(): Promise<void>;
}

export interface Neo4jSession {
  run(query: string, parameters?: any): Promise<Neo4jResult>;
  beginTransaction(): Neo4jTransaction;
  close(): Promise<void>;
}

export interface Neo4jTransaction {
  run(query: string, parameters?: any): Promise<Neo4jResult>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface Neo4jResult {
  records: Neo4jRecord[];
  summary: Neo4jSummary;
}

export interface Neo4jRecord {
  get(key: string): any;
  keys: string[];
}

export interface Neo4jSummary {
  query: { text: string };
  resultAvailableAfter: number;
  resultConsumedAfter: number;
}

/**
 * Pinecone Types
 */
export interface PineconeClient {
  index(name: string): PineconeIndex;
}

export interface PineconeIndex {
  query(params: PineconeQueryParams): Promise<PineconeQueryResponse>;
  upsert(vectors: PineconeVector[]): Promise<void>;
  describeIndexStats(): Promise<PineconeIndexStats>;
}

export interface PineconeQueryParams {
  vector: number[];
  topK: number;
  includeMetadata?: boolean;
  includeValues?: boolean;
  namespace?: string;
  filter?: Record<string, any>;
}

export interface PineconeQueryResponse {
  matches: PineconeMatch[];
  namespace?: string;
}

export interface PineconeMatch {
  id: string;
  score?: number;
  values?: number[];
  metadata?: Record<string, any>;
}

export interface PineconeVector {
  id: string;
  values: number[];
  metadata?: Record<string, any>;
}

export interface PineconeIndexStats {
  namespaces: Record<string, { vectorCount: number }>;
  dimension: number;
  indexFullness: number;
  totalVectorCount: number;
}

/**
 * Audio Processing Types
 */
export interface AudioBuffer {
  sampleRate: number;
  duration: number;
  length: number;
  numberOfChannels: number;
  getChannelData(channel: number): Float32Array;
}

export interface AudioContext {
  decodeAudioData(audioData: ArrayBuffer): Promise<AudioBuffer>;
  createAnalyser(): AnalyserNode;
  close(): Promise<void>;
}

export interface AnalyserNode {
  fftSize: number;
  frequencyBinCount: number;
  getByteFrequencyData(array: Uint8Array): void;
  getFloatFrequencyData(array: Float32Array): void;
}

/**
 * Pipeline Execution Types
 */
export interface PipelineHealthStatus {
  component: string;
  status: "healthy" | "degraded" | "unhealthy";
  latency?: number;
  error?: string;
  timestamp: number;
}

export interface SystemHealthReport {
  overall: "healthy" | "degraded" | "unhealthy";
  components: PipelineHealthStatus[];
  timestamp: number;
}
