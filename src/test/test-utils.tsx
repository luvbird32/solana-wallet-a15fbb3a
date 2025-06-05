
/**
 * @fileoverview Testing utilities and custom render functions
 * @description Provides custom render function with all necessary providers
 * and utility functions for testing React components with proper context
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AllTheProviders } from './providers';

// Import screen and fireEvent from testing library using require for compatibility
const { screen, fireEvent } = require('@testing-library/react');

/**
 * Custom render options extending React Testing Library's RenderOptions
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Override default route for Router testing */
  initialEntries?: string[];
}

/**
 * Custom render function with all providers included
 */
const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing library for convenience
export * from '@testing-library/react';
export { customRender as render, screen, fireEvent };
export { createMockWallet, createMockSolanaAPI } from './mocks';
