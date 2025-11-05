import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Local Database type for frontend
interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string;
          name: string;
          character_name: string;
          class: 'Warrior' | 'Mage' | 'Rogue' | 'Cleric' | 'Paladin' | 'Ranger' | 'Bard' | 'Druid';
          level: number;
          health: number;
          max_health: number;
          mana: number;
          max_mana: number;
          strength: number;
          dexterity: number;
          intelligence: number;
          wisdom: number;
          charisma: number;
          experience_points: number;
          gold: number;
          inventory: string;
          spells: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['players']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['players']['Row'], 'id' | 'created_at' | 'updated_at'>>;
      };
      messages: {
        Row: {
          id: string;
          game_id: string;
          player_id?: string;
          content: string;
          message_type: 'player' | 'dungeon_master' | 'system';
          is_private: boolean;
          metadata: string;
          created_at: string;
          player_name?: string;
          character_name?: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>>;
      };
    };
  };
}

export const supabase = createClientComponentClient<Database>()
