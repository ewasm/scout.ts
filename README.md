# scout.ts
Typescript port of [scout](https://github.com/ewasm/scout).

## Usage

### Node
In order to run an execution environment, several build steps need to be performed. First build the typescript source code:

```sh
npm run build
```

Then, the execution environment written in AssemblyScript needs to be built. The hello world example can be built by running:

```sh
npm run asbuild:optimized
```

In order to build a custom execution environment you can use something like:

```sh
asc assembly/test/index.ts -b build/test-optimized.wasm -t build/test-optimized.wat --sourceMap --validate --optimize
```

To run the EE, you'll need a scout yaml file (see `test.yaml` for an example) which also specifies the path to the Wasm binary:

```sh
npm run start test.yaml
```

### Browser

The process for running the script in the browser is similar. When building the typescript source code, use instead:

```sh
npm run build:browser
```

And when running the EE, modify the `yamlPath` variable in `src/browser.js` to point to your yaml file and do:

```sh
npm run start:browser
```
