import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "coach"] }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamName: text("team_name").notNull(),
  teamCoach: text("team_coach").notNull(),
  teamLogo: text("team_logo"),
  coachImage: text("coach_image"),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const players = pgTable("players", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  position: text("position").notNull(),
  number: integer("number").notNull(),
  image: text("image"),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const fixtures = pgTable("fixtures", {
  id: uuid("id").primaryKey().defaultRandom(),
  round: integer("round").notNull(),
  leg: integer("leg").notNull(),
  homeTeamId: uuid("home_team_id").references(() => teams.id),
  awayTeamId: uuid("away_team_id").references(() => teams.id),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  status: text("status").notNull().default("scheduled"),
  matchDate: timestamp("match_date"),
  matchTime: text("match_time"),
  venue: text("venue").default("TBD"),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const matchResults = pgTable("match_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  fixtureId: uuid("fixture_id").references(() => fixtures.id).notNull(),
  goalScorer: text("goal_scorer"),
  assistBy: text("assist_by"),
  cleanSheet: text("clean_sheet"),
  teamId: uuid("team_id").references(() => teams.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const matchReports = pgTable("match_reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  fixtureId: uuid("fixture_id").references(() => fixtures.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  selectedPlayers: text("selected_players").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const news = pgTable("news", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  status: text("status", { enum: ["published", "draft"] }).notNull().default("draft"),
  author: text("author").notNull(),
  image: text("image"),
  createdAt: text("created_at").notNull(),
});

export const gallery = pgTable("gallery", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  album: text("album").notNull(),
  image: text("image").notNull(),
  createdAt: text("created_at").notNull(),
});
