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
export default typeDefs;
