function canCall(hour, time) {
  let computedHour = hour + time;
  if (12 < computedHour && computedHour < 14) {
    return "busy";
  }

  if (15 < computedHour && computedHour < 17) {
    return "lunch";
  }

  if (17 < computedHour && computedHour < 19) {
    return "done";
  }

  return "talk";
}
