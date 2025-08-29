import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://contacts-graphql-api.onrender.com",
  documents: "src/graphql/**/*.graphql",  // updated path
  generates: {
    "src/graphql/generated/": {            // output inside src for easier imports
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
