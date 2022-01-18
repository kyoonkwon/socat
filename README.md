# SOCAT

소소코인을 모아 고양이를 키우자.
블록체인 기반 P2E 웹 게임.

## Summary.



### 낚시 게임

낚시 게임은 개별적으로 움직이는 5마리의 물고기를 상하좌우로 움직이는 낚시대를 이용하여 잡는 react 기반 게임임. 

물고기 움직임의 방향을 매번 랜덤하게 만들기 위해 setInterval 과 Math.random() 을 사용하였음.

구매한 낚시대에 따라 물고기가 잡히는 범위를 state로 조정하였음. 

### 낚싯대 뽑기

낚싯대에 따라 낚시 게임에서 물고기를 잡는 범위가 늘어남.

코인을 소비하는 것에 따라 각각 다른 확률로 낚싯대를 무작위 확률로 얻을 수 있음.

낚싯대의 정보는 블록체인 내에 저장되어 지속적으로 소비자의 정보를 활용함. 

### 거래소

ETH(이더리움) to SSC(자체 제작 코인) ,SSC to ETH, Fish to SSC 거래를 담당함.

인벤토리의 물고기를 클릭하여 판매 가능함.

즉각적으로 판매가 되면 변화된 잔고가 인벤토리 상단의 잔고에 표시됨.

### 프로필

고양이 프로필과 잔고, 인벤토리를 포함함.

고양이는 말하기 기능, 물고기를 먹으면 상위 등급의 고양이로 업그레이드, 이전 고양이 기록을 확인할 수 있는 기능이 있음.

인벤토리는 낚시로 얻은 물고리를 담고 있음.

## Implementation.

### Backend

백엔드는 이더리움 블록체인 네트워크에 배포하는 것으로 가정하고 진행하였음.

초기에 ropsten test network에 배포하는 것을 목표로 하였으나, eth send transaction 오류가 발생하여 진행하지 못하였음.

비용문제로 실제 이더리움 메인 네트워크에 배포하지 않고, 로컬에서 테스트만 진행하였음.

코인은 [openzeppelin]("https://github.com/OpenZeppelin/openzeppelin-contracts")의 ERC20을 상속하여 게임 기능에 맞게 수정하여 작성하였음.

contract를 처음 배포한 노드를 owner 계정으로 설정하여, 최초 발행된 코인을 지급하며, 유저들이 게임플레이를 통하여 owner로부터 코인을 지급받는 방식.

이더리움은 contract에 전송하고 받는 방식을 취함 

게임 전체는 CatBase Solidity Contract를 통해 클라이언트와 상호작용할 수 있도록 하였음.


### Frontend

프론트엔드는 자체 제작하여 배포한 코인을 활용하여 게임을 만들도록 하였음.

블록체인을 백엔드로 활용하여 Client에서 처리해야 하는 정보 및 기능을 전달함.

react를 활용하여 web3.js(Ethereum)를 사용함 => contract를 연결하는 것을 도와주는 라이브러리

## Made By.

[부산대학교 정보컴퓨터공학부 18학번 이제호](https://github.com/jhl8109)

[성균관대학교 소프트웨어학과 20학번 김선우](https://github.com/Sunwoo0110)

[KAIST 전산학부 17학번 권기훈](https://www.github.com/kyoonkwon)

### Shout out to (Special Thanks to)

[KAIST 전산학부 19학번 윤태양](https://www.github.com/hotsunchip) - Coin Logo Design
[크립토키티](https://www.cryptokitties.co) - Copyright holder
