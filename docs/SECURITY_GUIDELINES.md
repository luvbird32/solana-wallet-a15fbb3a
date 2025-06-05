
# Security Guidelines for Contributors

This document provides specific security guidelines for developers contributing to the Solana Wallet project.

## 🎯 Quick Security Checklist

Before submitting any code, ensure you've addressed these security considerations:

- [ ] All user inputs are validated and sanitized
- [ ] Rate limiting is applied to new endpoints
- [ ] Error messages don't expose sensitive information
- [ ] No secrets are hardcoded in the codebase
- [ ] Security headers are applied to responses
- [ ] Audit logging is implemented for security events

## 🔒 Secure Coding Standards

### 1. Input Validation

**Always validate inputs using the provided utilities:**

```typescript
import { validateTokenSearch, validateTransaction } from '@/backend/utils/inputValidation';

// ✅ Correct approach
const validation = validateTokenSearch(userInput);
if (!validation.isValid) {
  return { error: 'Invalid input', details: validation.errors };
}
const sanitizedData = validation.data;

// ❌ Never do this
const result = await processSearch(userInput); // Raw input usage
```

**Required validations:**
- **Type checking**: Ensure data types match expectations
- **Length limits**: Prevent buffer overflow attacks
- **Format validation**: Use regex for addresses, symbols, etc.
- **Business logic validation**: Check ranges, relationships

### 2. Rate Limiting

**Apply rate limiting to all user-facing endpoints:**

```typescript
import { checkRateLimit } from '@/backend/services/rateLimitService';

// ✅ Implement rate limiting
const rateCheck = checkRateLimit('API_CALL', clientIdentifier);
if (!rateCheck.allowed) {
  return { 
    error: 'Rate limit exceeded', 
    resetTime: rateCheck.resetTime 
  };
}

// Process the request...
```

**Rate limit categories:**
- `WALLET_CREATION`: Wallet generation/import
- `LOGIN_ATTEMPT`: Authentication attempts  
- `API_CALL`: General API usage
- `TOKEN_SEARCH`: Token lookup operations

### 3. Error Handling

**Never expose internal system details:**

```typescript
// ✅ Safe error handling
try {
  const result = await processWalletOperation(data);
  return { success: true, data: result };
} catch (error) {
  logSecurityEvent({
    type: 'operation_failed',
    success: false,
    metadata: { operation: 'wallet_creation' }
  });
  
  // Return generic error message
  return { 
    success: false, 
    error: 'Operation failed. Please try again.' 
  };
}

// ❌ Security risk
catch (error) {
  return { error: error.message }; // May expose system details
}
```

### 4. Authentication & Authorization

**Use the session management service:**

```typescript
import { createSecureSession, isSessionValid } from '@/backend/services/sessionService';

// ✅ Secure session creation
const session = createSecureSession();
// Store session.sessionId securely (database, Redis)

// ✅ Session validation
if (!isSessionValid(session.expiresAt)) {
  return { error: 'Session expired' };
}
```

### 5. Data Sanitization

**Always sanitize data before storage or display:**

```typescript
import { sanitizeString, sanitizeAddress } from '@/backend/utils/sanitization';

// ✅ Sanitize before processing
const cleanName = sanitizeString(walletName, { 
  allowWhitespace: true, 
  maxLength: 50 
});

const validAddress = sanitizeAddress(tokenAddress);
```

## 🛡️ Security Architecture Patterns

### 1. Layered Security Validation

```typescript
// Frontend validation (user experience)
const frontendValidation = validateForm(formData);

// Backend validation (security enforcement)
const backendValidation = validateApiInput(requestData, schema);

// Business logic validation (domain rules)
const businessValidation = validateBusinessRules(processedData);
```

### 2. Security Event Logging

```typescript
import { logSecurityEvent } from '@/backend/services/auditService';

// Log all security-relevant events
logSecurityEvent({
  type: 'wallet_created',
  userId: user.id,
  success: true,
  metadata: { 
    walletType: 'imported',
    timestamp: new Date().toISOString()
  }
});
```

### 3. HTTP Security Headers

```typescript
import { applySecurityHeaders } from '@/backend/utils/httpSecurity';

// Apply to all responses
const secureHeaders = applySecurityHeaders({
  'Content-Type': 'application/json'
});
```

## 🔧 Common Security Patterns

### API Endpoint Security Template

