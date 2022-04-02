function takeOff(time) {
  if (time != 19) {
    return "plane_checks";
  }
  let i = 0;
  while (i != 9) {
    speed(10);
    i = i + 1;
  }
}
