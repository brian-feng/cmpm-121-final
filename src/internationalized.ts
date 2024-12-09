// do we need this?

// import { parseArgs } from "jsr:@std/cli/parse-args";
// import i18n from "./i18n.ts";

// const parsedArgs = parseArgs(Deno.args);

// const cmd = parsedArgs._[0];

// if (cmd !== "sayhi" && cmd !== "s") {
//   throw new Error(`unknown command ${cmd}`);
// }

// const name = parsedArgs.n || parsedArgs.name;
// const language = parsedArgs.l || parsedArgs.language;

// const t = i18n(language);
// if (name) {
//   console.log(t("salutationWithName", { name }));
// } else {
//   console.log(t("salutation"));
// }