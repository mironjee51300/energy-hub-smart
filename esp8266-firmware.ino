// ESP8266 Firmware for Sensor Data Collection

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>

#define DHTPIN 2           // DHT22 sensor data pin
#define DHTTYPE DHT22      // DHT 22 (AM2302)

DHT dht(DHTPIN, DHTTYPE);

// Replace with your network credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// Set up the web server on port 80
ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Define URL handlers
  server.on("/sensor", HTTP_GET, handleSensorData);

  // Start server
  server.begin();
  Serial.println("Server started");
}

void handleSensorData() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Handle failed reads
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    server.send(500, "text/plain", "Failed to read from DHT sensor");
    return;
  }

  String sensorData = "Temperature: " + String(t) + " °C\n";
  sensorData += "Humidity: " + String(h) + " %\n";
  server.send(200, "text/plain", sensorData);
}

void loop() {
  server.handleClient();
}