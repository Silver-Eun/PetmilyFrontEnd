## Petmily 📅 개발 기간 2023.05.23 ~ 2023.12.27  

### 📚 과정  
- :ledger: KDT 4기 프로젝트 기반 풀스택 프로젝트  

### 👥 팀 구성  
- :family: 4명  

### 🚀 기술 스택  
**Back-End** :computer:  
- Java 8 
- Spring Boot 2.7.17  
- Spring Security  
- MyBatis
- MySQL  
- Maven
- Lombok  

**Front-End** 🎨  
- React

**DevOps** ⚙
- 전자정부프레임워크
- Visual Studio Coed

---

### 📂 본인파트

#### 🛍 사용자 기능 (FE & BE)  
- **상품상세페이지, 회원정보수정 페이지 FE 구성** (BE는 3차에서 다른 인원에게 재배분)
- **장바구니, 주문페이지, 주문상세페이지, 마이페이지, 주문내역페이지 BE / FE 구성**
 
#### 🔧 관리자 기능  
- **관리자페이지 중 장바구니, 주문관리 부분 구성**  
- **장바구니, 주문, 주문상세 테이블 설계**   

---

### 🔄 리팩토링, 기능 개선 및 배포 (2024.11.04 ~ 2025.02.16)  

### 👥 팀 구성  
- :family: 1명(기존 팀이 아닌 단독으로 진행)

### ✅ 기술 스택 변경  
- **개발 환경 변경**: 전자정부프레임워크 → IntelliJ  
- **Java 업그레이드**: Java 8 → Java 17  
- **Spring Boot 업그레이드**: Spring Boot 2.7.17 → Spring Boot 3.2.2  
- **빌드 시스템 변경**: Maven → Gradle
- **템플릿 엔진 변경**: JSP → Thymeleaf  
- **환경 변수 설정 변경**: `application.properties` → `application.yml`

### ✅ 기능 개선  
- **관리자 페이지 회원, 게시판 부분 UX 개선**
  - 관리자페이지내 ‘회원’ 클릭시 페이지 이동 →  **하단 드롭다운 메뉴 방식 적용**
  - 관리자페이지내 ‘게시판’ 클릭시 공지사항목록이 기본으로 노출 →  **하단 드롭다운 메뉴 방식 적용**
- **회원 기능 보안 강화**  
  - 관리자페이지내에서 회원가입시 **비밀번호 암호화 기능 누락 수정**  
- **게시판 기능 추가**  
  - 관리자페이지내 FAQ에서 누락된 **글쓰기 및 수정 기능 구현**  
- **API 구조 정리**  
  - 내부 API 경로에 `/api` prefix 추가 → **프론트엔드(React) API와 명확하게 구분**
- **프론트엔드 렌더링 성능 최적화 및 시각적 안정성(UX) 확보**
  - **이슈:** 최초 접속 시 API 응답 대기 및 대용량 이미지 로딩 상태에서 메인 배너 슬라이더 영역이 비어있다가, 이미지가 도착하는 순간 화면 전체가 하단으로 크게 밀리는 레이아웃 시프트(Layout Shift) 현상 발생.
  - **해결:**
    - 슬라이더 및 주요 이미지 컨테이너 요소에 고정 초기값을 사전 지정하여 브라우저가 렌더링 공간을 미리 할당하도록 뼈대 구조 확보.
  - **결과:** 물리적인 이미지 다운로드 속도를 단축하고 초기 로딩 시의 화면 덜컹거림 현상을 완벽히 제거하여 안정적이고 쾌적한 사용자 경험(UX)을 제공함.
 
### ✅ 배포
- **백엔드 배포**
  - 관리자페이지 및 API는 Cloudtype으로 배포
- **프론트엔드 배포**
  - 프론트엔드는 Netlify로 배포
---

### 📎 배포 링크  
- **Petmily**: [https://petmilyreal.netlify.app/](https://petmilyreal.netlify.app/)  
- **Petmily 관리자페이지**: [https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/home](https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/home)
