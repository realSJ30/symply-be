import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import {
  CreateEventInput,
  UpdateEventInput,
} from "./interface/input.interface";

const prisma = new PrismaClient();

const typeDefs = `#graphql
  input CreateEventInput {
    userId: String!
    title: String!
    description: String
    date: String!
  }

  input UpdateEventInput {
    id: Int!
    title: String
    description: String
    date: String
    completed: Boolean
  }

  type Event {
    id: Int!
    userId: String!
    title: String!
    description: String
    date: String!
    createdAt: String!
    updatedAt: String!
    completed: Boolean!
  }

  type Query {
    events(userId: String!): [Event!]!
    event(id: Int!): Event
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event!
    updateEvent(input: UpdateEventInput!): Event
    removeEvent(id: Int!): Event
  }
`;

const resolvers = {
  Query: {
    events: async (_, { userId }) => {
      return prisma.event.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    event: async (_, { id }) => {
      return prisma.event.findUnique({ where: { id: id } });
    },
  },
  Mutation: {
    createEvent: async (_, { input }: { input: CreateEventInput }) => {
      const { userId, title, description, date } = input;
      return prisma.event.create({
        data: {
          userId,
          title,
          description,
          date: new Date(date),
        },
      });
    },
    updateEvent: async (_, { input }: { input: UpdateEventInput }) => {
      const { id, title, description, completed } = input;
      return prisma.event.update({
        where: { id: id },
        data: {
          title,
          description,
          completed,
        },
      });
    },
    removeEvent: async (_, { id }) => {
      return prisma.event.delete({ where: { id: id } });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at: ${url}`);
