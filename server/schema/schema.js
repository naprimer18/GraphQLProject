const graphql = require('graphql');
const Movies = require('../models/movies');

const { GraphQLObjectType , GraphQLString, GraphQLSchema, GraphQLList , GraphQLBoolean} = graphql;

const MoviesType = new GraphQLObjectType({
    name: "Movies",
    fields:{
        name: { type: GraphQLString},
        id: { type: GraphQLString},
        isWatched: { type: GraphQLBoolean},
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    fields:{
        movies:{
            type: GraphQLList(MoviesType),
            args: { name: { type: GraphQLString }},
            resolve(parent, { name }) {
               return Movies.find({name:{$regex: name, $options: "i"}})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addMovie:{
            type: MoviesType,
            args: { name: { type: GraphQLString } ,  isWatched: { type: GraphQLBoolean }},
            resolve(parent,args) {
                const newMovie = new Movies({
                    name: args.name,
                    isWatched: args.isWatched
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
            args: {id: { type: GraphQLString }, name: { type: GraphQLString }, isWatched: { type: GraphQLBoolean }},
            resolve(parent,args) {
                return Movies.findByIdAndUpdate(args.id, {$set: {name: args.name, isWatched: args.isWatched }}, {new: true});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})