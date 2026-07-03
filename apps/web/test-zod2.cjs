const { z } = require('zod');
const schema = z.preprocess(v => (typeof v === 'string' ? v.trim() : v), z.string().email('Invalid').optional().or(z.literal('')));
console.log(schema.safeParse("   "));
