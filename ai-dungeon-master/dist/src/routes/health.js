"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRouter = createHealthRouter;
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'ai-dungeon-master',
        version: '1.0.0'
    });
});
router.get('/detailed', async (req, res) => {
    try {
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
    }
    catch (error) {
        logger_1.logger.error('Health check failed', { error });
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: 'Health check failed'
        });
    }
});
async function checkOpenAIHealth() {
    try {
        const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        return response.ok ? 'connected' : 'disconnected';
    }
    catch {
        return 'disconnected';
    }
}
function createHealthRouter() {
    return router;
}
//# sourceMappingURL=health.js.map