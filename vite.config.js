export default {
  base: Deno.env.get("REPO_NAME") || "/project",
  build: {
    target: 'es2022', 
  },
};