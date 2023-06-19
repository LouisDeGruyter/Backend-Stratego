import {db} from "../../utils/db.server";
import ServiceError from '../../core/serviceError';
import { CreateUser } from "../../utils/modelTypes";
import { User } from "@prisma/client";

const getAllUsers = async (): Promise<User[]>=> {
    const users: User[]= await db.user.findMany();
    return users;
}

const getUserById = async (id: number):Promise<User>=> {
    const user:User|null = await db.user.findUnique({
        where: {
            userId: id
        },
        include: {
            rank: true,
            friends: true,
            games: true,
            decks: true,
            player: true,
            
        }

    });
    if(!user){
        throw  ServiceError.notFound('User not found', {userId: id});
    }
    return user;
}

const createUser = async (user: CreateUser):Promise<User>=> {
    const newUser:User = await db.user.create({
        data: user
    });
    return newUser;
}

const updateUser = async (id: number, user: CreateUser):Promise<User>=> {
    const existingUser:User|null = await db.user.findUnique({
        where: {
            userId: id
        }
    });
    if(!existingUser){
        throw ServiceError.notFound('User not found', {userId: id});
    }
    const updatedUser:User = await db.user.update({
        where: {
            userId: id
        },
        data: user
    });
    return updatedUser;
}

const deleteUser = async (id: number)=> {
    const existingUser:User|null = await db.user.findUnique({
        where: {
            userId: id
        }
    });
    if(!existingUser){
        throw ServiceError.notFound('User not found', {userId: id});
    }
    const deletedUser:User=await db.user.delete({
        where: {
            userId: id
        }
    });
    return deletedUser;
}

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser 
}
