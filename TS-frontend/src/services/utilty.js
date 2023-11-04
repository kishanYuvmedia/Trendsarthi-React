export const calculateMFI = (data) => {
    const mfiData = [];
    for (let i = 14; i < data.length; i++) {
        const typicalPrice = (data[i].HIGH + data[i].LOW + data[i].CLOSE) / 3;
        const rawMoneyFLOW = typicalPrice * data[i].volume;
        let positiveMoneyFLOW = 0;
        let negativeMoneyFLOW = 0;
        for (let j = i - 14; j < i; j++) {
            const prevTypicalPrice = (data[j].HIGH + data[j].LOW + data[j].CLOSE) / 3;
            if (typicalPrice > prevTypicalPrice) {
                positiveMoneyFLOW += rawMoneyFLOW;
            } else if (typicalPrice < prevTypicalPrice) {
                negativeMoneyFLOW += rawMoneyFLOW;
            }
        }
        const moneyRatio = positiveMoneyFLOW / negativeMoneyFLOW;
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
            data[i].HIGH - data[i].LOW,
            Math.abs(data[i].HIGH - data[i - 1].CLOSE),
            Math.abs(data[i].LOW - data[i - 1].CLOSE)
        );
        data[i].trueRange = trueRange;
    }

    // Calculate the Directional Movement (DM) components
    for (let i = 1; i < data.length; i++) {
        const HIGHDiff = data[i].HIGH - data[i - 1].HIGH;
        const LOWDiff = data[i - 1].LOW - data[i].LOW;

        const plusDM = HIGHDiff > LOWDiff && HIGHDiff > 0 ? HIGHDiff : 0;
        const minusDM = LOWDiff > HIGHDiff && LOWDiff > 0 ? LOWDiff : 0;

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

    ema[0] = data[0].CLOSE;

    for (let i = 1; i < data.length; i++) {
        const CLOSE = data[i].CLOSE;
        ema[i] = (CLOSE - ema[i - 1]) * multiplier + ema[i - 1];
    }

    return ema;
}
//end
//start
export const calculateBollingerBands = (data, period, multiplier) => {
    const bandsData = {
        upper: [],
        middle: [],
        LOWer: [],
    };
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            bandsData.upper.push(null);
            bandsData.middle.push(null);
            bandsData.LOWer.push(null);
            continue;
        }
        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, val) => acc + val.CLOSE, 0);
        const middle = sum / period;
        const squaredDifferencesSum = slice.reduce((acc, val) => acc + Math.pow(val.CLOSE - middle, 2), 0);
        const standardDeviation = Math.sqrt(squaredDifferencesSum / period);
        const upper = middle + multiplier * standardDeviation;
        const LOWer = middle - multiplier * standardDeviation;
        bandsData.upper.push(upper);
        bandsData.middle.push(middle);
        bandsData.LOWer.push(LOWer);
    }

    return bandsData;
}
//end
//start
export const calculateRSI=(data, period)=> {
    const rsiData = [];
    let prevPrice = data[0].CLOSE;
    let gainSum = 0;
    let lossSum = 0;
  
    for (let i = 1; i < data.length; i++) {
      const price = data[i].CLOSE;
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
      const CLOSE = data[i].CLOSE;
      const HIGH = data[i].HIGH;
      const LOW = data[i].LOW;
      const volume = data[i].volume;
      const moneyFLOWMultiplier = ((CLOSE - LOW) - (HIGH - CLOSE)) / (HIGH - LOW);
      const moneyFLOWVolume = moneyFLOWMultiplier * volume; 
      sumVolume += volume;
      sumCMF += moneyFLOWVolume;
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
export  const calculateROC=(data, period)=>{
    const rocData = [];
    
    for (let i = period; i < data.length; i++) {
      const currentPrice = data[i].CLOSE;
      const pastPrice = data[i - period].CLOSE;
      const roc = ((currentPrice - pastPrice) / pastPrice) * 100;
      rocData.push(roc);
    }
  
    return rocData;
  }
//end
//start
export  const  calculateWilliamsR=(data, period)=>{
    const williamsRData = [];
    for (let i = period - 1; i < data.length; i++) {
      const HIGH = data[i].HIGH;
      const LOW = data[i].LOW;
      const CLOSE = data[i].CLOSE;
  
      let HIGHestHIGH = HIGH;
      let LOWestLOW = LOW;
  
      for (let j = i - 1; j > i - period; j--) {
        if (data[j].HIGH > HIGHestHIGH) {
          HIGHestHIGH = data[j].HIGH;
        }
        if (data[j].LOW < LOWestLOW) {
          LOWestLOW = data[j].LOW;
        }
      }
  
      const williamsR = ((HIGHestHIGH - CLOSE) / (HIGHestHIGH - LOWestLOW)) * -100;
      williamsRData.push(williamsR);
    }
    return williamsRData;
  }
  //end
//start
export const calculatefulATR=(data, period)=>{
    const atrData = [];
    let atrSum = 0;
  
    for (let i = 0; i < data.length; i++) {
      const HIGH = data[i].HIGH;
      const LOW = data[i].LOW;
      const CLOSE = data[i].CLOSE;
  
      if (i === 0) {
        atrData.push(null);
      } else {
        const trueRange = Math.max(
          HIGH - LOW,
          Math.abs(HIGH - CLOSE),
          Math.abs(LOW - CLOSE)
        );
        atrSum += trueRange;
  
        if (i >= period) {
          const atr = atrSum / period;
          atrData.push(atr);
          atrSum -= trueRange;
        } else {
          atrData.push(null); // null values for the first (period - 1) data points
        }
      }
    }
  
    return atrData;
  }

 export const calculateSuperTrend=(data, period, multiplier)=>{
    const superTrendData = [];
    let atr = 0;
    let upperBand = 0;
    let LOWerBand = 0;
    let trend = 1;
  
    for (let i = 0; i < data.length; i++) {
      if (i >= period) {
        const { HIGH, LOW, CLOSE } = data[i];
  
        if (i === period) {
          atr = calculateSuperATR(data.slice(0, period));
        } else {
          atr = (atr * (period - 1) + calculateSuperATR([data[i]])) / period;
        }
  
        upperBand = CLOSE + atr * multiplier;
        LOWerBand = CLOSE - atr * multiplier;
  
        if (CLOSE > upperBand) {
          trend = -1;
        } else if (CLOSE < LOWerBand) {
          trend = 1;
        }
  
        if (trend === 1) {
          superTrendData.push(LOWerBand);
        } else {
          superTrendData.push(upperBand);
        }
      } else {
        superTrendData.push(null); // null values for the first (period - 1) data points
      }
    }
  
    return superTrendData;
  }
  
  function calculateSuperATR(data) {
    const trueRanges = [];
  
    for (let i = 1; i < data.length; i++) {
      const { HIGH, LOW, CLOSE } = data[i - 1];
      const { HIGH: currentHIGH, LOW: currentLOW } = data[i];
      const tr = Math.max(
        currentHIGH - currentLOW,
        Math.abs(currentHIGH - CLOSE),
        Math.abs(currentLOW - CLOSE)
      );
      trueRanges.push(tr);
    }
  
    const atr = trueRanges.slice(0, data.length - 1).reduce((acc, tr) => acc + tr, 0) / data.length;
  
    return atr;
  }
 export const calculatePivotPoint=(data)=>{
    const pivotPointData = [];
  
    for (let i = 0; i < data.length; i++) {
      const HIGH = data[i].HIGH;
      const LOW = data[i].LOW;
      const CLOSE = data[i].CLOSE;
  
      const pivotPoint = (HIGH + LOW + CLOSE) / 3;
  
      pivotPointData.push(pivotPoint);
    }
  
    return pivotPointData;
  }
  
  