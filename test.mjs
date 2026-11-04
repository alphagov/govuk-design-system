// import main from './main.json' with { type: 'json' }
// import upgrade from './upgrade.json' with { type: 'json' }

// let mismatches = {}

// const ruleCodeTables = {
//   0: 'off',
//   1: 'warn',
//   2: 'error'
// }
// let mainRules = {}
// let upgradeRules = {}

// for (let [key, entry] of Object.entries(main.rules)) {
//   if (Object.keys(ruleCodeTables).includes(`${entry[0]}`)) {
//     entry[0] = ruleCodeTables[entry[0]]
//   }

//   mainRules[key] = entry
// }

// for (let [key, entry] of Object.entries(upgrade.rules)) {
//   if (Object.keys(ruleCodeTables).includes(`${entry[0]}`)) {
//     entry[0] = ruleCodeTables[entry[0]]
//   }

//   upgradeRules[key] = entry
// }

// for (let [key, entry] of Object.entries(mainRules)) {
//   if(!(key in mismatches)) {
//     if(!(key in upgradeRules)) {
//       mismatches[key] = {
//         main: entry,
//         upgrade: null
//       }
//     } else if((upgradeRules[key][0] != entry[0]) || (entry[1] && !upgradeRules[key][1])) {
//       mismatches[key] = {
//         main: entry,
//         upgrade: upgradeRules[key]
//       }
//     } else if(
//       (entry[1] && upgradeRules[key][1]) &&
//       Object.keys(upgradeRules[key][1]).filter(rule => !Object.keys(entry[1]).includes(rule)).length) {
//       mismatches[key] = {
//         main: entry,
//         upgrade: upgradeRules[key]
//       }
//     }
//   }
// }

// for (let [key, entry] of Object.entries(upgradeRules)) {
//   if(!(key in mismatches)) {
//     if(!(key in mainRules)) {
//       mismatches[key] = {
//         main: null,
//         upgrade: entry
//       }
//     } else if((mainRules[key][0] != entry[0]) || (entry[1] && !mainRules[key][1])) {
//       mismatches[key] = {
//         main: mainRules[key],
//         upgrade: entry
//       }
//     } else if(
//       (entry[1] && mainRules[key][1]) &&
//       Object.keys(mainRules[key][1]).filter(rule => !Object.keys(entry[1]).includes(rule)).length) {
//       mismatches[key] = {
//         main: mainRules[key],
//         upgrade: entry
//       }
//     }
//   }
// }

// const mainGlobals = main.globals
// const upgradeGlobals = upgrade.languageOptions.globals

// for (const [key, entry] of Object.entries(mainGlobals)) {
//   if (!(key in mismatches)) {
//     if (!(key in upgradeGlobals)) {
//       mismatches[key] = {
//         main: entry,
//         upgrade: null
//       }
//     } else if (upgradeGlobals[key] !== entry) {
//       mismatches[key] = {
//         main: entry,
//         upgrade: upgradeGlobals[key]
//       }
//     }
//   }
// }

// for (const [key, entry] of Object.entries(upgradeGlobals)) {
//   if (!(key in mismatches)) {
//     if (!(key in mainGlobals)) {
//       mismatches[key] = {
//         main: entry,
//         upgrade: null
//       }
//     } else if (mainGlobals[key] !== entry) {
//       mismatches[key] = {
//         main: entry,
//         upgrade: mainGlobals[key]
//       }
//     }
//   }
// }

// console.log(JSON.stringify(mismatches))
