import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "./src/schema.graphql",
    documents: ["src/**/*.tsx"],
    generates: {
        "./src/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
};

export default config;