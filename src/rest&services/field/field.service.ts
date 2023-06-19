import {db} from "../../utils/db.server";
import ServiceError from '../../core/serviceError';
import {mapFieldSquaresTo2DArray} from '../../utils/mapFieldSquaresTo2DArray';
import {Field, FieldSquare} from "@prisma/client";
import { CreateField,FieldWithSquares,FieldWith2DSquares,FieldSquares2D } from "../../utils/modelTypes";

const getAllFields = async (): Promise<Field[]>=> {
    const fields: Field[] = await db.field.findMany();
    return fields;
}



const getFieldById = async (id: number) : Promise<FieldWith2DSquares> => {
    const field: FieldWithSquares|null = await db.field.findUnique({
        where: {
            fieldId: id,
        },
        include: {
            fieldSquares: true,
        },
    });
    if (!field) {
        throw ServiceError.notFound('Field not found', { fieldId: id });
    }

    const fieldSquaresArray:FieldSquares2D = mapFieldSquaresTo2DArray(field.fieldSquares);

    const fieldWithFieldSquares: FieldWith2DSquares = {
        ...field,
        fieldSquares: fieldSquaresArray,
    };

    return fieldWithFieldSquares;
}


const createField = async (field: CreateField): Promise<Field>=> {
    const newField:Field = await db.field.create({
        data: field
    });
    return newField;
}

const updateField = async (id: number, field: CreateField): Promise<Field>=> {
    const existingField:Field|null = await db.field.findUnique({
        where: {
            fieldId: id
        }
    });
    if(!existingField){
        throw ServiceError.notFound('Field not found', {fieldId: id});
    }
    const updatedField:Field = await db.field.update({
        where: {
            fieldId: id
        },
        data: field
    });
    return updatedField;
}

const deleteField = async (id: number):Promise<Field>=> {
    const existingField:Field|null = await db.field.findUnique({
        where: {
            fieldId: id
        }
    });
    
    if(!existingField){
        throw ServiceError.notFound('Field not found', {fieldId: id});
    }
    const deletedField:Field = await db.field.delete({
        where: {
            fieldId: id
        }
    });
    return deletedField;
}

  
 
  const getAllFieldSquaresByFieldId = async (id: number): Promise<FieldSquare[][]> => {
    const existingField:{fieldSquares: FieldSquare[];}|null= await db.field.findUnique({
      where: {
        fieldId: id,
      },
      select: {
        fieldSquares: true,
      },
    });
    if (!existingField) {
        throw ServiceError.notFound('Field not found', { fieldId: id });
    }
    const fieldSquaresArray: FieldSquare[][] = mapFieldSquaresTo2DArray(existingField.fieldSquares);
    return fieldSquaresArray;
  };
  
    

  export {
    getAllFields,
    getFieldById,
    createField,
    updateField,
    deleteField,
    getAllFieldSquaresByFieldId,
  };



