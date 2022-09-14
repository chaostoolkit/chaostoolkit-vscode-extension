# VS Code Info

## Introduction

This document is just a collective of notes detailing this VS Code extension

## README.md

I would have used the [README](./README.md) to write this document but the
[README](./README.md) is actually used to write the details section of the
extension information page - and we don't want these notes to be published to
the marketplace

## Language Server

Currently, the [Language Server](./src/server.ts) and
[Client](./src/extension.ts) I have implemented are essentially copies of the
example on the
[Language Server Extension Guide](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)
page (code on
[GitHub](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample))
I don't know if it works as I haven't been able to test it without the
validation steps but I've given it my best guess

## JSON Validation

As a prefix, this is the section I have struggled with the most. The difficultly
comes with the fact that line and character indexes have to be given to be able
to underline the error for the user. Validating the payload should be fairly
simple; it's just retrieving the error indexes which is a pain

I started out by trying to use a [JSON Schema](https://json-schema.org/) but
there were few downsides to this. Firstly, it can only really validate property
types. This works well but there are other types of specific validation that
can't be achieved using this approach. For example, it can validate that a
certain array only contains strings but what it can't do is make sure that none
of those strings are empty. For this we would need to manually validate that
property. And, if we are manually validating some of it, we should probably
manually validate all of it for simplicity. The second issue is that there isn't
really any way to retrieve indexes from the schema. So that went out the window

After spending way too much time on that approach, I came up with a second
approach that solved both of those issues - but presented some difficulties. It
was as such:

- Retrieve the payload as plaintext
- Convert payload into a character array
- Iterate through character array and destructure payload into indexed object
- Convert payload to JSON object
- Manually validate object
  - On error: use indexed object to provide line and character indexes

For context, the example JSON object in
[Shopping List](./src/shopping-list.json) would be destructured and indexed into
the JSON object in [Shopping List Indexed](./src/shopping-list-indexed.json).
This would then allow you to retrieve the indexes of different elements when
creating a diagnostic error

Another benefit of this approach is that it can be adapted for YAML files as
well. You would just need two indexing functions instead - one to index JSON
strings into JSON objects and one to index YAML strings into JSON objects. Then,
they can be validated in the same way.

I started to implement this in [Idea](./src/idea.ts) but didn't get very far

## Types

I spent quite a lot of time implementing an [Experiment](./src/types.ts) type
and believe I have got it rather accurate. It uses a mix of both types and
interfaces (which might prove some issues, I'm not sure) and is fairly
complicated

## Workflows

I have included a couple of Github Workflows to (hopefully) automate deployment.
The only thing missing is testing. Once the extension is complete, tests will
have to be written (in the ./src/test directory) and added as a step in the
workflows
