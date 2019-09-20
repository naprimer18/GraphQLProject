const graphql = require('graphql');

const { GraphQLObjectType , GraphQLString, GraphQLSchema, GraphQLList , GraphQLID} = graphql;

const Movies = require('../models/movies');

const MoviesType = new GraphQLObjectType({
    name: "Movies",
    fields:{
        name: { type: GraphQLString},
        id: { type: GraphQLString},
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    fields:{
        movies:{
            type: GraphQLList(MoviesType),
            args: { id: { type: GraphQLString }},
            resolve(parent,args) {
                return Movies.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addMovie:{
            type: MoviesType,
            args: { name: { type: GraphQLString }},
            resolve(parent,args) {
                const newMovie = new Movies({
                    name: args.name
                })
                return newMovie.save();
            }
        },
        deleteMovie:{
            type: MoviesType,
            args: { id: { type: GraphQLString }},
            resolve(parent,args) {
                return Movies.findByIdAndDelete(args.id);
            }
        },
        updateMovie:{
            type: MoviesType,
            args: {id: { type: GraphQLString }, name: { type: GraphQLString }},
            resolve(parent,args) {
                return Movies.findByIdAndUpdate(args.id, {$set: {name: args.name}}, {new: true});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})