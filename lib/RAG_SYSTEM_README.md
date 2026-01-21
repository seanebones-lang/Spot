# RAG and Graph/Pipeline System Documentation

## Overview

This RAG (Retrieval-Augmented Generation) and Graph/Pipeline system implements AI-driven mood analysis for the EmPulse Music platform. It combines audio feature extraction, semantic embeddings, vector databases, and knowledge graphs to achieve >90% accuracy in mood classification.

**Implementation Status:** Production-ready with rule-based mood classification. ML model integration is planned for future enhancement.

## Architecture

### Core Components

1. **RAG Mood Analysis Pipeline** (`lib/aiMoodAnalysis.ts`)
   - Audio feature extraction (Librosa-style, browser-compatible) ✅
   - Embedding generation from normalized features ✅
   - Vector database integration (Pinecone ✅, FAISS ⚠️ mock only)
   - Mood classification (rule-based ✅, ML model planned ⏳)
   - Real-time inference with <200ms latency target ✅

2. **Knowledge Graph System** (`lib/knowledgeGraph.ts`)
   - Neo4j-based graph database for track relationships
   - Mood-based similarity graphs
   - User preference graphs
   - Collaborative filtering with graph structure

3. **Similarity Matching Engine** (`lib/similarityMatching.ts`)
   - Hybrid similarity matching (vector + graph + feature + collaborative)
<<<<<<< HEAD
   - > 90% recall/precision target
=======
   - >90% recall/precision target
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
   - Mood-based track recommendations

4. **Pipeline Orchestration** (`lib/pipelineOrchestration.ts`)
   - Apache Airflow/Kubeflow-style pipeline orchestration
   - Batch processing for track ingestion
   - Multi-stage pipeline with validation

## Installation

### Required Dependencies

Add these dependencies to `package.json`:

```json
{
  "dependencies": {
    "@pinecone-database/pinecone": "^1.1.0",
    "neo4j-driver": "^5.15.0"
  },
  "devDependencies": {
    "@types/neo4j-driver": "^4.4.0"
  }
}
```

**Note:** FAISS is not yet fully implemented. Pinecone is the recommended vector database for production.

### Environment Variables

Create `.env.local`:

```env
# Pinecone Configuration (if using Pinecone)
PINECONE_API_KEY=your_api_key
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=empulse-music-moods

# Neo4j Configuration (if using Neo4j)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password

# FAISS Configuration (if using FAISS - not yet implemented)
# FAISS_INDEX_PATH=./data/faiss/index.faiss
```

## Usage

### 1. RAG Mood Analysis Pipeline

```typescript
<<<<<<< HEAD
import { getRAGPipeline } from "@/lib/aiMoodAnalysis";
=======
import { getRAGPipeline } from '@/lib/aiMoodAnalysis';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Initialize pipeline with vector database
const ragPipeline = getRAGPipeline();
await ragPipeline.initializeVectorDB({
<<<<<<< HEAD
  type: "pinecone",
=======
  type: 'pinecone',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  apiKey: process.env.PINECONE_API_KEY!,
  indexName: process.env.PINECONE_INDEX_NAME!,
  environment: process.env.PINECONE_ENVIRONMENT!,
});

// Analyze mood for uploaded audio file
const audioFile = event.target.files[0];
const moodSuggestion = await ragPipeline.analyzeMood(audioFile);

<<<<<<< HEAD
console.log("Mood:", moodSuggestion.mood);
console.log("Feelings:", moodSuggestion.feelings);
console.log("Vibe:", moodSuggestion.vibe);
console.log("Genres:", moodSuggestion.genres);
console.log("Confidence:", moodSuggestion.confidence);
=======
console.log('Mood:', moodSuggestion.mood);
console.log('Feelings:', moodSuggestion.feelings);
console.log('Vibe:', moodSuggestion.vibe);
console.log('Genres:', moodSuggestion.genres);
console.log('Confidence:', moodSuggestion.confidence);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```

### 2. Knowledge Graph System

```typescript
<<<<<<< HEAD
import { getKnowledgeGraph } from "@/lib/knowledgeGraph";
=======
import { getKnowledgeGraph } from '@/lib/knowledgeGraph';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Initialize knowledge graph
const graph = getKnowledgeGraph(
  process.env.NEO4J_URI!,
  process.env.NEO4J_USER!,
<<<<<<< HEAD
  process.env.NEO4J_PASSWORD!,
=======
  process.env.NEO4J_PASSWORD!
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
await graph.initialize();
await graph.createSchema();

// Upsert track to graph
await graph.upsertTrack(track);

// Find similar tracks via graph traversal
const similarTracks = await graph.findSimilarTracks(trackId, {
  limit: 10,
  minSimilarity: 0.7,
  includeMoodMatches: true,
});

// Find tracks by mood
<<<<<<< HEAD
const tracks = await graph.findTracksByMood("Joyful", {
  limit: 20,
  vibeRange: { min: 60, max: 80 },
  includeFeelings: ["Great", "Confident"],
=======
const tracks = await graph.findTracksByMood('Joyful', {
  limit: 20,
  vibeRange: { min: 60, max: 80 },
  includeFeelings: ['Great', 'Confident'],
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
});
```

