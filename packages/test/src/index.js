#!/usr/bin/env node

function main() {
  console.log("Hello from main");
}

if (require.main === module) {
  main();
}
