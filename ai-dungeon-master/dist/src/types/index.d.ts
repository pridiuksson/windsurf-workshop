export interface DMRequest {
    action: 'generate_scene' | 'process_action' | 'create_npc' | 'generate_combat' | 'respond_to_player';
    game_state: GameState;
    player_action?: string;
    player_id?: string;
    context?: Record<string, any>;
}
export interface DMResponse {
    content: string;
    type: 'narrative' | 'dialogue' | 'combat' | 'system';
    game_state_updates?: Partial<GameState>;
    npc_responses?: Record<string, string>;
    sound_effects?: string[];
    visual_effects?: string[];
}
export interface GameState {
    scene: string;
    npcs: NPC[];
    enemies: Enemy[];
    environment: Environment;
    turn_order: TurnOrder[];
    current_turn: string;
    round_number: number;
}
export interface NPC {
    id: string;
    name: string;
    description: string;
    dialogue: string[];
    location: string;
    attitude: 'friendly' | 'neutral' | 'hostile';
}
export interface Enemy {
    id: string;
    name: string;
    type: string;
    health: number;
    max_health: number;
    armor_class: number;
    attacks: Attack[];
    loot: LootTable;
}
export interface Attack {
    name: string;
    damage: string;
    type: 'melee' | 'ranged' | 'magic';
    bonus: number;
}
export interface LootTable {
    gold: {
        min: number;
        max: number;
    };
    items: any[];
    experience: number;
}
export interface Environment {
    name: string;
    description: string;
    lighting: 'bright' | 'dim' | 'dark';
    terrain: string;
    weather?: string;
    obstacles: string[];
}
export interface TurnOrder {
    player_id: string;
    initiative: number;
    name: string;
}
//# sourceMappingURL=index.d.ts.map