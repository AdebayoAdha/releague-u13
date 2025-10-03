ALTER TABLE "match_results" ALTER COLUMN "fixture_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "match_results" ALTER COLUMN "team_id" DROP DEFAULT;