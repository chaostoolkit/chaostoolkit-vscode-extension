import * as path from "path";
import { ExtensionContext } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join("dist", "server.js"));

  const runServerOptions = {
    module: serverModule,
    transport: TransportKind.ipc,
  };

  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  const debugServerOptions = { ...runServerOptions, ...debugOptions };

  const serverOptions: ServerOptions = {
    run: runServerOptions,
    debug: debugServerOptions,
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "file", language: "json" },
      { scheme: "file", language: "yaml" },
    ],
  };

  client = new LanguageClient(
    "ChaosToolkit",
    "Chaos Toolkit",
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
