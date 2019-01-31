import axios from 'axios';
import 'babel-polyfill';
import moment from 'moment';
import * as CurrencyFormat  from 'react-currency-format';

const ROOT_URL = 'https://min-api.cryptocompare.com/data/'

export async function getAllCoinInfo(tickers) {
    // Turn array of tickers into a comma separated string
    var requestTickers = tickers.toString();
    // Pulls all coin price data and saves as the raw data object
    var coinsInfo = await axios.get(`${ROOT_URL}pricemultifull?fsyms=${requestTickers}&tsyms=BTC,USD`)
        .then(res => coinsInfo = res.data.RAW);
    // Turn object into array and pull out ticker as the key
    const convertedArr = Object.keys(coinsInfo).map(key => ({ key, value: coinsInfo[key] }));
    // Get image Urls for each coin
    const imageUrls = await getCoinImages(tickers);
    const returnArray = []
    
    for (let coin in convertedArr) {
        // Grabs coin from imageUrls array that corresponds to coin in converted Array
        const coinImage = imageUrls.filter(coins => coins.key == convertedArr[coin].key);
        returnArray.push({
            ticker: convertedArr[coin].key,
            currentPriceBTC: convertedArr[coin].value.BTC.PRICE,
            currentPriceUSD: convertedArr[coin].value.USD.PRICE,
            btcChange24Hour: convertedArr[coin].value.BTC.CHANGE24HOUR,
            btcPctChange24Hour: convertedArr[coin].value.BTC.CHANGEPCT24HOUR, 
            usdChange24Hour: convertedArr[coin].value.USD.CHANGE24HOUR,
            usdPctChange24Hour: convertedArr[coin].value.USD.CHANGEPCT24HOUR, 
            usdMktCap: convertedArr[coin].value.USD.MKTCAP, 
            imageUrl: coinImage[0].imageUrl // coinImage returns array with 1 object
        });
    }
    return returnArray;
}

async function getCoinImages(tickers) {
    const baseUrl = 'https://www.cryptocompare.com';
    var imageUrls = []
    // Object of all coins is returned
    var response = await axios.get(`${ROOT_URL}all/coinlist`)
        .then(res => response = res.data.Data);

    // Grab the url for each coin and create array of objects
    for (let ticker in tickers) {
        const ticker = tickers[ticker];
        imageUrls.push({
            key: ticker,
            imageUrl: `${baseUrl}${response[ticker].ImageUrl}`
        });
    }
    return imageUrls;
}

export async function getCoinChart(ticker, days) {
    // Would be good to append this array with the current day 
    let usdData = await axios.get(`${ROOT_URL}histoday?fsym=${ticker}&tsym=USD&limit=${days-1}`)
        .then(res => usdData = res.data.Data);
    let btcData = await axios.get(`${ROOT_URL}histoday?fsym=${ticker}&tsym=BTC&limit=${days-1}`)
        .then(res => btcData = res.data.Data);

    usdData = usdData.map((obj, index) => {
        // Converts UNIX timestamp to local date
        let date = new Date(obj.time*1000).toLocaleDateString();
        date = date.split(' ')[0];
        return {
            d: date, 
            p: obj.close.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }), // Formatted string
            x: index, //Index of array
            y: obj.close // Unformatted string
        }
    });
    btcData = btcData.map((obj, index) => {
        let date = new Date(obj.time*1000).toLocaleDateString();
        date = date.split(' ')[0];
        return {
            d: date, 
            p: obj.close+ ' BTC', // Formatted string
            x: index, //Index of array
            y: obj.close // Unformatted string
        }
    });
    return {
        days: days,
        usdChart: usdData,
        btcChart: btcData
    };
}
