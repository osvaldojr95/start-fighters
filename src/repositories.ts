import connection from "./db.js";

export async function insertUser(username) {
  return await connection.query(
    `INSERT INTO fighters (username, wins, losses, draws) VALUES ($1,0,0,0)`,
    [username]
  );
}

export async function getUserByUsername(username) {
  const data = await connection.query(
    `SELECT * FROM fighters WHERE username=$1`,
    [username]
  );
  return data.rows[0];
}

export async function updateUserRanking(user) {
  return await connection.query(
    `UPDATE fighters SET wins=$1, losses=$2, draws=$3 WHERE username=$4`,
    [user.wins, user.losses, user.draws, user.username]
  );
}

export async function getRanking() {
  const ranking = await connection.query(`SELECT * FROM fighters`);
  return ranking.rows;
}

const repository = {
  getUserByUsername,
  updateUserRanking,
  insertUser,
  getRanking,
};

export default repository;
