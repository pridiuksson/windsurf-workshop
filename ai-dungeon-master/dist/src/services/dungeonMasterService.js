"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DungeonMasterService = void 0;
const openai_1 = __importDefault(require("openai"));
const logger_1 = require("../utils/logger");
class DungeonMasterService {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.systemPrompt = `You are an expert Dungeon Master for a Dungeons & Dragons 5e game. You are managing a 4-player multiplayer chat game.

Your responsibilities:
1. Create immersive, descriptive scenes
2. Role-play NPCs with distinct personalities
3. Manage combat encounters following D&D 5e rules
4. Respond to player actions appropriately
5. Maintain game state and continuity
6. Keep the game engaging and balanced

Guidelines:
- Be descriptive but concise (2-3 paragraphs max)
- Always provide players with meaningful choices
- Use D&D 5e mechanics for combat and skill checks
- Maintain consistency with the game world
- Adapt to player choices and creativity
- Include sensory details (sights, sounds, smells)
- End responses with a question or prompt for action

Response format:
{
  "content": "Your narrative/description/dialogue",
  "type": "narrative|dialogue|combat|system",
  "game_state_updates": {...},
  "npc_responses": {...},
  "sound_effects": [...],
  "visual_effects": [...]
}

Always respond in valid JSON format.`;
    }
    async processRequest(request) {
        try {
            const contextPrompt = this.buildContextPrompt(request);
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: this.systemPrompt },
                    { role: 'user', content: contextPrompt }
                ],
                temperature: 0.8,
                max_tokens: 1000,
                response_format: { type: 'json_object' }
            });
            const responseContent = completion.choices[0]?.message?.content;
            if (!responseContent) {
                throw new Error('No response from OpenAI');
            }
            const response = JSON.parse(responseContent);
            logger_1.logger.info('DM response generated successfully', {
                action: request.action,
                responseLength: response.content.length
            });
            return response;
        }
        catch (error) {
            logger_1.logger.error('Error processing DM request', { error, request });
            return {
                content: 'The dungeon master seems to be lost in thought. Try again in a moment.',
                type: 'system',
                sound_effects: ['mysterious_wind']
            };
        }
    }
    buildContextPrompt(request) {
        const { action, game_state, player_action, player_id, context } = request;
        let prompt = `Action: ${action}\n\n`;
        prompt += `Current Game State:\n`;
        prompt += `- Scene: ${game_state.scene}\n`;
        prompt += `- Round: ${game_state.round_number}\n`;
        prompt += `- Current Turn: ${game_state.current_turn}\n`;
        prompt += `- Environment: ${JSON.stringify(game_state.environment, null, 2)}\n`;
        if (game_state.npcs.length > 0) {
            prompt += `\nNPCs:\n${game_state.npcs.map(npc => `- ${npc.name}: ${npc.description} (${npc.attitude})`).join('\n')}\n`;
        }
        if (game_state.enemies.length > 0) {
            prompt += `\nEnemies:\n${game_state.enemies.map(enemy => `- ${enemy.name}: HP ${enemy.health}/${enemy.max_health}, AC ${enemy.armor_class}`).join('\n')}\n`;
        }
        if (player_action) {
            prompt += `\nPlayer Action: ${player_action}\n`;
        }
        if (context) {
            prompt += `\nAdditional Context: ${JSON.stringify(context, null, 2)}\n`;
        }
        switch (action) {
            case 'generate_scene':
                prompt += '\nGenerate a new, engaging scene description with exploration opportunities.';
                break;
            case 'process_action':
                prompt += '\nRespond to the player action and describe the outcome. Include consequences and new choices.';
                break;
            case 'create_npc':
                prompt += '\nCreate a new NPC with personality, appearance, and potential dialogue options.';
                break;
            case 'generate_combat':
                prompt += '\nInitiate or continue combat. Describe the action and determine outcomes based on D&D rules.';
                break;
            case 'respond_to_player':
                prompt += '\nProvide a natural response to the player that advances the story or provides information.';
                break;
        }
        return prompt;
    }
    async generateCharacterBackstory(characterClass, characterName) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Generate a brief, engaging D&D character backstory (2-3 sentences) based on the class and name provided.'
                    },
                    {
                        role: 'user',
                        content: `Class: ${characterClass}, Name: ${characterName}`
                    }
                ],
                temperature: 0.8,
                max_tokens: 200
            });
            return completion.choices[0]?.message?.content || 'A mysterious adventurer with an unknown past.';
        }
        catch (error) {
            logger_1.logger.error('Error generating character backstory', { error, characterClass, characterName });
            return 'A mysterious adventurer with an unknown past.';
        }
    }
    async generateAdventureHook(playerLevel, playerClasses) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Generate an exciting D&D adventure hook suitable for the party level and composition.'
                    },
                    {
                        role: 'user',
                        content: `Party Level: ${playerLevel}, Classes: ${playerClasses.join(', ')}`
                    }
                ],
                temperature: 0.8,
                max_tokens: 300
            });
            return completion.choices[0]?.message?.content || 'A mysterious quest awaits the brave adventurers.';
        }
        catch (error) {
            logger_1.logger.error('Error generating adventure hook', { error, playerLevel, playerClasses });
            return 'A mysterious quest awaits the brave adventurers.';
        }
    }
}
exports.DungeonMasterService = DungeonMasterService;
//# sourceMappingURL=dungeonMasterService.js.map