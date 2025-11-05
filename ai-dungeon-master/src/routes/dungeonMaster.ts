import { Router, Request, Response } from 'express';
import { DungeonMasterService } from '../services/dungeonMasterService';
import { validateDMRequest } from '../middleware/validation';
import { logger } from '../utils/logger';
import { DMRequest } from '../types';

const router = Router();
const dmService = new DungeonMasterService();

// Main DM endpoint
router.post('/process', validateDMRequest, async (req, res) => {
  try {
    const request: DMRequest = req.body;
    logger.info('Processing DM request', { action: request.action, player_id: request.player_id });

    const response = await dmService.processRequest(request);
    
    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    logger.error('Error in DM process endpoint', { error });
    res.status(500).json({
      success: false,
      error: {
        code: 'DM_PROCESS_ERROR',
        message: 'Failed to process dungeon master request'
      }
    });
  }
});

// Generate character backstory
router.post('/backstory', async (req, res) => {
  try {
    const { characterClass, characterName } = req.body;
    
    if (!characterClass || !characterName) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_PARAMS',
          message: 'characterClass and characterName are required'
        }
      });
    }

    const backstory = await dmService.generateCharacterBackstory(characterClass, characterName);
    
    res.json({
      success: true,
      data: { backstory }
    });
  } catch (error) {
    logger.error('Error generating backstory', { error });
    res.status(500).json({
      success: false,
      error: {
        code: 'BACKSTORY_ERROR',
        message: 'Failed to generate character backstory'
      }
    });
  }
});

// Generate adventure hook
router.post('/adventure-hook', async (req, res) => {
  try {
    const { playerLevel, playerClasses } = req.body;
    
    if (!playerLevel || !playerClasses) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_PARAMS',
          message: 'playerLevel and playerClasses are required'
        }
      });
    }

    const hook = await dmService.generateAdventureHook(playerLevel, playerClasses);
    
    res.json({
      success: true,
      data: { adventureHook: hook }
    });
  } catch (error) {
    logger.error('Error generating adventure hook', { error });
    res.status(500).json({
      success: false,
      error: {
        code: 'ADVENTURE_HOOK_ERROR',
        message: 'Failed to generate adventure hook'
      }
    });
  }
});

export function createDungeonMasterRouter(): Router {
  return router;
}
