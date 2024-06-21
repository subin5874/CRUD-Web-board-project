# CRUD 웹 게시판 제작하기

React를 기반으로한 웹 게시판입니다.

## 프로젝트 개요

- 제작 기간 : 2024.04.16 ~ 2024.05.29
- 참여 인원 : [@subin5874](https://github.com/subin5874)
- Figma를 이용해 페이지 디자인
- draw.io를 이용해 순서도 작성

## 프로젝트 소개

1. 로그인 기능이 있는 게시판입니다.
2. 상단 로그인/회원가입 버튼을 통해 로그인과 회원가입이 가능합니다.
3. 게시글을 누르면 상세 페이지로 이동합니다. 로그인시 댓글 작성이 가능합니다.
4. 마이페이지에서 사용자가 작성한 글, 댓글 확인이 가능하고 좋아요 누른 게시글의 리스트를 확인할 수 있습니다. 정보수정 버튼을 클릭하면 비밀번호를 확인하고 닉네임, ID를 수정할 수 있습니다.
5. 로그인한 사용자가 작성한 글을 수정,삭제할 수 있고 댓글을 삭제할 수 있습니다.

## 사용 기술

### Front-end

- React
- Javascript
- HTML/CSS
- Axios

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

### Back-end

- node.js
- express


<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">


### DB

- mysql
- sequelize

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white"> 

## 버전 관리 시스템

- git
- github

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 사용 툴

- Visual Studio

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

## 구현 기능 및 화면

### 1) 메인 페이지

![main](https://github.com/subin5874/react-study-board-project/assets/86753223/ffe2dd25-6935-43d6-a734-131953c5d4c5)

### 2) 로그인/회원가입 페이지

![login](https://github.com/subin5874/react-study-board-project/assets/86753223/157b56c6-fda5-4ec5-ad3c-176e31766757)  
![register](https://github.com/subin5874/react-study-board-project/assets/86753223/f0fd26af-fb15-4d36-845a-3005868468f3)

### 3) 게시글 상세페이지, 댓글

![board](https://github.com/subin5874/react-study-board-project/assets/86753223/97273fc9-5571-4c77-8c91-ac9bd6d688e6)

### 4) 마이페이지

![mypage](https://github.com/subin5874/react-study-board-project/assets/86753223/13c1f5e7-b4f6-443a-82bf-71bb4bdb0fd1)

## 느낀점 & 개선할 점

 개발 중간에 기획에서 실수한 부분들을 발견하여 수정하는 경우가 있어 예상보다 구현하는데 시간이 오래 걸렸습니다.
앞으로는 기획 부분에서 데이터베이스 모델링, 기능 명세서 등을 더욱 꼼꼼하게 작성해야겠다고 느꼈습니다.
   
프론트엔드와 백엔드 모두 구현해보며 데이터를 어떻게 오고 가는지 알 수 있었습니다.   
처음엔 백엔드와 프론트를 연결하는 코드가 이해가 되지 않아 이 부분에서 시간이 많이 소요되었습니다. 이후 postman을 사용하여 정보가 어떤 방식으로 넘어가는지 등 다양한 요청과 응답을 테스트 해보며 이해할 수 있게 되었습니다.    
프로젝트에서 상태 관리를 useState로만 하였는데 다음에는 전역 상태 관리를 Context API나 Redux를 이용해 해보고 싶습니다.


