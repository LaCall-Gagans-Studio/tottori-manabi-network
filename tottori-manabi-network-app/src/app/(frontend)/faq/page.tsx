import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

const faqs = [
  {
    question: '子どもが不登校になったばかりですが、まずどこに相談すればいいですか？',
    answer: (
      <>
        まずは以下の相談先を検討してみてください：
        <ul className="list-disc list-inside mt-2 space-y-4">
          <li>
            <strong>学校（担任の先生・スクールソーシャルワーカー）</strong>
            <br />
            担任やSSW（スクールソーシャルワーカー）は、
            家庭や福祉と連携しながら、子どもに合った支援を一緒に考え、必要な支援機関や医療機関を紹介してくれる場合があります。
          </li>
          <li>
            <strong>教育支援センター</strong>
            <br />
            各市町に設置された公立の学びの場で、
            <br />
            学習支援や体験活動、相談支援を受けられます。
            <br />
            <Link href="https://www.tuna-kan.org/dicts?type=3" className="text-ws-primary">
              　▶教育支援センターの一覧を見る
            </Link>
          </li>
          <li>
            <strong>認定フリースクール</strong>
            <br />
            学校以外の安心できる居場所として、
            <br />
            子どもに合った学び方を提案してくれる民間の施設です。
          </li>
          <li>
            <strong>行政の教育相談窓口</strong>
            <br />
            鳥取県や市町の相談窓口では、
            <br />
            不登校に関する幅広い情報提供・支援につなげてもらえます。
            <br />
            <Link href="https://www.pref.tottori.lg.jp/shiensoudan/" className="text-ws-primary">
              　▶行政の窓口を知る
            </Link>
          </li>
        </ul>
        もちろん、われわれ【つなかん】も、皆さんのちょっとした悩みから、通所に関する悩みまで窓口を対応しています。
        <br />
        とにかく話を聞いてほしいという方は、
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSdLSt6eRfqxkhKIXissDbGS6GoreU-Fw-wGPY238exlaOG8Fw/viewform"
          className="text-ws-primary"
        >
          こちら
        </Link>
        からご連絡ください。
        不登校は特別なことではありません。一人で抱えず、まずはどこかに話してみることが最初の一歩です。
      </>
    ),
  },
  {
    question: '教育支援センターとフリースクールの違いは何ですか？',
    answer: (
      <>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <strong>教育支援センター（適応指導教室）</strong>は、市町村が設置する公立施設で、
            <br />
            学校復帰を目指した学習支援や体験活動を行う場です。
            <br />
            <Link href="https://www.tuna-kan.org/dicts?type=3" className="text-ws-primary">
              　▶教育支援センターの一覧を見る
            </Link>
          </li>
          <li>
            <strong>フリースクール</strong>は、民間やNPOが運営する自由な学びの場で、
            <br />
            学校に代わる「自分らしく過ごせる場所」として利用されます。その特徴は施設によって様々です。
            <br />
            <Link href="https://www.tuna-kan.org/dicts?type=1" className="text-ws-primary">
              　▶フリースクールの一覧を見る
            </Link>
          </li>
        </ul>
        どちらも子どもにとって安心できる選択肢です。子どもの性格や状態に応じて合うのはどちらか探ってみましょう。
      </>
    ),
  },
  {
    question: '教育支援センター・フリースクールの利用にはお金がかかりますか？',
    answer: (
      <>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <strong>教育支援センター</strong>は公立のため<strong>無料</strong>で利用できます。
          </li>
          <li>
            <strong>フリースクール</strong>は各施設によって異なり、
            <br />
            授業料や活動費が必要な場合があります（施設ごとに詳細をご確認ください）。
            <br />
            <Link href="https://www.tuna-kan.org/dicts?type=1" className="text-ws-primary">
              　▶フリースクールの一覧を見る
            </Link>
          </li>
        </ul>
        経済的な不安がある場合は、助成制度や行政の支援制度を相談してみてください。
      </>
    ),
  },
  {
    question: 'フリースクールに通っても学校の出席扱いになりますか？',
    answer: (
      <>
        鳥取県が認定したフリースクールであれば、学校との連携によって
        <strong>出席扱い</strong>となる場合があります。
        <br />
        まずは学校とフリースクールの両方に相談し、
        出席認定のために必要な連絡・書類・計画などを確認しておくと安心です。
      </>
    ),
  },
  {
    question: 'つなかんが県の認可を得ているとはどういうことですか？',
    answer: (
      <>
        「つなかん」は、鳥取県の<strong>令和7年度不登校支援情報発信・相談業務</strong>
        として委託を受けて運営されています。
        <br />
        鳥取県が公式に関与し、認定フリースクールや教育支援センターに関する正確な情報を提供する公的性のあるプロジェクトです。
        <br />
        行政と民間が連携して、信頼できる情報発信と相談支援を行う体制の一環として位置づけられています。
      </>
    ),
  },
]

export default function Faq() {
  return (
    <main>
      <Header />
      <section className="w-5/6 lg:w-1/2 mx-auto whitespace-pre-line leading-relaxed text-wrap py-16">
        <h2 className="text-2xl text-center mb-8">よくあるご質問</h2>
        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-ws-primary rounded-lg"
            >
              <AccordionTrigger className="px-4 py-3 text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-base leading-relaxed text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <Footer />
    </main>
  )
}
