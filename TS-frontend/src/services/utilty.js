export const calculateMFI = (data) => {
    const mfiData = [];
    for (let i = 14; i < data.length; i++) {
        const typicalPrice = (data[i].high + data[i].low + data[i].close) / 3;
        const rawMoneyFlow = typicalPrice * data[i].volume;
        let positiveMoneyFlow = 0;
        let negativeMoneyFlow = 0;
        for (let j = i - 14; j < i; j++) {
            const prevTypicalPrice = (data[j].high + data[j].low + data[j].close) / 3;
            if (typicalPrice > prevTypicalPrice) {
                positiveMoneyFlow += rawMoneyFlow;
            } else if (typicalPrice < prevTypicalPrice) {
                negativeMoneyFlow += rawMoneyFlow;
            }
        }
        const moneyRatio = positiveMoneyFlow / negativeMoneyFlow;
        const mfi = 100 - (100 / (1 + moneyRatio));
        mfiData.push(mfi);
    }
    return mfiData;
}
//end
//start
export const calculateADX = (data) => {
    const adxData = [];
    const period = 14; // ADX period

    // Calculate the True Range (TR) for each data point
    for (let i = 1; i < data.length; i++) {
        const trueRange = Math.max(
            data[i].high - data[i].low,
            Math.abs(data[i].high - data[i - 1].close),
            Math.abs(data[i].low - data[i - 1].close)
        );
        data[i].trueRange = trueRange;
    }

    // Calculate the Directional Movement (DM) components
    for (let i = 1; i < data.length; i++) {
        const highDiff = data[i].high - data[i - 1].high;
        const lowDiff = data[i - 1].low - data[i].low;

        const plusDM = highDiff > lowDiff && highDiff > 0 ? highDiff : 0;
        const minusDM = lowDiff > highDiff && lowDiff > 0 ? lowDiff : 0;

        data[i].plusDM = plusDM;
        data[i].minusDM = minusDM;
    }

    // Calculate the Average True Range (ATR) and Average Directional Index (ADX)
    for (let i = period; i < data.length; i++) {
        const ATR = calculateATR(data, i, period);
        const plusDI = calculatePlusDI(data, i, period);
        const minusDI = calculateMinusDI(data, i, period);

        // Calculate the Directional Movement Index (DX)
        const DX = (Math.abs(plusDI - minusDI) / (plusDI + minusDI)) * 100;

        if (!isNaN(DX)) {
            adxData.push(DX);
        }
    }

    return adxData;
}

function calculateATR(data, index, period) {
    let sum = 0;

    for (let i = index - period + 1; i <= index; i++) {
        sum += data[i].trueRange;
    }

    return sum / period;
}

function calculatePlusDI(data, index, period) {
    let sumPlusDM = 0;
    let sumTR = 0;

    for (let i = index - period + 1; i <= index; i++) {
        sumPlusDM += data[i].plusDM;
        sumTR += data[i].trueRange;
    }

    return (sumPlusDM / sumTR) * 100;
}

function calculateMinusDI(data, index, period) {
    let sumMinusDM = 0;
    let sumTR = 0;

    for (let i = index - period + 1; i <= index; i++) {
        sumMinusDM += data[i].minusDM;
        sumTR += data[i].trueRange;
    }

    return (sumMinusDM / sumTR) * 100;
}
//end
//start
export const calculateMACD = (data) => {
    const macdData = [];
    const shortTermEMA = calculateEMA(data, 12); // Short-term Exponential Moving Average
    const longTermEMA = calculateEMA(data, 26); // Long-term Exponential Moving Average

    for (let i = 0; i < data.length; i++) {
        const macdValue = shortTermEMA[i] - longTermEMA[i];
        macdData.push(macdValue);
    }

    return macdData;
}

function calculateEMA(data, period) {
    const ema = [];
    const multiplier = 2 / (period + 1);

    ema[0] = data[0].close;

    for (let i = 1; i < data.length; i++) {
        const close = data[i].close;
        ema[i] = (close - ema[i - 1]) * multiplier + ema[i - 1];
    }

    return ema;
}
//end
//start
export const calculateBollingerBands = (data, period, multiplier) => {
    const bandsData = {
        upper: [],
        middle: [],
        lower: [],
    };

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            bandsData.upper.push(null);
            bandsData.middle.push(null);
            bandsData.lower.push(null);
            continue;
        }

        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, val) => acc + val.close, 0);
        const middle = sum / period;

        const squaredDifferencesSum = slice.reduce((acc, val) => acc + Math.pow(val.close - middle, 2), 0);
        const standardDeviation = Math.sqrt(squaredDifferencesSum / period);

        const upper = middle + multiplier * standardDeviation;
        const lower = middle - multiplier * standardDeviation;

        bandsData.upper.push(upper);
        bandsData.middle.push(middle);
        bandsData.lower.push(lower);
    }

    return bandsData;
}
//end
//start
export const calculateRSI=(data, period)=> {
    const rsiData = [];
    let prevPrice = data[0].close;
    let gainSum = 0;
    let lossSum = 0;
  
    for (let i = 1; i < data.length; i++) {
      const price = data[i].close;
      const priceDiff = price - prevPrice;
      const gain = Math.max(priceDiff, 0);
      const loss = Math.abs(Math.min(priceDiff, 0));
  
      gainSum += gain;
      lossSum += loss;
  
      if (i >= period) {
        const avgGain = gainSum / period;
        const avgLoss = lossSum / period;
        const relativeStrength = avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + relativeStrength));
  
        rsiData.push(rsi);
      } else {
        rsiData.push(null); // null values for the first (period - 1) data points
      }
  
      prevPrice = price;
    }
  
    return rsiData;
  }
  //end
//start
export const calculateCMF=(data)=>{
    const cmfData = [];
    let sumVolume = 0;
    let sumCMF = 0;
    for (let i = 0; i < data.length; i++) {
      const close = data[i].close;
      const high = data[i].high;
      const low = data[i].low;
      const volume = data[i].volume;
  
      const moneyFlowMultiplier = ((close - low) - (high - close)) / (high - low);
      const moneyFlowVolume = moneyFlowMultiplier * volume;
  
      sumVolume += volume;
      sumCMF += moneyFlowVolume;
  
      if (i > 0) {
        const cmf = sumCMF / sumVolume;
        cmfData.push(cmf);
      } else {
        cmfData.push(null); // Set the first data point as null
      }
    }
    return cmfData;
  }
//end
//start
