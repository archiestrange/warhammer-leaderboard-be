export const typeDefs = `#graphql
  type Query {
    getUser(id: String!): User
    getFriendList(userId: String!, limit: Int!, offset: Int!): GetFriendListResult!
    getSuggestedFriends(userId: String!, limit: Int!, offset: Int!): GetSuggestedFriendsResult!
    getFriendRequestList(userId: String!, limit: Int!, offset: Int!): GetFriendRequestListResult
    searchUsers(email: String!, firstname: String!, lastname: String!): [User!]!
    getLeagueList(userId: String!, limit: Int!, offset: Int!): GetLeagueListResult!
    searchLeagues(userId: String!, name: String!): [League!]!
    getLeague(userId: String!, leagueId: String!): LeagueMember!
    getLeagueMembers(leagueId: String!, limit: Int!, offset: Int!): GetLeagueListResult!
    getGamesList(userId: String!, limit: Int!, offset: Int!): GetGameListResult!
    getGamesByLeagueList(leagueId: String!, limit: Int!, offset: Int!): GetGameListResult!
    getGame(gameId: String!): Game!
  }


  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    signIn(email: String!, password: String!): User!
    sendFriendRequest(senderUserId: String!, receiverUserId: String!): String!
    acceptFriendRequest(id: String!): Friend!
    declineFriendRequest(id: String!): String!
    removeFriend(id: String!): String!
    blockUser(blockerId: String!, blockeeId: String!): Blocked!
    createLeague(userId: String!, name: String!, isPrivate: Boolean!): League!
    joinLeague(userId: String!, leagueId: String!): LeagueMember!
    createGame(
      attackerId: String,
      defenderId: String,
      leagueId: String,
      attackerPoints: Int!,
      defenderPoints: Int!
      attackerArmy: String!,
      defenderArmy: String!,
      score: String!
    ): Game!
  }



  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    winStreak: Int!
    maxWinStreak: Int!
  }

  type FriendRequest {
    id: String!
    sender: User!
    receiver: User
    date: String!
  }

  type Friend {
    id: String!
    user: User!
    friend: User!
    date: String!
  }

  type Blocked {
    id: String!
    date: String!
    blocker: User!
    blockee: User!
  }

  type GetSuggestedFriendsResult {
    data: [Friend!]!
    count: Int!
  }

  type GetFriendListResult {
    data: [Friend!]!
    count: Int!
  }

  type GetFriendRequestListResult {
    data: [FriendRequest!]!
    count: Int!
  }

  type Game {
    id: String!
    date: String!
    attacker: User
    defender: User
    attackerPoints: Int!
    defenderPoints: Int!
    league: League
    attackerArmy: String!
    defenderArmy: String!
    score: String!
  }

  type League {
    id: String!
    date: String!
    name: String!
    owner: User!
    private: Boolean!
  }

  type LeagueMember {
    id: String!
    date: String!
    user: User!
    league: League!
  }

  type GetLeagueListResult {
    data: [LeagueMember!]!
    count: Int!
  }

  type GetGameListResult {
    data: [Game!]!
    count: Int!
  }

`;
