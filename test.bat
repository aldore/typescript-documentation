@rem tets.bat
@echo off
node built/local/tsc.js --target ES5 --documentation --nolib tests/akra-test/akra.ts tests/akra-test/definitions/fixes.d.ts tests/akra-test/definitions/lib.d.ts