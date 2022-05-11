const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(gender) => "users"
 * addColumn(bio) => "users"
 * addColumn(favourite) => "watchlists"
 *
 */

const info = {
  revision: 2,
  name: "noname",
  created: "2022-05-11T19:18:47.878Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "users",
      "gender",
      { type: Sequelize.STRING, field: "gender" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "bio",
      { type: Sequelize.STRING(1200), field: "bio" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "watchlists",
      "favourite",
      { type: Sequelize.BOOLEAN, field: "favourite", defaultValue: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["users", "gender", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["users", "bio", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["watchlists", "favourite", { transaction }],
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
