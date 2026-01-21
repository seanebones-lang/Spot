/**
 * Environment Variable Validation
 * Validates all required environment variables at startup
 * Fails fast with clear error messages if any are missing
 */

interface EnvSchema {
  // Required for production
  JWT_SECRET: string;
<<<<<<< HEAD
  NODE_ENV: "development" | "production" | "test";

=======
  NODE_ENV: 'development' | 'production' | 'test';
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Optional but recommended
  XAI_API_KEY?: string;
  NEXT_PUBLIC_API_URL?: string;
  API_URL?: string;
<<<<<<< HEAD

  // Database (when implemented)
  DATABASE_URL?: string;

=======
  
  // Database (when implemented)
  DATABASE_URL?: string;
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Knowledge Graph (required in production)
  NEO4J_URI?: string;
  NEO4J_USER?: string;
  NEO4J_PASSWORD?: string;
<<<<<<< HEAD

  // Vector Database (required in production)
  PINECONE_API_KEY?: string;
  PINECONE_INDEX_NAME?: string;

  // CORS
  ALLOWED_ORIGINS?: string;

=======
  
  // Vector Database (required in production)
  PINECONE_API_KEY?: string;
  PINECONE_INDEX_NAME?: string;
  
  // CORS
  ALLOWED_ORIGINS?: string;
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // File upload limits
  MAX_FILE_SIZE_MB?: string;
  MAX_AUDIO_SIZE_MB?: string;
}

/**
 * Validates required environment variables
 * Throws error with clear message if validation fails
 */
