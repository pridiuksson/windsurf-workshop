import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { DMRequest } from '../types';

const dmRequestSchema = Joi.object({
  action: Joi.string().valid('generate_scene', 'process_action', 'create_npc', 'generate_combat', 'respond_to_player').required(),
  game_state: Joi.object({
    scene: Joi.string().required(),
    npcs: Joi.array().items(Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      dialogue: Joi.array().items(Joi.string()),
      location: Joi.string().required(),
      attitude: Joi.string().valid('friendly', 'neutral', 'hostile').required()
    })).required(),
    enemies: Joi.array().items(Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string().required(),
      health: Joi.number().min(0).required(),
      max_health: Joi.number().min(0).required(),
      armor_class: Joi.number().min(0).required(),
      attacks: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        damage: Joi.string().required(),
        type: Joi.string().valid('melee', 'ranged', 'magic').required(),
        bonus: Joi.number().required()
      })).required(),
      loot: Joi.object({
        gold: Joi.object({
          min: Joi.number().min(0).required(),
          max: Joi.number().min(0).required()
        }).required(),
        items: Joi.array().items(Joi.object()),
        experience: Joi.number().min(0).required()
      }).required()
    })).required(),
    environment: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      lighting: Joi.string().valid('bright', 'dim', 'dark').required(),
      terrain: Joi.string().required(),
      weather: Joi.string(),
      obstacles: Joi.array().items(Joi.string())
    }).required(),
    turn_order: Joi.array().items(Joi.object({
      player_id: Joi.string().required(),
      initiative: Joi.number().required(),
      name: Joi.string().required()
    })).required(),
    current_turn: Joi.string().required(),
    round_number: Joi.number().min(1).required()
  }).required(),
  player_action: Joi.string().optional(),
  player_id: Joi.string().optional(),
  context: Joi.object().optional()
});

export function validateDMRequest(req: Request, res: Response, next: NextFunction): void {
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