```typescript
export const secureApiEndpoint = async (request: Request): Promise<Response> => {
  try {
    // 1. Rate limiting
    const rateCheck = checkRateLimit('API_CALL', getClientId(request));
    if (!rateCheck.allowed) {
      return errorResponse('Rate limit exceeded', 429);
    }

    // 2. Input validation
    const validation = validateApiInput(request.body, endpointSchema);
    if (!validation.isValid) {
      return errorResponse('Invalid input', 400);
    }

    // 3. Authentication check (if required)
    const session = validateSession(request.headers.authorization);
    if (!session.valid) {
      return errorResponse('Unauthorized', 401);
    }

    // 4. Business logic
    const result = await processRequest(validation.data);

    // 5. Audit logging
    logSecurityEvent({
      type: 'api_call',
      userId: session.userId,
      success: true
    });

    // 6. Secure response
    return successResponse(result);

  } catch (error) {
    // 7. Error handling
    logSecurityEvent({
      type: 'api_error',
      success: false,
      metadata: { endpoint: request.url }
    });

    return errorResponse('Internal server error', 500);
  }
};
```

### Frontend Security Template

```typescript
export const SecureComponent = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 1. Client-side validation (UX)
    const clientValidation = validateForm(formData);
    if (!clientValidation.isValid) {
      setErrors(clientValidation.errors);
      return;
    }

    try {
      // 2. API call with CSRF protection
      const response = await secureApiCall('/api/endpoint', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken()
        }
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      // 3. Handle success
      const result = await response.json();
      handleSuccess(result);

    } catch (error) {
      // 4. Safe error handling
      setErrors(['Operation failed. Please try again.']);
    }
  };

  // ... rest of component
};
```

## 🚨 Security Anti-Patterns

### What NOT to do:

```typescript
// ❌ NEVER: Hardcode secrets
const JWT_SECRET = "hardcoded-secret-key";

// ❌ NEVER: Expose internal errors
catch (error) {
  res.json({ error: error.stack });
}

// ❌ NEVER: Skip input validation
app.post('/api/create-wallet', (req, res) => {
  createWallet(req.body); // No validation!
});

// ❌ NEVER: Use weak session IDs
const sessionId = Math.random().toString();

// ❌ NEVER: Log sensitive data
console.log('User password:', password);

// ❌ NEVER: Trust client-side data
if (req.body.isAdmin) { // Client controls this!
  grantAdminAccess();
}
```

## 🔍 Security Testing Guidelines

### Unit Tests for Security

```typescript
describe('Input Validation Security', () => {
  test('should reject malicious SQL injection attempts', () => {
    const maliciousInput = "'; DROP TABLE users; --";
    const result = validateTokenSearch({ query: maliciousInput, type: 'name' });
    expect(result.isValid).toBe(false);
  });

  test('should sanitize XSS attempts', () => {
    const xssInput = '<script>alert("xss")</script>';
    const sanitized = sanitizeString(xssInput);
    expect(sanitized).not.toContain('<script>');
  });
});
```

### Integration Tests

```typescript
describe('API Security', () => {
  test('should enforce rate limiting', async () => {
    // Make requests up to the limit
    for (let i = 0; i < 10; i++) {
      await request(app).post('/api/test');
    }
    
    // Next request should be rate limited
    const response = await request(app).post('/api/test');
    expect(response.status).toBe(429);
  });
});
```

## 📋 Security Review Checklist

### Before Merging Code

**Input Validation:**
- [ ] All user inputs are validated
- [ ] Validation uses whitelist approach
- [ ] Error messages are safe
- [ ] Input lengths are limited

**Authentication & Sessions:**
- [ ] Sessions use secure random IDs
- [ ] Session expiration is enforced
- [ ] Authentication is required where needed
- [ ] No authentication bypass possible

**Rate Limiting:**
- [ ] All endpoints have appropriate rate limits
- [ ] Rate limits are configurable
- [ ] Rate limit errors are handled gracefully

**Error Handling:**
- [ ] No sensitive information in error messages
- [ ] All errors are logged appropriately
- [ ] Generic error responses for security failures

**Data Protection:**
- [ ] Sensitive data is properly sanitized
- [ ] No secrets in code or logs
- [ ] Encryption is used where appropriate

**Dependencies:**
- [ ] No known vulnerabilities in dependencies
- [ ] Dependencies are up to date
- [ ] Only necessary dependencies are included

---

**Remember: Security is not optional in an open-source project. Every contributor has a responsibility to maintain security standards.**
