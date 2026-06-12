import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Validates request body against a Zod schema
 */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation failed',
        issues: parsed.error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
      });
      return;
    }

    // Attach validated data to request
    (req as any).validatedBody = parsed.data;
    next();
  };
}

/**
 * Validates request parameters against a Zod schema
 */
export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Invalid parameters',
        issues: parsed.error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
      });
      return;
    }

    (req as any).validatedParams = parsed.data;
    next();
  };
}

/**
 * Validates request query against a Zod schema
 */
export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Invalid query parameters',
        issues: parsed.error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
      });
      return;
    }

    (req as any).validatedQuery = parsed.data;
    next();
  };
}

/**
 * Input sanitization helpers
 */
export const sanitize = {
  /**
   * Trim and limit string length
   */
  string: (value: string, maxLength: number = 500): string => {
    return value.trim().substring(0, maxLength);
  },

  /**
   * Sanitize email
   */
  email: (email: string): string => {
    return email.trim().toLowerCase().substring(0, 254); // RFC 5321
  },

  /**
   * Sanitize phone number (remove non-numeric characters)
   */
  phone: (phone: string): string => {
    return phone.replace(/\D/g, '').substring(0, 20);
  },

  /**
   * Validate and sanitize URL
   */
  url: (url: string): string | null => {
    try {
      const parsed = new URL(url);
      return parsed.toString();
    } catch {
      return null;
    }
  },

  /**
   * Sanitize HTML/prevent XSS
   */
  html: (html: string): string => {
    return html
      .replace(/[<>]/g, '')
      .trim()
      .substring(0, 1000);
  },
};

/**
 * Stock validation helper
 */
export async function validateProductStock(
  db: any,
  productsTable: any,
  productId: number,
  quantity: number
): Promise<{ valid: boolean; error?: string; product?: any }> {
  const { eq } = await import('drizzle-orm');

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, productId));

  if (!product) {
    return { valid: false, error: 'Product not found' };
  }

  if (!product.inStock) {
    return { valid: false, error: 'Product is out of stock' };
  }

  if (quantity < 1) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }

  if (quantity > 100) {
    return { valid: false, error: 'Quantity cannot exceed 100' };
  }

  return { valid: true, product };
}
