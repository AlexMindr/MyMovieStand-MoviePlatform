const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(MovieMovieid) => "reviews"
 * removeColumn(UserUserid) => "reviews"
 * changeColumn(userid) => "posts"
 * changeColumn(userid) => "reviews"
 * changeColumn(movieid) => "reviews"
 *
 */

const info = {
  revision: 15,
  name: "noname",
  created: "2022-05-20T22:27:53.534Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["reviews", "MovieMovieid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["reviews", "UserUserid", { transaction }],
  },
  {
    fn: "changeColumn",
    params: [
      "posts",
      "userid",
      {
        type: Sequelize.INTEGER,
        name: "userid",
        allowNull: false,
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "posts_userid_movieid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "userid",
      {
        type: Sequelize.INTEGER,
        name: "userid",
        allowNull: false,
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "reviews_userid_movieid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "reviews_userid_movieid_unique",
        allowNull: false,
        name: "movieid",
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "reviews",
      "MovieMovieid",
      {
        type: Sequelize.INTEGER,
        field: "MovieMovieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "reviews_userid_MovieMovieid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "reviews",
      "UserUserid",
      {
        type: Sequelize.INTEGER,
        field: "UserUserid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "reviews_movieid_UserUserid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "posts",
      "userid",
      {
        type: Sequelize.INTEGER,
        unique: "posts_userid_movieid_unique",
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "users", key: "userid" },
        name: "userid",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "userid",
      {
        type: Sequelize.INTEGER,
        unique: "reviews_userid_MovieMovieid_unique",
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "users", key: "userid" },
        name: "userid",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "reviews_movieid_UserUserid_unique",
        allowNull: false,
        name: "movieid",
      },
      { transaction },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
