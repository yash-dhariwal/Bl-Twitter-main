// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol";
import "../contracts/Twitter3NFTDrop.sol";

contract Twitter3NFTDropTest {

    Twitter3NFTDrop s;
    function beforeAll () public {
        s = new Twitter3NFTDrop(0x6d462987e2726Cb137c7120a8CBCA928004E7e04);
    }

    function testTokenNameAndSymbol () public {
        Assert.equal(s.name(), "Twitter3NFTDrop", "token name did not match");
        Assert.equal(s.symbol(), "T3D", "token symbol did not match");
    }
}