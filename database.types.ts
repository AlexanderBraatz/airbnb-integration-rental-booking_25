export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      Bookings: {
        Row: {
          check_in_date: string;
          check_out_date: string;
          created_at: string;
          guest_email: string;
          guest_first_name: string;
          guest_last_name: string;
          guest_message: string | null;
          guest_phone_number: string | null;
          has_agreed_to_policies: boolean;
          id: number;
          number_of_guests: number;
          price_snapshot_guest_payed_in_EURcents: number | null;
          price_snapshot_host_accepted_in_EURcents: number | null;
          sent_email_1_request_guest: boolean;
          sent_email_1_request_host: boolean;
          sent_email_2_confim_accepted_booking_host: boolean;
          sent_email_2_payment_link_guest: boolean;
          sent_email_3_paymend_confimed_guest: boolean;
          sent_email_3_payment_confirmed_host: boolean;
          with_dog: boolean;
        };
        Insert: {
          check_in_date: string;
          check_out_date: string;
          created_at?: string;
          guest_email: string;
          guest_first_name: string;
          guest_last_name: string;
          guest_message?: string | null;
          guest_phone_number?: string | null;
          has_agreed_to_policies?: boolean;
          id?: number;
          number_of_guests: number;
          price_snapshot_guest_payed_in_EURcents?: number | null;
          price_snapshot_host_accepted_in_EURcents?: number | null;
          sent_email_1_request_guest?: boolean;
          sent_email_1_request_host?: boolean;
          sent_email_2_confim_accepted_booking_host?: boolean;
          sent_email_2_payment_link_guest?: boolean;
          sent_email_3_paymend_confimed_guest?: boolean;
          sent_email_3_payment_confirmed_host?: boolean;
          with_dog?: boolean;
        };
        Update: {
          check_in_date?: string;
          check_out_date?: string;
          created_at?: string;
          guest_email?: string;
          guest_first_name?: string;
          guest_last_name?: string;
          guest_message?: string | null;
          guest_phone_number?: string | null;
          has_agreed_to_policies?: boolean;
          id?: number;
          number_of_guests?: number;
          price_snapshot_guest_payed_in_EURcents?: number | null;
          price_snapshot_host_accepted_in_EURcents?: number | null;
          sent_email_1_request_guest?: boolean;
          sent_email_1_request_host?: boolean;
          sent_email_2_confim_accepted_booking_host?: boolean;
          sent_email_2_payment_link_guest?: boolean;
          sent_email_3_paymend_confimed_guest?: boolean;
          sent_email_3_payment_confirmed_host?: boolean;
          with_dog?: boolean;
        };
        Relationships: [];
      };
      daily_availability: {
        Row: {
          created_at: string;
          day: string;
          id: number;
          is_available: boolean;
          price_in_eur_cents: number;
        };
        Insert: {
          created_at?: string;
          day: string;
          id?: number;
          is_available?: boolean;
          price_in_eur_cents?: number;
        };
        Update: {
          created_at?: string;
          day?: string;
          id?: number;
          is_available?: boolean;
          price_in_eur_cents?: number;
        };
        Relationships: [];
      };
      Days: {
        Row: {
          created_at: string;
          day: string;
          id: number;
          is_available: boolean;
          price_in_EUR_Cents: number;
        };
        Insert: {
          created_at?: string;
          day?: string;
          id?: number;
          is_available?: boolean;
          price_in_EUR_Cents?: number;
        };
        Update: {
          created_at?: string;
          day?: string;
          id?: number;
          is_available?: boolean;
          price_in_EUR_Cents?: number;
        };
        Relationships: [];
      };
      host_config: {
        Row: {
          created_at: string | null;
          host_business_email: string;
          id: number;
          price_for_cleaning_cents: number;
          price_for_dog_cents: number;
          price_per_night_cents: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          host_business_email: string;
          id?: number;
          price_for_cleaning_cents: number;
          price_for_dog_cents: number;
          price_per_night_cents: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          host_business_email?: string;
          id?: number;
          price_for_cleaning_cents?: number;
          price_for_dog_cents?: number;
          price_per_night_cents?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      ScheduledEmails: {
        Row: {
          attempts: number;
          created_at: string;
          html: string | null;
          id: string;
          last_error: string | null;
          resend_email_id: string | null;
          send_at: string;
          status: string;
          subject: string;
          template: string;
          template_props: Json;
          to_email: string;
        };
        Insert: {
          attempts?: number;
          created_at?: string;
          html?: string | null;
          id?: string;
          last_error?: string | null;
          resend_email_id?: string | null;
          send_at: string;
          status?: string;
          subject: string;
          template: string;
          template_props: Json;
          to_email: string;
        };
        Update: {
          attempts?: number;
          created_at?: string;
          html?: string | null;
          id?: string;
          last_error?: string | null;
          resend_email_id?: string | null;
          send_at?: string;
          status?: string;
          subject?: string;
          template?: string;
          template_props?: Json;
          to_email?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
