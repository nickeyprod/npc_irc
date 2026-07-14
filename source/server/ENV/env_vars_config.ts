// GLOBALLY ACCESSIBLE VARIABLES ACROSS THE PROJECT

let GLOBAL_VARS = process.env;

if (GLOBAL_VARS.NODE_ENV === "production") {
  GLOBAL_VARS = process.env;
}
else {
  const gv = await import("../../../local_env_vars.json" as string, {
    with: { type: "json" }
  });

  GLOBAL_VARS = gv.default; 
}

export { GLOBAL_VARS }
