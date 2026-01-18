# RAG and Graph/Pipeline System Documentation

## Overview

This RAG (Retrieval-Augmented Generation) and Graph/Pipeline system implements AI-driven mood analysis for the EmPulse Music platform. It combines audio feature extraction, semantic embeddings, vector databases, and knowledge graphs to achieve >90% accuracy in mood classification.

## Architecture

### Core Components

1. **RAG Mood Analysis Pipeline** (`lib/aiMoodAnalysis.ts`)
   - Audio feature extraction (Librosa-style, browser-compatible)
   - Embedding generation from audio features
   - Vector database integration (Pinecone/FAISS)
   - Mood classification model (fine-tuned in-house)
   - Real-time inference with <200ms latency target

2. **Knowledge Graph System** (`lib/knowledgeGraph.ts`)
   - Neo4j-based graph database for track relationships
   - Mood-based similarity graphs
   - User preference graphs
   - Collaborative filtering with graph structure

3. **Similarity Matching Engine** (`lib/similarityMatching.ts`)
   - Hybrid similarity matching (vector + graph + feature + collaborative)
   - >90% recall/precision target
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
    "neo4j-driver": "^5.15.0",
    "faiss-node": "^0.3.0"
  },
  "devDependencies": {
    "@types/neo4j-driver": "^4.4.0"
  }
}
```

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

# FAISS Configuration (if using FAISS)
FAISS_INDEX_PATH=./data/faiss/index.faiss
```

## Usage

### 1. RAG Mood Analysis Pipeline

```typescript
import { getRAGPipeline } from '@/lib/aiMoodAnalysis';

// Initialize pipeline with vector database
const ragPipeline = getRAGPipeline();
await ragPipeline.initializeVectorDB({
  type: 'pinecone',
  apiKey: process.env.PINECONE_API_KEY!,
  indexName: process.env.PINECONE_INDEX_NAME!,
  environment: process.env.PINECONE_ENVIRONMENT!,
});

// Analyze mood for uploaded audio file
const audioFile = event.target.files[0];
const moodSuggestion = await ragPipeline.analyzeMood(audioFile);

console.log('Mood:', moodSuggestion.mood);
console.log('Feelings:', moodSuggestion.feelings);
console.log('Vibe:', moodSuggestion.vibe);
console.log('Genres:', moodSuggestion.genres);
console.log('Confidence:', moodSuggestion.confidence);
```

### 2. Knowledge Graph System

```typescript
import { getKnowledgeGraph } from '@/lib/knowledgeGraph';

// Initialize knowledge graph
const graph = getKnowledgeGraph(
  process.env.NEO4J_URI!,
  process.env.NEO4J_USER!,
  process.env.NEO4J_PASSWORD!
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
const tracks = await graph.findTracksByMood('Joyful', {
  limit: 20,
  vibeRange: { min: 60, max: 80 },
  includeFeelings: ['Great', 'Confident'],
});
```

### 3. Similarity Matching Engine

```typescript
import { getSimilarityMatchingEngine } from '@/lib/similarityMatching';

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
const moodMatches = await engine.findMoodMatches({
  mood: 'Joyful',
  vibeRange: { min: 70, max: 90 },
  feelings: ['Great', 'Optimistic'],
  genres: ['Pop', 'Electronic'],
}, { limit: 20 });
```

### 4. Pipeline Orchestration

```typescript
import { getPipelineOrchestrator } from '@/lib/pipelineOrchestration';

// Initialize orchestrator
const orchestrator = getPipelineOrchestrator({
  vectorDB: {
    type: 'pinecone',
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

console.log('Status:', result.status);
console.log('Stages:', result.stages);
console.log('Total Duration:', result.totalDuration, 'ms');
console.log('Accuracy:', result.overallAccuracy);

// Batch process multiple tracks
const batchResults = await orchestrator.batchProcess([
  { file: file1, metadata: metadata1 },
  { file: file2, metadata: metadata2 },
], { parallel: true, maxConcurrency: 3 });
```

## Pipeline Stages

### 1. Data Ingestion
- Validate file format (MP3, WAV, FLAC, M4A, MP4)
- Validate file size (max 500MB)
- Validate metadata (name, artist required)

### 2. Feature Extraction
- Extract audio features using Web Audio API
- Temporal features: tempo, beat strength, duration
- Spectral features: centroid, rolloff, flux, zero crossing rate
- MFCC coefficients (13 coefficients)
- Energy features: RMS energy, energy entropy
- Harmonic features: harmony, inharmonicity
- Timbre features: brightness, roughness

### 3. Mood Analysis (RAG)
- Generate embeddings from audio features
- Retrieve similar tracks from vector database
- Predict mood using trained classifier
- Augment prediction with retrieved tracks (RAG)
- Predict feelings, vibe, and genres

### 4. Vector DB Indexing
- Store embeddings in Pinecone/FAISS
- Index metadata for retrieval

### 5. Graph Update
- Create/update track node in Neo4j
- Create mood, genre, feeling relationships
- Create artist and album relationships

### 6. Similarity Computation
- Find similar tracks via graph traversal
- Calculate similarity relationships
- Store similarity edges in graph

### 7. Validation
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
- **Accuracy**: Percentage of correct mood predictions
- **Confidence**: Average confidence score (0-1)
- **Precision**: True positives / (True positives + False positives)
- **Recall**: True positives / (True positives + False negatives)
- **F1 Score**: 2 * (Precision * Recall) / (Precision + Recall)

### Similarity Matching Metrics
- **Recall@10**: Percentage of relevant tracks in top 10
- **Precision@10**: Percentage of top 10 that are relevant
- **NDCG@10**: Normalized Discounted Cumulative Gain at rank 10
- **MAP@10**: Mean Average Precision at rank 10

### Pipeline Performance Metrics
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

## Future Enhancements

1. **Fine-tuned Models**: Train custom models on music dataset
2. **Lyrics Analysis**: Incorporate lyrics for better mood detection
3. **User Feedback Loop**: Learn from artist adjustments
4. **Real-time Updates**: Stream processing for live mood analysis
5. **Multi-modal Embeddings**: Combine audio + visual (album art) embeddings
6. **Federated Learning**: Train models across distributed data

## Troubleshooting

### High Latency (>200ms)
- Reduce embedding dimensions
- Optimize feature extraction
- Use faster vector database (FAISS vs Pinecone)
- Cache frequently accessed embeddings

### Low Accuracy (<90%)
- Improve feature extraction
- Fine-tune mood classification model
- Increase training data
- Adjust similarity weights

### Vector Database Errors
- Check API keys and credentials
- Verify index exists and is accessible
- Check network connectivity
- Review rate limits

### Neo4j Connection Issues
- Verify URI, user, and password
- Check Neo4j server is running
- Review firewall settings
- Test connection with Neo4j Browser

## References

- [Pinecone Documentation](https://docs.pinecone.io/)
- [Neo4j Cypher Manual](https://neo4j.com/docs/cypher-manual/)
- [FAISS Documentation](https://github.com/facebookresearch/faiss)
- [RAG Paper](https://arxiv.org/abs/2005.11401)
- [Audio Feature Extraction](https://librosa.org/doc/latest/feature.html)