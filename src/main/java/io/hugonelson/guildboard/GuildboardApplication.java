package io.hugonelson.guildboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GuildboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(GuildboardApplication.class, args);
		System.out.println("Hello World");
	}

}
