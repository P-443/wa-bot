// build.js
const esbuild = require("esbuild");
const path = require("path");

// تحديد المسار
const __dirname = path.resolve();

const watch = process.argv.includes("--watch");

async function build() {
  try {
    const context = await esbuild.context({
      entryPoints: [path.resolve(__dirname, "frontend/src/App.tsx")],
      bundle: true,
      minify: !watch,
      sourcemap: watch,
      target: ["chrome58", "firefox57", "safari11"],
      outfile: path.resolve(__dirname, "public/js/bundle.js"),
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
      console.log("Watching for changes...");
    } else {
      await context.rebuild();
      await context.dispose();
      console.log("Build completed");
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();
