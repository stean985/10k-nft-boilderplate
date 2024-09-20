// Ces 2 éléments sont requis et étaient présents dans le fichier de configuration par défaut que j'ai adpaté en celui sous mes yeux actuellement
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

const dotenv = require("dotenv");
dotenv.config();

// c'est cette fonction qui récupère la clé privée (PRIVATE_KEY) que j'ai spécifié dans le fichier .ENV
function privateKey() {
    return process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];
  }

module.exports = {
    //Cette ligne stopule que le réseau par défaut à utiliser par hardhat est celui de test
    defaultNetwork: 'testnet',
  
    networks: {
      // c'est ici que je définit les 2 réseaux à ajouter à hardhat Network
       hardhat: {
       },
       // d'abord le réseau de test (premier réseau à ajouter)
       testnet: {
          url: 'https://rpc.test.btcs.network',
          accounts: privateKey(),
          chainId: 1115,
       },
       //ensuite le réseau principal (deuxième réseau à ajouter)
       mainnet: {
         url: 'https://rpc.coredao.org',
         accounts: privateKey(),
         chainId: 1116,
      },
    },
    // la directive ci-dessous me permet de spécifier les code API que j'ai crée sur chacun des 2 ré&seaux mentionnés plus haut.
    etherscan: {
      // Dans cette directive je spécifie donc les API de chaqu'un des 2 réseaux.
     apiKey: {
      // API du réseau de test de Core (qui est appelé grâce à la directeive écrite ci-dessous)
       testnet: process.env.API_KEY_Core_Testnet,
      // API du réseau principal de Core (que j'ai preferé entrer directement au lieu de faire comme avec API de testnet)
       mainnet: process.env.API_KEY_Core_Mainet,
     },

     // Ici je renseigne les informations liées à chaqu'un des 2 réseaux que je veux importer dans Harhat
     customChains: [
       {
         // Informations du réseau de test de Core
         network: "testnet",
         chainId: 1115,
         urls: {
           apiURL: "https://api.test.btcs.network/api",
           browserURL: "https://scan.test.btcs.network/"
         }
       },
       {
         // Informations du réseau principal de Core
         network: "mainnet",
         chainId: 1116,
         urls: {
           apiURL: "https://openapi.coredao.org/api",
           browserURL: "https://scan.coredao.org/"
         }
       }
     ]
   },
    // Ici je spécifie les propriétés du compilateur solidity que je vais utiliser.
    solidity: {
       compilers: [
         {
            version: '0.8.24',
            settings: {
              evmVersion: 'paris',
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         }
       ],
    },
    paths: {
       sources: './contracts',
       cache: './cache',
       artifacts: './artifacts',
    },
    mocha: {
       timeout: 20000,
    },
  };