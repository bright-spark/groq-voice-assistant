import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the favicon file from the public directory
    const filePath = path.join(process.cwd(), 'public', 'favicon.ico');
    const fileBuffer = fs.readFileSync(filePath);
    
    // Return the favicon with appropriate headers
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving favicon:', error);
    // Return a 404 response if the favicon doesn't exist
    return new Response('Favicon not found', { status: 404 });
  }
}
