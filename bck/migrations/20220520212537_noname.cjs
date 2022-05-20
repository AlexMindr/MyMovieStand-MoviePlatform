const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn(userid) => "userreviews"
 * changeColumn(reviewid) => "userreviews"
 *
 */

const info = {
  revision: 8,
  name: "noname",
  created: "2022-05-20T21:25:37.948Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "userreviews",
      "userid",
      {
        type: Sequelize.INTEGER,
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "userreviews_userid_ReviewReviewid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "userreviews",
      "reviewid",
      {
        type: Sequelize.INTEGER,
        field: "reviewid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "reviews", key: "reviewid" },
        unique: "userreviews_reviewid_UserUserid_unique",
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "changeColumn",
    params: [
      "userreviews",
      "userid",
      {
        type: Sequelize.INTEGER,
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "userreviews_userid_ReviewReviewid_unique",
        allowNull: false,
        name: "userid",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "userreviews",
      "reviewid",
      {
        type: Sequelize.INTEGER,
        field: "reviewid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "reviews", key: "reviewid" },
        unique: "userreviews_reviewid_UserUserid_unique",
        allowNull: false,
        name: "reviewid",
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
