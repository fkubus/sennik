/**
 * Ręcznie utrzymywane typy odzwierciedlające supabase/migrations/*.sql.
 * Docelowo zastąpić wygenerowanymi przez:
 *   pnpm supabase gen types typescript --linked > lib/supabase/types.ts
 * (wymaga połączenia z prawdziwym projektem Supabase).
 */

export type UserRole = "user" | "admin";
export type ContentStatus = "draft" | "published";
export type SubscriptionStatus =
  "active" | "trialing" | "past_due" | "canceled" | "unpaid" | "incomplete";
export type CreditTransactionType =
  | "free_trial"
  | "purchase"
  | "subscription_grant"
  | "monthly_reset"
  | "consumption"
  | "refund";

export interface SymbolVariant {
  label: string;
  content: string;
}

export interface SymbolFaqItem {
  question: string;
  answer: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          marketing_consent: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [];
      };
      credits: {
        Row: {
          user_id: string;
          balance: number;
          free_trial_used: boolean;
          monthly_used: number;
          monthly_reset_at: string | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["credits"]["Row"]> & {
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["credits"]["Row"]>;
        Relationships: [];
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          type: CreditTransactionType;
          amount: number;
          stripe_event_id: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["credit_transactions"]["Row"]
        > & {
          user_id: string;
          type: CreditTransactionType;
          amount: number;
        };
        Update: Partial<
          Database["public"]["Tables"]["credit_transactions"]["Row"]
        >;
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          status: SubscriptionStatus;
          plan: string;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["subscriptions"]["Row"]
        > & {
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          status: SubscriptionStatus;
          plan: string;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Row"]>;
        Relationships: [];
      };
      stripe_events: {
        Row: {
          stripe_event_id: string;
          type: string;
          processed_at: string;
        };
        Insert: Database["public"]["Tables"]["stripe_events"]["Row"];
        Update: Partial<Database["public"]["Tables"]["stripe_events"]["Row"]>;
        Relationships: [];
      };
      symbol_categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["symbol_categories"]["Row"]
        > & {
          slug: string;
          name: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["symbol_categories"]["Row"]
        >;
        Relationships: [];
      };
      symbols: {
        Row: {
          id: string;
          slug: string;
          name: string;
          category_id: string | null;
          status: ContentStatus;
          excerpt: string | null;
          content_md: string;
          variants: SymbolVariant[];
          faq: SymbolFaqItem[];
          related_slugs: string[];
          meta_title: string | null;
          meta_description: string | null;
          author_id: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["symbols"]["Row"]> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["symbols"]["Row"]>;
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          status: ContentStatus;
          excerpt: string | null;
          content_md: string;
          cover_image_url: string | null;
          meta_title: string | null;
          meta_description: string | null;
          author_id: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
        Relationships: [];
      };
      interpretations: {
        Row: {
          id: string;
          user_id: string;
          dream_text_encrypted: string;
          emotions: string[];
          life_context_encrypted: string | null;
          ai_response_encrypted: string | null;
          model_used: string | null;
          tokens_used: number | null;
          credit_transaction_id: string | null;
          created_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["interpretations"]["Row"]
        > & {
          user_id: string;
          dream_text_encrypted: string;
        };
        Update: Partial<Database["public"]["Tables"]["interpretations"]["Row"]>;
        Relationships: [];
      };
      dream_journal: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          dream_text_encrypted: string;
          tags: string[];
          mood: string | null;
          dreamed_at: string | null;
          interpretation_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["dream_journal"]["Row"]
        > & {
          user_id: string;
          dream_text_encrypted: string;
        };
        Update: Partial<Database["public"]["Tables"]["dream_journal"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
