const graphql = require('graphql');

const { GraphQLObjectType , GraphQLString, GraphQLSchema, GraphQLList , GraphQLID} = graphql;

const Dog = require('../models/dog');

const DogType = new GraphQLObjectType({
    name: "Dogs",
    fields:{
        name: { type: GraphQLString},
        id: { type: GraphQLString},
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    fields:{
        dog:{
            type: GraphQLList(DogType),
            args: { id: { type: GraphQLString }},
            resolve(parent,args) {
                return Dog.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDog:{
            type: DogType,
            args: { name: { type: GraphQLString }},
            resolve(parent,args) {
                const newDog = new Dog({
                    name: args.name
                })
                return newDog.save();
            }
        },
        deleteDog:{
            type: DogType,
            args: { id: { type: GraphQLString }},
            resolve(parent,args) {
                return Dog.findByIdAndDelete(args.id);
            }
        },
        updateDog:{
            type: DogType,
            args: {id: { type: GraphQLString }, name: { type: GraphQLString }},
            resolve(parent,args) {
                return Dog.findByIdAndUpdate(args.id, {$set: {name: args.name}}, {new: true});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})