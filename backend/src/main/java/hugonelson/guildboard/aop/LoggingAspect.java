package hugonelson.guildboard.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

// @Aspect marks this class as holding pointcuts/advices
// @Component is still required so Spring's component scan registers it as a bean
@Aspect
@Component
public class LoggingAspect {

    // no Lombok, Logger created by hand
    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    // a pointcut names a set of join points (method calls) without any behavior attached
    // execution(* package..*(..)) : any return type, any method, any args
    @Pointcut("execution(* hugonelson.guildboard.controller..*(..))")
    public void controllerLayer() {}

    @Pointcut("execution(* hugonelson.guildboard.service..*(..))")
    public void serviceLayer() {}

    // pointcuts can be combined like booleans
    @Pointcut("controllerLayer() || serviceLayer()")
    public void applicationLayer() {}

    // @Around wraps the matched call: it runs before AND after, and can inspect/replace
    // the return value or the thrown exception. The pointcut expression picks which calls.
    @Around("applicationLayer()")
    // ProceedingJoinPoint = a method call intercepted, to be analysed for logs 
    // Can actually trigger it with .proceed()
    public Object logCall(ProceedingJoinPoint joinPoint) throws Throwable {
        
        // the intercepted method's signature and the arguments it was called with
        String signature = joinPoint.getSignature().toShortString();
        Object[] args = joinPoint.getArgs();

        log.info(">> {} args={}", signature, Arrays.toString(args));

        // time every function
        long start = System.currentTimeMillis();
        try {
            // proceed() actually runs the intercepted method (controller/service code below it)
            Object result = joinPoint.proceed();
            long elapsed = System.currentTimeMillis() - start;
            log.info("<< {} returned={} ({} ms)", signature, result, elapsed);
            return result;
        } catch (Throwable ex) {
            long elapsed = System.currentTimeMillis() - start;
            log.error("!! {} threw={} ({} ms)", signature, ex.toString(), elapsed);
            // rethrow: swallowing it here would silently break existing error handling
            throw ex;
        }
    }
}
