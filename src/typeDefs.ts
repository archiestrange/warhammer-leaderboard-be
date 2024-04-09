export const typeDefs = `#graphql
  type Query {
    getUser(id: String!): User
    getFriendList(userId: String!, limit: Int!, offset: Int!): GetFriendListResult!
    getSuggestedFriends(userId: String!, limit: Int!, offset: Int!): GetSuggestedFriendsResult!
    getFriendRequestList(userId: String!, limit: Int!, offset: Int!): GetFriendRequestListResult
    searchUsers(email: String!, firstname: String!, lastname: String!, username: String!): [User!]!
    getLeagueList(userId: String!, limit: Int!, offset: Int!): GetLeagueListResult!
    getCommunityList(userId: String!, limit: Int!, offset: Int!): GetCommunityListResult!
    searchLeagues(userId: String!, name: String!): [League!]!
    searchCommunities(userId: String!, name: String!): [Community!]!
    getLeague(userId: String!, leagueId: String!): LeagueMember!
    getCommunity(userId: String!, communityId: String!): CommunityMember!
    getLeagueMembers(leagueId: String!, limit: Int!, offset: Int!): GetLeagueListResult!
    getCommunityMembers(communityId: String!, limit: Int!, offset: Int!): GetCommunityListResult!
    getGamesList(userId: String!, handshakes: Boolean!, limit: Int!, offset: Int!): GetGameListResult!
    getFriendsGamesList(userId: String!, limit: Int!, offset: Int!): GetFriendsGameListResult!
    getGamesByLeagueList(leagueId: String!, limit: Int!, offset: Int!): GetLeagueGameListResult!
    getGamesByCommunityList(communityId: String!, limit: Int!, offset: Int!): GetCommunityGameListResult!
    getGame(gameId: String!): Game!
    getProfile(id: String!): Profile!
    getUserRankings(limit: Int!, offset: Int!): GetUserRankingsResult!
  }


  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): User!
    updateUser(id: String!, newFirstName: String, newLastName: String, currentPassword: String, newPassword: String, newFavouriteArmy: String): User!
    signIn(email: String!, password: String!): User!
    sendFriendRequest(senderUserId: String!, receiverUserId: String!): String!
    acceptFriendRequest(id: String!): Friend!
    declineFriendRequest(id: String!): String!
    removeFriend(id: String!): String!
    blockUser(blockerId: String!, blockeeId: String!): Blocked!
    createLeague(userId: String!, name: String!, isPrivate: Boolean!): League!
    createCommunity(userId: String!, name: String!, isPrivate: Boolean!): Community!
    deleteLeague(userId: String!, leagueId: String!): League!
    deleteCommunity(userId: String!, communityId: String!): Community!
    joinLeague(userId: String!, leagueId: String!): LeagueMember!
    joinCommunity(userId: String!, communityId: String!): CommunityMember!
    createGame(
      attackerId: String,
      defenderId: String,
      leagueId: String,
      attackerPoints: Int!,
      defenderPoints: Int!,
      attackerAveragePoints: Int!,
      defenderAveragePoints: Int!,
      attackerArmy: String!,
      defenderArmy: String!,
      score: String!
      attackerArmyDetail: String!
      defenderArmyDetail: String!
      round1Notes: String!
      round2Notes: String!
      round3Notes: String!
      round4Notes: String!
      round5Notes: String!
      attackerTacticalPoints: Int
      defenderTacticalPoints: Int
      attackerFixedPoints: Int
      defenderFixedPoints: Int
    ): Game!
    resetPassword(email: String!): String!
    confirmGame(userId: String!, gameId: String!): Game!
  }



  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    winStreak: Int!
    maxWinStreak: Int!
    globalRanking: Int!
    date: String!
    favouriteArmy: String!
  }


  type GetUserRankingsResult {
    data: [User!]!
    count: Int!
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
    attackerAveragePoints: Int!
    defenderAveragePoints: Int!
    league: League
    attackerArmy: String!
    defenderArmy: String!
    score: String!
    attackerHandshake: Boolean!
    defenderHandshake: Boolean!
    attackerArmyDetail: String!
    defenderArmyDetail: String!
    round1Notes: String!
    round2Notes: String!
    round3Notes: String!
    round4Notes: String!
    round5Notes: String!
  }

  type ProfileTotalGames {
    totalGames: Int!
    totalWins: Int!
    totalLosses: Int!
    totalDraws: Int!
    totalGamesAsFixed: Int!
    totalGamesAsTactical: Int!
  }

  type ProfileTotalAttackerGames{
    totalGamesAsAttacker: Int!
    totalWinsAsAttacker: Int!
    totalLossesAsAttacker: Int!
    totalDrawsAsAttacker: Int!
  }

  type ProfileTotalDefenderGames {
    totalGamesAsDefender: Int!
    totalWinsAsDefender: Int!
    totalLossesAsDefender: Int!
    totalDrawsAsDefender: Int!
  }

  type ProfileGames {
    totalGames: ProfileTotalGames!
    attacker: ProfileTotalAttackerGames!
    defender: ProfileTotalDefenderGames!
  }

  type ProfileVP {
    averageVPOnAll: Float!
    averageSecondaryVPOnTactical: Float!
    averageSecondaryVPOnFixed: Float!
    averageVPOnAllAsAttacker: Float!
    averageVPOnAllAsDefender: Float!
    averageVPOnWins: Float!
    averageVPOnLosses: Float!
    averageVPOnWinsAsAttacker: Float!
    averageVPOnWinsAsDefender: Float!
    averageVPOnLossesAsAttacker: Float!
    averageVPOnLossesAsDefender: Float!
    averageVPOnDraws: Float!
    averageVPOnDrawsAsAttacker: Float!
    averageVPOnDrawsAsDefender: Float!
  }

  type Profile {
    user: User!
    globalRanking: Int!
    games: ProfileGames!
    vp: ProfileVP!
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
    leagueRanking: Int!
  }

  type Community {
    id: String!
    date: String!
    name: String!
    owner: User!
    private: Boolean!
  }

  type CommunityMember {
    id: String!
    date: String!
    user: User!
    community: Community!
    isMember: Boolean
  }

  type GetCommunityListResult {
    data: [CommunityMember!]!
    count: Int!
  }

  type GetLeagueListResult {
    data: [LeagueMember!]!
    count: Int!
  }

  type GetCommunityListResult {
    data: [CommunityMember!]!
    count: Int!
  }

  type GetGameListResult {
    data: [Game!]!
    count: Int!
  }

  type GetFriendsGameListResult {
    data: [Game!]!
    count: Int!
  }

  type GetLeagueGameListResult {
    data: [Game!]!
    count: Int!
  }

  type GetCommunityGameListResult {
    data: [Game!]!
    count: Int!
  }

`;
