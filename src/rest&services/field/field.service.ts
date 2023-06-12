import {db} from "../../utils/db.server";
const ServiceError = require('../../core/serviceError');
 const mapFieldSquaresTo2DArray = require('../../utils/mapFieldSquaresTo2DArray')
type Field={
    fieldName: string;
    fieldType: string;
}

const getAllFields = async ()=> {
    const fields = await db.field.findMany();
    return fields;
}

const getFieldById = async (id: number) => {
    const field = await db.field.findUnique({
      where: {
        fieldId: id,
      },
      include: {
        fieldSquares: true,
      },
    });
    if (!field) {
      throw new ServiceError(404, 'Field not found');
    }
  
    const fieldSquaresArray = mapFieldSquaresTo2DArray(field.fieldSquares);

    const fieldWithFieldSquares = {
        ...field,
        fieldSquares: fieldSquaresArray,
    };

    return fieldWithFieldSquares;
}

const createField = async (field: Field)=> {
    const newField = await db.field.create({
        data: {
            fieldName: field.fieldName,
            fieldType: field.fieldType
        }
    });
    return newField;
}

const updateField = async (id: number, field: Field)=> {
    const existingField = await db.field.findUnique({
        where: {
            fieldId: id
        }
    });
    if(!existingField){
        throw new ServiceError(404, 'Field not found');
    }
    const updatedField = await db.field.update({
        where: {
            fieldId: id
        },
        data: {
            fieldName: field.fieldName,
            fieldType: field.fieldType
        }
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
        throw new ServiceError(404, 'Field not found');
    }
    const deletedField = await db.field.delete({
        where: {
            fieldId: id
        }
    });
    return deletedField;
}

  
  
  const getAllFieldSquaresByFieldId = async (id: number) => {
    const existingField = await db.field.findUnique({
      where: {
        fieldId: id,
      },
      select: {
        fieldSquares: true,
      },
    });
    if (!existingField) {
      throw new ServiceError(404, 'Field not found');
    }
    const fieldSquaresArray = mapFieldSquaresTo2DArray(existingField.fieldSquares);

    return fieldSquaresArray;
    
  };
  
    

module.exports = {
    getAllFields,
    getFieldById,
    createField,
    updateField,
    deleteField,
    getAllFieldSquaresByFieldId
}

