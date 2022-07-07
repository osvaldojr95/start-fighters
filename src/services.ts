import axios from "axios";
import repository from "./repositories.js";

export async function getGitInfoByUser(user: string) {
  try {
    const userInfo = await axios.get(
      `http://api.github.com/users/${user}/repos`
    );
    return userInfo.data;
  } catch (err) {
    throw err;
  }
}

export async function playBattle(firstUser: any, secondUser: any) {
  const firstUserInfo: any = await getGitInfoByUser(firstUser);
  const secondUserInfo: any = await getGitInfoByUser(secondUser);

  let winner = null;
  let loser = null;
  let draw: boolean;

  let firtSum = 0;
  let secondSum = 0;

  firstUserInfo.forEach((element) => {
    firtSum += element.stargazers_count;
  });

  secondUserInfo.forEach((element) => {
    secondSum += element.stargazers_count;
  });

  if (firtSum > secondSum) {
    winner = firstUser;
    loser = secondUser;
    draw = false;
  } else if (firtSum < secondSum) {
    winner = firstUser;
    loser = secondUser;
    draw = false;
  } else {
    draw = true;
  }

  return { winner, loser, draw };
}

export async function saveBattle(
  firstUser: string,
  secondUser: string,
  battle: any
) {
  let firtsUserInfo: any = await getUserByUsername(firstUser);
  let secondUserInfo: any = await getUserByUsername(secondUser);

  if (battle.draw) {
    firtsUserInfo.draws = firtsUserInfo.draws + 1;
    secondUserInfo.draws = secondUserInfo.draws + 1;
  } else {
    if (battle.winner === firstUser) {
      firtsUserInfo.wins = Number(firtsUserInfo.wins) + 1;
      secondUserInfo.losses = secondUserInfo.losses + 1;
    } else {
      firtsUserInfo.losses = firtsUserInfo.losses + 1;
      secondUserInfo.wins = Number(secondUserInfo.wins) + 1;
    }
  }

  await repository.updateUserRanking(firtsUserInfo);
  await repository.updateUserRanking(secondUserInfo);
}

export async function getUserByUsername(username) {
  let user: any = await repository.getUserByUsername(username);
  if (!user) {
    await repository.insertUser(username);
    user = {
      username,
      wins: 0,
      draws: 0,
      losses: 0,
    };
  }
  return user;
}

export async function getRankingOrdered() {
  let ranking: any = await repository.getRanking();

  ranking = ranking.map((item) => {
    return {
      username: item.username,
      wins: item.wins,
      losses: item.losses,
      draws: item.draws,
    };
  });

  ranking = ranking.sort((x, y) => {
    if (x.wins !== y.wins) {
      return x.wins > y.wins ? -1 : 1;
    } else if (x.draws !== y.draws) {
      return x.draws > y.draws ? -1 : 1;
    } else {
      return x.losses < y.losses ? -1 : 1;
    }
  });

  return { fighters: ranking };
}
