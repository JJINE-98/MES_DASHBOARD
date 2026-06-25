# AI 스마트팩토리 MES 관제 대시보드 · GitHub Pages 버전

Vite, React, TypeScript, Recharts로 만든 정적 GitHub Pages 배포용 프로젝트입니다.

## 대상 저장소

- GitHub 저장소: [JJINE-98/MES_DASHBOARD](https://github.com/JJINE-98/MES_DASHBOARD)
- GitHub Pages 주소: [https://jjine-98.github.io/MES_DASHBOARD/](https://jjine-98.github.io/MES_DASHBOARD/)
- Vite 배포 기준 경로: `/MES_DASHBOARD/`

## 이 버전의 특징

GitHub Pages는 HTML, CSS, JavaScript 정적 파일만 호스팅합니다. Netlify Functions 같은 서버 코드를 실행하거나 `OPENAI_API_KEY`를 안전하게 보관할 수 없습니다.

따라서 이 프로젝트는 다음 방식으로 동작합니다.

```text
샘플 MES 데이터
  ↓
브라우저의 로컬 규칙 기반 분석
  ↓
생산관리 보고서 및 질문 답변 표시
```

- OpenAI API를 호출하지 않습니다.
- API 키가 필요하지 않습니다.
- API 키가 프론트엔드에 노출될 위험이 없습니다.
- `src/utils/aiAnalysis.ts`의 fallback 분석을 항상 사용합니다.
- 기존 Netlify/OpenAI 버전과 별개의 정적 배포 프로젝트입니다.

## 로컬 실행

Node.js 18 이상과 npm이 필요합니다.

```bash
npm install
npm run dev
```

터미널에 표시된 주소(기본값 `http://localhost:5173`)를 브라우저에서 엽니다.

## 프로덕션 빌드

```bash
npm run build
```

빌드 결과는 `dist` 폴더에 생성됩니다.

```bash
npm run preview
```

위 명령으로 빌드 결과를 로컬에서 확인할 수 있습니다.

## GitHub Pages 배포

프로젝트에는 `.github/workflows/deploy.yml` 자동 배포 워크플로가 포함되어 있습니다.

### 1. 프로젝트 업로드

압축을 해제한 프로젝트 폴더에서 다음 명령을 실행합니다.

```bash
git init
git add .
git commit -m "Initial GitHub Pages dashboard"
git branch -M main
git remote add origin https://github.com/JJINE-98/MES_DASHBOARD.git
git push -u origin main
```

이미 Git 저장소가 초기화되어 있고 원격 저장소만 변경해야 한다면 다음 명령을 사용합니다.

```bash
git remote set-url origin https://github.com/JJINE-98/MES_DASHBOARD.git
git push -u origin main
```

브라우저의 GitHub 업로드 화면을 사용한다면 아래 주소에서 프로젝트 파일을 업로드할 수 있습니다.

[MES_DASHBOARD 파일 업로드](https://github.com/JJINE-98/MES_DASHBOARD/upload/main)

`.github/workflows/deploy.yml`처럼 점(`.`)으로 시작하는 폴더도 반드시 함께 업로드해야 자동 배포가 동작합니다.

### 2. GitHub Pages 설정

저장소의 다음 메뉴로 이동합니다.

```text
Settings
→ Pages
→ Build and deployment
→ Source
→ GitHub Actions
```

이 설정은 최초 배포 전에 반드시 한 번 직접 수행해야 합니다. 저장소에 워크플로 파일만 업로드하고 Pages를 활성화하지 않으면 `Get Pages site failed` 또는 `Not Found` 오류가 발생합니다.

### 3. 자동 배포 확인

`main` 브랜치에 push하면 GitHub Actions가 다음 작업을 수행합니다.

```text
npm ci
→ npm run build
→ dist 업로드
→ GitHub Pages 배포
```

배포 상태는 저장소의 **Actions** 탭에서 확인할 수 있습니다.

배포가 완료되면 다음 주소로 접속합니다.

```text
https://jjine-98.github.io/MES_DASHBOARD/
```

## `Get Pages site failed` 오류 해결

다음과 같은 오류는 GitHub Pages 사이트가 아직 활성화되지 않았을 때 발생합니다.

```text
Error: Get Pages site failed.
Please verify that the repository has Pages enabled and configured
to build using GitHub Actions.
Error: Not Found
```

다음 순서대로 처리합니다.

1. [MES_DASHBOARD 저장소](https://github.com/JJINE-98/MES_DASHBOARD)로 이동합니다.
2. 저장소 상단의 **Settings**를 선택합니다.
3. 왼쪽 메뉴의 **Pages**를 선택합니다.
4. **Build and deployment** 영역에서 **Source**를 `GitHub Actions`로 선택합니다.
5. 설정 후 저장소의 **Actions** 탭으로 이동합니다.
6. 실패한 `Deploy to GitHub Pages` 워크플로를 선택합니다.
7. **Re-run all jobs**를 실행합니다.

Settings 메뉴가 보이지 않는다면 해당 저장소의 관리자 권한이 있는 계정으로 로그인했는지 확인해야 합니다.

저장소가 비공개인 경우에는 GitHub 요금제에 따라 Pages 사용이 제한될 수 있습니다. GitHub Free 계정이라면 저장소를 공개 상태로 전환한 뒤 다시 확인하십시오.

워크플로의 `actions/configure-pages`에 `enablement: true`를 단순 추가하는 방식은 권장하지 않습니다. 이 옵션으로 Pages를 자동 활성화하려면 기본 `GITHUB_TOKEN`이 아닌 별도의 Personal Access Token과 추가 권한이 필요합니다.

## API 키 보안

이 GitHub Pages 버전에는 API 키를 설정하면 안 됩니다.

특히 다음 환경변수를 추가하지 마십시오.

```env
VITE_OPENAI_API_KEY=...
OPENAI_API_KEY=...
```

`VITE_`로 시작하는 환경변수는 Vite 빌드 결과에 포함되어 브라우저에서 확인할 수 있습니다. GitHub Actions Secrets에 키를 저장하더라도 이를 Vite 프론트엔드 빌드에 전달하면 최종 JavaScript에 노출될 수 있습니다.

실제 OpenAI 연동이 필요하면 기존 Netlify 버전을 사용하거나, 별도의 서버 API를 구축해야 합니다.

## 주요 파일

```text
src/data/mockData.ts             MES 샘플 데이터
src/utils/dashboardSummary.ts   AI 분석용 요약 데이터 생성
src/utils/aiAnalysis.ts         로컬 규칙 기반 분석
src/services/aiService.ts       로컬 분석 서비스
.github/workflows/deploy.yml    GitHub Pages 자동 배포
```
