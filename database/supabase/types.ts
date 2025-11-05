export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      characters: {
        Row: {
          abilities: string | null
          background: string | null
          charisma: number
          class: string
          created_at: string | null
          dexterity: number
          experience_points: number | null
          game_id: string | null
          gold: number | null
          health: number
          id: string
          intelligence: number
          inventory: string | null
          level: number | null
          mana: number | null
          max_health: number
          max_mana: number | null
          name: string
          player_id: string | null
          spells: string | null
          strength: number
          updated_at: string | null
          wisdom: number
        }
        Insert: {
          abilities?: string | null
          background?: string | null
          charisma: number
          class: string
          created_at?: string | null
          dexterity: number
          experience_points?: number | null
          game_id?: string | null
          gold?: number | null
          health: number
          id?: string
          intelligence: number
          inventory?: string | null
          level?: number | null
          mana?: number | null
          max_health: number
          max_mana?: number | null
          name: string
          player_id?: string | null
          spells?: string | null
          strength: number
          updated_at?: string | null
          wisdom: number
        }
        Update: {
          abilities?: string | null
          background?: string | null
          charisma?: number
          class?: string
          created_at?: string | null
          dexterity?: number
          experience_points?: number | null
          game_id?: string | null
          gold?: number | null
          health?: number
          id?: string
          intelligence?: number
          inventory?: string | null
          level?: number | null
          mana?: number | null
          max_health?: number
          max_mana?: number | null
          name?: string
          player_id?: string | null
          spells?: string | null
          strength?: number
          updated_at?: string | null
          wisdom?: number
        }
        Relationships: [
          {
            foreignKeyName: "characters_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "active_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["game_id"]
          },
          {
            foreignKeyName: "characters_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "characters_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          created_at: string
          device_fingerprint: string
          id: string
          ip_address: string | null
          last_seen: string
          user_agent: string
        }
        Insert: {
          created_at?: string
          device_fingerprint: string
          id: string
          ip_address?: string | null
          last_seen?: string
          user_agent: string
        }
        Update: {
          created_at?: string
          device_fingerprint?: string
          id?: string
          ip_address?: string | null
          last_seen?: string
          user_agent?: string
        }
        Relationships: []
      }
      game_players: {
        Row: {
          game_id: string
          id: string
          joined_at: string | null
          player_id: string
        }
        Insert: {
          game_id: string
          id?: string
          joined_at?: string | null
          player_id: string
        }
        Update: {
          game_id?: string
          id?: string
          joined_at?: string | null
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "active_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["game_id"]
          },
          {
            foreignKeyName: "game_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "game_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          created_at: string | null
          current_scene: string | null
          game_id: string
          id: string
          is_active: boolean | null
          session_data: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_scene?: string | null
          game_id: string
          id?: string
          is_active?: boolean | null
          session_data?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_scene?: string | null
          game_id?: string
          id?: string
          is_active?: boolean | null
          session_data?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "active_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["game_id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          description: string | null
          dungeon_master_id: string | null
          id: string
          max_players: number | null
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          dungeon_master_id?: string | null
          id?: string
          max_players?: number | null
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          dungeon_master_id?: string | null
          id?: string
          max_players?: number | null
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_dungeon_master_id_fkey"
            columns: ["dungeon_master_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "games_dungeon_master_id_fkey"
            columns: ["dungeon_master_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          game_id: string
          id: string
          is_private: boolean | null
          message_type: string | null
          metadata: string | null
          player_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          game_id: string
          id?: string
          is_private?: boolean | null
          message_type?: string | null
          metadata?: string | null
          player_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          game_id?: string
          id?: string
          is_private?: boolean | null
          message_type?: string | null
          metadata?: string | null
          player_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "active_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["game_id"]
          },
          {
            foreignKeyName: "messages_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "messages_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          character_name: string
          charisma: number
          class: string
          created_at: string | null
          device_id: string
          dexterity: number
          experience_points: number | null
          gold: number | null
          health: number
          id: string
          intelligence: number
          inventory: string | null
          is_online: boolean | null
          last_active: string | null
          level: number | null
          mana: number | null
          max_health: number
          max_mana: number | null
          name: string
          spells: string | null
          strength: number
          updated_at: string | null
          wisdom: number
        }
        Insert: {
          character_name: string
          charisma: number
          class: string
          created_at?: string | null
          device_id?: string
          dexterity: number
          experience_points?: number | null
          gold?: number | null
          health: number
          id?: string
          intelligence: number
          inventory?: string | null
          is_online?: boolean | null
          last_active?: string | null
          level?: number | null
          mana?: number | null
          max_health: number
          max_mana?: number | null
          name: string
          spells?: string | null
          strength: number
          updated_at?: string | null
          wisdom: number
        }
        Update: {
          character_name?: string
          charisma?: number
          class?: string
          created_at?: string | null
          device_id?: string
          dexterity?: number
          experience_points?: number | null
          gold?: number | null
          health?: number
          id?: string
          intelligence?: number
          inventory?: string | null
          is_online?: boolean | null
          last_active?: string | null
          level?: number | null
          mana?: number | null
          max_health?: number
          max_mana?: number | null
          name?: string
          spells?: string | null
          strength?: number
          updated_at?: string | null
          wisdom?: number
        }
        Relationships: []
      }
    }
    Views: {
      active_games: {
        Row: {
          created_at: string | null
          current_players: number | null
          description: string | null
          dungeon_master_id: string | null
          id: string | null
          max_players: number | null
          name: string | null
          status: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_dungeon_master_id_fkey"
            columns: ["dungeon_master_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "games_dungeon_master_id_fkey"
            columns: ["dungeon_master_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      game_messages: {
        Row: {
          character_name: string | null
          content: string | null
          created_at: string | null
          game_id: string | null
          id: string | null
          is_private: boolean | null
          message_type: string | null
          metadata: string | null
          player_id: string | null
          player_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "active_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["game_id"]
          },
          {
            foreignKeyName: "messages_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "messages_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      game_summary: {
        Row: {
          created_at: string | null
          dungeon_master_name: string | null
          id: string | null
          max_players: number | null
          name: string | null
          player_count: number | null
          status: string | null
        }
        Relationships: []
      }
      player_characters: {
        Row: {
          character_id: string | null
          character_name: string | null
          class: string | null
          game_id: string | null
          game_name: string | null
          level: number | null
          player_id: string | null
          player_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_experience_pg: {
        Args: { exp_amount: number; player_uuid: string }
        Returns: boolean
      }
      create_game_session_pg: {
        Args: { game_uuid: string; initial_scene?: string }
        Returns: string
      }
      generate_uuid: { Args: never; Returns: string }
      get_game_messages_pg: {
        Args: { game_uuid: string; page_number?: number; page_size?: number }
        Returns: {
          content: string
          created_at: string
          id: string
          is_private: boolean
          message_type: string
          player_id: string
          player_name: string
        }[]
      }
      get_player_stats_pg: {
        Args: { player_uuid: string }
        Returns: {
          character_name: string
          charisma: number
          class: string
          dexterity: number
          experience_points: number
          gold: number
          health: number
          intelligence: number
          level: number
          mana: number
          max_health: number
          max_mana: number
          name: string
          strength: number
          wisdom: number
        }[]
      }
      is_game_full_pg: { Args: { game_uuid: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
