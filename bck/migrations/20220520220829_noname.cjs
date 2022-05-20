const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(MovieMovieid) => "watchlists"
 * removeColumn(UserUserid) => "watchlists"
 * addColumn(movieid) => "reviews"
 * changeColumn(useridrev) => "reviews"
 * changeColumn(movieidrev) => "reviews"
 * changeColumn(userid) => "watchlists"
 * changeColumn(movieid) => "watchlists"
 *
 */

const info = {
  revision: 12,
  name: "noname",
  created: "2022-05-20T22:08:29.633Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["watchlists", "MovieMovieid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["watchlists", "UserUserid", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "reviews",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "reviews_useridrev_movieid_unique",
        allowNull: false,
        name: "movieid",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "useridrev",
      {
        type: Sequelize.INTEGER,
        unique: "reviews_useridrev_movieid_unique",
        field: "useridrev",
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "users", key: "userid" },
        name: "useridrev",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "movieidrev",
      {
        type: Sequelize.INTEGER,
        field: "movieidrev",
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "movies", key: "movieid" },
        name: "movieidrev",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "userid",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        name: "userid",
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "watchlists_userid_movieid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "watchlists_userid_movieid_unique",
        allowNull: false,
        name: "movieid",
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["reviews", "movieid", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "watchlists",
      "MovieMovieid",
      {
        type: Sequelize.INTEGER,
        field: "MovieMovieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "watchlists_userid_MovieMovieid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "watchlists",
      "UserUserid",
      {
        type: Sequelize.INTEGER,
        field: "UserUserid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "watchlists_movieid_UserUserid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "movieidrev",
      {
        type: Sequelize.INTEGER,
        field: "movieidrev",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "reviews_useridrev_movieidrev_unique",
        allowNull: false,
        name: "movieidrev",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "reviews",
      "useridrev",
      {
        type: Sequelize.INTEGER,
        unique: "reviews_useridrev_movieidrev_unique",
        field: "useridrev",
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "users", key: "userid" },
        name: "useridrev",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "userid",
      {
        type: Sequelize.INTEGER,
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "watchlists_userid_MovieMovieid_unique",
        allowNull: false,
        name: "userid",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "watchlists_movieid_UserUserid_unique",
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
