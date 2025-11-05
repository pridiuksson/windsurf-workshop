"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDungeonMasterRouter = createDungeonMasterRouter;
const express_1 = require("express");
const dungeonMasterService_1 = require("../services/dungeonMasterService");
const validation_1 = require("../middleware/validation");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
const dmService = new dungeonMasterService_1.DungeonMasterService();
router.post('/process', validation_1.validateDMRequest, async (req, res) => {
    try {
        const request = req.body;
        logger_1.logger.info('Processing DM request', { action: request.action, player_id: request.player_id });
        const response = await dmService.processRequest(request);
        res.json({
            success: true,
            data: response
        });
    }
    catch (error) {
        logger_1.logger.error('Error in DM process endpoint', { error });
        res.status(500).json({
            success: false,
            error: {
                code: 'DM_PROCESS_ERROR',
                message: 'Failed to process dungeon master request'
            }
        });
    }
});
router.post('/backstory', async (req, res) => {
    try {
        const { characterClass, characterName } = req.body;
        if (!characterClass || !characterName) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_PARAMETERS',
                    message: 'characterClass and characterName are required'
                }
            });
        }
        const backstory = await dmService.generateCharacterBackstory(characterClass, characterName);
        return res.json({
            success: true,
            data: { backstory }
        });
    }
    catch (error) {
        logger_1.logger.error('Error generating backstory', { error });
        return res.status(500).json({
            success: false,
            error: {
                code: 'BACKSTORY_GENERATION_FAILED',
                message: 'Failed to generate character backstory'
            }
        });
    }
});
router.post('/adventure-hook', async (req, res) => {
    try {
        const { level, playerClasses } = req.body;
        if (!level || !playerClasses) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_PARAMETERS',
                    message: 'level and playerClasses are required'
                }
            });
        }
        const adventureHook = await dmService.generateAdventureHook(level, playerClasses);
        return res.json({
            success: true,
            data: { adventureHook }
        });
    }
    catch (error) {
        logger_1.logger.error('Error generating adventure hook', { error });
        return res.status(500).json({
            success: false,
            error: {
                code: 'ADVENTURE_HOOK_GENERATION_FAILED',
                message: 'Failed to generate adventure hook'
            }
        });
    }
});
function createDungeonMasterRouter() {
    return router;
}
//# sourceMappingURL=dungeonMaster.js.map