export function validateEnv(): EnvSchema {
  const errors: string[] = [];
<<<<<<< HEAD

  // Required variables
  if (!process.env.JWT_SECRET) {
    errors.push(
      "JWT_SECRET is required. Generate a secure random string (min 32 characters).",
    );
  } else if (process.env.JWT_SECRET.length < 32) {
    errors.push("JWT_SECRET must be at least 32 characters long for security.");
  } else if (
    process.env.JWT_SECRET === "your-secret-key-change-in-production"
  ) {
    errors.push("JWT_SECRET must be changed from the default value.");
  }

  if (!process.env.NODE_ENV) {
    errors.push(
      'NODE_ENV is required. Set to "development", "production", or "test".',
    );
  }

  // Validate NODE_ENV value
  const validEnvs = ["development", "production", "test"];
  if (process.env.NODE_ENV && !validEnvs.includes(process.env.NODE_ENV)) {
    errors.push(`NODE_ENV must be one of: ${validEnvs.join(", ")}`);
  }

  // Warn about missing optional but important variables
  const warnings: string[] = [];
  if (!process.env.XAI_API_KEY) {
    warnings.push("XAI_API_KEY is not set. AI features will not work.");
  }

  // Production-specific validations for critical dependencies
  if (process.env.NODE_ENV === "production") {
    // Validate Neo4j configuration (required for knowledge graph)
    if (
      !process.env.NEO4J_URI ||
      !process.env.NEO4J_URI.startsWith("neo4j://")
    ) {
      errors.push(
        "NEO4J_URI is required in production. Format: neo4j://host:port (e.g., neo4j://localhost:7687)",
      );
    }
    if (!process.env.NEO4J_USER) {
      errors.push(
        "NEO4J_USER is required in production for knowledge graph access",
      );
    }
    if (!process.env.NEO4J_PASSWORD) {
      errors.push(
        "NEO4J_PASSWORD is required in production for knowledge graph access",
      );
    }

    // Validate Pinecone configuration (required for vector search)
    if (
      !process.env.PINECONE_API_KEY ||
      !process.env.PINECONE_API_KEY.startsWith("pcsk")
    ) {
      errors.push(
        "PINECONE_API_KEY is required in production. Format: pcsk_... (from Pinecone dashboard)",
      );
    }
    if (!process.env.PINECONE_INDEX_NAME) {
      errors.push(
        "PINECONE_INDEX_NAME is required in production for vector search",
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Environment variable validation failed:\n${errors.join("\n")}\n\n` +
        `Please set these variables in your .env file or environment.`,
    );
  }

  if (warnings.length > 0 && process.env.NODE_ENV === "production") {
    console.warn("Environment variable warnings:", warnings.join("; "));
  }

  return {
    JWT_SECRET: process.env.JWT_SECRET!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
=======
  
  // Required variables
  if (!process.env.JWT_SECRET) {
    errors.push('JWT_SECRET is required. Generate a secure random string (min 32 characters).');
  } else if (process.env.JWT_SECRET.length < 32) {
    errors.push('JWT_SECRET must be at least 32 characters long for security.');
  } else if (process.env.JWT_SECRET === 'your-secret-key-change-in-production') {
    errors.push('JWT_SECRET must be changed from the default value.');
  }
  
  if (!process.env.NODE_ENV) {
    errors.push('NODE_ENV is required. Set to "development", "production", or "test".');
  }
  
  // Validate NODE_ENV value
  const validEnvs = ['development', 'production', 'test'];
  if (process.env.NODE_ENV && !validEnvs.includes(process.env.NODE_ENV)) {
    errors.push(`NODE_ENV must be one of: ${validEnvs.join(', ')}`);
  }
  
  // Warn about missing optional but important variables
  const warnings: string[] = [];
  if (!process.env.XAI_API_KEY) {
    warnings.push('XAI_API_KEY is not set. AI features will not work.');
  }

  // Production-specific validations for critical dependencies
  if (process.env.NODE_ENV === 'production') {
    // Validate Neo4j configuration (required for knowledge graph)
    if (!process.env.NEO4J_URI || !process.env.NEO4J_URI.startsWith('neo4j://')) {
      errors.push('NEO4J_URI is required in production. Format: neo4j://host:port (e.g., neo4j://localhost:7687)');
    }
    if (!process.env.NEO4J_USER) {
      errors.push('NEO4J_USER is required in production for knowledge graph access');
    }
    if (!process.env.NEO4J_PASSWORD) {
      errors.push('NEO4J_PASSWORD is required in production for knowledge graph access');
    }

    // Validate Pinecone configuration (required for vector search)
    if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_API_KEY.startsWith('pcsk')) {
      errors.push('PINECONE_API_KEY is required in production. Format: pcsk_... (from Pinecone dashboard)');
    }
    if (!process.env.PINECONE_INDEX_NAME) {
      errors.push('PINECONE_INDEX_NAME is required in production for vector search');
    }
  }
  
  if (errors.length > 0) {
    throw new Error(
      `Environment variable validation failed:\n${errors.join('\n')}\n\n` +
      `Please set these variables in your .env file or environment.`
    );
  }
  
  if (warnings.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn('Environment variable warnings:', warnings.join('; '));
  }
  
  return {
    JWT_SECRET: process.env.JWT_SECRET!,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    XAI_API_KEY: process.env.XAI_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_URL: process.env.API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEO4J_URI: process.env.NEO4J_URI,
    NEO4J_USER: process.env.NEO4J_USER,
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
<<<<<<< HEAD
    MAX_FILE_SIZE_MB: process.env.MAX_FILE_SIZE_MB || "50",
    MAX_AUDIO_SIZE_MB: process.env.MAX_AUDIO_SIZE_MB || "50",
=======
    MAX_FILE_SIZE_MB: process.env.MAX_FILE_SIZE_MB || '50',
    MAX_AUDIO_SIZE_MB: process.env.MAX_AUDIO_SIZE_MB || '50',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  };
}

/**
 * Get validated environment variables
 * Call this at the top of API routes or server-side code
 */
export function getEnv(): EnvSchema {
  return validateEnv();
}

/**
 * Get allowed CORS origins from environment
 */
export function getAllowedOrigins(): string[] {
  const env = process.env.ALLOWED_ORIGINS;
  if (!env) {
    // Default to same origin in production, allow all in development
<<<<<<< HEAD
    return process.env.NODE_ENV === "production"
      ? []
      : ["http://localhost:3000", "http://localhost:3001"];
  }
  return env
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
=======
    return process.env.NODE_ENV === 'production' 
      ? [] 
      : ['http://localhost:3000', 'http://localhost:3001'];
  }
  return env.split(',').map(origin => origin.trim()).filter(Boolean);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * Check if origin is allowed
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  if (allowed.length === 0) return false;
  return allowed.includes(origin);
}
