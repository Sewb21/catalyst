import db from '../db';

console.log('Seeding database...');

const password_hash = await Bun.password.hash('password123');

db.run(
  'INSERT OR IGNORE INTO users (name, email, password_hash) VALUES (?, ?, ?)',
  ['Test User', 'test@example.com', password_hash],
);

console.log('Seeding complete.');
