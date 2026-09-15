-- This file will always seed the database on app launch

INSERT INTO adventurer (name, character_class, level, gold, xp) VALUES
('Aragorn', 'RANGER', 1, 0, 0),
('Gandalf', 'MAGE', 1, 0, 0)
ON CONFLICT (name) DO NOTHING;

INSERT INTO quest (title, description, difficulty, required_level, gold_reward, xp_reward, status) VALUES
('Clear the Goblin Camp', 'A band of goblin sappers has set up camp on the edge of Elwynn Forest, rigging the nearby trail with crude explosives. Drive them off before a caravan stumbles into one of their traps.', 'EASY', 1, 50, 80, 'AVAILABLE'),
('Murloc Menace at the Coast', 'Murlocs have been dragging fishermen into the surf near the docks every night for the past week. Thin their numbers along the shoreline before the village runs out of volunteers to stand watch.', 'EASY', 1, 40, 70, 'AVAILABLE'),
('Deliver Supplies to Sentinel Hill', 'The garrison at Sentinel Hill is running low on food and medicine. Escort a supply wagon through the fog-choked roads of Westfall without losing a single crate to the Defias lurking in the fields.', 'EASY', 2, 60, 90, 'AVAILABLE'),
('Escort the Caravan Through Duskwood', 'Wolves and things far worse than wolves stalk the roads of Duskwood after nightfall. Escort the merchant caravan safely through the forest before the sun goes down and the howling starts.', 'MEDIUM', 5, 150, 200, 'AVAILABLE'),
('Investigate the Scarlet Monastery', 'Zealots of the Scarlet Crusade have been raiding villages on the outskirts of Tirisfal, dragging off anyone they deem tainted by the plague. Investigate the monastery and put a stop to it.', 'MEDIUM', 8, 180, 240, 'AVAILABLE'),
('Reclaim the Deadmines', 'The defector Edwin VanCleef has fortified the old Deadmines and is building a fleet to strike at Stormwind itself. Descend into the mines, defeat VanCleef, and put an end to his plot for good.', 'MEDIUM', 10, 220, 280, 'ON_GOING'),
('Hunt the Bloodfang Pack', 'A pack of worgen calling themselves the Bloodfang has been terrorizing the logging camps of Silverpine Forest after dark, leaving nothing but splintered wood and worse behind them. Hunt them down.', 'MEDIUM', 12, 200, 260, 'AVAILABLE'),
('Negotiate with the Dragon Accountant', 'A dragon has taken up residence in the back office of a Booty Bay counting house and, bizarrely, insists on doing the books before releasing the guild''s hoard. Convince it that patience is not a virtue.', 'HARD', 18, 400, 500, 'AVAILABLE'),
('Siege of Blackrock Depths', 'Descend into the smoldering halls of Blackrock Depths and reclaim the Grim Guzzler from the Dark Iron dwarves, who have turned the ancient dwarven capital into a fortress of fire and iron.', 'HARD', 20, 450, 550, 'AVAILABLE'),
('Slay the Kolkar Chieftain', 'The centaur tribes of Desolace grow bolder with every passing season, and their chieftain now claims dominion over the whole valley. March into their camp and end his reign before it spreads further.', 'HARD', 22, 380, 480, 'AVAILABLE'),
('Break the Siege of Darkshire', 'Undead forces pouring out of the Raven Hill Cemetery threaten to overrun Darkshire entirely, and the town guard is stretched thin. Break the siege before the last watchfire in Duskwood goes dark.', 'HARD', 24, 420, 520, 'COMPLETED'),
('Storm the Lich King''s Citadel', 'Storm the Lich King''s Citadel and put an end to the Scourge''s grip on Icecrown once and for all. Bring your strongest gear, your steadiest nerves, and be ready for a very long fight.', 'EPIC', 35, 1200, 450, 'AVAILABLE'),
('Bring Down Ragnaros', 'Descend into the molten depths of the Core and extinguish the Firelord''s ambitions before he burns Blackrock Mountain to ash and sets his sights on the world above. This is not a fight for the faint of heart.', 'EPIC', 40, 1500, 900, 'AVAILABLE'),
('Slay Onyxia', 'The black dragon Onyxia has spent years infiltrating Stormwind in disguise, whispering poison into the ears of the court. Expose her, drag her back to her lair beneath the Dragonmurk, and end her scheming for good.', 'EPIC', 38, 1350, 800, 'COMPLETED'),
('Confront Deathwing', 'The Aspect of Death himself has clawed his way back into the world and threatens to unmake Azeroth piece by piece. Stand against him at the heart of the destruction, whatever the cost may be.', 'EPIC', 45, 2000, 1000, 'AVAILABLE')
ON CONFLICT (title) DO NOTHING;
