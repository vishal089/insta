const graphql = require('graphql');
const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList} = graphql;
const userInfoModel = require('../model/userInfo');

const userType = new GraphQLObjectType({
    name:"User",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        followerData:{
            type:new GraphQLList(userType),
            async resolve(parent,args){
                return await userInfoModel.find({'_id':{$in:parent.follower}})
            }
        },
        followingData:{
            type:new GraphQLList(userType),
            async resolve(parent,args){
                return await userInfoModel.find({'_id':{$in:parent.follwing}})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        user:{
            type:userType,
            args:{id:{type:GraphQLID}},
            async resolve(parent,args){
                return await userInfoModel.findById(args.id);
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery,
})
