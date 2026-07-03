const { z } = require('zod');
const schema = z.string().trim().email('Invalid email').optional().or(z.literal(''));
console.log("Testing '   ':");
console.log(schema.safeParse("   "));
