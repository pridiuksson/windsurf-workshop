"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDMRequest = validateDMRequest;
const joi_1 = __importDefault(require("joi"));
const dmRequestSchema = joi_1.default.object({
    action: joi_1.default.string().valid('generate_scene', 'process_action', 'create_npc', 'generate_combat', 'respond_to_player').required(),
    game_state: joi_1.default.object({
        scene: joi_1.default.string().required(),
        npcs: joi_1.default.array().items(joi_1.default.object({
            id: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            dialogue: joi_1.default.array().items(joi_1.default.string()),
            location: joi_1.default.string().required(),
            attitude: joi_1.default.string().valid('friendly', 'neutral', 'hostile').required()
        })).required(),
        enemies: joi_1.default.array().items(joi_1.default.object({
            id: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
            type: joi_1.default.string().required(),
            health: joi_1.default.number().min(0).required(),
            max_health: joi_1.default.number().min(0).required(),
            armor_class: joi_1.default.number().min(0).required(),
            attacks: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().required(),
                damage: joi_1.default.string().required(),
                type: joi_1.default.string().valid('melee', 'ranged', 'magic').required(),
                bonus: joi_1.default.number().required()
            })).required(),
            loot: joi_1.default.object({
                gold: joi_1.default.object({
                    min: joi_1.default.number().min(0).required(),
                    max: joi_1.default.number().min(0).required()
                }).required(),
                items: joi_1.default.array().items(joi_1.default.object()),
                experience: joi_1.default.number().min(0).required()
            }).required()
        })).required(),
        environment: joi_1.default.object({
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            lighting: joi_1.default.string().valid('bright', 'dim', 'dark').required(),
            terrain: joi_1.default.string().required(),
            weather: joi_1.default.string(),
            obstacles: joi_1.default.array().items(joi_1.default.string())
        }).required(),
        turn_order: joi_1.default.array().items(joi_1.default.object({
            player_id: joi_1.default.string().required(),
            initiative: joi_1.default.number().required(),
            name: joi_1.default.string().required()
        })).required(),
        current_turn: joi_1.default.string().required(),
        round_number: joi_1.default.number().min(1).required()
    }).required(),
    player_action: joi_1.default.string().optional(),
    player_id: joi_1.default.string().optional(),
    context: joi_1.default.object().optional()
});
function validateDMRequest(req, res, next) {
    const { error } = dmRequestSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid request data',
                details: error.details.map(detail => detail.message)
            }
        });
        return;
    }
    next();
}
//# sourceMappingURL=validation.js.map