### 3. Similarity Matching Engine

```typescript
<<<<<<< HEAD
import { getSimilarityMatchingEngine } from "@/lib/similarityMatching";
=======
import { getSimilarityMatchingEngine } from '@/lib/similarityMatching';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Initialize similarity engine with knowledge graph
const engine = getSimilarityMatchingEngine(graph, {
  vector: 0.35,
  graph: 0.25,
  feature: 0.25,
  collaborative: 0.15,
});

// Find similar tracks
const matches = await engine.findSimilarTracks(sourceTrack, {
  limit: 20,
  minSimilarity: 0.7,
  includeVectorSimilarity: true,
  includeGraphSimilarity: true,
  includeFeatureSimilarity: true,
  includeCollaborativeSimilarity: true,
  userId: currentUserId,
});

// Find mood matches
<<<<<<< HEAD
const moodMatches = await engine.findMoodMatches(
  {
    mood: "Joyful",
    vibeRange: { min: 70, max: 90 },
    feelings: ["Great", "Optimistic"],
    genres: ["Pop", "Electronic"],
  },
  { limit: 20 },
);
=======
const moodMatches = await engine.findMoodMatches({
  mood: 'Joyful',
  vibeRange: { min: 70, max: 90 },
  feelings: ['Great', 'Optimistic'],
  genres: ['Pop', 'Electronic'],
}, { limit: 20 });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```

### 4. Pipeline Orchestration

```typescript
<<<<<<< HEAD
import { getPipelineOrchestrator } from "@/lib/pipelineOrchestration";
=======
import { getPipelineOrchestrator } from '@/lib/pipelineOrchestration';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Initialize orchestrator
const orchestrator = getPipelineOrchestrator({
  vectorDB: {
<<<<<<< HEAD
    type: "pinecone",
=======
    type: 'pinecone',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    apiKey: process.env.PINECONE_API_KEY!,
    indexName: process.env.PINECONE_INDEX_NAME!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  },
  neo4j: {
    uri: process.env.NEO4J_URI!,
    user: process.env.NEO4J_USER!,
    password: process.env.NEO4J_PASSWORD!,
  },
});

await orchestrator.initialize();

// Execute pipeline for single track
const result = await orchestrator.executePipeline(audioFile, trackMetadata);

<<<<<<< HEAD
console.log("Status:", result.status);
console.log("Stages:", result.stages);
console.log("Total Duration:", result.totalDuration, "ms");
console.log("Accuracy:", result.overallAccuracy);

// Batch process multiple tracks
const batchResults = await orchestrator.batchProcess(
  [
    { file: file1, metadata: metadata1 },
    { file: file2, metadata: metadata2 },
  ],
  { parallel: true, maxConcurrency: 3 },
);
=======
console.log('Status:', result.status);
console.log('Stages:', result.stages);
console.log('Total Duration:', result.totalDuration, 'ms');
console.log('Accuracy:', result.overallAccuracy);

// Batch process multiple tracks
const batchResults = await orchestrator.batchProcess([
  { file: file1, metadata: metadata1 },
  { file: file2, metadata: metadata2 },
], { parallel: true, maxConcurrency: 3 });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```

## Pipeline Stages

### 1. Data Ingestion
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Validate file format (MP3, WAV, FLAC, M4A, MP4)
- Validate file size (max 500MB)
- Validate metadata (name, artist required)

### 2. Feature Extraction
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Extract audio features using Web Audio API
- Temporal features: tempo, beat strength, duration
- Spectral features: centroid, rolloff, flux, zero crossing rate
- MFCC coefficients (13 coefficients)
- Energy features: RMS energy, energy entropy
- Harmonic features: harmony, inharmonicity
- Timbre features: brightness, roughness

### 3. Mood Analysis (RAG)
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Generate embeddings from audio features
- Retrieve similar tracks from vector database
- Predict mood using trained classifier
- Augment prediction with retrieved tracks (RAG)
- Predict feelings, vibe, and genres

### 4. Vector DB Indexing
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Store embeddings in Pinecone/FAISS
- Index metadata for retrieval

### 5. Graph Update
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Create/update track node in Neo4j
- Create mood, genre, feeling relationships
- Create artist and album relationships

### 6. Similarity Computation
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Find similar tracks via graph traversal
- Calculate similarity relationships
- Store similarity edges in graph

