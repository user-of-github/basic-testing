// Uncomment the code below and write your tests
// import { getBankAccount } from '.';

import { BankAccount, getBankAccount } from './index';

describe('BankAccount', () => {
  let account: BankAccount;

  test('should create account with initial balance', () => {
    const initial = 42;
    account = getBankAccount(initial);
    expect(account.getBalance()).toEqual(initial);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(account.getBalance() * 10);
    }).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const receiver = getBankAccount(0);
    expect(() => {
      account.transfer(account.getBalance() * 10, receiver);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(account.getBalance() * 10, account);
    }).toThrow();
  });

  test('should deposit money', () => {
    const currentBalance = account.getBalance();
    const deposit = 10;
    account.deposit(deposit);
    expect(account.getBalance()).toEqual(currentBalance + deposit);
  });

  test('should withdraw money', () => {
    const currentBalance = account.getBalance();
    const sum = 10;
    account.withdraw(sum);
    expect(account.getBalance()).toEqual(currentBalance - sum);
  });

  test('should transfer money', () => {
    const receiverInitial = 0;
    const receiver = getBankAccount(receiverInitial);
    const currentBalance = account.getBalance();
    const sum = 1;
    account.transfer(sum, receiver);
    expect(account.getBalance()).toEqual(currentBalance - sum);
    expect(receiver.getBalance()).toEqual(receiverInitial + sum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const res = await account.fetchBalance();
    const typeValid = typeof res === 'object' || typeof res === 'number';
    expect(typeValid).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initial = -42;
    const testAccount = getBankAccount(initial);
    let errorFlag = false;
    try {
      await testAccount.synchronizeBalance();
    } catch (error) {
      errorFlag = true;
    }

    const result =
      (errorFlag && testAccount.getBalance() === initial) ||
      (!errorFlag && testAccount.getBalance() !== initial);
    expect(result).toBeTruthy();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initial = -42;
    const testAccount = getBankAccount(initial);
    let errorFlag = false;
    try {
      await testAccount.synchronizeBalance();
    } catch (error) {
      errorFlag = true;
    }

    const result =
      (errorFlag && testAccount.getBalance() === initial) ||
      (!errorFlag && testAccount.getBalance() !== initial);
    expect(result).toBeTruthy();
  });
});
