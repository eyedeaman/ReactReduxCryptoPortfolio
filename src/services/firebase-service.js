import * as firebase from "firebase";
import { FirebaseConfig } from "../config/keys";
import { callbackify } from "util";

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const coinsRef = databaseRef.child("coins");

export function postCoin(coin) {
  var rootRef = firebase.database().ref();
  var coinsRef = rootRef.child("coins");
  var newCoinRef = coinsRef.push();
  newCoinRef.set({
    ticker: coin.ticker,
    amount: coin.amount,
    buyPrice: coin.buyPrice
  });
  return newCoinRef;
}

export function deleteCoin(coinKey) {
  const coinsRef = databaseRef.child("coins");
  coinsRef.child(coinKey).remove();
}
