import {db} from "../../utils/db.server";
import ServiceError from '../../core/serviceError';
type Rank={
    rankName: string;
    rankValue: number;
}

const getAllRanks = async ()=> {
    const ranks = await db.rank.findMany();
    return ranks;
}

const getRankById = async (id: number)=> {
    const rank = await db.rank.findUnique({
        where: {
            rankId: id
        }
    });
    if(!rank){
        throw  ServiceError.notFound('Rank not found', {rankId: id});
    }
    return rank;
}

const createRank = async (rank: Rank)=> {
    const newRank = await db.rank.create({
        data: {
            rankName: rank.rankName,
            rankValue: rank.rankValue
        }
    });
    return newRank;
}

const updateRank = async (id: number, rank: Rank)=> {
    const existingRank = await db.rank.findUnique({
        where: {
            rankId: id
        }
    });
    if(!existingRank){
        throw ServiceError.notFound('Rank not found', {rankId: id});
    }
    const updatedRank = await db.rank.update({
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
    const existingRank = await db.rank.findUnique({
        where: {
            rankId: id
        }
    });
    if(!existingRank){
        throw ServiceError.notFound('Rank not found', {rankId: id});
    }
    const deletedRank = await db.rank.delete({
        where: {
            rankId: id
        }
    });
    return deletedRank;
}

module.exports = {
    getAllRanks,
    getRankById,
    createRank,
    updateRank,
    deleteRank
}

