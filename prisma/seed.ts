import { type } from "os";
import {db} from "../src/utils/db.server";
import { PrismaClient,Prisma } from "@prisma/client";
import { get } from "http";
import {CreateField,CreateRank,CreateUser,CreatePlayer,CreateGame,CreateGamePlayer, CreatePiece, CreateDeckPiece, CreateFieldSquare, CreateFieldPieceSet, CreateMove,CreateDeck,CreatePieceType} from "../src/utils/modelTypes"
const prisma = new PrismaClient();


function getRanks(): Array<CreateRank> {
    return [
        { rankName: "Rookie", rankValue: 1 , experience: 100},
        { rankName: "Beginner", rankValue: 2 , experience: 200},
        { rankName: "Amateur", rankValue: 3 , experience: 300},
        { rankName: "Intermediate", rankValue: 4 , experience: 400},
        { rankName: "Advanced", rankValue: 5 , experience: 500},
        { rankName: "Expert", rankValue: 6 , experience: 600},
        { rankName: "Master", rankValue: 7 , experience: 700},
        { rankName: "Grandmaster", rankValue: 8 , experience: 800},
        { rankName: "Legendary", rankValue: 9 , experience: 900},
        { rankName: "Godlike", rankValue: 10 , experience: 1000},
    ];
}
function getUsers(): Array<CreateUser> {
    return [
        { rankId: 1 },
        { rankId: 2 },
        { rankId: 3 },
        { rankId: 4 },
        { rankId: 5 },
        { rankId: 6 },
        { rankId: 7 },
        { rankId: 8 },
        { rankId: 9 },
        { rankId: 10 },
    ];
}

function getPlayers(): Array<CreatePlayer> {
    return [
        { playerName: "Player1", userId: 1, experience: 100 },
        { playerName: "Player2", userId: 2, experience: 200 },
        { playerName: "Player3", userId: 3, experience: 300 },
        { playerName: "Player4", userId: 4, experience: 400 },
        { playerName: "Player5", userId: 5, experience: 500 },
        { playerName: "Player6", userId: 6, experience: 600 },
        { playerName: "Player7", userId: 7, experience: 700 },
        { playerName: "Player8", userId: 8, experience: 800 },
        { playerName: "Player9", userId: 9, experience: 900 },
        { playerName: "Player10", userId: 10, experience: 1000 },
    ];
}

function getGames(): Array<CreateGame> {
    return [
        { finished: false },
        { finished: false },
        { finished: false },
        { finished: true, winnerId: 1 },
        { finished: true, winnerId: 2 },
    ];
}

function getGamePlayers(): Array<CreateGamePlayer> {
    return [
        { isHost: true, userId: 1, gameId: 1 },
        { isHost: false, userId: 2, gameId: 1 },
        { isHost: true, userId: 3, gameId: 2 },
        { isHost: false, userId: 4, gameId: 2 },
        { isHost: true, userId: 5, gameId: 3 },
        { isHost: false, userId: 6, gameId: 3 },
        { isHost: true, userId: 1, gameId: 4 },
        { isHost: false, userId: 8, gameId: 4 },
        { isHost: true, userId: 9, gameId: 5 },
        { isHost: false, userId: 2, gameId: 5 },
    ];
}
function CreatePieceTypes(): Array<CreatePieceType> {
    return [
        {
            pieceName: "Flag",
            pieceValue: 0,
            pieceType: "Flag",
        },
        {
            pieceName: "Spy",
            pieceValue: 1,
            pieceType: "Unit",
        },
        {
            pieceName: "Scout",
            pieceValue: 2,
            pieceType: "Fast Unit",
        },
        {
            pieceName: "Miner",
            pieceValue: 3,
            pieceType: "Unit",
        },
        {
            pieceName: "Sergeant",
            pieceValue: 4,
            pieceType: "Unit",
        },
        {
            pieceName: "Lieutenant",
            pieceValue: 5,
            pieceType: "Unit",
        },
        {
            pieceName: "Captain",
            pieceValue: 6,
            pieceType: "Unit",
        },
        {
            pieceName: "Major",
            pieceValue: 7,
            pieceType: "Unit",
        },
        {
            pieceName: "Colonel",
            pieceValue: 8,
            pieceType: "Unit",
        },
        {
            pieceName: "General",
            pieceValue: 9,
            pieceType: "Unit",
        },
        {
            pieceName: "Marshall",
            pieceValue: 10,
            pieceType: "Unit",
        },
        {
            pieceName: "Bomb",
            pieceValue: 0,
            pieceType: "Bomb",
        },
        // added optional pieces
        {
            pieceName: "Sniper",
            pieceValue: 9,
            pieceType: "Fast Suicide Unit",
        },
        {
            pieceName: "Cloak",
            pieceValue: 2,
            pieceType: "Invisible Fast Unit",
        },
        {
            pieceName: "Suicide Bomber",
            pieceValue: 11,
            pieceType:"Suicide Unit"
        },
        {
            pieceName:"Shield Bearer",
            pieceValue: 0,
            pieceType: "Defender Unit"
        },
    ];
}


