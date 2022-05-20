const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(userid) => "reviews"
 * removeColumn(movieid) => "reviews"
 * addColumn(useridrev) => "reviews"
 * addColumn(movieidrev) => "reviews"
 *
 */

const info = {
  revision: 11,
  name: "noname",
  created: "2022-05-20T22:06:25.665Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["reviews", "userid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["reviews", "movieid", { transaction }],
  },
  {
    fn: "addColumn",
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
    fn: "addColumn",
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
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["reviews", "useridrev", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["reviews", "movieidrev", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "reviews",
      "userid",
      {
        type: Sequelize.INTEGER,
        unique: "reviews_userid_movieid_unique",
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
        unique: "reviews_userid_movieid_unique",
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
