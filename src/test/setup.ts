
/**
 * @fileoverview Test setup configuration for React Testing Library and Vitest
 * @description Configures global test environment, extends Jest matchers,
 * and sets up mock implementations for browser APIs used in testing
 */

import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

/**
 * Global test setup that runs before each test
 * @description Clears all mocks and resets DOM state to ensure test isolation
 * and prevent test interference
 */
beforeEach(() => {
  // Clear all mocks before each test to prevent state leakage
  vi.clearAllMocks();
  
  // Reset any DOM modifications from previous tests
  document.body.innerHTML = '';
});

/**
 * Mock implementation for ResizeObserver API
 * @description Provides a mock ResizeObserver for components that use responsive
 * design features, preventing errors in test environment
 */
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

/**
 * Mock implementation for IntersectionObserver API
 * @description Provides a mock IntersectionObserver for components that use
 * scroll-based visibility detection, commonly used in lazy loading
 */
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

/**
 * Mock implementation for matchMedia API
 * @description Provides a mock matchMedia for responsive design testing,
 * allowing components to work in test environment without CSS media queries
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
