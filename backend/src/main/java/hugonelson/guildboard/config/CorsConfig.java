package hugonelson.guildboard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS = Cross-Origin Resource Sharing
// This class tells Spring which outside origins are allowed to call our API.
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // Spring calls this method itself at startup because CorsConfig implements WebMvcConfigurer
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // apply this CORS rule to every /api/... route
                .allowedOrigins("http://localhost:5173") // only the Vite dev server may call us
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // HTTP verbs allowed cross-origin
    }
}
