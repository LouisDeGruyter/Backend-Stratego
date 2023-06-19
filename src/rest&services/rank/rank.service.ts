import {db} from "../../utils/db.server";
import ServiceError from '../../core/serviceError';
import { CreateRank } from "../../utils/modelTypes";
import { Rank } from "@prisma/client";

const getAllRanks = async (): Promise<Rank[]>=> {
    const ranks: Rank[] = await db.rank.findMany();
    return ranks;
}

const getRankById = async (id: number):Promise<Rank>=> {
    const rank:Rank|null = await db.rank.findUnique({
        where: {
            rankId: id
        }
    });
    if(!rank){
        throw  ServiceError.notFound('Rank not found', {rankId: id});
    }
    return rank;
}

const createRank = async (rank: CreateRank):Promise<Rank>=> {
    const newRank:Rank = await db.rank.create({
        data: {
            rankName: rank.rankName,
            rankValue: rank.rankValue
        }
    });
    return newRank;
}

const updateRank = async (id: number, rank: CreateRank):Promise<Rank>=> {
    const existingRank:Rank|null = await db.rank.findUnique({
        where: {
            rankId: id
        }
    });
    if(!existingRank){
        throw ServiceError.notFound('Rank not found', {rankId: id});
    }
    const updatedRank:Rank = await db.rank.update({
        where: {
            rankId: id
        },
        data: {
            rankName: rank.rankName,
            rankValue: rank.rankValue
        }
    });
    return updatedRank;
}

const deleteRank = async (id: number)=> {
    const existingRank:Rank|null = await db.rank.findUnique({
        where: {
            rankId: id
        }
    });
    if(!existingRank){
        throw ServiceError.notFound('Rank not found', {rankId: id});
    }
    const deletedRank:Rank = await db.rank.delete({
        where: {
            rankId: id
        }
    });
    return deletedRank;
}

export {
    getAllRanks,
    getRankById,
    createRank,
    updateRank,
    deleteRank
}

