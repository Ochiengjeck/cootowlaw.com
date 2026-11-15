ALTER TABLE `site_settings` ADD `home_hero_image_id` text REFERENCES media(id);--> statement-breakpoint
ALTER TABLE `site_settings` ADD `about_hero_image_id` text REFERENCES media(id);