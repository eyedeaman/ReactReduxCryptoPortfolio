import { coinsRef } from '../services/firebase-service';
import { getAllCoinInfo, getCoinChart } from '../services/coin-price-service';
import {
    FETCH_COINS,
    SET_TOTALS, 
    TOGGLE_BTC,
    FETCH_COIN_DETAILS,
    FETCH_COIN_CHART
} from './types'

// TODO: Make all of these actions use Redux Thunk with dispatch

/* 
    - Pulls coins from Firebase and converts to array 
    - Pulls current price information based on Firebase results
    - Returns an array with the combined information
*/
export function fetchCoins() {
    return dispatch => {
        // Gets coins from firebase
        coinsRef.on('value', async snapshot => {
            // React table needs an array 
            let coins = snapshot.val();
            let coinTableArray = [];
            let tickerArray = []

            // Array of tickers to fetch extra coin info
            for (let coin in coins) {
                tickerArray.push(coins[coin].ticker);
            }
            const extraCoinInfo = await getAllCoinInfo(tickerArray);

            // Portfolio values
            let btcTotal = 0;
            let usdTotal = 0;

            // Loop over firebase coins, pull current prices and calculate values
            // Also tracks totals that populate portfolio summary
            for (let coin in coins) {
                // Finds object in extraInfo array that matches the ticker in Firebase array
                const extraInfo = extraCoinInfo.filter(extraCoins => extraCoins.ticker == coins[coin].ticker);

                const id = coin;
                const amount = coins[coin].amount;
                const ticker = coins[coin].ticker;
                const buyCurrency = coins[coin].buyCurrency;
                const buyPrice = coins[coin].buyPrice;
                const currentPriceBTC = extraInfo[0].currentPriceBTC;
                const currentPriceUSD = extraInfo[0].currentPriceUSD;
                const profitLossBTC = (currentPriceBTC - buyPrice)*amount;
                const profitLossBTCPercent = (((currentPriceBTC - buyPrice)/buyPrice)*100);
                const holdingsBTC = amount * currentPriceBTC;
                const holdingsUSD = amount * currentPriceUSD;
                const btcChange24Hour = extraInfo[0].btcChange24Hour;
                const btcPctChange24Hour = extraInfo[0].btcPctChange24Hour;
                const usdChange24Hour = extraInfo[0].usdChange24Hour;
                const usdPctChange24Hour = extraInfo[0].usdPctChange24Hour;
                const usdMktCap = extraInfo[0].usdMktCap;
                const image = extraInfo[0].imageUrl;

                coinTableArray.push({
                    id: id,
                    amount: amount,
                    ticker: ticker,
                    buyPrice: buyPrice,
                    buyCurrency: buyCurrency,
                    currentPriceBTC: currentPriceBTC,
                    currentPriceUSD: currentPriceUSD,
                    profitLossBTC: profitLossBTC,
                    profitLossBTCPercent: profitLossBTCPercent,
                    holdingsBTC: holdingsBTC,
                    holdingsUSD: holdingsUSD,
                    btcChange24Hour: btcChange24Hour,
                    btcPctChange24Hour: btcPctChange24Hour,
                    usdChange24Hour: usdChange24Hour,
                    usdPctChange24Hour: usdPctChange24Hour,
                    usdMktCap: usdMktCap,
                    image: image
                    // TO DO - Buy price (USD)....need date
                    // TO DO - Profit/Loss (USD_
                });
                
                btcTotal += holdingsBTC;
                usdTotal += holdingsUSD;
            }
            // Call within dispatch otherwise setPortfolioTotals will run up until it returns something
            dispatch(setPortfolioTotals(btcTotal, usdTotal)); 
            
            // Using dispatch to return something is Redux Thunk
            dispatch({
                type: FETCH_COINS,
                payload: coinTableArray
            });
        });
    };
}

export function fetchCoinDetails(coin) {
    return dispatch => {
        dispatch(fetchCoinChart(coin.ticker, 29));
        dispatch({
            type: FETCH_COIN_DETAILS,
            payload: coin
        });
    };
}

export function fetchCoinChart(ticker, days) {
    return async dispatch => {
        const chart = await getCoinChart(ticker, days);
        dispatch({
            type: FETCH_COIN_CHART,
            payload: chart
        });
    };
}

export function setPortfolioTotals(btcTotal, usdTotal) {
    const totals = {
        btc: btcTotal, 
        usd: usdTotal
    }
    return {
        type: SET_TOTALS,
        payload: totals
    };
}

export function updateBtcToggle(bool) {
    return {
        type: TOGGLE_BTC, 
        payload: bool
    };
}



// export const addCoin = newCoin => async dispatch => {
//     coinsRef.push().set(newCoin);
// };

// export const removeCoin = coinId => async dispatch => {
//     coinsRef.child(coinId).remove();
// };

