import {db} from "../../utils/db.server";
import ServiceError from '../../core/serviceError';
import {mapFieldSquaresTo2DArray} from '../../utils/mapFieldSquaresTo2DArray';
import {Field, FieldSquare} from "@prisma/client";
import { CreateField } from "../../utils/modelTypes";

const getAllFields = async (): Promise<Field[]>=> {
    const fields: Field[] = await db.field.findMany();
    return fields;
}

const getFieldById = async (id: number) : Promise<Field & { fieldSquares: FieldSquare[][] }> => {
        const field = await db.field.findUnique({
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
    
        const fieldSquaresArray = mapFieldSquaresTo2DArray(field.fieldSquares);

        const fieldWithFieldSquares = {
                ...field,
                fieldSquares: fieldSquaresArray,
        };

        return fieldWithFieldSquares as Field & { fieldSquares: FieldSquare[][] };
}


const createField = async (field: CreateField): Promise<Field>=> {
    const newField:Field = await db.field.create({
        data: field
    });
    return newField;
}

const updateField = async (id: number, field: Field): Promise<Field>=> {
    const existingField = await db.field.findUnique({
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

const deleteField = async (id: number)=> {
    const existingField = await db.field.findUnique({
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
    return deletedField as Field;
}

  
  
  const getAllFieldSquaresByFieldId = async (id: number): Promise<FieldSquare[][]> => {
    const existingField = await db.field.findUnique({
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

    return fieldSquaresArray as FieldSquare[][];
    
  };
  
    

  export {
    getAllFields,
    getFieldById,
    createField,
    updateField,
    deleteField,
    getAllFieldSquaresByFieldId,
  };



