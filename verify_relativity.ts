
import { calculateRelativity } from './src/lib/timeRelativity';

// Fix for standalone execution without next.js context if needed
// simplified test

const testDates = [
    new Date('2000-01-01'), // Gen Z
    new Date('1990-01-01'), // Millennial
    new Date('2010-01-01')  // Alpha
];

console.log('--- RELATIVITY VERIFICATION ---\n');

testDates.forEach(date => {
    const age = new Date().getFullYear() - date.getFullYear();
    const result = calculateRelativity(date, age);

    console.log(`Birth Date: ${date.toISOString().split('T')[0]} (Age ~${age})`);
    console.log(`- Independence %: ${result.independencePercentage}`);
    console.log(`- iPhone Gens: ${result.iphoneGenerations}`);
    console.log(`- Cosmic Time: ${result.cosmicMilliseconds} ms`);
    console.log('---');
});