function getPieces(): Array<CreatePiece> {
    return [

    ];
}

function getFields(): Array<CreateField> {
    return [
        { fieldName: "Classic", fieldType: "Standard" },
        { fieldName: "User1", fieldType: "Custom" },
        { fieldName: "User2", fieldType: "Custom" },
    ];
}

function getFieldSquares(): Array<CreateFieldSquare> {
    return [
        { name: "A1", type: "Spawn", fieldColor: "Blue", locationX: 1, locationY: 1, fieldId: 1 },
        { name: "A2", type: "Spawn", fieldColor: "Blue", locationX: 1, locationY: 2, fieldId: 1 },
        { name: "A3", type: "Spawn", fieldColor: "Blue", locationX: 1, locationY: 3, fieldId: 1 },
        { name: "A4", type: "Spawn", fieldColor: "Blue", locationX: 1, locationY: 4, fieldId: 1 },
        { name: "A5", type: "Empty", fieldColor: "White", locationX: 1, locationY: 5, fieldId: 1 },
        { name: "A6", type: "Empty", fieldColor: "White", locationX: 1, locationY: 6, fieldId: 1 },
        { name: "A7", type: "Spawn", fieldColor: "Red", locationX: 1, locationY: 7, fieldId: 1 },
        { name: "A8", type: "Spawn", fieldColor: "Red", locationX: 1, locationY: 8, fieldId: 1 },
        { name: "A9", type: "Spawn", fieldColor: "Red", locationX: 1, locationY: 9, fieldId: 1 },
        { name: "A10", type: "Spawn", fieldColor: "Red", locationX: 1, locationY: 10, fieldId: 1 },
        { name: "B1", type: "Spawn", fieldColor: "Blue", locationX: 2, locationY: 1, fieldId: 1 },
        { name: "B2", type: "Spawn", fieldColor: "Blue", locationX: 2, locationY: 2, fieldId: 1 },
        { name: "B3", type: "Spawn", fieldColor: "Blue", locationX: 2, locationY: 3, fieldId: 1 },
        { name: "B4", type: "Spawn", fieldColor: "Blue", locationX: 2, locationY: 4, fieldId: 1 },
        { name: "B5", type: "Empty", fieldColor: "White", locationX: 2, locationY: 5, fieldId: 1 },
        { name: "B6", type: "Empty", fieldColor: "White", locationX: 2, locationY: 6, fieldId: 1 },
        { name: "B7", type: "Spawn", fieldColor: "Red", locationX: 2, locationY: 7, fieldId: 1 },
        { name: "B8", type: "Spawn", fieldColor: "Red", locationX: 2, locationY: 8, fieldId: 1 },
        { name: "B9", type: "Spawn", fieldColor: "Red", locationX: 2, locationY: 9, fieldId: 1 },
        { name: "B10", type: "Spawn", fieldColor: "Red", locationX: 2, locationY: 10, fieldId: 1 },
        { name: "C1", type: "Spawn", fieldColor: "Blue", locationX: 3, locationY: 1, fieldId: 1 },
        { name: "C2", type: "Spawn", fieldColor: "Blue", locationX: 3, locationY: 2, fieldId: 1 },
        { name: "C3", type: "Spawn", fieldColor: "Blue", locationX: 3, locationY: 3, fieldId: 1 },
        { name: "C4", type: "Spawn", fieldColor: "Blue", locationX: 3, locationY: 4, fieldId: 1 },
        { name: "C5", type: "Lake", fieldColor: "White", locationX: 3, locationY: 5, fieldId: 1 },
        { name: "C6", type: "Lake", fieldColor: "White", locationX: 3, locationY: 6, fieldId: 1 },
        { name: "C7", type: "Spawn", fieldColor: "Red", locationX: 3, locationY: 7, fieldId: 1 },
        { name: "C8", type: "Spawn", fieldColor: "Red", locationX: 3, locationY: 8, fieldId: 1 },
        { name: "C9", type: "Spawn", fieldColor: "Red", locationX: 3, locationY: 9, fieldId: 1 },
        { name: "C10", type: "Spawn", fieldColor: "Red", locationX: 3, locationY: 10, fieldId: 1 },
        { name: "D1", type: "Spawn", fieldColor: "Blue", locationX: 4, locationY: 1, fieldId: 1 },
        { name: "D2", type: "Spawn", fieldColor: "Blue", locationX: 4, locationY: 2, fieldId: 1 },
        { name: "D3", type: "Spawn", fieldColor: "Blue", locationX: 4, locationY: 3, fieldId: 1 },
        { name: "D4", type: "Spawn", fieldColor: "Blue", locationX: 4, locationY: 4, fieldId: 1 },
        { name: "D5", type: "Lake", fieldColor: "White", locationX: 4, locationY: 5, fieldId: 1 },
        { name: "D6", type: "Lake", fieldColor: "White", locationX: 4, locationY: 6, fieldId: 1 },
        { name: "D7", type: "Spawn", fieldColor: "Red", locationX: 4, locationY: 7, fieldId: 1 },
        { name: "D8", type: "Spawn", fieldColor: "Red", locationX: 4, locationY: 8, fieldId: 1 },
        { name: "D9", type: "Spawn", fieldColor: "Red", locationX: 4, locationY: 9, fieldId: 1 },
        { name: "D10", type: "Spawn", fieldColor: "Red", locationX: 4, locationY: 10, fieldId: 1 },
        { name: "E1", type: "Spawn", fieldColor: "Blue", locationX: 5, locationY: 1, fieldId: 1 },
        { name: "E2", type: "Spawn", fieldColor: "Blue", locationX: 5, locationY: 2, fieldId: 1 },
        { name: "E3", type: "Spawn", fieldColor: "Blue", locationX: 5, locationY: 3, fieldId: 1 },
        { name: "E4", type: "Spawn", fieldColor: "Blue", locationX: 5, locationY: 4, fieldId: 1 },
        { name: "E5", type: "Empty", fieldColor: "White", locationX: 5, locationY: 5, fieldId: 1 },
        { name: "E6", type: "Empty", fieldColor: "White", locationX: 5, locationY: 6, fieldId: 1 },
        { name: "E7", type: "Spawn", fieldColor: "Red", locationX: 5, locationY: 7, fieldId: 1 },
        { name: "E8", type: "Spawn", fieldColor: "Red", locationX: 5, locationY: 8, fieldId: 1 },
        { name: "E9", type: "Spawn", fieldColor: "Red", locationX: 5, locationY: 9, fieldId: 1 },
        { name: "E10", type: "Spawn", fieldColor: "Red", locationX: 5, locationY: 10, fieldId: 1 },
        { name: "F1", type: "Spawn", fieldColor: "Blue", locationX: 6, locationY: 1, fieldId: 1 },
        { name: "F2", type: "Spawn", fieldColor: "Blue", locationX: 6, locationY: 2, fieldId: 1 },
        { name: "F3", type: "Spawn", fieldColor: "Blue", locationX: 6, locationY: 3, fieldId: 1 },
        { name: "F4", type: "Spawn", fieldColor: "Blue", locationX: 6, locationY: 4, fieldId: 1 },
        { name: "F5", type: "Empty", fieldColor: "White", locationX: 6, locationY: 5, fieldId: 1 },
        { name: "F6", type: "Empty", fieldColor: "White", locationX: 6, locationY: 6, fieldId: 1 },
        { name: "F7", type: "Spawn", fieldColor: "Red", locationX: 6, locationY: 7, fieldId: 1 },
        { name: "F8", type: "Spawn", fieldColor: "Red", locationX: 6, locationY: 8, fieldId: 1 },
        { name: "F9", type: "Spawn", fieldColor: "Red", locationX: 6, locationY: 9, fieldId: 1 },
        { name: "F10", type: "Spawn", fieldColor: "Red", locationX: 6, locationY: 10, fieldId: 1 },
        { name: "G1", type: "Spawn", fieldColor: "Blue", locationX: 7, locationY: 1, fieldId: 1 },
        { name: "G2", type: "Spawn", fieldColor: "Blue", locationX: 7, locationY: 2, fieldId: 1 },
        { name: "G3", type: "Spawn", fieldColor: "Blue", locationX: 7, locationY: 3, fieldId: 1 },
        { name: "G4", type: "Spawn", fieldColor: "Blue", locationX: 7, locationY: 4, fieldId: 1 },
        { name: "G5", type: "Lake", fieldColor: "White", locationX: 7, locationY: 5, fieldId: 1 },
        { name: "G6", type: "Lake", fieldColor: "White", locationX: 7, locationY: 6, fieldId: 1 },
        { name: "G7", type: "Spawn", fieldColor: "Red", locationX: 7, locationY: 7, fieldId: 1 },
        { name: "G8", type: "Spawn", fieldColor: "Red", locationX: 7, locationY: 8, fieldId: 1 },
        { name: "G9", type: "Spawn", fieldColor: "Red", locationX: 7, locationY: 9, fieldId: 1 },
        { name: "G10", type: "Spawn", fieldColor: "Red", locationX: 7, locationY: 10, fieldId: 1 },
        { name: "H1", type: "Spawn", fieldColor: "Blue", locationX: 8, locationY: 1, fieldId: 1 },
        { name: "H2", type: "Spawn", fieldColor: "Blue", locationX: 8, locationY: 2, fieldId: 1 },
        { name: "H3", type: "Spawn", fieldColor: "Blue", locationX: 8, locationY: 3, fieldId: 1 },
        { name: "H4", type: "Spawn", fieldColor: "Blue", locationX: 8, locationY: 4, fieldId: 1 },
        { name: "H5", type: "Lake", fieldColor: "White", locationX: 8, locationY: 5, fieldId: 1 },
        { name: "H6", type: "Lake", fieldColor: "White", locationX: 8, locationY: 6, fieldId: 1 },
        { name: "H7", type: "Spawn", fieldColor: "Red", locationX: 8, locationY: 7, fieldId: 1 },
        { name: "H8", type: "Spawn", fieldColor: "Red", locationX: 8, locationY: 8, fieldId: 1 },
        { name: "H9", type: "Spawn", fieldColor: "Red", locationX: 8, locationY: 9, fieldId: 1 },
        { name: "H10", type: "Spawn", fieldColor: "Red", locationX: 8, locationY: 10, fieldId: 1 },
        { name: "I1", type: "Spawn", fieldColor: "Blue", locationX: 9, locationY: 1, fieldId: 1 },
        { name: "I2", type: "Spawn", fieldColor: "Blue", locationX: 9, locationY: 2, fieldId: 1 },
        { name: "I3", type: "Spawn", fieldColor: "Blue", locationX: 9, locationY: 3, fieldId: 1 },
        { name: "I4", type: "Spawn", fieldColor: "Blue", locationX: 9, locationY: 4, fieldId: 1 },
        { name: "I5", type: "Empty", fieldColor: "White", locationX: 9, locationY: 5, fieldId: 1 },
        { name: "I6", type: "Empty", fieldColor: "White", locationX: 9, locationY: 6, fieldId: 1 },
        { name: "I7", type: "Spawn", fieldColor: "Red", locationX: 9, locationY: 7, fieldId: 1 },
        { name: "I8", type: "Spawn", fieldColor: "Red", locationX: 9, locationY: 8, fieldId: 1 },
        { name: "I9", type: "Spawn", fieldColor: "Red", locationX: 9, locationY: 9, fieldId: 1 },
        { name: "I10", type: "Spawn", fieldColor: "Red", locationX: 9, locationY: 10, fieldId: 1 },
        { name: "J1", type: "Spawn", fieldColor: "Blue", locationX: 10, locationY: 1, fieldId: 1 },
        { name: "J2", type: "Spawn", fieldColor: "Blue", locationX: 10, locationY: 2, fieldId: 1 },
        { name: "J3", type: "Spawn", fieldColor: "Blue", locationX: 10, locationY: 3, fieldId: 1 },
        { name: "J4", type: "Spawn", fieldColor: "Blue", locationX: 10, locationY: 4, fieldId: 1 },
        { name: "J5", type: "Empty", fieldColor: "White", locationX: 10, locationY: 5, fieldId: 1 },
        { name: "J6", type: "Empty", fieldColor: "White", locationX: 10, locationY: 6, fieldId: 1 },
        { name: "J7", type: "Spawn", fieldColor: "Red", locationX: 10, locationY: 7, fieldId: 1 },
        { name: "J8", type: "Spawn", fieldColor: "Red", locationX: 10, locationY: 8, fieldId: 1 },
        { name: "J9", type: "Spawn", fieldColor: "Red", locationX: 10, locationY: 9, fieldId: 1 },
        { name: "J10", type: "Spawn", fieldColor: "Red", locationX: 10, locationY: 10, fieldId: 1 },






    ];
}

