//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        // To interact with a smart contract we will always need (ABI & Address).
        //0x9326BFA02ADD2366b30bacB125260Af641031331

        (, int256 price, , , ) = priceFeed.latestRoundData();
        //ETH in terms of USD
        //price decimals are 8, but ETH has 18 decimals. In order to clean it up you can do this
        return uint256(price * 1e10);
    }

    function getVersion(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        AggregatorV3Interface(priceFeed);
        return priceFeed.version();
    }

    function getDecimals() internal view returns (uint8) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x9326BFA02ADD2366b30bacB125260Af641031331
        );
        return priceFeed.decimals();
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }
}
