// build.js
import esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

// تحويل import.meta.url لـ __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watch = process.argv.includes("--watch");

async function build() {
  const context = await esbuild.context({
    entryPoints: [path.resolve(__dirname, "frontend/src/App.tsx")],
    bundle: true,
    minify: !watch,
    sourcemap: watch,
    target: ["chrome58", "firefox57", "safari11"],
    outfile: "public/js/bundle.js",
    define: {
      "process.env.NODE_ENV": watch ? '"development"' : '"production"',
    },
    loader: {
      ".tsx": "tsx",
      ".ts": "ts",
    },
  });

  if (watch) {
    await context.watch();
    console.log("watching for changes...");
  } else {
    await context.rebuild();
    context.dispose();
    console.log("build completed");
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
