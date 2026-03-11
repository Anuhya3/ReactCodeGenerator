import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type ComponentSummary {
    name: String!
    description: String!
  }

  type GenerationResult {
    jobId: ID!
    status: String!
    url: String
    componentTree: String
    components: [ComponentSummary!]!
    code: String
    previewHtml: String
    notes: String
    error: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    health: String!
    job(id: ID!): GenerationResult
  }

  type Mutation {
    generateFromUrl(url: String!): GenerationResult!
    generateFromHtml(html: String!): GenerationResult!
  }
`;
