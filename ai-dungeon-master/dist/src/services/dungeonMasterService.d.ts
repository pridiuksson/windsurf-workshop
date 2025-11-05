import { DMRequest, DMResponse } from '../types';
export declare class DungeonMasterService {
    private openai;
    private systemPrompt;
    constructor();
    processRequest(request: DMRequest): Promise<DMResponse>;
    private buildContextPrompt;
    generateCharacterBackstory(characterClass: string, characterName: string): Promise<string>;
    generateAdventureHook(playerLevel: number, playerClasses: string[]): Promise<string>;
}
//# sourceMappingURL=dungeonMasterService.d.ts.map