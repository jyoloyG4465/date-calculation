export interface Comment {
  id: string;
  page_path: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: Comment;
        Insert: Omit<Comment, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Comment, "id">>;
      };
    };
  };
}
