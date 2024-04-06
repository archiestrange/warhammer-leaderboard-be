import { calculateNewRank } from './calculateNewRank';

describe('calculateNewRank', () => {
  describe('210 better', () => {
    it('wins', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 190, win: true }),
      ).toBe(400 + 2);
    });

    it('losses', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 190, win: false }),
      ).toBe(400 - 35);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 190, win: true }),
      ).toBe(400 + 2 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 190, win: false }),
      ).toBe(400 - 35);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 400,
          isBonusPoints: true,
          opponentRank: 190,
          win: false,
          draw: true,
        }),
      ).toBe(400 - 10);
    });
  });

  describe('175 better', () => {
    it('wins', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 225, win: true }),
      ).toBe(400 + 5);
    });

    it('losses', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 225, win: false }),
      ).toBe(400 - 28);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 225, win: true }),
      ).toBe(400 + 5 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 225, win: false }),
      ).toBe(400 - 28);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 400,
          isBonusPoints: true,
          opponentRank: 225,
          win: false,
          draw: true,
        }),
      ).toBe(400 - 8);
    });
  });

  describe('120 better', () => {
    it('wins', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 280, win: true }),
      ).toBe(400 + 7);
    });

    it('losses', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 280, win: false }),
      ).toBe(400 - 23);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 280, win: true }),
      ).toBe(400 + 7 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 280, win: false }),
      ).toBe(400 - 23);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 400,
          isBonusPoints: true,
          opponentRank: 280,
          win: false,
          draw: true,
        }),
      ).toBe(400 - 5);
    });
  });

  describe('60 better', () => {
    it('wins', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 340, win: true }),
      ).toBe(400 + 10);
    });

    it('losses', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 340, win: false }),
      ).toBe(400 - 20);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 340, win: true }),
      ).toBe(400 + 10 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 340, win: false }),
      ).toBe(400 - 20);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 400,
          isBonusPoints: true,
          opponentRank: 340,
          win: false,
          draw: true,
        }),
      ).toBe(400 - 3);
    });
  });

  describe('26 better', () => {
    it('wins', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 374, win: true }),
      ).toBe(400 + 13);
    });

    it('losses', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 374, win: false }),
      ).toBe(400 - 17);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 374, win: true }),
      ).toBe(400 + 13 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 374, win: false }),
      ).toBe(400 - 17);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 400,
          isBonusPoints: true,
          opponentRank: 374,
          win: false,
          draw: true,
        }),
      ).toBe(400 - 2);
    });
  });

  describe('equal', () => {
    it('win', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 400, win: true }),
      ).toBe(415);
    });

    it('loss', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: false, opponentRank: 400, win: false }),
      ).toBe(385);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 400, win: true }),
      ).toBe(420);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 400, isBonusPoints: true, opponentRank: 400, win: false }),
      ).toBe(385);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 400,
          isBonusPoints: true,
          opponentRank: 400,
          win: false,
          draw: true,
        }),
      ).toBe(400);
    });
  });

  describe('10 worse', () => {
    it('win', () => {
      expect(
        calculateNewRank({ currentRank: 390, isBonusPoints: false, opponentRank: 400, win: true }),
      ).toBe(390 + 15);
    });

    it('loss', () => {
      expect(
        calculateNewRank({ currentRank: 390, isBonusPoints: false, opponentRank: 400, win: false }),
      ).toBe(390 - 15);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 390, isBonusPoints: true, opponentRank: 400, win: true }),
      ).toBe(390 + 15 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 390, isBonusPoints: true, opponentRank: 400, win: false }),
      ).toBe(390 - 15);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 390,
          isBonusPoints: true,
          opponentRank: 400,
          win: false,
          draw: true,
        }),
      ).toBe(390);
    });
  });

  describe('26 worse', () => {
    it('win', () => {
      expect(
        calculateNewRank({ currentRank: 374, isBonusPoints: false, opponentRank: 400, win: true }),
      ).toBe(374 + 17);
    });

    it('loss', () => {
      expect(
        calculateNewRank({ currentRank: 374, isBonusPoints: false, opponentRank: 400, win: false }),
      ).toBe(374 - 13);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 374, isBonusPoints: true, opponentRank: 400, win: true }),
      ).toBe(374 + 17 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 374, isBonusPoints: true, opponentRank: 400, win: false }),
      ).toBe(374 - 13);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 374,
          isBonusPoints: true,
          opponentRank: 400,
          win: false,
          draw: true,
        }),
      ).toBe(376);
    });
  });

  describe('60 worse', () => {
    it('win', () => {
      expect(
        calculateNewRank({ currentRank: 340, isBonusPoints: false, opponentRank: 400, win: true }),
      ).toBe(340 + 20);
    });

    it('loss', () => {
      expect(
        calculateNewRank({ currentRank: 340, isBonusPoints: false, opponentRank: 400, win: false }),
      ).toBe(340 - 10);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 340, isBonusPoints: true, opponentRank: 400, win: true }),
      ).toBe(340 + 20 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 340, isBonusPoints: true, opponentRank: 400, win: false }),
      ).toBe(340 - 10);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 340,
          isBonusPoints: true,
          opponentRank: 400,
          win: false,
          draw: true,
        }),
      ).toBe(343);
    });
  });

  describe('120 worse', () => {
    it('win', () => {
      expect(
        calculateNewRank({ currentRank: 280, isBonusPoints: false, opponentRank: 400, win: true }),
      ).toBe(280 + 23);
    });

    it('loss', () => {
      expect(
        calculateNewRank({ currentRank: 280, isBonusPoints: false, opponentRank: 400, win: false }),
      ).toBe(280 - 7);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 280, isBonusPoints: true, opponentRank: 400, win: true }),
      ).toBe(280 + 23 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 280, isBonusPoints: true, opponentRank: 400, win: false }),
      ).toBe(280 - 7);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 280,
          isBonusPoints: true,
          opponentRank: 400,
          win: false,
          draw: true,
        }),
      ).toBe(285);
    });
  });

  describe('175 worse', () => {
    it('win', () => {
      expect(
        calculateNewRank({ currentRank: 225, isBonusPoints: false, opponentRank: 400, win: true }),
      ).toBe(225 + 28);
    });

    it('loss', () => {
      expect(
        calculateNewRank({ currentRank: 225, isBonusPoints: false, opponentRank: 400, win: false }),
      ).toBe(225 - 5);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 225, isBonusPoints: true, opponentRank: 400, win: true }),
      ).toBe(225 + 28 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 225, isBonusPoints: true, opponentRank: 400, win: false }),
      ).toBe(225 - 5);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 225,
          isBonusPoints: true,
          opponentRank: 400,
          win: false,
          draw: true,
        }),
      ).toBe(233);
    });
  });

  describe('210 worse', () => {
    it('win', () => {
      expect(
        calculateNewRank({ currentRank: 190, isBonusPoints: false, opponentRank: 400, win: true }),
      ).toBe(190 + 35);
    });

    it('loss', () => {
      expect(
        calculateNewRank({ currentRank: 190, isBonusPoints: false, opponentRank: 400, win: false }),
      ).toBe(190 - 2);
    });

    it('win with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 190, isBonusPoints: true, opponentRank: 400, win: true }),
      ).toBe(190 + 35 + 5);
    });

    it('loss with bonus points', () => {
      expect(
        calculateNewRank({ currentRank: 190, isBonusPoints: true, opponentRank: 400, win: false }),
      ).toBe(190 - 2);
    });

    it('draw', () => {
      expect(
        calculateNewRank({
          currentRank: 190,
          isBonusPoints: true,
          opponentRank: 400,
          win: false,
          draw: true,
        }),
      ).toBe(200);
    });
  });
});
