FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY pom.xml .
COPY ai-insights-service/pom.xml ai-insights-service/pom.xml
COPY ai-insights-service/src ai-insights-service/src
RUN mvn -pl ai-insights-service -am package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /workspace/ai-insights-service/target/ai-insights-service-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
