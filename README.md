# Guildboard

Une WebApp légère pour le maîtres de guilde consciencieux de tracker ses aventuriers et leurs quêtes de manière fiable et centralisée. 

## Features 

## Auteurs

Hugo Belaloui, spé Logiciel, référent back.  
Nelson Grac-Aubert, ex-spé Jeux Vidéo, référent front.

## Documentation Swagger, apperçu des endpoints

## Choix techniques

- Java 21 : imposé, mais : LTS, records pour les DTO.
- SpringBoot : imposé, mais : standard pour le Web avec Java, injection de dépendances, attendus du sujet (Spring Data JPA pour le CRUD et les règles métier, Bean pour les requêtes, Springdoc pour Swagger).
- PostgreSQL : imposé, mais : déjà utilisé dans des projets précédents, et même si overkill pour la quantité de données pour la demo, on met en place une stack et un environnement scalable et représentatif de la réalité des projets d'entreprise. 

## Difficultés rencontrées

## Bonus (effectués / roadmap des améliorations)
