CREATE TABLE IF NOT EXISTS "fixtures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"round" integer NOT NULL,
	"leg" integer NOT NULL,
	"home_team_id" uuid,
	"away_team_id" uuid,
	"home_team" text NOT NULL,
	"away_team" text NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"match_date" timestamp,
	"venue" text DEFAULT 'TBD',
	"created_at" timestamp DEFAULT now()
);

DO $$ BEGIN
 ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_home_team_id_teams_id_fk" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fixtures" ADD CONSTRAINT "fixtures_away_team_id_teams_id_fk" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;