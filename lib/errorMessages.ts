/**
 * Error Message Utilities
 *
 * Provides user-friendly error messages with actionable recovery steps.
 * Maps technical error codes to understandable messages.
 */

export interface ErrorRecovery {
  message: string;
  steps: string[];
  actions?: Array<{ label: string; onClick: () => void }>;
}

/**
 * Maps error codes/messages to user-friendly messages
 */
const errorMessageMap: Record<string, string> = {
  // Authentication errors
  EMAIL_EXISTS: "This email is already registered. Try logging in instead.",
  INVALID_EMAIL: "Please enter a valid email address.",
  UNAUTHORIZED: "Please log in to continue.",
  AUTH_REQUIRED: "Please log in to submit your application.",

  // Validation errors
  WEAK_PASSWORD:
    "Password must be at least 8 characters with uppercase, lowercase, and numbers.",
  INVALID_PASSWORD:
    "Password must be at least 8 characters with uppercase, lowercase, and numbers.",
  MISSING_FIELDS: "Please complete all required fields.",
  INVALID_DATA: "Please check your information and try again.",

  // Network errors
  NETWORK_ERROR: "Connection failed. Please check your internet and try again.",
  TIMEOUT: "Request timed out. Please try again.",
  FAILED_TO_FETCH:
    "Connection failed. Please check your internet and try again.",

  // Server errors
  SERVER_ERROR:
    "Our servers are temporarily unavailable. Please try again in a few minutes.",
  SERVICE_UNAVAILABLE:
    "Service is temporarily unavailable. Please try again later.",
  INTERNAL_ERROR:
    "Something went wrong on our end. Please try again in a few minutes.",

  // File upload errors
  FILE_TOO_LARGE: "File is too large. Maximum size is 500MB.",
  INVALID_FILE_TYPE:
    "Invalid file type. Please upload WAV, FLAC, MP3, M4A, or MP4 files.",
  UPLOAD_FAILED:
    "Upload failed. Please check your internet connection and try again.",

  // Generic errors
  UNKNOWN_ERROR:
    "Something went wrong. Please try again or contact support if the problem persists.",
};

/**
 * Error recovery suggestions by error type
 */
const errorRecoveryMap: Partial<Record<string, ErrorRecovery>> = {
  NETWORK_ERROR: {
    message: "Connection failed",
    steps: [
      "Check your internet connection",
      "Try refreshing the page",
      "Contact support if the problem persists",
    ],
  },
  SERVER_ERROR: {
    message: "Our servers are temporarily unavailable",
    steps: [
      "Wait a few minutes and try again",
      "Check our status page for service updates",
      "Contact support if the problem continues",
    ],
  },
  EMAIL_EXISTS: {
    message: "This email is already registered",
    steps: [
      "Try logging in with this email instead",
      "If you forgot your password, use the password reset link",
      "Contact support if you believe this is an error",
    ],
  },
  UPLOAD_FAILED: {
    message: "Upload failed",
    steps: [
      "Check your internet connection",
      "Verify the file is under 500MB",
      "Try a different file format if possible",
      "Contact support if the problem persists",
    ],
  },
};

/**
 * Get user-friendly error message from error code or message
 */
export function getUserFriendlyError(error: string | Error | unknown): string {
  let errorCode = "";
  let errorMessage = "";

  if (typeof error === "string") {
    errorMessage = error;
    errorCode = error.toUpperCase();
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorCode = error.message.toUpperCase();
  } else if (error && typeof error === "object" && "message" in error) {
    errorMessage = String(error.message);
    errorCode = errorMessage.toUpperCase();
  } else {
    return (
      errorMessageMap.UNKNOWN_ERROR || "Something went wrong. Please try again."
    );
  }

  // Check for network errors (TypeError from fetch)
  if (error instanceof TypeError && errorMessage.includes("fetch")) {
    return (
      errorMessageMap.NETWORK_ERROR ||
      "Connection failed. Please check your internet and try again."
    );
  }

  // Check for specific error codes
  for (const [key, message] of Object.entries(errorMessageMap)) {
    if (errorCode.includes(key) || errorMessage.includes(key)) {
      return message;
    }
  }

  // Return original message if no mapping found, or generic error
  return errorMessage || errorMessageMap.UNKNOWN_ERROR;
}

/**
 * Get error recovery information
 */
export function getErrorRecovery(
  error: string | Error | unknown,
): ErrorRecovery | null {
  let errorCode = "";

  if (typeof error === "string") {
    errorCode = error.toUpperCase();
  } else if (error instanceof Error) {
    errorCode = error.message.toUpperCase();
  } else if (error && typeof error === "object" && "message" in error) {
    errorCode = String(error.message).toUpperCase();
  } else {
    return null;
  }

  // Check for network errors
  if (error instanceof TypeError && errorCode.includes("FETCH")) {
    return errorRecoveryMap.NETWORK_ERROR || null;
  }

  // Check for specific error types
  for (const [key, recovery] of Object.entries(errorRecoveryMap)) {
    if (errorCode.includes(key) && recovery) {
      return recovery;
    }
  }

  return null;
}

/**
 * Format error message with recovery steps
 */
export function formatErrorWithRecovery(error: string | Error | unknown): {
  message: string;
  recovery?: ErrorRecovery;
} {
  const message = getUserFriendlyError(error);
  const recovery = getErrorRecovery(error);

  return {
    message,
    recovery: recovery || undefined,
  };
}
