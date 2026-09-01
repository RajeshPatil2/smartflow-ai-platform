FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY . .
RUN chmod +x mvnw || true
CMD ["bash", "-lc", "./mvnw -q -DskipTests package && find . -path '*target/*.jar' | head -n 1 | xargs java -jar"]
