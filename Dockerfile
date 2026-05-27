FROM eclipse-temurin:21

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean install

EXPOSE 8080

CMD ["java", "-jar", "target/*.jar"]