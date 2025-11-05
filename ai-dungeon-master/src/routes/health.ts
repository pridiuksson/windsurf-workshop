import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// Basic health check
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ai-dungeon-master',
    version: '1.0.0'
  });
});

// Detailed health check
router.get('/detailed', async (req, res) => {
  try {
    // Check OpenAI API connectivity
    const openaiStatus = await checkOpenAIHealth();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'ai-dungeon-master',
      version: '1.0.0',
      dependencies: {
        openai: openaiStatus
      },
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };

    res.json(health);
  } catch (error) {
    logger.error('Health check failed', { error });
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

async function checkOpenAIHealth(): Promise<string> {
  try {
    // Simple OpenAI API test
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    
    return response.ok ? 'connected' : 'disconnected';
  } catch {
    return 'disconnected';
  }
}

export function createHealthRouter(): Router {
  return router;
}
