const defer = require('config/defer').deferConfig

module.exports = {
  env: 'qa',
  api: {
    allowCors: true,
    secret: 'secret',
    tokenExpiresIn: '7d',
    protocol: 'http',
    port: 3000,
    auth: {
      domain: {
        name: 'Fuse Studio Dev',
        chainId: defer(function () {
          return this.network.foreign.name === 'mainnet' ? 1 : 3
        }),
        version: 1
      },
      google: {
        clientId: '784912570329-hkc327u95ps4ia7ja70s8mkhb6kphrbd.apps.googleusercontent.com'
      }
    }
  },
  ipfsProxy: {
    urlBase: 'http://localhost:4000/api'
  },
  graph: {
    url: 'https://graph-qa.fuse.io/subgraphs/name/fuseio',
    subgraphs: {
      fuse: '/fuse-qa',
      entities: '/fuse-entities-qa',
      bridgeRopsten: '/fuse-ropsten-bridge',
      bridgeMain: '/fuse-ethereum-bridge'
    }
  },
  gasLimitForTx: {
    createForeignWallet: 550000,
    relay: 250000,
    funder: 21000,
    getDAIPointsToAddress: 1000000
  },
  box: {
    graph: {
      url: 'https://api.3box.io/graph'
    }
  },
  blocknative: {
    url: 'https://api.blocknative.com',
    apiKey: ''
  },
  network: {
    misc: {
      pageSize: 1000,
      minGasLimit: 50000
    },
    home: {
      name: 'fuse',
      bridgeType: 'home',
      chainId: 122,
      gasPrice: '1000000000',
      contract: {
        options: {
          transactionConfirmationBlocks: 2,
          transactionPollingTimeout: 30
        }
      },
      provider: 'https://rpc.fuse.io',
      addressesMainnet: {
        HomeBridgeFactory: '0xFbf20Fa994A577439Cd0b6033Db373f7a995E147',
        BridgeMapper: '0x89b98bB511A41FeF73b388cF8C052221f42cd44f'
      },
      addressesRopsten: {
        HomeBridgeFactory: '0xb895638fb3870AD5832402a5BcAa64A044687db0',
        BridgeMapper: '0x3E0d9311E14b8Ba767b8917F3d06D1C178893E66'
      },
      sharedAddresses: {
        WalletFactory: '0x8A6C9aBB48fb68bFe240c0e61DFE7Cc273023649',
        WalletImplementation: '0x1DA43F87611B7FFDb104D125389E14313e053A3A',
        CommunityFactory: '0xcc004Ee01Da7D9207aBE384cE601623E9F223536',
        MultiSigWallet: '0x0f5922B9c866c9d7de3E119c83a0A796A36A1307',
        TokenFactory: '0x78Cb0FeEC1fA3b3469cA18e79823b6A87C8929a4',
        walletModules: {
          GuardianManager: '0xb2c9B85a41830655C0f21CAe43F552B6D76A709E',
          LockManager: '0xf8C62698F6D2322E04C8bDC386e7B640773715b7',
          RecoveryManager: '0xAC4F70025d0671F88309Db0E588E0565bEFd1f35',
          ApprovedTransfer: '0x04E92d2ffBb51d53379b4754b3b92f879838902A',
          TransferManager: '0x8527a2d3d5aC0411933d663b4dcE275a5b7f39D8',
          TokenExchanger: '0x16127Bbec8d9A24a0801f7B945A18D077f2c629b',
          CommunityManager: '0x42616C787e3D75aC29b9dCAB35131b585Eaa9837',
          WalletOwnershipManager: '0x7C38a5E6c0822623392847f6B827E8ADd75130ae'
        }
      },
      addresses: defer(function () {
        if (this.network.foreign.name === 'mainnet') {
          return { ...this.network.home.sharedAddresses, ...this.network.home.addressesMainnet }
        } else {
          return { ...this.network.home.sharedAddresses, ...this.network.home.addressesRopsten }
        }
      })
    },
    foreign: {
      name: 'ropsten',
      bridgeType: 'foreign',
      contract: {
        options: {
          transactionConfirmationBlocks: 2
        }
      },
      provider: defer(function () {
        if (this.network.foreign.providers.default === 'infura') {
          return `https://${this.network.foreign.name}.infura.io/v3/${this.network.foreign.apiKey}`
        } else {
          return this.network.foreign.providers.alchemy.http
        }
      }),
      providers: {
        infura: {

        },
        alchemy: {
          http: ''
        },
        default: 'alchemy'
      },
      addressesMainnet: {
        TokenFactory: '0xB2100946628D3e45FF94971b35508AfCBBc87432',
        ForeignBridgeFactory: '0xaC116929b2baB59D05a1Da99303e7CAEd100ECC9',
        TotlePrimary: '0x74758acfce059f503a7e6b0fc2c8737600f9f2c4',
        MultiBridgeMediator: '0x68b762A7a68F6D87Fcf2E2EaF7eF48D00cAa2419'
      },
      addressesRopsten: {
        TokenFactory: '0x6004EAdF0aD3aCd568F354CA7E2b410bA0080E98',
        ForeignBridgeFactory: '0xABBf5D8599B2Eb7b4e1D25a1Fd737FF1987655aD',
        TotlePrimary: '0x74758acfce059f503a7e6b0fc2c8737600f9f2c4',
        MultiBridgeMediator: '0xf301d525da003e874DF574BCdd309a6BF0535bb6'
      },
      addresses: defer(function () {
        if (this.network.foreign.name === 'mainnet') {
          return this.network.foreign.addressesMainnet
        } else {
          return this.network.foreign.addressesRopsten
        }
      }),
      gasStation: {
        url: 'https://ethgasstation.info/json/ethgasAPI.json',
        speed: 'average'
      }
    }
  },
  mongo: {
    uri: 'mongodb://localhost/fuse-studio',
    debug: true,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  mail: {
    sendgrid: {
      templates: {}
    },
    managers: ['example@example.com']
  },
  explorer: {
    fuse: {
      urlBase: 'https://explorer.fuse.io/api'
    }
  },
  agenda: {
    args: {
      defaultConcurrency: 5
    },
    startPeriodicTasks: true,
    tasks: {
      deploy: {
        concurrency: 5
      },
      transfer: {
        concurrency: 1
      },
      startTransfers: {
        concurrency: 1
      },
      createWallet: {
        concurrency: 4,
        priority: 'high'
      },
      createForeignWallet: {
        concurrency: 4
      },
      relay: {
        priority: 'high'
      }
    }
  },
  funder: {
    urlBase: 'https://funder-qa.fuse.io/api/'
  },
  bonus: {
    launch: {
      fuse: 1
    },
    trade: {
      fuse: 0.01
    },
    eth: {
      ropsten: 0.05
    }
  },
  branch: {
    urlBase: 'https://api2.branch.io/v1/',
    key: 'key_live_aaSvQXmuELUQfsYeG4UfWemnqEiq04hr'
  },
  plugins: {
    moonpay: {
      currencies: {
        '0c9480ef-2fab-4d31-9037-da4b29ecc16f': '0x48B0C1D90C3058ab032C44ec52d98633587eE711'
      },
      args: {
      }
    },
    transak: {
      args: {
      }
    },
    carbon: {
      args: {
      }
    },
    wyre: {
      args: {
      }
    },
    coindirect: {
      args: {
      }
    },
    ramp: {
      args: {
      }
    }
  },
  inviteTxt: 'Hi, a friend has invited you to Fuse',
  inviteTxtEmail: 'Hi, a friend has invited you to Fuse. Please open this link from your mobile device',
  smsProvider: 'sns',
  phoneNumbers: {
    magic: '5555',
    maxUserWallets: 5
  },
  aws: {
    sns: {
      region: 'eu-west-1',
      senderId: 'Wallet',
      smsType: 'Promotional'
    },
    s3: {
      bucket: 'fuse-studio-qa'
    },
    sqs: {
      enabled: false,
      queueUrl: '',
      constructor: {
        region: 'eu-cental-1',
        apiVersion: '2012-11-05'
      },
      receive: {
        WaitTimeSeconds: 5
      }
    }
  },
  accounts: {
    wallet: {
      initialBalance: '0.1'
    }
  },
  community: {
    initialBalance: '1'
  },
  slack: {
    channel: 'monitor'
  },
  alerts: {
    lockedAccounts: {
      threshold: 10 // in minutes
    },
    lowBalanceAccounts: {
      options: [
        {
          role: 'wallet',
          bridgeType: 'home'
        },
        {
          role: 'wallet',
          bridgeType: 'foreign'
        }
      ],
      threshold: '0.25' // in ETH
    }
  },
  daipCommunityAddress: '0xc036118695Eff203b00B74B5a3ef8c3fA808E09B'
}
