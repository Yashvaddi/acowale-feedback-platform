const { z } = require('zod');
const schema = z.string().trim().transform(v => v === '' ? undefined : v).pipe(z.string().email('Invalid email').optional());
console.log("Empty:", schema.safeParse(""));
console.log("Spaces:", schema.safeParse("   "));
console.log("Valid:", schema.safeParse("test@example.com"));
console.log("Invalid:", schema.safeParse("test@"));
