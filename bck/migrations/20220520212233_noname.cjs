const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(user) => "userreviews"
 * removeColumn(reviewid) => "userreviews"
 * removeColumn(UserUserid) => "userreviews"
 * removeColumn(userid) => "userreviews"
 * removeColumn(ReviewReviewid) => "userreviews"
 *
 */

const info = {
  revision: 6,
  name: "noname",
  created: "2022-05-20T21:22:33.923Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["userreviews", "user", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["userreviews", "reviewid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["userreviews", "UserUserid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["userreviews", "userid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["userreviews", "ReviewReviewid", { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "userreviews",
      "user",
      { type: Sequelize.STRING, field: "user" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
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
  {
    fn: "addColumn",
    params: [
      "userreviews",
      "UserUserid",
      {
        type: Sequelize.INTEGER,
        field: "UserUserid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "userreviews_reviewid_UserUserid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
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
    fn: "addColumn",
    params: [
      "userreviews",
      "ReviewReviewid",
      {
        type: Sequelize.INTEGER,
        field: "ReviewReviewid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "reviews", key: "reviewid" },
        unique: "userreviews_userid_ReviewReviewid_unique",
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
