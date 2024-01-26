![image](https://static.vecteezy.com/system/resources/previews/008/480/737/original/burger-icon-simple-colored-burger-icon-fast-food-logo-free-png.png)
# 맛집 리뷰사이트 MAKZIP🥗
-----------------------
## 내가 방문한 맛집들에 대한 기록을 자유롭게 리뷰를 통해 작성해보아요!

- 내가 방문했던 수많은 음식점 그 중에서도 기억에 남는 맛집에 대한 의견을 자유롭게 작성해보세요. 

### 📆 프로젝트 기간

- 2024.01.18 ~ 2024.01.25

### 배포 주소 

<a href="https://github.com/TeambMakzip/makzip_back.git)https://github.com/TeambMakzip/makzip_back.git">백엔드 깃허브코드</a>

<a href="https://fly.io/apps/makzip-tb">백엔드 서버배포</a>

###  🌽 프로젝트 참여 멤버

<table>
   <tr>
    <td align="center"><b><a href="https://github.com/dong5397">김동욱`s 깃허브 </a></b></td>
    <td align="center"><b><a href="https://github.com/MkBaek0229">백민기`s 깃허브 </a></b></td>
  </tr>
  <tr>
    <td align="center"><img src="https://github.com/TeambMakzip/makzip_back/assets/118099517/dfe53464-52bf-4484-a9d5-4659e1a53dac" width="100px" /></td>
    <td align="center"><img src="https://w7.pngwing.com/pngs/762/701/png-transparent-mobile-backend-as-a-service-apigee-architecture-application-programming-interface-computer-software-generation-angle-text-rectangle-thumbnail.png" width="100px" /></a></td>
  </tr>
  <tr>
    <td align="center"><b>React</b></td>
    <td align="center"><b>express</b></td>
  </tr>
</table>

## 🛠 Tools

#### Backend

<p>
  <img src="https://img.shields.io/badge/node.js-6DB33F?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-007ACC?style=for-the-badge&logo=express&logoColor=white">
   <br>
</p>

#### Infrastructure

<p>
  <img src="https://img.shields.io/badge/fly.io-%23FF9900.svg?style=for-the-badge&logo=fly.io&logoColor=white" > 
   <img src="https://img.shields.io/badge/postgresql-4479A1?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

#### Dev tools

<p> 
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
</p>

## 클라이언트 요청에 따른 Flow chart
<img width="733" alt="flow chart" src="https://github.com/TeambMakzip/makzip_back/assets/118099517/44e66dcd-5a68-4631-8af0-99a6441799d3">


## 이슈 해결 사례
### 이슈 1 클라이언트 측의 수정 요청 이후 렌더링이 곧바로 진행되지않는 문제 

A. 사용자가 원하는 리뷰내용을 수정하고자 수정 요청을 보냈을때 수정요청이 즉각적으로 처리되서 재렌더링이 되지않고 새로고침 해야지만 데이터가 수정이되었어요.
<br>
<br>
🛑 cause : <br>
- 수정 요청후 새롭게 수정된 데이터를 조회해온뒤 클라이언트에 반환을하지않고 있었어요.

#### 🚥 solution :
- 수정 요청후 다시 데이터 조회 요청을 보내고 난뒤 수정된데이터를 클라이언트에 반환되도록 했어요. 
<br>
<br>

