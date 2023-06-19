import { Piece } from '@prisma/client';

type CreateUser = {
    rankId: number;
  }
  
  type CreatePlayer = {
    playerName: string;
    userId: number;
    experience: number;
  }
  
  type CreateGame = {
    finished: boolean;
    winnerId?: number;
  }
  
  type CreateGamePlayer = {
    isHost: boolean;
    userId: number;
    gameId: number;
  }
  
  type CreateRank = {
    rankName: string;
    rankValue: number;
    experience: number;
  }
  
  type CreatePiece = {
    pieceTypeId: number;
    pieceColor: string;
    locationX: number;
    locationY: number;
    isCaptured: boolean;
    userId: number;
    gameId: number;
  }
  
  type CreateField = {
    fieldName: string;
    fieldType: string;
  }
  
  type CreateFieldSquare = {
    name: string;
    type: string;
    fieldColor?: string;
    locationX: number;
    locationY: number;
    fieldId: number;
  };
  
  type CreateFieldPieceSet = {
    pieceTypeId: number;
    count: number;
    fieldId: number;
  }
  
  type CreateDeck = {
    deckName: string;
    fieldId: number;
    userId: number;
  }
  
  type CreateDeckPiece = {
    pieceTypeId: number;
    locationX: number;
    locationY: number;
    deckId: number;
  }
  
  type CreateMove = {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    moveNumber: number;
    gameId: number;
    pieceId: number;
  }
  type CreatePieceType = {
    pieceName: string;
    pieceValue: number;
    pieceType: string;
  }
  
  export type {
    CreateUser,
    CreatePlayer,
    CreateGame,
    CreateGamePlayer,
    CreateRank,
    CreatePiece,
    CreateField,
    CreateFieldSquare,
    CreateFieldPieceSet,
    CreateDeck,
    CreateDeckPiece,
    CreateMove,
    CreatePieceType,
  };
  