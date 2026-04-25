import { type SchemaRules } from '@adonisjs/lucid/types/schema_generator';

export default {
  types: {
    /**
     * Customize all JSON columns globally to use a type-safe JSON wrapper
     * instead of the default 'any' type.
     */
    jsonb: {
      decorator: '@column()',
      tsType: 'JSON<any>',
      imports: [{ source: '#types/db', typeImports: ['JSON'] }],
    },
  },
  tables: {
    /**
     * Customize the users table to make the user_role column
     * a strict union type instead of a generic string.
     */
    users: {
      columns: {
        user_role: {
          decorators: [{ name: '@column' }],
          tsType: `'admin' | 'editor'`,
        },
      },
    },
  },
} satisfies SchemaRules;