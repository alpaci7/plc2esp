
#define BUILTIN_LED 13
void setup() {
  pinMode(BUILTIN_LED, OUTPUT);
}

void loop() {
  digitalWrite(BUILTIN_LED, !digitalRead(BUILTIN_LED));
  delay(1000);
}
