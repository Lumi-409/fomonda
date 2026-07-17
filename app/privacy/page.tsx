import BackTopBar from "@/components/back-topbar";

const SECTIONS = [
  {
    title: "수집하는 정보",
    body: "판단 이유로 작성한 텍스트, 조회/점검한 종목 정보, 기기에 저장되는 세션ID를 수집해요.",
  },
  {
    title: "수집 목적",
    body: "AI 점검 카드 생성과 서비스 개선을 위해서만 사용해요.",
  },
  {
    title: "보관 기간",
    body: "별도로 삭제를 요청하시기 전까지 보관해요.",
  },
  {
    title: "제3자 제공",
    body: "AI 분석을 위해 OpenAI에, 관련 뉴스 검색을 위해 Naver에 입력하신 데이터 일부가 전송돼요.",
  },
  {
    title: "문의처",
    body: "궁금한 점은 스레드 계정 @madeby_kkandin DM으로 문의해주세요.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <BackTopBar />
      <div className="flex flex-1 flex-col gap-2xl px-lg pb-2xl">
        <h1 className="text-heading-sub font-semibold text-gray-950">개인정보처리방침</h1>
        <div className="flex flex-col gap-xl">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-xs">
              <h2 className="text-label font-semibold text-gray-900">{section.title}</h2>
              <p className="text-label-sm text-gray-600">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
