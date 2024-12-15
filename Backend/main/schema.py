import graphene
from recette.schema import RecetteQuery, RecetteMutation

class Query(RecetteQuery, graphene.ObjectType):
    pass

class Mutation(RecetteMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)