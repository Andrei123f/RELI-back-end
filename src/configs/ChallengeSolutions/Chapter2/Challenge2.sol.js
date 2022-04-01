function canCall(hour) {
  if (hour == 12) {
    return "busy";
  }
  if (hour == 15) {
    return "lunch";
  }

  if (hour == 18) {
    return "done";
  }
}
