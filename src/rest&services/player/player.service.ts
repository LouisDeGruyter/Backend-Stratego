import {db} from "../../utils/db.server";
import ServiceError from '../../core/serviceError';
import { CreatePlayer } from "../../utils/modelTypes";
import { Player } from "@prisma/client";

const getAllPlayers = async (): Promise<Player[]>=> {
    const players:Player[] = await db.player.findMany();
    return players;
}

const getPlayerById = async (id: number):Promise<Player>=> {
    const player:Player|null = await db.player.findUnique({
        where: {
            playerId: id
        }
    });
    if(!player){
        throw  ServiceError.notFound('Player not found', {playerId: id});
    }
    return player;
}

const createPlayer = async (player: CreatePlayer):Promise<Player>=> {
    const newPlayer:Player = await db.player.create({
        data: player
    });
    return newPlayer;
}

const updatePlayer = async (id: number, player: CreatePlayer):Promise<Player>=> {
    const existingPlayer:Player|null = await db.player.findUnique({
        where: {
            playerId: id
        }
    });
    if(!existingPlayer){
        throw ServiceError.notFound('Player not found', {playerId: id});
    }
    const updatedPlayer:Player = await db.player.update({
        where: {
            playerId: id
        },
        data: player
    });
    return updatedPlayer;
}

const deletePlayer = async (id: number): Promise<Player>=> {
    const existingPlayer:Player|null = await db.player.findUnique({
        where: {
            playerId: id
        }
    });
    if(!existingPlayer){
        throw ServiceError.notFound('Player not found', {playerId: id});
    }
    const deletedPlayer:Player= await db.player.delete({
        where: {
            playerId: id
        }
    });
    return deletedPlayer;
}

export {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer
}