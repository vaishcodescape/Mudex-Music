import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');

// Verify that the build directory exists and contains required files
function verifyBuild() {
  try {
    // Check if dist directory exists
    if (!fs.existsSync(distPath)) {
      throw new Error('Build directory (dist) not found');
    }

    // Check for index.html
    if (!fs.existsSync(path.join(distPath, 'index.html'))) {
      throw new Error('index.html not found in build directory');
    }

    // Check for assets directory
    if (!fs.existsSync(path.join(distPath, 'assets'))) {
      throw new Error('assets directory not found in build directory');
    }

    // All checks passed
    console.log('✅ Build verification passed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Build verification failed:', error.message);
    process.exit(1);
  }
}

verifyBuild(); 