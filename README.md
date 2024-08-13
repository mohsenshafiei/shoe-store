<h2 align="center">🥾 Shoe Store</h2>

### Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed. The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

```
{
  'store' => 'ALDO Ste-Catherine',
  'model' => 'ADERI',
  'inventory' => 10,
}
```

`ALDO Ste-Catherine` store sold a pair of `ADERI` shoes. `ALDO Ste-Catherine` now has 10 pairs of `ADERI` left.

### Goal

**Design an interface that would allow the inventory department to monitor Aldo's stores and shoes inventory.**

Hope you’ll have fun with this little test. I know I had designing it.
Go wild. It can be anything you want. I’ve seen results printed to console, displayed on a webpage, and even someone who did periodical database dumps.

Here are a few ideas if you need an extra challenge:

- Add some sort of alerting system, e.g. When a shoe model at a store goes too low, or too high.
- Add a REST JSON API, or GraphQL
- Suggest shoe transfers from one store to another according to inventory
- Your own crazy idea!

Share your repository with us when you’re done.

Happy Hacking :)

### Installation

#### Step 1: Clone The Repository

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/mohsenshafiei/shoe-store.git
cd shoe-store
```

#### Step 2: Setup Environment Variables

Before starting the project, you need to configure your environment variables. Rename `.env.example` to `.env` and if you want you can adjust the values.

#### Step 3: Setup websocketd

This projects uses the popular library `websocketd` to send messages.

If you're on a Mac, you can install `websocketd` using [Homebrew](http://brew.sh/). Just run

<pre align="center">brew install <b>websocketd</b></pre>

#### Step 4: Inventory Server Installation and Running

First we need to install `Ruby`. If you're on a Mac, you can install `ruby` using [Homebrew](http://brew.sh/). Just run

<pre align="center">brew install <b>ruby</b></pre>

Then install the following packages

```
gem install faye-websocket
gem install eventmachine
```

Your WebSocket Server is the tap that aggregates inventories from all stores.

You can run it directly from your own machine.

Run the following to start tapping into the inventory events.

<pre align="center">websocketd --port=8080 ruby server/inventory.rb</pre>

You now have an active connection to their stores opened on port 8080.

#### Step 5: Frontend Installation and Running

<pre align="center">pnpm <b>i</b></pre>

and then

<pre align="center">pnpm <b>run dev</b></pre>
