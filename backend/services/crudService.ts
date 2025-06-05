
/**
 * @fileoverview Generic CRUD service with sanitization and validation
 * @description Provides standardized CRUD operations with built-in security
 */

import { sanitizeString, sanitizeWalletName, sanitizeAddress } from '../utils/sanitization';

/**
 * Generic interface for CRUD operations
 */
export interface CrudRepository<T> {
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(filters?: Record<string, any>): Promise<T[]>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

/**
 * Base CRUD service with sanitization
 */
export abstract class BaseCrudService<T> {
  constructor(protected repository: CrudRepository<T>) {}

  /**
   * Creates a new entity with sanitization
   * @param {Omit<T, 'id' | 'createdAt' | 'updatedAt'>} data - Entity data
   * @returns {Promise<T>} Created entity
   */
  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      const sanitizedData = await this.sanitizeCreateData(data);
      await this.validateCreateData(sanitizedData);
      return await this.repository.create(sanitizedData);
    } catch (error) {
      console.error('Create operation failed:', error);
      throw new Error(`Failed to create entity: ${error.message}`);
    }
  }

  /**
   * Finds entity by ID with validation
   * @param {string} id - Entity ID
   * @returns {Promise<T | null>} Found entity or null
   */
  async findById(id: string): Promise<T | null> {
    try {
      const sanitizedId = sanitizeString(id, { alphanumericOnly: true, maxLength: 50 });
      if (!sanitizedId) {
        throw new Error('Invalid ID provided');
      }
      return await this.repository.findById(sanitizedId);
    } catch (error) {
      console.error('Find by ID operation failed:', error);
      throw new Error(`Failed to find entity: ${error.message}`);
    }
  }

  /**
   * Finds all entities with optional filters
   * @param {Record<string, any>} filters - Search filters
   * @returns {Promise<T[]>} Array of entities
   */
  async findAll(filters?: Record<string, any>): Promise<T[]> {
    try {
      const sanitizedFilters = filters ? await this.sanitizeFilters(filters) : undefined;
      return await this.repository.findAll(sanitizedFilters);
    } catch (error) {
      console.error('Find all operation failed:', error);
      throw new Error(`Failed to find entities: ${error.message}`);
    }
  }

  /**
   * Updates entity with sanitization
   * @param {string} id - Entity ID
   * @param {Partial<T>} updates - Update data
   * @returns {Promise<T>} Updated entity
   */
  async update(id: string, updates: Partial<T>): Promise<T> {
    try {
      const sanitizedId = sanitizeString(id, { alphanumericOnly: true, maxLength: 50 });
      if (!sanitizedId) {
        throw new Error('Invalid ID provided');
      }

      const sanitizedUpdates = await this.sanitizeUpdateData(updates);
      await this.validateUpdateData(sanitizedUpdates);
      
      return await this.repository.update(sanitizedId, sanitizedUpdates);
    } catch (error) {
      console.error('Update operation failed:', error);
      throw new Error(`Failed to update entity: ${error.message}`);
    }
  }

  /**
   * Deletes entity by ID
   * @param {string} id - Entity ID
   * @returns {Promise<boolean>} Success status
   */
  async delete(id: string): Promise<boolean> {
    try {
      const sanitizedId = sanitizeString(id, { alphanumericOnly: true, maxLength: 50 });
      if (!sanitizedId) {
        throw new Error('Invalid ID provided');
      }
      return await this.repository.delete(sanitizedId);
    } catch (error) {
      console.error('Delete operation failed:', error);
      throw new Error(`Failed to delete entity: ${error.message}`);
    }
  }

  // Abstract methods for subclasses to implement
  protected abstract sanitizeCreateData(data: any): Promise<any>;
  protected abstract sanitizeUpdateData(data: any): Promise<any>;
  protected abstract sanitizeFilters(filters: Record<string, any>): Promise<Record<string, any>>;
  protected abstract validateCreateData(data: any): Promise<void>;
  protected abstract validateUpdateData(data: any): Promise<void>;
}
