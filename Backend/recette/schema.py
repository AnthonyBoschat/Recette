import graphene
from graphene_django import DjangoObjectType
from .models import Recette

class MaterialType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String(required=True)
    
class IngredientType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String(required=True)
    weight = graphene.Int(required=True)
    
class InstructionType(graphene.ObjectType):
    id = graphene.Int()
    step = graphene.Int(required=True)
    sentence = graphene.String(required=True)
    hours = graphene.Int()
    minutes = graphene.Int()
    secondes = graphene.Int()
    
    
class MaterialInput(graphene.InputObjectType):
    id = graphene.Int()  # Optionnel
    name = graphene.String(required=True)

class IngredientInput(graphene.InputObjectType):
    id = graphene.Int()  # Optionnel
    name = graphene.String(required=True)
    weight = graphene.Int(required=True)

class InstructionInput(graphene.InputObjectType):
    id = graphene.Int()  # Optionnel
    step = graphene.Int(required=True)
    sentence = graphene.String(required=True)
    hours = graphene.Int()
    minutes = graphene.Int()
    secondes = graphene.Int()

class RecetteType(DjangoObjectType):
    materials = graphene.List(MaterialType)
    ingredients = graphene.List(IngredientType)
    instructions = graphene.List(InstructionType)

    class Meta:
        model = Recette
        fields = ("id", "name", "materials", "ingredients", "instructions")

    def resolve_materials(self, info):
        return self.materials
    
    def resolve_ingredient(self, info):
        return self.ingredients
    
    def resolve_instructions(self, info):
        return self.instructions
    
    
    
class RecetteQuery(graphene.ObjectType):
    all_recettes = graphene.List(RecetteType)

    def resolve_all_recettes(root, info):
        return Recette.objects.all()
    
    
    
class CreateRecette(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        materials = graphene.List(MaterialInput)
        ingredients = graphene.List(IngredientInput)
        instructions = graphene.List(InstructionInput)

    recette = graphene.Field(RecetteType)
    success = graphene.Boolean()

    def mutate(self, info, name, materials=None, ingredients=None, instructions=None):
        print(f"materials___________________________________{materials}")
        print(f"ingredients___________________________________{ingredients}")
        
        recette = Recette(name=name, materials=materials, ingredients=ingredients, instructions=instructions)
        
        # if materials:
        #     recette.materials = [
        #         {
        #             "id": material.id,
        #             "name": material.name,
        #         }
        #         for material in materials
        #     ]

        # if ingredients:
        #     recette.ingredients = [
        #         {
        #             "id": ingredient.id,
        #             "name": ingredient.name,
        #             "weight": ingredient.weight,
        #         }
        #         for ingredient in ingredients
        #     ]

        # if instructions:
        #     recette.instructions = [
        #         {
        #             "id": instruction.id,
        #             "step": instruction.step,
        #             "sentence": instruction.sentence,
        #             "hours": instruction.hours,
        #             "minutes": instruction.minutes,
        #             "secondes": instruction.secondes,
        #         }
        #         for instruction in instructions
        #     ]

        recette.save()
        return CreateRecette(recette=recette, success=True)

class RecetteMutation(graphene.ObjectType):
    create_recette = CreateRecette.Field()

schema = graphene.Schema(query=RecetteQuery, mutation=RecetteMutation)