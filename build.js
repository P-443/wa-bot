const esbuild = require("esbuild");
const path = require("path");

// لا تعيد تعريف __dirname إذا كانت موجودة مسبقًا
// فقط استخدمها مباشرة
const watch = process.argv.includes("--watch");

// الطريقة الصحيحة للحصول على __dirname في ESModules:
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function build() {
  try {
    const context = await esbuild.context({
      entryPoints: [path.resolve("./frontend/src/App.tsx")],
      bundle: true,
      minify: !watch,
      sourcemap: watch,
      target: ["chrome58", "firefox57", "safari11"],
      outfile: path.resolve("./public/js/bundle.js"),
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
