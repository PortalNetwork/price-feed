pragma solidity >=0.4.23 <0.6.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract PriceOracle is Ownable {
  using SafeMath for *;

  uint public price;
  uint32 public expire;

  event PriceChanged(uint price);

  function setPrice(uint _price, uint32 _expire) public onlyOwner {
      price = _price;
      expire = _expire;
      emit PriceChanged(_price);
  }

  function getPrice() external view returns(uint) {
      require(now < expire || expire == 0);
      return price;
  }

  function infinite() public onlyOwner {
      expire = 0;
  }
}