function getFieldPieceSets(): Array<CreateFieldPieceSet> {
    return [
        { 
            fieldId: 1,
            pieceTypeId: 1,
            count: 1,
        },
        {
            fieldId: 1,
            pieceTypeId: 2,
            count: 1,
        },
        {
            fieldId: 1,
            pieceTypeId: 3,
            count: 8,
        },
        {
            fieldId: 1,
            pieceTypeId: 4,
            count: 5,
        },
        {
            fieldId: 1,
            pieceTypeId: 5,
            count: 4,
        },
        {
            fieldId: 1,
            pieceTypeId: 6,
            count: 4,
        },
        {
            fieldId: 1,
            pieceTypeId: 7,
            count: 4,
        },
        {
            fieldId: 1,
            pieceTypeId: 8,
            count: 3,
        },
        {
            fieldId: 1,
            pieceTypeId: 9,
            count: 2,
        },
        {
            fieldId: 1,
            pieceTypeId: 10,
            count: 1,
        },
        {
            fieldId: 1,
            pieceTypeId: 11,
            count: 1,
        },
        {
            fieldId: 1,
            pieceTypeId: 12,
            count: 6,
        },

    ];
}

function getDecks(): Array<CreateDeck> {
    return [];
}

function getDeckPieces(): Array<CreateDeckPiece> {
    return [];
}

function getMoves(): Array<CreateMove> {
    return [];
}


async function seed() {

    const data: Array<{ [key: string]: any }> = [
        { rank: getRanks() },
        { user: getUsers() },
        { player: getPlayers() },
        { game: getGames() },
        { gamePlayer: getGamePlayers() },
        { pieceType: CreatePieceTypes() },
        { piece: getPieces() },
        { field: getFields() },
        { fieldSquare: getFieldSquares() },
        { fieldPieceSet: getFieldPieceSets() },
        { deck: getDecks() },
        { deckPiece: getDeckPieces() },
        { move: getMoves() },
        
      ];      
    
    for (const item of data) {
        const key = Object.keys(item)[0];
        const value = item[key];
        await seedType(key,value); 
    }
}

async function seedType(type: string, data: Array<any>) {
    console.log(`Start seeding ${type}`)
    await prisma[type].createMany({
        data: data,
        skipDuplicates: true,
    });
}
seed().catch((e) => {
    console.error(e);
    process.exit(1);
  }
).finally(async () => {
    await prisma.$disconnect();
  }
);


