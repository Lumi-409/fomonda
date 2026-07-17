import BackTopBar from "@/components/back-topbar";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-sm">
      <h2 className="text-label font-semibold text-gray-900">{title}</h2>
      <div className="flex flex-col gap-sm text-label-sm text-gray-600">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-xs pl-lg">
      {items.map((item, index) => (
        <li key={index} className="list-disc">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <BackTopBar />
      <div className="flex flex-1 flex-col gap-2xl px-lg pb-2xl">
        <div className="flex flex-col gap-sm">
          <h1 className="text-heading-sub font-semibold text-gray-950">개인정보처리방침</h1>
          <p className="text-label-sm text-gray-600">
            포몬다(Fomonda)는 사용자의 투자 판단을 대신하지 않고, 사용자가 작성한 판단 이유를
            바탕으로 스스로 점검할 수 있는 AI 점검 카드를 제공하는 베타 서비스입니다.
          </p>
        </div>

        <div className="flex flex-col gap-xl">
          <Section title="1. 수집하는 정보">
            <p>포몬다는 서비스 제공을 위해 아래 정보를 수집할 수 있습니다.</p>
            <BulletList
              items={[
                "사용자가 입력한 판단 이유 텍스트",
                "사용자가 조회하거나 점검한 종목명, 종목코드, 보유 여부",
                "AI 점검 결과와 종목별 판단 타임라인",
                "기기에 저장되는 세션ID",
                "서비스 이용 기록: 접속 일시, 버튼 클릭, 결과 확인 여부, 오류 로그 등",
                "브라우저 및 기기 정보, IP 주소 등 서비스 운영 과정에서 자동 생성되는 정보",
              ]}
            />
            <p>
              포몬다는 주민등록번호, 계좌번호, 카드번호, 비밀번호, 정확한 자산 규모, 전화번호 등
              민감하거나 직접 식별 가능한 정보를 입력하도록 요구하지 않습니다. 사용자는 판단
              이유 작성 시 위와 같은 정보를 입력하지 않는 것을 권장합니다.
            </p>
          </Section>

          <Section title="2. 수집 목적">
            <p>수집한 정보는 아래 목적을 위해 사용합니다.</p>
            <BulletList
              items={[
                "AI 점검 카드 생성",
                "종목별 판단 타임라인 저장 및 조회",
                "서비스 이용 흐름 분석",
                "오류 확인 및 서비스 안정화",
                "베타 서비스 개선을 위한 통계 분석",
              ]}
            />
          </Section>

          <Section title="3. 분석 도구 사용">
            <p>
              포몬다는 서비스 개선을 위해 GA4와 Mixpanel을 사용할 수 있습니다. 수집되는 주요
              이벤트 예시는 다음과 같습니다.
            </p>
            <BulletList
              items={[
                "Onboarding Start Clicked: 사용자가 시작하기 버튼을 클릭한 경우",
                "Check Completed: AI 점검 결과 카드가 정상적으로 화면에 표시된 경우",
              ]}
            />
            <p>분석 도구에는 사용자의 판단 이유 원문이 직접 전송되지 않도록 설계합니다.</p>
          </Section>

          <Section title="4. 외부 서비스 이용">
            <p>포몬다는 서비스 제공을 위해 아래 외부 서비스를 사용할 수 있습니다.</p>
            <BulletList
              items={[
                "OpenAI: 사용자가 입력한 판단 이유, 종목 정보, 관련 뉴스 정보를 바탕으로 AI 점검 카드를 생성하기 위해 사용합니다.",
                "Naver 검색 API: 사용자가 선택한 종목과 관련된 최신 뉴스 검색을 위해 사용합니다.",
                "Supabase: 종목 정보, 판단 이유, AI 점검 결과, 세션ID 기반 타임라인 저장을 위해 사용합니다.",
                "Vercel: 서비스 배포 및 운영을 위해 사용합니다.",
                "Google Analytics, Mixpanel: 서비스 이용 흐름 분석을 위해 사용합니다.",
              ]}
            />
          </Section>

          <Section title="5. 보관 기간">
            <p>
              수집한 정보는 베타 서비스 운영 및 개선을 위해 보관하며, 사용자가 삭제를 요청하거나
              서비스 운영 목적이 종료되면 지체 없이 삭제합니다.
            </p>
            <p>
              단, 관련 법령 또는 외부 서비스의 정책에 따라 일정 기간 보관이 필요한 정보는 해당
              기간 동안 보관될 수 있습니다.
            </p>
          </Section>

          <Section title="6. 제3자 제공">
            <p>
              포몬다는 사용자의 개인정보를 판매하거나 광고 목적으로 제3자에게 제공하지 않습니다.
            </p>
            <p>
              다만 AI 점검 카드 생성, 뉴스 검색, 서비스 저장 및 분석을 위해 위에 명시한 외부
              서비스에 필요한 범위의 정보가 전송될 수 있습니다.
            </p>
          </Section>

          <Section title="7. 이용자의 권리">
            <p>사용자는 본인이 입력한 정보의 삭제를 요청할 수 있습니다.</p>
            <p>
              삭제 요청 또는 개인정보 관련 문의는 Threads 계정 @madeby_kkandin DM으로 보내주세요.
            </p>
            <p>요청 시 세션ID 또는 본인 확인에 필요한 최소 정보를 요청할 수 있습니다.</p>
          </Section>

          <Section title="8. 처리방침 변경">
            <p>
              개인정보처리방침이 변경되는 경우 서비스 화면 또는 안내 페이지를 통해 고지합니다.
            </p>
            <p className="text-eyebrow text-gray-400">최종 업데이트: 2026년 7월 17일</p>
          </Section>
        </div>
      </div>
    </div>
  );
}