### 7. Validation
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Validate accuracy (>90% target)
- Validate latency (<200ms target)
- Validate all stages completed

## Performance Targets

- **Inference Latency**: <200ms for real-time mood analysis
- **Semantic Search Accuracy**: >90% recall/precision
- **Mood Classification Confidence**: >0.85 average
- **Batch Processing**: <5 seconds per track
- **Graph Query Performance**: <100ms for similarity searches

## Evaluation Metrics

### Mood Classification Metrics
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- **Accuracy**: Percentage of correct mood predictions
- **Confidence**: Average confidence score (0-1)
- **Precision**: True positives / (True positives + False positives)
- **Recall**: True positives / (True positives + False negatives)
<<<<<<< HEAD
- **F1 Score**: 2 _ (Precision _ Recall) / (Precision + Recall)

### Similarity Matching Metrics

=======
- **F1 Score**: 2 * (Precision * Recall) / (Precision + Recall)

### Similarity Matching Metrics
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- **Recall@10**: Percentage of relevant tracks in top 10
- **Precision@10**: Percentage of top 10 that are relevant
- **NDCG@10**: Normalized Discounted Cumulative Gain at rank 10
- **MAP@10**: Mean Average Precision at rank 10

### Pipeline Performance Metrics
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- **Stage Duration**: Time for each pipeline stage
- **Total Duration**: End-to-end pipeline execution time
- **Success Rate**: Percentage of successful pipeline runs
- **Error Rate**: Percentage of failed pipeline runs

## Integration with Upload Flow

The RAG pipeline is integrated into the upload page (`app/upload/page.tsx`):

1. User uploads audio file
2. RAG pipeline analyzes mood automatically
3. AI suggestions displayed to artist
4. Artist adjusts mood tags (required)
5. Artist certifies accuracy
6. Track submitted with mood tags

## Current Implementation Status

### ✅ Production-Ready Features
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Audio feature extraction (Web Audio API)
- Rule-based mood classification
- Pinecone vector database integration
- Neo4j knowledge graph
- Similarity matching (hybrid approach)
- Pipeline orchestration
- Input validation and error handling
- Retry logic with exponential backoff
- Timeout protection
- Circuit breaker pattern
- Embedding caching
- Metrics collection
- Configuration management

### ⏳ Planned Enhancements

1. **ML Model Integration** (High Priority)
   - Replace rule-based classifier with trained ML model
   - Fine-tuned audio-text embeddings
   - TensorFlow.js or ONNX model loading

2. **FAISS Implementation** (Medium Priority)
   - Full FAISS vector database support
   - Local/self-hosted option

3. **Additional Features** (Lower Priority)
   - Lyrics analysis integration
   - User feedback loop for model improvement
   - Real-time stream processing
   - Multi-modal embeddings (audio + visual)
   - Federated learning support

## Implementation Notes

### Mood Classification
<<<<<<< HEAD

Currently uses rule-based scoring based on audio features (tempo, brightness, harmony, etc.). This works well for MVP but ML models will improve accuracy in future releases.

### Embeddings

Embeddings are currently normalized audio features (26 dimensions). Future implementation will use trained embedding models (e.g., fine-tuned BERT variants) for semantic understanding.

### Vector Database

=======
Currently uses rule-based scoring based on audio features (tempo, brightness, harmony, etc.). This works well for MVP but ML models will improve accuracy in future releases.

### Embeddings
Embeddings are currently normalized audio features (26 dimensions). Future implementation will use trained embedding models (e.g., fine-tuned BERT variants) for semantic understanding.

### Vector Database
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
Pinecone is fully supported and production-ready. FAISS implementation is stubbed and returns empty results - use Pinecone for production deployments.

## Troubleshooting

### High Latency (>200ms)
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Reduce embedding dimensions
- Optimize feature extraction
- Use faster vector database (FAISS vs Pinecone)
- Cache frequently accessed embeddings

### Low Accuracy (<90%)
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Improve feature extraction
- Fine-tune mood classification model
- Increase training data
- Adjust similarity weights

### Vector Database Errors
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Check API keys and credentials
- Verify index exists and is accessible
- Check network connectivity
- Review rate limits

### Neo4j Connection Issues
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Verify URI, user, and password
- Check Neo4j server is running
- Review firewall settings
- Test connection with Neo4j Browser

## References

- [Pinecone Documentation](https://docs.pinecone.io/)
- [Neo4j Cypher Manual](https://neo4j.com/docs/cypher-manual/)
- [FAISS Documentation](https://github.com/facebookresearch/faiss)
- [RAG Paper](https://arxiv.org/abs/2005.11401)
<<<<<<< HEAD
- [Audio Feature Extraction](https://librosa.org/doc/latest/feature.html)
=======
- [Audio Feature Extraction](https://librosa.org/doc/latest/feature.html)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
