<img src="./assets/logo-wide.png" width="1000">

👛 WaaS Pay
===========

### 💌 TLDR
A no-code platform for organizations to build & deploy smart contract accounts (ERC4337) on behalf of their employees and vendors for privacy-preserving payments - all with a seamless web2 experience.

### 💪 Motivation
Nobody disputes that ERC4337 is a major catalyst on our journey to on-board the next billion users to web3. However on the 6 largest EVM chains (Etheruem, Polygon, Arbitrum, Avalanche, Optimism, and Gnosis), there have only been [31,000 smart contract accounts created](https://dune.com/sixdegree/account-abstraction-overview) compared to over [*1 million* active EOA addresses on the same chains](https://defillama.com/). Its clear that novel, genuine applications of ERC4337 for web2 users are needed to accelerate adoption.

Armed with the ability to create seamless user experiences for web2 users, we set out to build an end-to-end payments solution for an organization’s employees and vendors. Our no-code platform abstracts away the difficulties of customizing & deploying smart contract accounts, reliably handles sensitive vendor/employee data using SNARK proofs, & implements zkBob to facilitate privacy-preserving payments - all on one of the most popular L2s: Polygon.

### 📖 Description
WaaS Pay is a no-code tool for organizations to build-their-own smart contract accounts (ERC-4337) & deploy them on behalf of web2 users, on demand, using only a URL link. Wallets are issued with all the popular account-abstraction features & come with privacy-preserving functionality out of the box, enabling a seamless onboarding experience for private and instantaneous transactions on the blockchain between organizations & individuals alike.

As an organization wishing to leverage the blockchain for instant payments to my employees or vendors while preserving privacy, WaaS Pay let’s me:

- Use the no-code interface to customize smart contract account features, like Social Logins, fiat on/off ramps, and gasless transactions for your recipients.
- Leverage SNARKs (zero-knowledge proofs) to restrict who is eligible to redeem & deploy your wallets.
- Automatically instantiate & link a new zkBob account for your recipients to withdraw funds privately from.
- Issue unique URLs to your recipients to streamline their on-boarding.

As a wallet recipient, I receive a feature-rich wallet to privately receive and send funds on Polygon without needing to know anything about web3:

- Log-in with my favorite authentication methods - no seed phrases or master passwords.
- A zkBob Account can quickly be connected and used to receive direct deposit payments anonomously.
- The unique and sensitive credentials I use to redeem my wallet never leave my device & are secured by zero-knowledge proofs.
- Transactions are sponsored - gas is paid for by the wallet issuer.
- Novel, custom plugins developed for me by my issuing organization.

### ⚒️ How it's made
WaaS Pay is a simple React app that leverages a number of novel technologies to enable the no-code customization, creation, and deployment of smart contract accounts for web2 users:

- **Safe{Core} Protocol Kit** and the **Safe{Core} Account Abstraction SDK** are used to instantiate & deploy smart contract account wallets. The Auth Kit, OnRamp Kit, and Relay Kit are all used alongside the Protocol Kit to deploy feature-rich smart contract accounts.
- Custom **Safe** plugins to further enhance the user experience and capabilities of the smart contract accounts for a wider range of use cases, including:
    - Deadman switch (to trigger the sending of assets to another address after inactivity some time has elapsed)
    - Block/Allowlist (to explicity restrict or enable interactions with other smart contracts)
- **zkBob Direct Deposit** is used to facilitate anonymous transactions between the issuing organization & the recipient. Upon wallet creation, a zkAccount is instantiated & linked so that the organization (e.g. employer) can directly deposit funds to the recipient's zkAccount - obfuscating both the recipient & the amount.
- **Mina Protocol’s SnarkyJS library** is used for generating and validating the zero-knowledge proofs required to verify that only the intended recipient of a wallet can actually deploy one.
- **Polygon** is the blazing fast and secure L2 blockchain that all the smart contract accounts are deployed to.
- A self-hosted **IPFS node** deployed using Helia is used to store all the hashed sensitive metadata from vendors & employees.

#### 📍 Roadmap

We intend to continue building this project beyond the hackathon and the below are some immediate/short-term improvements we're planning to make.
- Adding support for automatic zkBob account instantiation and linking at the time of wallet deployment for a web2 user 
- Adding support for the bulk-creation of smart contract accounts for larger organizations
- Integration of the Ethereum Attestation Service (EAS) to prove fund provenance when required by regulatory bodies/authorities.
- Adding more Safe plugins - primarily focused on enhancing the user experience for handling payments
- Support for Safe smart contract account deployments on more EVM chains
- Add optional identification features such as PolygonID, SismoConnect, and WorldCoinID
- Building an open-source SDK to let developers add their custom, organization-specific Safe plugins to our platform
- Integration with Push Notifications infrastructure 
- Extending support for Biconomy, Metamask Snaps, and dfns wallet infrastructures.
