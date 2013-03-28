function surrogateCtor() {}

function extend(base, sub) {
  // Copy the prototype from the base to setup inheritance
  surrogateCtor.prototype = base.prototype;
  // Tricky huh?
  sub.prototype = new surrogateCtor();
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
}