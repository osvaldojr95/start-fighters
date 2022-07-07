import { Request, Response } from "express";
import { playBattle, saveBattle, getRankingOrdered } from "./services.js";

export async function postBattle(req: Request, res: Response) {
  const { firstUser, secondUser } = res.locals.body;
  const battle = await playBattle(firstUser, secondUser);
  await saveBattle(firstUser, secondUser, battle);
  return res.send(battle);
}

export async function getRanking(req: Request, res: Response) {
  return res.send(await getRankingOrdered());
}
