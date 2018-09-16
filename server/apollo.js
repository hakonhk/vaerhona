const { ApolloServer, gql } = require("apollo-server-express");
const {
  GraphQLScalarType,
  GraphQLUnionType,
  GraphQLInt,
  GraphQLString
} = require("graphql");
const { Kind } = require("graphql/language");

const { PlaceService, SnapshotService } = require("./services");

const typeDefs = gql`
  scalar Date

  type Place {
    cuid: String
    name: String
    isPublic: Boolean
    mostRecentSnapshot: Snapshot
  }

  type Snapshot {
    cuid: String
    placeName: String
    date: Date
    temperature: Float
    pressure: Float
    humidity: Float
    image: String
  }

  type Query {
    places: [Place]
    place(name: String!): Place
    snapshots(
      place: String!
      limit: Int
      from: String
      to: String
      limit: Int
    ): [Snapshot]
  }
`;

const resolvers = {
  Query: {
    places() {
      return PlaceService.getPlaces();
    },
    place(root, { name, ...rest }) {
      return PlaceService.getPlace({ placeName: name, ...rest });
    },
    snapshots(root, { place, ...rest }) {
      return SnapshotService.getSnapshots({
        placeName: place,
        ...rest
      });
    }
  },
  Place: {
    async mostRecentSnapshot(place) {
      const [snapshot] = await SnapshotService.getSnapshots({
        placeName: place.name,
        limit: 1
      });
      return snapshot;
    }
  },
  Snapshot: {
    date(snapshot) {
      return new Date(snapshot.dateAdded);
    },
    image(snapshot) {
      const date = new Date(snapshot.dateAdded);
      return `https://vaerhona.s3-eu-west-1.amazonaws.com/${
        snapshot.placeName
      }/${date.getFullYear()}/${date.getMonth() + 1}/${snapshot.cuid}`;
    }
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date (custom scalar type)",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = app => server.applyMiddleware({ app, path: "/api/graphql" });
