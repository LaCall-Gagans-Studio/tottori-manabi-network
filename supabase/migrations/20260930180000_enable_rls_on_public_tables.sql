-- Enable RLS on Payload-owned public tables.
-- No policies on purpose: PostgREST roles (anon / authenticated) get no rows.
-- Payload connects as table owner (postgres) via DATABASE_URI and bypasses RLS
-- unless FORCE ROW LEVEL SECURITY is set. This migration does not force RLS.
--
-- Skipped: public.spatial_ref_sys (PostGIS catalog, owned by supabase_admin).

ALTER TABLE public.article ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_rels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_writer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dict ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dict_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dict_rels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dict_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dict_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dict_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_locked_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_locked_documents_rels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_migrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payload_preferences_rels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users_sessions ENABLE ROW LEVEL SECURITY;
