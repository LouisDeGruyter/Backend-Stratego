import { type } from "os";
import {db} from "../src/utils/db.server";
import { PrismaClient,Prisma } from "@prisma/client";
import { get } from "http";
const prisma = new PrismaClient();

type User = {
    rankId: number;
}

type Player = {
    playerName: string;
    userId: number;
}

type Game = {
    finished: boolean;
    winnerId: number;
}

type GamePlayer = {
    isHost: boolean;
    userId: number;
    gameId: number;
}

type Rank={
    rankName: string;
    rankValue: number;
}
type Piece={
    pieceName: string;
    pieceValue: number;
    pieceColor: string;
    locationX: number;
    locationY: number;
    isCaptured: boolean;
    userId: number;
    gameId: number;
}

type Field={
    fieldName: string;
    fieldType: string;
}

type FieldSquare={
    name: string;
    type: string;
    fieldColor: string;
    locationX: number;
    locationY: number;
    fieldId: number;
}

type FieldPieceSet={
    pieceType: string;
    count: number;
    fieldId: number;
}

type Deck={
    deckName: string;
    fieldId: number;
    userId: number;
}

type DeckPiece={
    pieceType: string;
    locationX: number;
    locationY: number;
    deckId: number;
}

type Move={
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    moveNumber: number;
    gameId: number;
    pieceId: number;
}
function getRanks(): Array<Rank> {
    return [
        { rankName: "Rookie", rankValue: 1 },
    ];
}
function getUsers(): Array<User> {
    return [];
}

function getPlayers(): Array<Player> {
    return [];
}

function getGames(): Array<Game> {
    return [];
}

function getGamePlayers(): Array<GamePlayer> {
    return [];
}



function getPieces(): Array<Piece> {
    return [];
}

function getFields(): Array<Field> {
    return [];
}

function getFieldSquares(): Array<FieldSquare> {
    return [];
}

function getFieldPieceSets(): Array<FieldPieceSet> {
    return [];
}

function getDecks(): Array<Deck> {
    return [];
}

function getDeckPieces(): Array<DeckPiece> {
    return [];
}

function getMoves(): Array<Move> {
    return [];
}

async function seed() {

    const data: Array<{ [key: string]: any }> = [
        { rank: getRanks() },
        { user: getUsers() },
        { player: getPlayers() },
        { game: getGames() },
        { gamePlayer: getGamePlayers() },
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


